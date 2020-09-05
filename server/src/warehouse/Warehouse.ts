/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pool, PoolClient} from 'pg';
import subleveldown from 'subleveldown';
import {getPgSslForPg8, getPgUrlForPg8} from '../utils/databaseUrl';
import {Logger} from './base/classes/Logger';
import {leveldb} from './base/database';
import {getDbFileSize, getMemoryUsage} from './base/functions';
import {AggregatedDataServices} from './ds-bundles/AggregatedDataServices';
import {DependencyDataServices} from './ds-bundles/DependencyDataServices';
import {PrimaryDataServices} from './ds-bundles/PrimaryDataServices';
import {Edge} from "./primary-ds/edge/edge.commons";

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

        this.pgClient = await this.pgPool.connect();

        await this.clearWhDB()

        await this.saveDateBeforeInit();

        await this.initIndexes();

        await this.agg.startCycling()

        Logger.itTook(t0, 'to initialize', 0)



        Logger.log(`The warehouse uses approximately ${getMemoryUsage()} MB of memory`);
        const diskUsage = await getDbFileSize()
        Logger.log(`The warehouse uses approximately ${diskUsage.readable} of disk space`)

        Logger.log('Example results')
        const l = await this.agg.pEntityLabel.index.getFromIdx({
            fkProject: 591,
            pkEntity: 741589
        })
        Logger.log(l?.entityLabel)
        // Logger.log(await this.agg.pEntityLabel.index.getFromIdx({
        //     fkProject: 591,
        //     pkEntity: 741570
        // }))
        // Logger.log(await this.agg.pClassLabel.index.getFromIdx({
        //     fkProject: 591,
        //     pkClass: 365
        // }))
        // const t3 = Logger.start('Wait', 0)

        // Logger.itTook(t3, 'to wait', 0)

        await this.stop()
    };

    private async saveDateBeforeInit() {
        const dbNow = await this.pgClient.query('SELECT now() as now');
        const tmsp = dbNow.rows?.[0]?.now;
        await this.metadata.put(BEFORE_INIT_DATE_KEY, {tmsp});
    }

    /**
     * Starts listening
     */
    async listen() {
        const t0 = Logger.start('Start listening Warehouse', 0)

        this.status = 'starting';

        this.pgClient = await this.pgPool.connect();

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
     * (re-)create all indexes
     */
    async initIndexes() {
        this.initializingIndexes = true
        const t1 = Logger.start('Initialize indexes', 0)

        await this.prim.initAllIndexes()

        Logger.itTook(t1, 'to initialize indexes', 0)
        this.initializingIndexes = false
    }


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
                else if (handler) handler.listeners.map(l => {
                    l.callback(date).catch(e => console.log(e))
                })
            } else {
                console.error('payload of notification must be a string convertable to date')
            }
        });
    }

    async stop() {
        this.status = 'stopped';
        this.notificationHandlers = {}
        this.pgClient.release();

    }
}




export interface FieldWithEdges {
    isOutgoing: boolean
    fkProperty: number
    edges: Edge[]
}
