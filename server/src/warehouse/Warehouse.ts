/* eslint-disable @typescript-eslint/no-explicit-any */
import {existsSync} from "fs";
import getFolderSize from 'get-folder-size';
import leveldown from 'leveldown';
import levelup, {LevelUp} from 'levelup';
import path from 'path';
import {Pool, PoolClient} from 'pg';
import rimraf from 'rimraf';
import {combineLatest, ReplaySubject, Subject} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {getPgSslForPg8, getPgUrlForPg8} from '../utils/databaseUrl';
import {S3LevelBackup} from './base/bucketeer/S3LevelBackup';
import {Logger} from './base/classes/Logger';
import {getMemoryUsage} from './base/functions';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';

export const PK_DEFAULT_CONFIG_PROJECT = 375669;
export const PK_ENGLISH = 18889;

interface NotificationHandler {
    channel: string
    listeners: {
        listenerName: string,
        callback(date: Date): Promise<void>
    }[]
}

export interface WarehouseConfig {
    // parent folder of leveldb
    rootDir: string
    // name of leveldb folder
    leveldbFolder: string
    // if provided, warehouse creates backups
    backups?: {
        // current git commit (short hash)
        currentCommit: string,
        // array of commits
        compatibleWithCommits: string[]
    }
}

export class Warehouse {

    pgPool: Pool;
    pgClient: PoolClient;

    // Indexes holding data given by db
    prim: PrimaryDataServices;

    // Indexed holding resulting data deferred by warehouse
    agg: AggregatedDataServices;

    // Indexes holding dependencies between primary and secondary data
    dep: DependencyDataServices

    initializingIndexes = false

    status: 'stopped' | 'initializing' | 'starting' | 'running' | 'backuping' = 'stopped'

    notificationHandlers: {[key: string]: NotificationHandler} = {}

    pgConnected$ = new ReplaySubject<PoolClient>()
    createSchema$ = new Subject<void>()

    // The date for which the current leveldb is up to date.
    catchUpDate: Date;

    s3backuper: S3LevelBackup

    /**
     * This creates the level database that can be imported
     * throughout the app in order to use the database
     */
    leveldbpath: string;
    leveldb: LevelUp;


    constructor(public readonly config: WarehouseConfig) {

        this.leveldbpath = path.join(config.rootDir, this.config.leveldbFolder)
        this.leveldb = this.createLeveldb(this.leveldbpath)

        if (config.backups) {
            this.s3backuper = new S3LevelBackup(config.rootDir, this.config.leveldbFolder)
        }

        const connectionString = getPgUrlForPg8()
        const ssl = getPgSslForPg8()
        this.pgPool = new Pool({
            max: 15,
            connectionString,
            ssl
        });

        Logger.msg(`create warehouse for DB: ${connectionString.split('@')[1]}`)
        this.prim = new PrimaryDataServices(this)
        this.agg = new AggregatedDataServices(this)
        this.dep = new DependencyDataServices(this)

    }

    /**
     * start warehouse
     * this function is for deployment use – call it on start of Heroku Worker
     */
    async start() {

        // Q: What was is backup id of latest backup?
        const latestBackupId = await this.s3backuper.getLatestBackupId()

        if (!latestBackupId) {
            // A: No. Init first
            Logger.msg('*** no backup found – need to initialize first ***', 0)
            await this.init()
        }
        else {
            // A: Yes.
            Logger.msg(`Found backup – Date: ${latestBackupId.isoDate} Commit: ${latestBackupId.gitCommit}`, 0)

            // Q: Did the warehouse code change since backup?
            const {changed} = this.checkIfCodeChanged(latestBackupId.gitCommit);
            if (changed) {
                // A: YES. This means the backup is not compatible with current warehouse
                // (we are in a fresh deployment)
                // initialize warehouse
                Logger.msg('*** warehouse code changed – need to initialize first ***', 0)
                await this.init()
            }

            else {
                // A: NO. this means the backup is compatible with current warehouse
                Logger.msg(`Backup is compatible with current warehouse`, 0)

                // download it
                const {download} = await this.downloadBackup()
                if (download === 'not found') {
                    // there was an error
                    Logger.msg('*** there was an error with backup download – need to initialize ***', 0)
                    await this.init()
                }
            }
        }

        await this.listen()
    }
    /**
     * Initalize warehouse service
     */
    async init() {

        this.status = 'initializing';
        const t0 = Logger.start('Initialize Warehouse', 0)

        await this.connectPgClient();

        await this.clearWhDB()

        await this.initIndexSchema()

        await this.setInitBackupDate();

        await this.initIndexData();

        await this.agg.startCycling()

        await this.createS3Backup()

        Logger.itTook(t0, 'to initialize', 0)

        Logger.log(`The warehouse uses approximately ${getMemoryUsage()} MB of memory`);
        const diskUsage = await this.getLevelDbFileSize()
        Logger.log(`The warehouse uses approximately ${diskUsage.readable} of disk space`)

        await this.stop()
    };



