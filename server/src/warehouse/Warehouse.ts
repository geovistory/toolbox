/* eslint-disable @typescript-eslint/no-explicit-any */
import {Inject, Injectable, InjectionToken, Injector, Type} from 'injection-js';
import {Notification, Pool, PoolClient} from 'pg';
import {values} from 'ramda';
import {combineLatest, ReplaySubject, Subject} from 'rxjs';
import {filter, first, mapTo} from 'rxjs/operators';
import {getPgSslForPg8} from '../utils/databaseUrl';
import {AggregatedDataService2} from './base/classes/AggregatedDataService2';
import {IndexDBGeneric} from './base/classes/IndexDBGeneric';
import {Logger} from './base/classes/Logger';
import {PrimaryDataService} from './base/classes/PrimaryDataService';
export const PK_DEFAULT_CONFIG_PROJECT = 375669;
export const PK_ENGLISH = 18889;
export const APP_CONFIG = new InjectionToken<WarehouseConfig>('app.config');
export const PRIMARY_DS = new InjectionToken<Type<any>[]>('primaryDs');
export const AGG_DS = new InjectionToken<Type<any>[]>('aggDs');
export const LAST_UPDATE_DONE_SUFFIX = '__last_update_done'
export const CHANGES_CONSIDERED_UNTIL_SUFFIX = '__changes_considered_until'

interface NotificationHandler {
    channel: string
    listeners: {
        [listenerName: string]: Subject<Date>,
    }
}

export interface WarehouseConfig {
    geovistoryDatabase: string,
    warehouseSchema: string,
}
// used for consideredUpdatesUntil and leftDSupdateDone
export interface LeftDSDates {[DsName: string]: string}

@Injectable()
export class Warehouse {

    pgPool: Pool;
    pgListener: PoolClient;


    // if true, changes on dependencies are not propagated to aggregators
    preventPropagation = false

    status: 'stopped' | 'initializing' | 'starting' | 'running' | 'backuping' = 'stopped'

    notificationHandlers: {[key: string]: NotificationHandler} = {}

    pgListenerConnected$ = new ReplaySubject<PoolClient>()
    pgNotifications$ = new Subject<Notification>()
    createSchema$ = new Subject<void>()
    schemaName = 'war_cache'
    metaTimestamps: IndexDBGeneric<string, {tmsp: string}>;
    aggregationTimestamps: IndexDBGeneric<string, LeftDSDates>;


    constructor(
        @Inject(APP_CONFIG) private config: WarehouseConfig,
        @Inject(PRIMARY_DS) private primaryDs: Type<any>[],
        @Inject(AGG_DS) private aggDs: Type<any>[],
        private injector: Injector
    ) {
        this.schemaName = config.warehouseSchema;

        const connectionString = config.geovistoryDatabase;
        const ssl = getPgSslForPg8(connectionString)
        this.pgPool = new Pool({
            max: 15,
            connectionString,
            ssl
        });

        Logger.msg(this.constructor.name, `create warehouse for DB: ${connectionString.split('@')[1]}`)

    }

    /**
     * start warehouse
     */
    async start() {

        this.initDataServices();


        await this.dbSetup();
        const isInitialized = await this.primInitialized()

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

        await this.connectPgListener();

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




        const t0 = Logger.start(this.constructor.name, 'Create Warehouse data', 0)

        this.preventPropagation = true
        await this.createPrimaryData();
        await this.createAggregatedData()
        this.preventPropagation = false

        await this.createAggregatedData()

        clearInterval(interval1)

        await this.pgNotify('warehouse_initializing', 'false')

        Logger.msg(this.constructor.name, `************ Warehouse Index Created ***************`, 0)
        Logger.msg(this.constructor.name, `The max memory usage was: ${Math.round(maxMemoryUsage / 1024 / 1024 * 100) / 100} MB of memory`, 0)
        Logger.itTook(this.constructor.name, t0, 'to create warehouse data', 0)
        Logger.msg(this.constructor.name, `****************************************************`, 0)

    };



    /**
     * Starts listening
     */
    async listen() {
        this.initDataServices()

        const t0 = Logger.start(this.constructor.name, 'Start listening Warehouse', 0)

        this.status = 'starting';

        this.startListening()

        await this.catchUp();

        this.status = 'running';

        Logger.itTook(this.constructor.name, t0, 'to start listening. Warehouse is up and running', 0)
    }

    private initDataServices() {
        this.getPrimaryDs();
        this.getAggregatedDs();

    }

    /**
     * returns true if all primary data services have a valid
     * date of a successfull update-done
     */
    async primInitialized(): Promise<boolean> {
        const prim = this.getPrimaryDs()
        const doneDates = await Promise.all(prim.map(ds => ds.getLastUpdateBegin()))
        if (doneDates.includes(undefined)) return false
        return true
    }

    async primInitAll() {
        const prim = this.getPrimaryDs()
        for (const ds of prim) {
            await ds.initIdx()
        }
    }
    /**
     * Deletes local and remote leveldb
     */
    async hardReset(errorMsg: string) {
        // delete the warehouse schema
        await this.pgPool.query(`DROP SCHEMA IF EXISTS ${this.schemaName}`)
        // terminate process
        throw new Error(errorMsg)
    }

