/* eslint-disable @typescript-eslint/no-explicit-any */
import {PoolClient} from 'pg';
import {sum} from 'ramda';
import {BehaviorSubject, Subject} from 'rxjs';
import {CHANGES_CONSIDERED_UNTIL_SUFFIX, Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {ClearAll} from './ClearAll';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DataService} from './DataService';
import {Logger} from './Logger';
import {DataReplicatorSqlFn, PgDataReplicator} from './PgDataReplicator';

export abstract class PrimaryDataService<KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> implements ClearAll {

    // number of iterations before measurin time an memory
    abstract measure: number;

    // True if sync() is running
    syncing$ = new BehaviorSubject(false);

    // True if running sync() should restart right after finishing
    restartSyncing = false;

    index: DataIndexPostgres<KeyModel, ValueModel>

    // List of data replication requests that can be executed by calling executeQueries()
    updateReplications: {
        targetTable: string,
        sqlFn: DataReplicatorSqlFn
    }[] = []

    constructor(
        public wh: Warehouse,
        private listenTo: string[],
        private keyDefs: KeyDefinition[]
    ) {
        super(wh)
        this.index = new DataIndexPostgres(
            this.keyDefs,
            'prim_' + this.constructor.name.replace('Service', ''),
            wh
        )

    }

    /**
     * init idx
     */
    async initIdx() {
        await this.clearAll()

        await this.addPgListeners()

        const dbNow = await this.wh.gvPgPool.query('SELECT now() as now');

        await this.sync(new Date(dbNow.rows?.[0]?.now))

    }

    /**
     * start listening
     * @param date Will look for changes since date.
     */
    async startAndSyncSince(lastUpdateBegin: Date) {
        await this.addPgListeners()

        await this.setChangesConsideredUntil(lastUpdateBegin)

        await this.sync(lastUpdateBegin)
    }


    async catchUp() {

        const lastUpdateBegin = await this.getChangesConsideredUntil()
        if (lastUpdateBegin) {
            Logger.msg(this.constructor.name, `Catch up changes since ${lastUpdateBegin}`);
            await this.startAndSyncSince(lastUpdateBegin)
        }
        else {
            Logger.msg(this.constructor.name, `WARNING: no lastUpdateBegin date found for catchUp()!`)
            await this.initIdx()
        }
    }

    async clearAll() {
        // await Promise.all([this.index.clearIdx(), this.meta.clearIdx()])
    }

