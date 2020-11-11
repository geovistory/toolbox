/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pool, PoolClient} from 'pg';
import {combineLatest, ReplaySubject, Subject} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {getPgSslForPg8, getPgUrlForPg8} from '../utils/databaseUrl';
import {Logger} from './base/classes/Logger';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {IndexPostgres} from './base/classes/IndexPostgres';
import {IndexDBGeneric} from './base/classes/IndexDBGeneric';
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
    schemaName = 'war_cache'
    metaTimestamps: IndexDBGeneric<string, {tmsp: string}>;

    constructor(public readonly config: WarehouseConfig) {

        const connectionString = getPgUrlForPg8()
        const ssl = getPgSslForPg8(connectionString)
        this.pgPool = new Pool({
            max: 15,
            connectionString,
            ssl
        });

        Logger.msg(`create warehouse for DB: ${connectionString.split('@')[1]}`)

    }

    /**
     * start warehouse
     */
    async start() {
        await this.dbSetup();

        const isInitialized = await this.prim.everythingInitialized();

        if (!isInitialized) {
            await this.createWhData();
        }

        await this.listen()
    }


    /**
     * sets the databases up:
     * - connects to pg
     * - initializes leveldb
     */
    async dbSetup() {

        await this.connectPgClient();

        await this.initWhDbSchema()
    }

    /**
     * Initalize warehouse service
     */
    async createWhData() {
        this.status = 'initializing';

        let maxMemoryUsage = 0

        const interval1 = setInterval(() => {
            const m = process.memoryUsage().heapUsed
            if (maxMemoryUsage < m) {
                maxMemoryUsage = m
            }
            this.pgNotify('warehouse_initializing', 'true').catch(e => { })
        }, 1000)

        const interval2 = setInterval(() => {
            this.pgNotify('warehouse_initializing', 'true').catch(e => { })
        }, 10000)


        const t0 = Logger.start('Create Warehouse data', 0)

        await this.getInitBackupDate();

        await this.createPrimaryData();

        await this.createAggregatedData()

        clearInterval(interval1)
        clearInterval(interval2)

        await this.pgNotify('warehouse_initializing', 'false')

        Logger.itTook(t0, 'to create warehouse data', 0)

        Logger.log(`The max memory usage was: ${Math.round(maxMemoryUsage / 1024 / 1024 * 100) / 100} MB of memory`);

    };



    /**
     * Starts listening
     */
    async listen() {
        const t0 = Logger.start('Start listening Warehouse', 0)


        this.status = 'starting';

        this.startListening()

        await this.catchUp();

        this.status = 'running';

        Logger.itTook(t0, 'to start listening. Warehouse is up and running', 0)
    }


    // async createLeveldb(leveldbpath: string): Promise<LevelUp> {
    //     return new Promise((res, rej) => {

    //         const down = leveldown(leveldbpath)
    //         const up = levelup(down, {}, (error) => {
    //             if (error) {
    //                 Logger.err('Error on opening leveldb. Make hard reset.')
    //                 // if we have an error here, the db is currupt
    //                 // make hard reset to trigger initialization of
    //                 // warehouse on next start
    //                 this.hardReset('Error on opening leveldb. Make hard reset.')
    //                     .catch(e => {rej(e)})
    //                     .finally(() => rej())

    //             }
    //             else {
    //                 res(up)
    //             }
    //         })

    //     })
    // }

    /**
     * Deletes local and remote leveldb
     */
    async hardReset(errorMsg: string) {
        // delete the warehouse schema
        await this.pgClient.query(`DROP SCHEMA IF EXISTS ${this.schemaName}`)
        // terminate process
        throw new Error(errorMsg)
    }

    /**
     * Returns a promise that resolves with {changed:true} if the any file
     * in the src/warehouse folder has changed since the given commit, else it
     * resolves with {changed:false}
     *
     * @param commit short hash of git commit to compare with current commit
     */
    private checkIfCodeChanged(commit: string): {changed: boolean} {

        Logger.msg(`Checking if code changed. Current: ${commit}.`)

        Logger.msg(`Compatibility list: ${(this.config?.backups?.compatibleWithCommits ?? ['undefined']).join(', ')}`)

        if (commit === this.config.backups?.currentCommit) return {changed: false}
        if (this.config.backups?.compatibleWithCommits.some(
            (compat) => compat.substring(0, 7) === commit.substring(0, 7)
        )) return {changed: false}
        return {changed: true}
    }

    /**
     * Call this function to make the warehouse catching up with latest changes.
     *
     * Detects changes made on GvDB in the time from this.backupCatchUpDate
     * until now.
     */
    private async catchUp() {

        for (const primDS of this.prim.registered) {

            await primDS.catchUp();
        }

    }

    /**
     * gets earliest date of latest valid udate cycle of
     * the primary data services
     */
    private async getCatchUpDate() {

        const dates: Date[] = []
        for (const p of this.prim.registered) {
            const d = await p.getLastUpdateDone()
            if (d) dates.push(d)
        }
        dates.sort();
        return dates[dates.length - 1];
    }

    /**
     * Initializes the 'database schema' and returns a Promise that resolves as
     * soon as all 'tables' (= indexes) are ready to be used
     */
    private async initWhDbSchema() {
        await this.pgClient.query(`CREATE SCHEMA IF NOT EXISTS ${this.schemaName}`)
        await this.pgClient.query(`
        CREATE OR REPLACE FUNCTION ${this.schemaName}.tmsp_last_modification()
                RETURNS trigger
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE NOT LEAKPROOF
            AS $BODY$
            BEGIN NEW.tmsp_last_modification = NOW();
            RETURN NEW;
            END;
            $BODY$;
        `)

        // creates a toplevel metadata table
        // this can be used e.g. for storing timestamps of dataservices
        this.metaTimestamps = new IndexDBGeneric(
            (key: string) => key,
            (str: string) => str,
            this.constructor.name + '_timestamps',
            this
        )

        // this.leveldb = await this.createLeveldb(this.leveldbpath)
        this.prim = new PrimaryDataServices(this)
        this.agg = new AggregatedDataServices(this)
        this.dep = new DependencyDataServices(this)

        this.createSchema$.next()
        return new Promise((res, rej) => {
            combineLatest(
                this.prim.ready$.pipe(filter(r => r === true)),
                // this.agg.ready$.pipe(filter(r => r === true)),
                // this.dep.ready$.pipe(filter(r => r === true)),
            ).pipe(first()).subscribe(_ => res())
        })
    }


    /**
     * Initialize the indexes of the primary data services which will potentially
     * trigger aggregated data services to update themselfs.
     * In short: The function (re-)creates all indexes
     */
    private async createPrimaryData() {
        this.initializingIndexes = true
        const t1 = Logger.start('Initialize indexes', 0)

        await this.prim.initAllIndexes()

        Logger.itTook(t1, 'to initialize indexes', 0)
        this.initializingIndexes = false
    }
    /**
     * Initialize the indexes of the secondary data services
     */
    private async createAggregatedData() {
        const t1 = Logger.start('Start cycling for all aggregators', 0)

        await this.agg.startCycling()

        Logger.itTook(t1, 'to cycle for all aggregators', 0)
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


    private async getInitBackupDate(): Promise<Date> {
        const dbNow = await this.pgClient.query('SELECT now() as now');
        const tmsp: string = dbNow.rows?.[0]?.now;
        return new Date(tmsp)
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
     * returns now() tmsp from postgres
     */
    async pgNow() {
        const res = await this.pgClient.query<{now: Date}>('select now()')
        return res.rows[0].now.toISOString()
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

                    handler.listeners.map(l => {
                        l.callback(date).catch(e => {
                            console.log(e)
                        })
                    })

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




    pgNotify(channel: string, value: string) {
        return this.pgClient.query(`SELECT pg_notify($1, $2)`, [channel, value])
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

