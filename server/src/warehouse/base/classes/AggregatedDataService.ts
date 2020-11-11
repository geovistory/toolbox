import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {AbstractAggregator} from './AbstractAggregator';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DataService} from './DataService';
import {DependencyIndex} from './DependencyIndex';
import {Dependencies} from './Dependencies';
import {Providers} from '../interfaces/Providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export abstract class AggregatedDataService<KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> {

    // updater: Updater<KeyModel, Aggregator>

    index: DataIndexPostgres<KeyModel, ValueModel>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract creatorDS: DataService<KeyModel, any>
    abstract getDependencies(): Dependencies
    abstract aggregator: Constructor<AbstractAggregator<ValueModel>>
    abstract providers: Constructor<Providers<KeyModel>>
    // array of dependency indexes where this data service is receiver
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isReceiverOf: DependencyIndex<KeyModel, ValueModel, any, any>[] = []


    afterChangeSql?(updateSqlAlias: string): string;

    // true during running update cycle
    updating = false;
    shouldUpdate = false;

    deleting = false;
    shouldDelete = false;

    tempTableName: string;
    tempTable: string;

    constructor(
        public wh: Warehouse,
        public keyToString: (key: KeyModel) => string,
        public stringToKey: (str: string) => KeyModel,
        private keyDefs: KeyDefinition[]
    ) {
        super()
        const tableName = 'agg_' + this.constructor.name
        this.index = new DataIndexPostgres(
            this.keyDefs,
            keyToString,
            stringToKey,
            tableName,
            wh
        )
        this.tempTableName = tableName + '_tmp'
        this.tempTable = `${this.index.schema}.${this.tempTableName}`
    }

    async aggregate(id: KeyModel) {
        const providers = new this.providers(this.getDependencies(), id)
        return new this.aggregator(providers, id).create()
    }


    async doUpdate(currentTimestamp: string) {
        this.shouldUpdate = true

        if (!this.updating) await this.update(currentTimestamp)
    }

    private async update(currentTimestamp: string) {
        this.updating = true
        this.shouldUpdate = false

        // get the 'changesConsideredUntil'-timestamp
        const changesConsideredUntil = await this.getChangesConsideredUntilTsmp()

        /**
         * Handle deletes
         */

        // select items to be marked as deleted
        // - items of the creatorDS
        //   that have a tmsp_deleted greater than 'changesConsideredUntil' and
        //      less or equal than 'currentTimestamp'
        //      (these items are the 'newDeletes')

        // and mark items as deleted
        // – items of this AggregatedDS
        //   that have the same keyModel as the 'newDeletes', setting tmsp_deleted='currentTimestamp'
        //    (don't delete them yet, because they may be providers of other aggregators)
        //    this operation happens directly on Postgres (within one query)

        // if this AggregatedDS feeds a table on the main GV-Database,
        // delete the items there (this may happen async)


        /**
         * Handle upserts
         */
        // find what to aggregate (store it in temp table)
        await this.createTempTable(changesConsideredUntil, currentTimestamp);

        // aggregate
        const changes = await this.aggregateAll(currentTimestamp)


        // cleanup old dependencies
        // delete dependencies where receivers are in temp table
        // and tmsp_last_aggregation less than 'currentTimestamp'


        // update meta tsmp
        // - update the 'changesConsideredUntil': set to 'currentTimestamp'

        if (this.shouldUpdate) {
            await this.startUpdate();
        }
        // finalize
        this.updating = false;


        // - emit this.afterUpdate$ if anything has changed
        if (changes > 0) this.afterChange$.next()
    }

    async aggregateAll(currentTimestamp: string) {
        let changes = 0
        const toAggregate = await this.wh.pgClient.query<KeyModel>(`SELECT * From ${this.tempTable}`)
        if (toAggregate.rows.length > 0) {
            let valuesStr = ''
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const aggParams: any[] = [], addParam = (val: any) => {
                aggParams.push(val)
                return '$' + aggParams.length
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const addParams = (vals: any[]) => {
                return vals.map((val) => addParam(val)).join(',');
            }
            let i = 0;
            for (const key of toAggregate.rows) {
                i++;
                const val = await this.aggregate(key)
                const sql = `(${addParams([...this.index.getKeyModelValues(key), val])})${i < toAggregate.rows.length ? ',' : ''}`
                valuesStr = valuesStr + sql;
            }
            // insert or update the results of the aggregation
            const aggSql = `
            INSERT INTO ${this.index.schemaTable} (${this.index.keyCols},val)
            VALUES ${valuesStr}
            ON CONFLICT (${this.index.keyCols})
            DO UPDATE
            SET val = EXCLUDED.val
            WHERE EXCLUDED.val IS DISTINCT FROM ${this.index.schemaTable}.val
            RETURNING *
        `
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const depSqls: {sql: string; params: any[];}[] = []
            // get the dependency sqls
            this.isProviderOf.forEach(dep => {
                const depSql = dep.getSqlForStoringCache(currentTimestamp)
                if (depSql) depSqls.push(depSql)
            })
            // create the full query
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any[] = []
            const parts = [{sql: aggSql, params: aggParams}, ...depSqls];
            const sql = `
            WITH
            ${parts.map((part, j) => {
                params.push(...part?.params)
                return `
            tw${j} AS (
                ${part?.sql}
            )`}).join(',')}
            ${this.afterChangeSql ? `
            , afterChange AS (
                ${this.afterChangeSql('tw0')}
            )` : ''}
            SELECT count(*) changes FROM tw0;
        `
            const result = await this.wh.pgClient.query<{changes: number}>(sql, params)
            changes = result.rows?.[0].changes ?? 0
        }
        return changes
    }

    /**
     * Creates a table with the items that need to be (re-)aggregated
     * - items of the creatorDS that have been modified since last update and not deleted until current timestamp
     *   that have a tmsp_last_modification greater than 'changesConsideredUntil'
     *      and less or equal than the 'currentTimestamp'
     *   and that have a tmsp_deleted that is null or greater than 'currentTimestamp'
     *
     * - items that have a provider (through dependency) that has been updated or deleted since last update
     *   that have a tmsp_last_modification greater than 'changesConsideredUntil'
     *      and less or equal than the 'currentTimestamp'
     *   or that have a tmsp_deleted greater than 'changesConsideredUntil'
     *      and less or equal than 'currentTimestamp'
     * @param changesConsideredUntil
     * @param currentTimestamp
     */
    private async createTempTable(changesConsideredUntil: string, currentTimestamp: string) {
        if (this.creatorDS) {
            await this.wh.pgClient.query(`DROP TABLE IF EXISTS ${this.tempTable}`);
            const creatorIdx = this.creatorDS.index;
            const sql1 = `
            CREATE TABLE ${this.tempTable} AS
            SELECT ${creatorIdx.keyCols}
            FROM ${creatorIdx.schema}.${creatorIdx.table}
            WHERE tmsp_last_modification > '${changesConsideredUntil}'
            AND tmsp_last_modification <= '${currentTimestamp}'
            AND (tmsp_deleted IS NULL OR tmsp_deleted > '${currentTimestamp}')
            `;

            const sql2 = this.isReceiverOf.map(depDS => {
                return `
                UNION
                SELECT  ${depDS.receiverKeyDefs.map(k => `t1."${k.name}"`).join(',')}
                FROM    ${depDS.schema}.${depDS.table} t1,
                        ${depDS.providerDS.index.schema}.${depDS.providerDS.index.table} t2
                WHERE   ${depDS.providerDS.index.keyDefs
                        .map(k => `t2."${k.name}" = t1."p_${k.name}"`).join(' AND ')}
                AND (
                        (
                            t2.tmsp_last_modification > '${changesConsideredUntil}'
                            AND
                            t2.tmsp_last_modification <= '${currentTimestamp}'
                        )
                        OR
                        (
                            t2.tmsp_deleted > '${changesConsideredUntil}'
                            AND
                            t2.tmsp_deleted <= '${currentTimestamp}'
                        )
                    )
            `;
            }).join('\n');
            await this.wh.pgClient.query(sql1 + sql2);
        }
    }

    /**
     * returns tmsp of last changes considered by this aggregator service
     * If not existing, returns a very early tmsp (year 1970) so that we
     * can assume that all changes after 1970 will be considered
     */
    private async getChangesConsideredUntilTsmp() {
        const val = await this.wh.metaTimestamps.getFromIdx(this.constructor.name + '__changes_considered_until');
        return val?.tmsp ?? new Date(0).toISOString()
    }
    private async setChangesConsideredUntilTsmp(tmsp: string) {
        await this.wh.metaTimestamps.addToIdx(this.constructor.name + '__changes_considered_until', {tmsp});
    }

    async startUpdate() {
        const tmsp = await this.wh.pgNow();
        await this.doUpdate(tmsp);
    }

    /**
     * registers the DataService that contains the items for each of them
     * an aggregation should happen
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerCreatorDS<DS extends DataService<KeyModel, any>>(creatorDS: DS) {
        this.creatorDS = creatorDS;
        creatorDS.registerIsCreatorOf(this)
    }
    /**
     * Adds dep to this.isReceiverOf with the effect that this DataService acts
     * as the receiver of data for dep.
     * @param dep
     */
    registerReceiverOf<ProviderKeyModel, ProviderValModel>(dep: DependencyIndex<KeyModel, ValueModel, ProviderKeyModel, ProviderValModel>) {
        this.isReceiverOf.push(dep)
    }

    async clearAll() {
        // await Promise.all([this.index.clearIdx(), this.updater.clearIdx()])
    }

    async initIdx() {
        // await Promise.all([this.index.clearIdx(), this.updater.clearIdx()])
    }

}