    /**
     * Starts listening
     */
    async listen() {
        const t0 = Logger.start('Start listening Warehouse', 0)

        this.status = 'starting';

        await this.connectPgClient();

        await this.initIndexSchema()

        this.startListening()

        await this.catchUp();

        this.startRegularBackups()

        this.status = 'running';

        Logger.itTook(t0, 'to start listening. Warehouse is up and running', 0)
    }


    createLeveldb(leveldbpath: string): LevelUp {
        return levelup(leveldown(leveldbpath))
    }

    /**
     * Returns a promise that resolves with {changed:true} if the any file
     * in the src/warehouse folder has changed since the given commit, else it
     * resolves with {changed:false}
     *
     * @param commit short hash of git commit to compare with current commit
     */
    private checkIfCodeChanged(commit: string): {changed: boolean} {
        if (commit === this.config.backups?.currentCommit) return {changed: false}
        if (this.config.backups?.compatibleWithCommits.includes(commit)) return {changed: false}
        return {changed: true}
    }

    /**
     * Call this function to make the warehouse catching up with latest changes.
     *
     * Detects changes made on GvDB in the time from this.backupCatchUpDate
     * until now.
     */
    private async catchUp() {

        Logger.msg(`Catch up since ${this.catchUpDate}`);

        if (this.catchUpDate) {
            for (const primDS of this.prim.registered) {
                await primDS.startAndSyncSince(this.catchUpDate);
            }
        }
        else {
            new Error('No backupCatchUpDate found.');
        }
    }

    /**
     * gets date of latest valid udate cycle
     */
    private getCatchUpDate() {
        let date: Date = this.catchUpDate;

        const dates = this.prim.registered
            .filter(d => !!d.lastUpdateDone)
            .map(d => d.lastUpdateDone ?? new Date())
            .sort();
        if (dates.length) date = dates[dates.length - 1];
        return date;
    }

    /**
     * Initializes the 'database schema' and returns a Promise that resolves as
     * soon as all 'tables' (= indexes) are ready to be used
     */
    private async initIndexSchema() {
        this.createSchema$.next()
        return new Promise((res, rej) => {
            combineLatest(
                this.prim.ready$.pipe(filter(r => r === true)),
                this.agg.ready$.pipe(filter(r => r === true)),
                this.dep.ready$.pipe(filter(r => r === true)),
            ).pipe(first()).subscribe(_ => res())
        })
    }


    /**
     * Initialize the indexes of the primary data services which will potentially
     * trigger aggregated data services to update themselfs.
     * In short: The function (re-)creates all indexes
     */
    private async initIndexData() {
        this.initializingIndexes = true
        const t1 = Logger.start('Initialize indexes', 0)

        await this.prim.initAllIndexes()

        Logger.itTook(t1, 'to initialize indexes', 0)
        this.initializingIndexes = false
    }

    /**
     * checks out a new postgres client from the pool and nexts the pgConnected$
     * observable that allows classes aware of this warehouse to wait for the
     * connection before executing postgres queries.
     */
    public async connectPgClient() {
        this.pgClient = await this.pgPool.connect();
        this.pgConnected$.next(this.pgClient)
    }


    private async setInitBackupDate() {
        const dbNow = await this.pgClient.query('SELECT now() as now');
        const tmsp: string = dbNow.rows?.[0]?.now;
        this.catchUpDate = new Date(tmsp)
    }

