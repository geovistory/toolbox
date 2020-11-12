import {BehaviorSubject, Subject} from 'rxjs';
import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {ClearAll} from './ClearAll';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DataService} from './DataService';
import {IndexDBGeneric} from './IndexDBGeneric';
import {Logger} from './Logger';
import {skipWhileFirst} from '../functions';
import {tap} from 'rxjs/operators';

export abstract class PrimaryDataService<KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> implements ClearAll {

    // number of iterations before measurin time an memory
    abstract measure: number;

    // True if sync() is running
    syncing$ = new BehaviorSubject(false);

    // True if running sync() should restart right after finishing
    restartSyncing = false;

    index: DataIndexPostgres<KeyModel, ValueModel>

    // a meta index where each primary data service can store its catchup date
    meta: IndexDBGeneric<string, string>

    constructor(
        public wh: Warehouse,
        private listenTo: string[],
        public keyToString: (key: KeyModel) => string,
        public stringToKey: (str: string) => KeyModel,
        private keyDefs: KeyDefinition[]
    ) {
        super()
        this.index = new DataIndexPostgres(
            this.keyDefs,
            keyToString,
            stringToKey,
            'prim_' + this.constructor.name.replace('Service', ''),
            wh
        )
        this.meta = new IndexDBGeneric(
            (key: string) => key,
            (str: string) => str,
            this.constructor.name + '_meta',
            wh
        )


    }

    /**
     * init idx
     */
    async initIdx() {
        await this.clearAll()

        await this.addPgListeners()

        const dbNow = await this.wh.pgClient.query('SELECT now() as now');

        await this.sync(new Date(dbNow.rows?.[0]?.now))

    }

    /**
     * start listening
     * @param date Will look for changes since date.
     */
    async startAndSyncSince(lastUpdateBegin: Date) {
        await this.addPgListeners()

        await this.setLastUpdateBegin(lastUpdateBegin)

        await this.sync(lastUpdateBegin)
    }


    async catchUp() {

        const lastUpdateDone = await this.getLastUpdateDone()
        if (lastUpdateDone) {
            Logger.msg(`${this.constructor.name} > Catch up changes since ${lastUpdateDone}`);
            await this.startAndSyncSince(lastUpdateDone)
        }
        else {
            Logger.msg(`WARNING: ${this.constructor.name} > no lastUpdateDone date found for catchUp()!`)
            await this.initIdx()
        }
    }

    async clearAll() {
        await Promise.all([this.index.clearIdx(), this.meta.clearIdx()])
    }

    /**
     * Adds the postgres listener
     * @param listenTo
     */
    private async addPgListeners() {
        const sync$ = new Subject<Date>()
        sync$.pipe(
            skipWhileFirst(80)
        ).subscribe(tmsp => {
            this.sync(tmsp).catch(e => console.log(e))
        })
        for (const eventName of this.listenTo) {
            await this.wh.registerDbListener(
                eventName,
                sync$,
                this.constructor.name
            )
        }
    }

    /**
     *
     * @param tmsp the timestamp of oldest modification considered for syncing
     */
    async sync(tmsp: Date) {

        // if (this.constructor.name === 'PEntityService') {
        //     const d = new Date()
        //     console.log('######', `${tmsp.toISOString()}, ${d.toISOString()},${d.getMilliseconds()}`)
        // }

        // If syncing is true, it sets restartSyncing to true and stops the function here
        if (this.syncing$.value) {
            this.restartSyncing = true
            return;
        }

        // Else sets syncing to true and restartSyncing to false
        this.syncing$.next(true);
        this.restartSyncing = false;

        // throttle sync process for 10 ms
        // await new Promise((res, rej) => { setTimeout(() => { res() }, 10) })
        const lastUpdateBegin = await this.getLastUpdateBegin()
        const t1 = Logger.start(`${this.constructor.name} > manageUpdatesSince ${lastUpdateBegin}`, 1);

        // Look for updates since the date of lastUpdateBegin or 1970
        const calls = [
            this.manageUpdatesSince(lastUpdateBegin)
        ]

        // Look for deletes if
        // - there is a deleteSql and
        // - this data service has ever been synced

        if (lastUpdateBegin) {
            const deleteSql = this.getDeletesSql(lastUpdateBegin)
            if (deleteSql !== '') calls.push(this.manageDeletesSince(lastUpdateBegin, deleteSql))
        }

        // set lastUpdateBegin to timestamp that was used to run this sync
        // process.
        await this.setLastUpdateBegin(tmsp)

        // await the calls produced above
        const [updates, deletes] = await Promise.all(calls);
        Logger.itTook(t1, `to manage ${updates} updates and ${deletes ?? 0} deletes by ${this.constructor.name}`, 1);

        this.syncing$.next(false)
        if (this.restartSyncing) await this.sync(tmsp);

        await this.setLastUpdateDone(tmsp)

    }

