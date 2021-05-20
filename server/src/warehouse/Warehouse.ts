/* eslint-disable @typescript-eslint/no-explicit-any */
import {Inject, Injectable, InjectionToken, Injector, Type, forwardRef} from 'injection-js';
import {Notification, Pool, PoolClient, PoolConfig} from 'pg';
import {values} from 'ramda';
import {combineLatest, ReplaySubject, Subject} from 'rxjs';
import {filter, first, mapTo} from 'rxjs/operators';
import {parse} from 'pg-connection-string';

import {getPgSslForPg8, createPoolConfig} from '../utils/databaseUrl';
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
    warehouseDatabase: string,
    warehouseDatabaseMaxConnections: number,
    geovistoryDatabase: string,
    geovistoryDatabaseMaxConnections: number,
    warehouseSchema: string,
}
// used for consideredUpdatesUntil and leftDSupdateDone
export interface LeftDSDates {[DsName: string]: string}

@Injectable()
export class Warehouse {


    // Geovistory postgres
    gvPgPool: Pool;
    gvPgListener: PoolClient;
    gvPgListenerConnected$ = new ReplaySubject<PoolClient>()
    gvPgNotifications$ = new Subject<Notification>()


    // Warehouse postgres
    whPgPool: Pool;
    createSchema$ = new Subject<void>()
    schemaName: string;
    metaTimestamps: IndexDBGeneric<string, {tmsp: string}>;
    aggregationTimestamps: IndexDBGeneric<string, LeftDSDates>;

    // Warehosue inner logic
    notificationHandlers: {[key: string]: NotificationHandler} = {}
    // if true, changes on dependencies are not propagated to aggregators
    preventPropagation = false
    status: 'stopped' | 'initializing' | 'starting' | 'running' | 'backuping'