    private async createS3Backup(): Promise<Date | undefined> {
        if (!this.config.backups) return;

        const t1 = Logger.start(`Creating backup...`, 0)

        // Set status to backuping
        const statusCache = this.status;
        this.status = 'backuping'

        await this.waitUntilSyncingDone()
        const date = this.getCatchUpDate()

        Logger.itTook(t1, `to wait until syning done. Catch-up-date is: ${date.toISOString()}`, 0)


        await this.s3backuper.createBackup(date, this.config.backups.currentCommit)

        // Reset status
        this.status = statusCache;

        Logger.itTook(t1, `to create backup for catch-up-date ${date.toISOString()}`, 0)
        return date
    }
    /**
     * Download backup from S3 and replace the folder
     * If this.skipS3Backups is true, no download happens
     */
    private async downloadBackup(): Promise<{download: 'success' | 'skipped' | 'not found'}> {
        if (!this.config.backups) return {download: 'skipped'};

        rimraf.sync(path.join(this.config.rootDir, this.config.leveldbFolder))
        const backupId = await this.s3backuper.downloadLatestBackup()
        if (backupId) {
            const date = new Date(backupId.isoDate)
            this.catchUpDate = date
            this.s3backuper.deleteOldBackups()
                .catch(e => console.log('Error when deleting old backups.', e))
            return {download: 'success'}
        }
        else {
            return {download: 'not found'}
        }
    }
    /**
     * Starts the creation of regular backups
     */
    private startRegularBackups() {
        if (!this.config.backups) return;

        // 5 min in miliseconds
        const pause = 1000 * 20//60 * 5

        // make a pause
        setTimeout(() => {
            // create backup (causing pause of warehouse)
            this.createS3Backup().then(_ => {
                // catch up modifications during pause
                this.catchUp().catch(e => console.log(e))

                this.startRegularBackups()
            }).catch(e => console.error('Error when creating backup!', e))
        }, pause)
    }

    /**
     * Clears the warehouse database (= all indexes)
     */
    async clearWhDB() {
        const t1 = Logger.start('Clear Warehouse DB', 0)

        // rimraf.sync(this.leveldbpath)

        await this.prim.clearAll()

        await this.agg.clearAll()

        await this.dep.clearAll()

        Logger.itTook(t1, `to clear Warehouse DB`, 0)

    }


    /**
     * Registers a postgres db listener and add a notification handler
     * @param channel
     * @param callback
     * @param name for debugging
     */
    async registerDbListener(channel: string, callback: (date: Date) => Promise<void>, listenerName: string) {
        await this.pgClient.query(`LISTEN ${channel}`)
        this.notificationHandlers[channel] = {
            channel,
            listeners: [
                ...(this.notificationHandlers?.[channel]?.listeners ?? []),
                {
                    listenerName,
                    callback
                }
            ]
        }
    }

    /**
     * starts listening to notifications from postgres
     * and calls callback of notification handler, if available for the channel
     */
    startListening() {
        this.pgClient.on('notification', (msg) => {
            const handler = this.notificationHandlers[msg.channel];


            if (typeof msg.payload === 'string') {
                const date = new Date(msg.payload);
                if (isNaN(date.getTime())) console.error(`Invalid Timestamp provided by pg_notify channel ${msg.channel}`, msg.payload)
                else if (handler) {
                    // Q: Is leveldb folder still present?
                    if (!existsSync('leveldb')) {
                        // A: NO
                        // exit the process, so that listen() is called again.
                        process.exit(1)
                    }
                    // A: YES
                    // Q: Is status running? (this prevents actions during backuping)
                    if (this.status === 'running') {
                        handler.listeners.map(l => {
                            l.callback(date).catch(e => console.log(e))
                        })
                    }

                }
            } else {
                console.error('payload of notification must be a string convertable to date')
            }
        });
    }

    /**
     * Returns a promise that resolves as soon as all sync processes
     * of the primary data services are done (and leveldb is actively used)
     */
    async waitUntilSyncingDone() {
        return new Promise((res, rej) => {
            const syncStatuses$ = this.prim.registered.map(p => p.syncing$)
            combineLatest(syncStatuses$)
                // wait until no sync status is true
                .pipe(first(syncStatuses => syncStatuses.includes(true) === false))
                // resolve the promise
                .subscribe(() => res())
        })
    }


    /**
     * returns file size of db in MB
     */
    async getLevelDbFileSize(): Promise<{
        bytes: number,
        readable: string
    }> {
        return new Promise((res, rej) => {
            getFolderSize(this.leveldbpath, (err, size) => {
                if (err) {rej(err);}

                res({
                    bytes: size,
                    readable: (size / 1024 / 1024).toFixed(2) + ' MB'
                })
            })
        })
    }

    /**
     * stops the warehouse
     */
    async stop() {
        this.status = 'stopped';
        this.notificationHandlers = {}
        this.pgClient.release();

    }
}

