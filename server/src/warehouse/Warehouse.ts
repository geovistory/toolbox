/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pool, PoolClient} from 'pg';
import {combineLatest, ReplaySubject, Subject} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import subleveldown from 'subleveldown';
import {getPgSslForPg8, getPgUrlForPg8} from '../utils/databaseUrl';
import {Logger} from './base/classes/Logger';
import {leveldb} from './base/database';
import {getDbFileSize, getMemoryUsage} from './base/functions';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {Edge} from "./primary-ds/edge/edge.commons";
import {existsSync} from "fs"
// import { UpdateService } from './data-services/UpdateService';

export const PK_DEFAULT_CONFIG_PROJECT = 375669;
export const PK_ENGLISH = 18889;

const BEFORE_INIT_DATE_KEY = 'DateBeforeInit';

interface NotificationHandler {
    channel: string
    listeners: {
        listenerName: string,
        callback(date: Date): Promise<void>
    }[]

}

export class Warehouse {

    metadata = subleveldown<string, any>(leveldb, 'metadata', {valueEncoding: 'json'})

    pgPool: Pool;
    pgClient: PoolClient;

    // Indexes holding data given by db
    prim: PrimaryDataServices;

    // Indexed holding resulting data deferred by warehouse
    agg: AggregatedDataServices;

    // Indexes holding dependencies between primary and secondary data
    dep: DependencyDataServices

    // updateService: UpdateService

    initializingIndexes = false

    status: 'stopped' | 'initializing' | 'starting' | 'running' = 'stopped'

    notificationHandlers: {[key: string]: NotificationHandler} = {}

    pgConnected$ = new ReplaySubject<PoolClient>()
    createSchema$ = new Subject<void>()

    constructor() {
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
     * Initalize warehouse service
     */
    async init() {

        this.status = 'initializing';
        const t0 = Logger.start('Initialize Warehouse', 0)

        await this.connectPgClient();

        await this.clearWhDB()

        await this.initIndexSchema()

        await this.saveDateBeforeInit();

        await this.initIndexData();

        await this.agg.startCycling()

        // backup leveldb folder

        Logger.itTook(t0, 'to initialize', 0)

        Logger.log(`The warehouse uses approximately ${getMemoryUsage()} MB of memory`);
        const diskUsage = await getDbFileSize()
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

        // get backup and date before last update1

        await this.initIndexSchema()

        this.startListening()


        const {tmsp} = await this.metadata.get(BEFORE_INIT_DATE_KEY);
        Logger.msg(`Catch up since ${tmsp}`)
        if (!tmsp) throw new Error('Can not listen() before initialized. Run init() first.')
        for (const primDS of this.prim.registered) {
            await primDS.startAndSyncSince(new Date(tmsp))
        }

        this.status = 'running';

        Logger.itTook(t0, 'to start listening. Warehouse is up and running', 0)
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
    async initIndexData() {
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


    private async saveDateBeforeInit() {
        const dbNow = await this.pgClient.query('SELECT now() as now');
        const tmsp = dbNow.rows?.[0]?.now;
        await this.metadata.put(BEFORE_INIT_DATE_KEY, {tmsp});
    }

    /**
     * Clears the warehouse database (= all indexes)
     */
    async clearWhDB() {
        const t1 = Logger.start('Clear Warehouse DB', 0)

        await this.prim.clearAll()

        await this.agg.clearAll()

        await this.dep.clearAll()


        await leveldb.del(BEFORE_INIT_DATE_KEY)

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
                        process.exit(1)
                    }
                    // A: YES
                    handler.listeners.map(l => {
                        l.callback(date).catch(e => console.log(e))
                    })

                    // A: NO
                    // exit the process, so that listen() is called again.
                }
            } else {
                console.error('payload of notification must be a string convertable to date')
            }
        });
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