    constructor(
        @Inject(APP_CONFIG) config: WarehouseConfig,
        @Inject(PRIMARY_DS) private primaryDs: Type<any>[],
        @Inject(AGG_DS) private aggDs: Type<any>[],
        @Inject(forwardRef(() => Injector)) private injector: Injector
    ) {
        this.schemaName = config.warehouseSchema;


        const whPgConfig = createPoolConfig(config.warehouseDatabase, config.warehouseDatabaseMaxConnections)
        this.whPgPool = new Pool(whPgConfig);
        Logger.msg(this.constructor.name, `warehouse DB: ${config.warehouseDatabase.split('@')[1]}`)
        Logger.msg(this.constructor.name, `warehouse DB max connections: ${config.warehouseDatabaseMaxConnections}`)


        const gvPgUrl = config.geovistoryDatabase;
        Logger.msg(this.constructor.name, `geovistory DB: ${gvPgUrl.split('@')[1]}`)
        const gvPgConfig = parse(config.geovistoryDatabase) as PoolConfig
        gvPgConfig.max = config.geovistoryDatabaseMaxConnections
        gvPgConfig.ssl = getPgSslForPg8(gvPgUrl)
        this.gvPgPool = new Pool(gvPgConfig);
        Logger.msg(this.constructor.name, `geovistory DB max connections: ${config.geovistoryDatabaseMaxConnections}`)

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
            this.gvPgNotify('warehouse_initializing', 'true').catch(e => { })
        }, 1000)




        const t0 = Logger.start(this.constructor.name, 'Create Warehouse data', 0)

        this.preventPropagation = true
        await this.createPrimaryData();
        await this.createAggregatedData()
        this.preventPropagation = false

        await this.createAggregatedData()

        clearInterval(interval1)

        await this.gvPgNotify('warehouse_initializing', 'false')

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
        await this.whPgPool.query(`DROP SCHEMA IF EXISTS ${this.schemaName}`)
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
    private async initWhDbSchema(): Promise<void> {
        await this.whPgPool.query(`CREATE SCHEMA IF NOT EXISTS ${this.schemaName}`)
        await this.whPgPool.query(`
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


        // await this.initializeForeignDataWrappers();


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
     * Initialiue foreign data wrappers so that whDb sees
     * schemas of gvDB
     */
    private async initializeForeignDataWrappers() {
        const x = [
            `CREATE EXTENSION IF NOT EXISTS postgres_fdw;`,
            `CREATE EXTENSION IF NOT EXISTS postgis;`,

            `CREATE SERVER IF NOT EXISTS gv_database_server
            FOREIGN DATA WRAPPER postgres_fdw
            OPTIONS (host '0.0.0.0', dbname 'gv_test_db');`,

            `CREATE USER MAPPING  IF NOT EXISTS FOR CURRENT_USER
            SERVER gv_database_server
            OPTIONS (user 'postgres', password 'local_pw');`,

            `DROP SCHEMA IF EXISTS information CASCADE;`,
            `DROP SCHEMA IF EXISTS projects CASCADE;`,
            `DROP SCHEMA IF EXISTS data_for_history CASCADE;`,
            `DROP SCHEMA IF EXISTS commons CASCADE;`,
            `DROP SCHEMA IF EXISTS war CASCADE;`,

            `DROP TYPE IF EXISTS public.calendar_granularities;`,
            `CREATE TYPE public.calendar_granularities AS ENUM
                ('1 year', '1 month', '1 day', '1 hour', '1 minute', '1 second');`,

            `DROP TYPE IF EXISTS public.calendar_type;`,
            `CREATE TYPE public.calendar_type AS ENUM
                ('gregorian', 'julian');`,

            `CREATE SCHEMA information;`,
            `IMPORT FOREIGN SCHEMA information
            FROM SERVER gv_database_server
            INTO information;`,

            `CREATE SCHEMA projects;`,
            `IMPORT FOREIGN SCHEMA projects
            FROM SERVER gv_database_server
            INTO projects;`,

            `CREATE SCHEMA data_for_history;`,
            `IMPORT FOREIGN SCHEMA data_for_history
            FROM SERVER gv_database_server
            INTO data_for_history;`,

            `CREATE SCHEMA commons;`,
            `IMPORT FOREIGN SCHEMA commons
            FROM SERVER gv_database_server
            INTO commons;`,

            `CREATE OR REPLACE FUNCTION commons.time_primitive__get_first_second(
                julian_day integer)
                RETURNS bigint
                LANGUAGE 'sql'

                COST 100
                VOLATILE

              AS $BODY$
                 SELECT (julian_day::bigint * 86400::bigint) ; -- 86400 = 60 * 60 * 24 = number of seconds per day
                $BODY$;`,

            `CREATE OR REPLACE FUNCTION commons.time_primitive__get_last_second(
            julian_day integer,
            duration calendar_granularities,
            calendar calendar_type)
            RETURNS bigint
            LANGUAGE 'plpgsql'

            COST 100
            VOLATILE

            AS $BODY$
            DECLARE
            day_after_added_duration int;
            BEGIN

            IF(calendar IS NULL) THEN
            RAISE WARNING 'No calendar provided';
            IF(julian_day < 2299161) THEN
            calendar = 'julian';
            ELSE
            calendar = 'gregorian';
            END IF;
            END IF;

            IF(calendar = 'gregorian') THEN
            IF(duration = '1 day') THEN
            SELECT julian_day + 1 INTO day_after_added_duration;
            ELSIF(duration = '1 month') THEN
            SELECT to_char((('J' || julian_day::text)::DATE + INTERVAL '1 month'), 'J') INTO day_after_added_duration;
            ELSIF(duration = '1 year') THEN
            SELECT to_char((('J' || julian_day::text)::DATE + INTERVAL '1 year'), 'J') INTO day_after_added_duration;
            ELSE
            RAISE EXCEPTION 'duration not supported --> %', duration
            USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
            END IF;

            ELSIF (calendar = 'julian') THEN

            IF(duration = '1 day') THEN
            SELECT  julian_day + 1 INTO day_after_added_duration;
            ELSIF(duration = '1 month') THEN
            SELECT commons.julian_cal__add_1_month(julian_day) INTO day_after_added_duration;
            ELSIF(duration = '1 year') THEN
            SELECT commons.julian_cal__add_1_year(julian_day) INTO day_after_added_duration;
            ELSE
            RAISE EXCEPTION 'duration not supported --> %', duration
            USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
            END IF;

            ELSE
            RAISE EXCEPTION 'calendar not supported --> %', calendar
            USING HINT = 'Supported calendars: "gregorian", "julian"';
            END IF;

            -- calculate the first second of the day after the added duration and subtract one second
            -- so that we get the last second of the duration
            RETURN commons.time_primitive__get_first_second(day_after_added_duration) - 1;
            END;
            $BODY$;`,
            `CREATE SCHEMA war;`,
            `CREATE TYPE war.edge_target_type AS ENUM ('text', 'type');`,
            `IMPORT FOREIGN SCHEMA war
            FROM SERVER gv_database_server
            INTO war;`,
        ];

        for (const sql of x) {
            await this.whPgPool.query(sql);
        }
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

        this.gvPgListener = await this.gvPgPool.connect();
        this.gvPgListenerConnected$.next(this.gvPgListener)
        this.gvPgListener.on('notification', (msg) => {
            this.gvPgNotifications$.next(msg)
        })
    }


    private async getInitBackupDate(): Promise<Date> {
        const dbNow = await this.whPgPool.query('SELECT now() as now');
        const tmsp: string = dbNow.rows?.[0]?.now;
        return new Date(tmsp)
    }



    /**
     * returns now() tmsp from wh postgres as toISOString
     */
    async whPgNow() {
        const date = await this.whPgNowDate()
        return date.toISOString()
    }
    /**
     * returns now() tmsp from wh postgres as Date
     */
    async whPgNowDate() {
        const res = await this.whPgPool.query<{now: Date}>('select now()')
        return res.rows[0].now
    }


    /**
     * returns now() tmsp from gv postgres as toISOString
     */
    async gvPgNow() {
        const date = await this.gvPgNowDate()
        return date.toISOString()
    }
    /**
     * returns now() tmsp from gv postgres as Date
     */
    async gvPgNowDate() {
        const res = await this.gvPgPool.query<{now: Date}>('select now()')
        return res.rows[0].now
    }



    /**
     * Registers a postgres db listener and add a notification handler
     * @param channel
     * @param callback
     * @param name for debugging
     */
    async registerDbListener(channel: string, emitter: Subject<Date>, listenerName: string) {
        await this.gvPgListener.query(`LISTEN ${channel}`)
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

        this.gvPgNotifications$.subscribe((msg) => {
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
    async waitUntilSyncingDone(): Promise<void> {
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




    gvPgNotify(channel: string, value: string) {
        return this.gvPgPool.query(`SELECT pg_notify($1, $2)`, [channel, value])
    }


    /**
     * stops the warehouse
     */
    async stop() {
        this.status = 'stopped';
        this.notificationHandlers = {}
        this.gvPgListener.release();
        await this.whPgPool.end();
        await this.gvPgPool.end();
    }
}