    /**
     * Call this function to make the warehouse catching up with latest changes.
     *
     * Detects changes made on GvDB in the time from this.backupCatchUpDate
     * until now.
     */
    private async catchUp() {
        const prim = this.getPrimaryDs()
        for (const primDS of prim) {
            await primDS.catchUp();
        }

        const agg = this.getAggregatedDs()
        for (const aggDS of agg) {
            await aggDS.startUpdate();
        }

    }

    /**
     * gets earliest date of latest valid udate cycle of
     * the primary data services
     */
    private async getCatchUpDate() {
        const prim = this.getPrimaryDs()
        const dates: Date[] = []

        for (const p of prim) {
            const d = await p.getLastUpdateBegin()
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
        await this.pgPool.query(`CREATE SCHEMA IF NOT EXISTS ${this.schemaName}`)
        await this.pgPool.query(`
        CREATE OR REPLACE FUNCTION ${this.schemaName}.tmsp_last_modification()
                RETURNS trigger
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE NOT LEAKPROOF
            AS $BODY$
            BEGIN NEW.tmsp_last_modification = clock_timestamp();
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
        this.aggregationTimestamps = new IndexDBGeneric(
            (key: string) => key,
            (str: string) => str,
            this.constructor.name + '_aggregation_timestamps',
            this
        )

        // const aggInitialized$ = combineLatest(
        //     this.getAggregatedDs().map(ds => ds.ready$.pipe(filter(r => r === true))),
        // ).pipe(mapTo(true))


        const primReady$ = combineLatest(
            this.getPrimaryDs().map(ds => ds.index.ready$.pipe(filter(r => r === true)))
        ).pipe(mapTo(true))

        this.createSchema$.next()
        return new Promise((res, rej) => {
            combineLatest(
                primReady$.pipe(filter(r => r === true)),
                // aggInitialized$.pipe(filter(r => r === true)),
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

        const t1 = Logger.start(this.constructor.name, 'Initialize Primary Data Services', 0)

        await this.primInitAll()

        Logger.itTook(this.constructor.name, t1, 'to initialize Primary Data Services', 0)
    }
    /**
     * Initialize the indexes of the secondary data services
     */
    private async createAggregatedData() {
        const t1 = Logger.start(this.constructor.name, 'Initialize Aggregated Data Services', 0)
        for (const ds of this.getAggregatedDs()) {
            await ds.startUpdate()
        }
        Logger.itTook(this.constructor.name, t1, 'to Initialize Aggregated Data Services', 0)
    }

    private getAggregatedDs(): AggregatedDataService2<any, any>[] {
        return this.aggDs.map(klass => this.injector.get(klass));
    }
    private getPrimaryDs(): PrimaryDataService<any, any>[] {
        return this.primaryDs.map(klass => this.injector.get(klass));
    }

    // /**
    //  * checks out a new postgres client from the pool and nexts the pgConnected$
    //  * observable that allows classes aware of this warehouse to wait for the
    //  * connection before executing postgres queries.
    //  */
    public async connectPgListener() {

        this.pgListener = await this.pgPool.connect();
        this.pgListenerConnected$.next(this.pgListener)
        this.pgListener.on('notification', (msg) => {
            this.pgNotifications$.next(msg)
        })
    }


    private async getInitBackupDate(): Promise<Date> {
        const dbNow = await this.pgPool.query('SELECT now() as now');
        const tmsp: string = dbNow.rows?.[0]?.now;
        return new Date(tmsp)
    }



    /**
     * returns now() tmsp from postgres as toISOString
     */
    async pgNow() {
        const date = await this.pgNowDate()
        return date.toISOString()
    }
    /**
     * returns now() tmsp from postgres as Date
     */
    async pgNowDate() {
        const res = await this.pgPool.query<{now: Date}>('select now()')
        return res.rows[0].now
    }



    /**
     * Registers a postgres db listener and add a notification handler
     * @param channel
     * @param callback
     * @param name for debugging
     */
    async registerDbListener(channel: string, emitter: Subject<Date>, listenerName: string) {
        await this.pgListener.query(`LISTEN ${channel}`)
        this.notificationHandlers[channel] = {
            channel,
            listeners: {
                ...(this.notificationHandlers?.[channel]?.listeners ?? {}),
                [listenerName]: emitter
            }
        }
    }

    /**
     * starts listening to notifications from postgres
     * and calls callback of notification handler, if available for the channel
     */
    startListening() {

        this.pgNotifications$.subscribe((msg) => {
            const handler = this.notificationHandlers[msg.channel];

            if (typeof msg.payload === 'string') {
                const date = new Date(msg.payload);
                if (isNaN(date.getTime())) console.error(`Invalid Timestamp provided by pg_notify channel ${msg.channel}`, msg.payload)
                else if (handler) {

                    values(handler.listeners).map(emitter => {
                        emitter.next(date)
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
            const prim = this.getPrimaryDs()
            const syncStatuses$ = prim.map(p => p.syncing$)
            combineLatest(syncStatuses$)
                // wait until no sync status is true
                .pipe(first(syncStatuses => syncStatuses.includes(true) === false))
                // resolve the promise
                .subscribe(() => res())
        })
    }




    pgNotify(channel: string, value: string) {
        return this.pgPool.query(`SELECT pg_notify($1, $2)`, [channel, value])
    }


    /**
     * stops the warehouse
     */
    async stop() {
        this.status = 'stopped';
        this.notificationHandlers = {}
        this.pgListener.release();
        await this.pgPool.end();
    }
}