    /**
     * Adds the postgres listener
     * @param listenTo
     */
    private async addPgListeners() {
        const sync$ = new Subject<Date>()
        sync$.pipe(
            // skipWhileFirst(80)
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
     * @param tmsp the timestamp sent by the notification of the original table
     */
    async sync(tmsp: Date): Promise<number> {
        let changes = 0

        // If syncing is true, it sets restartSyncing to true and stops the function here
        if (this.syncing$.value) {
            this.restartSyncing = true
            return changes;
        }

        // Else sets syncing to true and restartSyncing to false
        this.syncing$.next(true);
        this.restartSyncing = false;

        // throttle sync process for 10 ms
        // await new Promise((res, rej) => { setTimeout(() => { res() }, 10) })
        const changesConsideredUntil = await this.getChangesConsideredUntil()
        const t1 = Logger.start(this.constructor.name, `manageUpdatesSince ${changesConsideredUntil}`, 1);

        const c1 = await this.wh.gvPgPool.connect()
        const c2 = await this.wh.whPgPool.connect()
        let hasError = false;
        let updates = 0;
        let deletes = 0;

        try {

            await c1.query('BEGIN')
            await c2.query('BEGIN')

            // Look for updates since the date of lastUpdateBegin or 1970
            updates += await this.manageUpdatesSince(c1, c2, changesConsideredUntil)

            // Look for deletes if
            // - there is a deleteSql and
            // - this data service has ever been synced
            if (changesConsideredUntil) {
                const deleteSql = this.getDeletesSql(changesConsideredUntil)
                if (deleteSql !== '') deletes += await this.manageDeletesSince(c1, c2, changesConsideredUntil, deleteSql)
            }
            await c1.query('COMMIT')
            await c2.query('COMMIT')

        } catch (e) {
            hasError = true
            await c1.query('ROLLBACK')
            await c2.query('ROLLBACK')
            Logger.err(this.constructor.name, `ERROR in aggregation: ${e}`)
        } finally {
            c1.release()
            c2.release()
            Logger.msg(this.constructor.name, `pgPool client released`)
        }


        // set lastUpdateBegin to timestamp that was used to run this sync
        // process.
        if (!hasError) {
            await this.setChangesConsideredUntil(tmsp)
        }

        // await the calls produced above

        changes += updates + deletes;

        Logger.itTook(this.constructor.name, t1, `to manage ${updates} updates and ${deletes} deletes by ${this.constructor.name}`, 1);

        this.syncing$.next(false)
        if (this.restartSyncing) {
            changes += await this.sync(tmsp);
        }
        const now = await this.wh.whPgNowDate()
        await this.setLastUpdateDone(now)
        if (changes > 0) {
            this.afterChange$.next()
        }

        return changes

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
     async manageUpdatesSince(pool1: PoolClient, pool2: PoolClient, date: Date = new Date(0)) {

        const t2 = Logger.start(this.constructor.name, `Execute update query  ...`, 2);

        const tmpTable = `${this.constructor.name}_update_tmp`
        const updateSql = this.getUpdatesSql(date)

        await pool1.query(`CREATE TEMP TABLE ${tmpTable} ON COMMIT DROP AS ${updateSql}`, [date])
        const stats = await new PgDataReplicator<{count: number}>(
            {client: pool1, table: tmpTable},
            {client: pool2, table: this.index.schemaTable},
            [this.index.keyCols, 'val'],
            (insertClause, fromClause) => `
                WITH tw1 AS (
                    ${insertClause}
                    ${fromClause}
                    ON CONFLICT (${this.index.keyCols}) DO UPDATE
                    SET val = EXCLUDED.val
                    WHERE  ${this.index.schemaTable}.val <> EXCLUDED.val
                    RETURNING *
                )
                SELECT count(*)::int FROM tw1
            `
        ).replicateTable()
        const upserted = sum(stats.map(s => s.rows?.[0].count))

        Logger.itTook(this.constructor.name, t2, `to update Primary Data Service with ${upserted} new lines`, 2);

        if (this.updateReplications.length > 0) {
            const replicationRequest = this.updateReplications.map(repl => {
                return new PgDataReplicator<{count: number}>(
                    {client: pool1, table: tmpTable},
                    {client: pool1, table: repl.targetTable},
                    [this.index.keyCols, 'val'],
                    repl.sqlFn
                ).replicateTable()
            })
            await Promise.all(replicationRequest)
        }

        return upserted

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
    private async manageDeletesSince(pool1: PoolClient, pool2: PoolClient, date: Date, deleteSql: string) {
        const t2 = Logger.start(this.constructor.name, `Start deletes query  ...`, 2);

        const tmpTable = `${this.constructor.name}_delete_tmp`

        await pool1.query(`CREATE TEMP TABLE ${tmpTable} ON COMMIT DROP AS ${deleteSql}`, [date])
        const stats = await new PgDataReplicator<{count: number}>(
            {client: pool1, table: tmpTable},
            {client: pool2, table: this.index.schemaTable},
            [this.index.keyCols],
            (insertClause, fromClause) => `
                WITH tw2 AS (
                    UPDATE  ${this.index.schemaTable} t1
                    SET tmsp_deleted = now()
                    FROM (${fromClause}) t2
                    WHERE
                    ${this.index.keyDefs.map(k => `t1."${k.name}" = t2."${k.name}"`).join(' AND ')}
                    RETURNING t1.*
                )
                SELECT count(*)::int FROM tw2
            `
        ).replicateTable()
        const deleted = sum(stats.map(s => s.rows?.[0].count))


        Logger.itTook(this.constructor.name, t2, `To mark items as deleted  ...`, 2);
        return deleted

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

    async setChangesConsideredUntil(date: Date) {
        await this.wh.metaTimestamps.addToIdx(this.constructor.name + CHANGES_CONSIDERED_UNTIL_SUFFIX, {tmsp: date.toISOString()});
    }
    async getChangesConsideredUntil(): Promise<Date | undefined> {
        const val = await this.wh.metaTimestamps.getFromIdx(this.constructor.name + CHANGES_CONSIDERED_UNTIL_SUFFIX);
        const isoDate = val?.tmsp;
        return isoDate ? new Date(isoDate) : undefined
    }


    registerUpdateReplication(targetTable: string, sqlFn: DataReplicatorSqlFn) {
        this.updateReplications.push({targetTable, sqlFn})
    }

}
