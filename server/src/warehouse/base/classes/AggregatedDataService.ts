import {brkOnErr, logSql} from '../../../utils/helpers';
import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {Providers} from '../interfaces/Providers';
import {AbstractAggregator} from './AbstractAggregator';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DataService} from './DataService';
import {Dependencies} from './Dependencies';
import {DependencyIndex} from './DependencyIndex';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export abstract class AggregatedDataService<KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> {

    // updater: Updater<KeyModel, Aggregator>Ú

    index: DataIndexPostgres<KeyModel, ValueModel>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract creatorDS: DataService<any, any>
    abstract getDependencies(): Dependencies
    abstract aggregator: Constructor<AbstractAggregator<ValueModel>>
    abstract providers: Constructor<Providers<KeyModel>>
    // array of dependency indexes where this data service is receiver
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isReceiverOf: DependencyIndex<KeyModel, ValueModel, any, any>[] = []

    cycle = 0 //for debugging

    /**
     * This is a 'hook' to allow this data service to instantly upsert
     * into another table
     *
     * if this AggregatedDS inserts into /deletes from a table of the main
     * GV-Database, this deleteSqlAlias defines how to insert (or update) them.
     *
     * Remark: in some occations, an AggregatedDS updates a table of the main
     * GV-Database, but does not insert/delete it because the latter is done
     * by the CreatorDS.
     *
     * @param updateSqlAlias name of table/WITH-clause containing new records
     */
    onUpsertSql?(updateSqlAlias: string): string;
    /**
     * This is a 'hook' to allow this data service to instantly delete
     * from another table
     *
     * if this AggregatedDS inserts into /deletes from a table of the main
     * GV-Database, this deleteSqlAlias defines how to delete them.
     *
     * Remark: in some occations, an AggregatedDS updates a table of the main
     * GV-Database, but does not insert/delete it because the latter is done
     * by the CreatorDS.
     *
     * @param deleteSqlAlias name of table/WITH-clause containing delete records
     */
    onDeleteSql?(deleteSqlAlias: string): string;

    /**
     * If creatorDS and aggregatedDS have not the same KeyModel,
     * their column names do not (necessarily) match. In this case,
     * customCreatorDSSelect can provide the correct mapping by labeling the
     * creatorDS columns with the name the corresponding columns have in this
     * aggregated data service.
     *
     * example where column
     * `"fkDomain" as "pkClass"` -> creatorDS.fkDomain = aggDS.pkClass
     */
    customCreatorDSSelect?: string;

    // true during running update cycle
    updating = false;
    // the running update cycle promise
    updatingPromise: Promise<number>

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
        const tableName = 'agg_' + this.constructor.name.replace('Service', '')
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

    public async startUpdate() {
        const tmsp = await this.wh.pgNow();
        const changes = await this.doUpdate(tmsp);
        return changes
    }

    /**
     * triggers update cycle if currently no update running, else put flag
     * shouldUpdate to true, so that a new update cycle will be initialized
     * as soon as the current one stops
     *
     * @param currentTimestamp consider changes until (less or eq) to this tmsp
     */
    public doUpdate(currentTimestamp: string): Promise<number> {
        // useful for debugging
        // if (this.constructor.name === 'PEntityLabelService') {
        //     console.log(`------------- doUpdate, current cycle: ${this.cycle}, is updating:${this.updating}`)
        // }

        this.shouldUpdate = true

        if (!this.updating) {
            this.updatingPromise = this.update(currentTimestamp)
        }
        return this.updatingPromise
    }
    /**
      * updates this aggregated data for time between last update and currentTimestamp
      * to be exact, the changes considered are:
      * changeTmsp > this.changesConsideredUntil AND <= currentTimestamp
      *
      * @param currentTimestamp consider changes until (less or eq) to this tmsp
      */
    private async update(currentTimestamp: string) {
        this.updating = true
        this.shouldUpdate = false
        let changes = 0;

        // get the 'changesConsideredUntil'-timestamp
        const changesConsideredUntil = await this.getChangesConsideredUntilTsmp()

        /**
         * Handle deletes
         */

        // find 'newDeletes' in creatorDS
        // - items of the creatorDS
        //   that have a tmsp_deleted greater than 'changesConsideredUntil' and
        //      less or equal than 'currentTimestamp'
        //      (these items are the 'newDeletes')
        // mark 'newDeletes' as deleted in AggregatedDS
        // – items of this AggregatedDS
        //   that have the same keyModel as the 'newDeletes', setting tmsp_deleted='currentTimestamp'
        //    (don't delete them yet, because they may be providers of other aggregators)
        //    this operation happens directly on Postgres (within one query)

        let twOnDelete = ''
        if (this.onDeleteSql) {
            twOnDelete = `,
            delete AS (
                ${this.onDeleteSql('tw1')}
            )`
        }
        const handleDeletes = `
        -- find new deletes in creatorDS
        WITH tw1 AS (
            SELECT ${this.getCreatorDsSelectStmt()}
            FROM ${this.creatorDS.index.schemaTable}
            WHERE tmsp_deleted > '${changesConsideredUntil}'
            AND tmsp_deleted <= '${currentTimestamp}'
        )
        ${twOnDelete},
        -- mark them as deleted in aggregatedDS
        tw2 AS (
            UPDATE ${this.index.schemaTable} t1
            SET tmsp_deleted = '${currentTimestamp}'
            FROM tw1 t2
            WHERE ${this.index.keyDefs
                .map(k => `t1."${k.name}"=t2."${k.name}"`)
                .join(' AND ')}
            RETURNING t1.*
        )
        -- count the rows marked as deleted
        SELECT count(*)::int FROM tw2
        `
        // useful for debugging
        // logSql(handleDeletes, [])

        // if (this.constructor.name === 'PEntityLabelService') {
        //     console.log(`--> ${this.cycle} handle deletes between ${changesConsideredUntil} and ${currentTimestamp}`)
        // }
        const res = await this.wh.pgClient.query<{count: number}>(handleDeletes)
        changes += res.rows[0].count
        // useful for debugging
        // if (this.constructor.name === 'PEntityLabelService') {
        //     console.log(`--> ${this.cycle} handled ${res.rows[0].count}`)
        // }




        /**
         * Handle upserts
         */
        // find what to aggregate (store it in temp table)
        await this.findWhatToAggregate(changesConsideredUntil, currentTimestamp);

        // aggregate
        changes += await this.aggregateAll(currentTimestamp)

        // cleanup
        await this.cleanupOldDependencies(currentTimestamp);

        // update 'changesConsideredUntil'-timestamp
        await this.setChangesConsideredUntilTsmp(currentTimestamp)

        // finalize
        this.updating = false;
        if (this.shouldUpdate) {
            // useful for debugging
            // if (this.constructor.name === 'PEntityLabelService') {
            //     console.log('------------- restart startUpdate()')
            // }
            const nextChanges = await this.startUpdate();
            changes = changes + nextChanges;
        }


        // - emit this.afterUpdate$ if anything has changed
        if (changes > 0) this.afterChange$.next()
        // useful for debugging
        // if (this.constructor.name === 'PEntityLabelService') {
        //     console.log(`-------------  finalized cycle ${this.cycle}`)
        // }
        this.cycle++
        return changes
    }





    /**
     * cleanup old dependencies
     * delete dependencies where receivers have just been aggergated
     * (=they are in temp table) and they have not anymore been used by the
     * recent aggregation (=tmsp_last_aggregation less than 'currentTimestamp')
     * @param currentTimestamp
     */
    private async cleanupOldDependencies(currentTimestamp: string) {
        const depDS = this.isReceiverOf[0];
        const cleanupSql = `
            DELETE
            FROM    ${depDS.schemaTable} t1
            USING   ${this.tempTable} t2
            WHERE   ${depDS.receiverDS.index.keyDefs
                .map(k => `t2."${k.name}" = t1."r_${k.name}"`).join(' AND ')}
            AND t1.tmsp_last_aggregation < '${currentTimestamp}'
        `;
        await this.wh.pgClient.query(cleanupSql);
    }

    async aggregateAll(currentTimestamp: string) {
        let changes = 0

        const toAggregate = await brkOnErr(this.wh.pgClient.query<KeyModel>(`SELECT * From ${this.tempTable}`))

        if (toAggregate.rows.length > 0) {
            let valuesStr = ''
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any[] = [], addParam = (val: any) => {
                params.push(val)
                return '$' + params.length
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const addParams = (vals: any[]) => {
                return vals.map((val) => addParam(val)).join(',');
            }
            let i = 0;
            for (const key of toAggregate.rows) {
                i++;
                const val = await brkOnErr(this.aggregate(key))
                const sql = `(${addParams([...this.index.getKeyModelValues(key), JSON.stringify(val)])})${i < toAggregate.rows.length ? ',' : ''}`
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
            const depSqls: string[] = []
            // get the dependency sqls
            this.isReceiverOf.forEach(dep => {
                const depSql = dep.getSqlForStoringCache(currentTimestamp, params)
                if (depSql) depSqls.push(depSql)
            })
            // create the full query
            const parts: string[] = [aggSql, ...depSqls];
            const tws = parts.map((part, j) => `tw${j} AS (
                    ${part}
                )`).join(',')
            let twOnUpsert = ''
            if (this.onUpsertSql) {
                twOnUpsert = `
                , afterChange AS (
                    ${this.onUpsertSql('tw0')}
                )`
            }
            const sql = `
                WITH
                ${tws}
                ${twOnUpsert}
                SELECT count(*):: int changes FROM tw0;
                `
            // logSql(sql, params)

            const result = await brkOnErr(this.wh.pgClient.query<{changes: number}>(sql, params))
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
    private async findWhatToAggregate(changesConsideredUntil: string, currentTimestamp: string) {
        if (this.creatorDS) {
            await this.wh.pgClient.query(`DROP TABLE IF EXISTS ${this.tempTable} `);
            const creatorIdx = this.creatorDS.index;
            const selectStmt = this.getCreatorDsSelectStmt();
            const sql1 = `
                CREATE TABLE ${this.tempTable} AS
                SELECT ${selectStmt}
                FROM ${creatorIdx.schemaTable}
                WHERE tmsp_last_modification > '${changesConsideredUntil}'
                AND tmsp_last_modification <= '${currentTimestamp}'
                AND(tmsp_deleted IS NULL OR tmsp_deleted > '${currentTimestamp}')
                    `;

            const sql2 = this.isReceiverOf.map(depDS => {
                return `
                UNION
                SELECT  ${depDS.receiverKeyDefs.map(k => `t1."${k.name}"`).join(',')}
                FROM    ${depDS.schema}.${depDS.table} t1,
                    ${depDS.providerDS.index.schema}.${depDS.providerDS.index.table} t2
                WHERE   ${
                    depDS.providerDS.index.keyDefs
                        .map(k => `t2."${k.name}" = t1."p_${k.name}"`).join(' AND ')
                    }
                AND(
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

            // if (this.constructor.name === 'PEntityLabelService') {
            //     console.log('-------------')
            //     console.log(`curr: ${currentTimestamp}, cons: ${changesConsideredUntil} `)
            //     console.log('------------- prim_pentity')
            //     const a = await this.index.pgClient.query('SELECT * FROM war_cache.prim_pentity')
            //     console.log(JSON.stringify(a.rows, null, 2))
            //     console.log('------------- agg_pentitylabel_tmp')
            //     const x = await this.index.pgClient.query('SELECT * FROM war_cache.agg_pentitylabel_tmp')
            //     console.log(JSON.stringify(x.rows, null, 2))
            // }
        }
    }

    /**
     * returns the select statement, i.e.:
     * the columns to select from the creator data service.
     * If creatorDS and aggregatedDS have not the same KeyModel,
     * the column names do not (necessarily) match. In this case,
     * this statement should provide the correct mapping by labeling the
     * creatorDS columns with the name the corresponding columns have in this
     * aggregated data service.
     *
     * example, where column names match (i.e. creator and aggegator have same KeyModel)
     * `"pkEntity","fkProject"`
     *
     * example where column
     * `"fkDomain" as "pkClass"` -> creatorDS.fkDomain = aggDS.pkClass
     */
    private getCreatorDsSelectStmt() {
        return this.customCreatorDSSelect ?
            this.customCreatorDSSelect : this.index.keyCols;
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



    /**
     * registers the DataService that contains the items for each of them
     * an aggregation should happen
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerCreatorDS<DS extends DataService<any, any>>(creatorDS: DS) {
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