    /**
     * Executes SQL query to GvDB to get all items that have been inserted or updated since date.
     *
     * The type of a row in the query result must be InitItem.
     *
     * Since query result can be huge, results are streamed (using pg-query-stream).
     *
     *  On each streamed item, the function calls putInitItem(item)
     *
     * @param date
     */
    private async manageUpdatesSince(date: Date = new Date(0)) {

        const t2 = Logger.start(`Start update query  ...`, 2);

        const updateSql = this.getUpdatesSql(date)
        const inserted = await this.wh.pgClient.query(
            `
                WITH tw1 AS (
                    ${updateSql}
                )
                ${this.get2ndUpdatesSql ?
                `,
                tw2 AS (${this.get2ndUpdatesSql('tw1', date)})`
                : ''}
                INSERT INTO  ${this.index.schema}.${this.index.table}
                    (${this.index.keyCols}, val)
                SELECT ${this.index.keyCols}, tw1.val
                FROM tw1
                ON CONFLICT (${this.index.keyCols}) DO UPDATE
                SET val = EXCLUDED.val
                WHERE  ${this.index.schema}.${this.index.table}.val <> EXCLUDED.val
                RETURNING *
                `,
            [date]
        );
        if (inserted.rows.length) {
            this.afterChange$.next()
        }
        Logger.itTook(t2, `to update query`, 2);
        return inserted.rows.length

    }

    /**
     * Executes SQL query to GvDB to get all items that have been deleted since date.
     *
     * The type of a row in the query result must be KeyModel.
     *
     * Since query result can be huge, results are streamed (using pg-query-stream).
     *
     * On each streamed key, the function calls delItem(key)
     * @param date
     */
    private async manageDeletesSince(date: Date, deleteSql: string) {
        const t2 = Logger.start(`Start deletes query  ...`, 2);

        const deleted = await this.wh.pgClient.query(
            `
                WITH tw1 AS (
                    ${deleteSql}
                )
                ${this.get2ndDeleteSql ? `,
                    tw2 AS (${this.get2ndDeleteSql('tw1', date)})`
                : ''}
                UPDATE  ${this.index.schema}.${this.index.table} t1
                SET tmsp_deleted = now()
                FROM tw1
                WHERE
                    ${this.index.keyDefs
                .map(k => `t1."${k.name}" = tw1."${k.name}"`)
                .join(' AND ')}
                RETURNING tw1.*
            `,
            [date]
        );
        if (deleted.rows.length) {
            this.afterChange$.next()
        }
        Logger.itTook(t2, `To mark items as deleted  ...`, 2);
        return deleted.rows.length

    }

    // sql statement used to query updates for the index
    abstract getUpdatesSql(tmsp: Date): string;

    // sql statement used to do anything with the update sql
    get2ndUpdatesSql?(updateSqlAlias: string, tmsp: Date): string;

    // sql statement used to query deletes for the index
    // if the warehouse does not need to consider deletets, set this to null
    abstract getDeletesSql(tmsp: Date): string;

    // sql statement used to do anything with the delete sql
    get2ndDeleteSql?(deleteSqlAlias: string, tmsp: Date): string;

    // The following 4 function are for:
    // Storing date and time of the last time the function sync() was called,
    // marking the begin of the sync() process, which can be considerably earlier
    // than its end. It is null until sync() is called the first time.

    async setLastUpdateBegin(date: Date) {
        await this.meta.addToIdx('lastUpdateBegin', date.toISOString())
    }
    async getLastUpdateBegin(): Promise<Date | undefined> {
        const isoDate = await this.meta.getFromIdx('lastUpdateBegin')
        return isoDate ? new Date(isoDate) : undefined
    }
    async setLastUpdateDone(date: Date) {
        await this.meta.addToIdx('lastUpdateDone', date.toISOString())
    }
    async getLastUpdateDone(): Promise<Date | undefined> {
        const isoDate = await this.meta.getFromIdx('lastUpdateDone')
        return isoDate ? new Date(isoDate) : undefined
    }
}
