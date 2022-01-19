/* eslint-disable @typescript-eslint/no-explicit-any */
import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {PoolClient} from 'pg';
import {ReplaySubject} from 'rxjs';
import sqlFormatter from 'sql-formatter';
import {brkOnErr, pgLogOnErr} from '../../../utils/helpers';
import {CHANGES_CONSIDERED_UNTIL_SUFFIX, LAST_UPDATE_DONE_SUFFIX, LeftDSDates, Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {Providers} from '../interfaces/Providers';
import {AbstractAggregator} from './AbstractAggregator';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DataService} from './DataService';
import {Dependencies} from './Dependencies';
import {DependencyIndex} from './DependencyIndex';
import {Logger} from './Logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;
interface CustomCreatorDsSql {select?: string, where?: string}

interface CreatorDS {
    dataService: DataService<any, any>,
    customSql?: CustomCreatorDsSql[]
}



export abstract class AggregatedDataService<KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> {

    // updater: Updater<KeyModel, Aggregator>Ú

    index: DataIndexPostgres<KeyModel, ValueModel>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract getDependencies(): Dependencies | void
    aggregator?: Constructor<AbstractAggregator<ValueModel>>
    providers?: Constructor<Providers<KeyModel>>
    // array of dependency indexes where this data service is receiver
    creatorDS: CreatorDS[] = []
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
     * example
     * `"fkDomain" as "pkClass"` -> creatorDS.fkDomain = aggDS.pkClass
     */
    customCreatorDSSql?: CustomCreatorDsSql[];

    // true during running update cycle
    updating = false;
    // the running update cycle promise
    updatingPromise: Promise<number>

    shouldRestart = false;

    deleting = false;
    shouldDelete = false;

    tempTable: string;
    batchSize = 100000;
    cleanupDependencyBatchSize = 10000;

    ready$ = new ReplaySubject<boolean>()

    constructor(
        public wh: Warehouse,
        protected keyDefs: KeyDefinition[]
    ) {
        super(wh)
        const tableName = 'agg_' + this.constructor.name.replace('Service', '')
        this.index = new DataIndexPostgres(
            this.keyDefs,
            tableName,
            wh
        )
        this.tempTable = tableName + '_tmp'
    }
    emitReady() {
        this.index.ready$.subscribe((b) => {
            if (b) this.ready$.next(b)
        })
    }
    /**
      * updates this aggregated data for time between last update and currentTimestamp
      * to be exact, the changes considered are:
      * changeTmsp > this.changesConsideredUntil AND <= currentTimestamp
      *
      * @param beginOfAggregation consider changes until (less or eq) to this tmsp
      */
    private async update(beginOfAggregation: string) {
        const t0 = Logger.start(this.constructor.name, `Run aggregation cycle ${this.cycle}`, 0)

        this.updating = true
        let changes = 0;

        // get the 'changesConsideredUntil'-timestamp
        // const changesConsideredUntil = await this.getChangesConsideredUntilTsmp()
        const updatesConsideredUntil = await this.getUpdatesConsidered()
        const providerUpdateTmsps = await this.getleftDSupdateDone()


        // useful for debugging
        // if (this.constructor.name === 'REntityLabelService') {
        //     console.log(`- ${this.constructor.name}.update(), cycle: ${this.cycle}),
        //     aggregatedUnitlTsmps: ${JSON.stringify(aggregatedUnitlTsmps)},
        //     providerUpdateTmsps: ${JSON.stringify(providerUpdateTmsps)},
        //     beginOfAggregation: ${beginOfAggregation}`)
        //     const x = await this.wh.pgPool.query(' select * from war_cache_1.agg_rentitylabel where "pkEntity" = 4002');
        //     console.log(x.rows?.[0])
        // }
        /**
         * Handle deletes
         */
        changes += await this.handleDeletes(updatesConsideredUntil, providerUpdateTmsps);

        /**
         * Handle upserts
         */
        // create client for the aggregation

        const client = await this.wh.whPgPool.connect()
        const client2 = await this.wh.gvPgPool.connect()
        Logger.msg(this.constructor.name, `pgPool connected (totalCount: ${this.wh.whPgPool.totalCount}, waitingCount: ${this.wh.whPgPool.waitingCount})`, 0)

        let hasError = false;
        try {
            await client.query('BEGIN')
            await client2.query('BEGIN')

            // find what to aggregate (store it in temp table)
            await this.findWhatToAggregate(client, updatesConsideredUntil, providerUpdateTmsps);

            // aggregate batchwise, reading from temp table
            changes += await this.aggregateAll(client, client2, beginOfAggregation)

            // cleanup dependencies
            await this.cleanupOldDependencies(client, beginOfAggregation);

            // // update 'changesConsideredUntil'-timestamp
            // await this.setChangesConsideredUntilTsmp(beginOfAggregation)
            const t1 = Logger.start(this.constructor.name, `commit aggregations`, 0)
            await client.query('COMMIT')
            await client2.query('COMMIT')
            Logger.itTook(this.constructor.name, t1, `to commit aggregations `, 0)
        } catch (e) {
            hasError = true
            await client.query('ROLLBACK')
            await client2.query('ROLLBACK')
            Logger.msg(this.constructor.name, `ERROR in aggregation: ${JSON.stringify(e)}`,)
        } finally {

            client.release()
            client2.release()
            Logger.msg(this.constructor.name, `pgPool client released`)

        }
        if (!hasError) {
            await this.setUpdatesConsidered(providerUpdateTmsps)
        }


        // finalize
        this.updating = false;
        if (this.shouldRestart) {
            // useful for debugging
            // if (this.constructor.name === 'PEntityTypeService') {
            //     console.log('------------- restart startUpdate()')
            // }

            Logger.itTook(this.constructor.name, t0, `for cycle ${this.cycle}, start over...`, 0)
            // restart
            beginOfAggregation = await this.wh.whPgNow();
            const nextChanges = await this.doUpdate(beginOfAggregation);
            changes = changes + nextChanges;
        }


        // emit this.afterUpdate$ if anything has changed
        if (changes > 0) {
            const done = await this.wh.whPgNowDate();
            await this.setLastUpdateDone(done)

            // await this.setUpdatesConsidered(providerUpdateTmsps)
            this.afterChange$.next()
        }
        // useful for debugging
        // if (this.constructor.name === 'PEntityTypeService') {
        //     console.log(`-------------  finalized cycle ${this.cycle} for time until ${currentTimestamp}`)
        // }

        Logger.msg(this.constructor.name, `restart within cycle ${this.cycle}`, 0)

        return changes
    }
    async aggregate(id: KeyModel): Promise<ValueModel | undefined> {
        if (this.providers && this.aggregator) {

            const providers = new this.providers(this.getDependencies(), id)
            return new this.aggregator(providers, id).create()
        }
    }

    public async startUpdate() {
        const t0 = Logger.start(this.constructor.name, `Start update.`, 0)
        const tmsp = await this.wh.whPgNow();
        const changes = await this.doUpdate(tmsp);
        Logger.itTook(this.constructor.name, t0, `to start update`, 0)
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
        // if (this.constructor.name === 'EntityPreviewService') {
        //     console.log(`- EntityPreviewService.doUpdate() currentTimestamp: ${currentTimestamp}, cycle: ${this.cycle}, updating:${this.updating}`)
        // }

        if (this.updating) {
            this.shouldRestart = true
        }
        else {
            this.shouldRestart = false
            this.updatingPromise = this.update(currentTimestamp)
            this.cycle++
        }
        return this.updatingPromise
    }





    /** find 'newDeletes' in creatorDS
     * - items of the creatorDS
     *   that have a tmsp_deleted greater than 'changesConsideredUntil' and
     *      less or equal than 'currentTimestamp'
     *      (these items are the 'newDeletes')
     * mark 'newDeletes' as deleted in AggregatedDS
     * – items of this AggregatedDS
     *   that have the same keyModel as the 'newDeletes', setting tmsp_deleted='currentTimestamp'
     *    (don't delete them yet, because they may be providers of other aggregators)
     *    this operation happens directly on Postgres (within one query)
     */
    private async handleDeletes(updatesConsidered: LeftDSDates, updatesDone: LeftDSDates) {
        let changes = 0
        let twOnDelete = '';
        if (!this.creatorDS.length) throw new Error("At least one creator data service needed");
        const t0 = Logger.start(this.constructor.name, `handleDeletes`, 0)

        if (this.onDeleteSql) {
            twOnDelete = `,
            delete AS (
                ${this.onDeleteSql('tw1')}
                )`;
        }
        const handleDeletes = `
            -- find new deletes in creatorDS
            WITH tw1 AS (
                ${this.creatorDS.map(createDS => {
            const ds = createDS.dataService
            const customSqls = this.getCreatorCustomSql(createDS.customSql)

            const {after, until} = this.getAfterAndUntil(ds.constructor.name, updatesConsidered, updatesDone);

            return `${customSqls.map(part => `
                    SELECT ${part.select ? part.select : this.index.keyCols}
                    FROM ${ds.index.schemaTable}
                    WHERE tmsp_deleted > '${after}'
                    AND tmsp_deleted <= '${until}'
                    ${part.where ? `AND ${part.where}` : ''}
                    `).join(' UNION ')}`
        }).join(' UNION ')}
                )
                ${twOnDelete},
                --mark them as deleted in aggregatedDS
                tw2 AS(
                    UPDATE ${this.index.schemaTable} t1
                    SET tmsp_deleted = clock_timestamp()
                    FROM tw1 t2
                    WHERE ${this.index.keyDefs
                .map(k => `t1."${k.name}"=t2."${k.name}"`)
                .join(' AND ')
            }
                    RETURNING t1.*
                    )

                    -- TODO Delete dependencies where items from tw1 are receivers!

                    --count the rows marked as deleted
                    SELECT count(*):: int FROM tw2
                    `;
        // useful for debugging
        // logSql(handleDeletes, [])
        // if (this.constructor.name === 'PEntityLabelService') {
        //     console.log(`-- > ${this.cycle} handle deletes between ${changesConsideredUntil} and ${currentTimestamp} `)
        // }
        const res = await pgLogOnErr((s, p) => this.wh.whPgPool.query<{count: number;}>(s, p), handleDeletes, [])
        changes += res?.rows?.[0].count ?? 0;
        // useful for debugging
        // if (this.constructor.name === 'PEntityLabelService') {
        // console.log(`-- > ${this.cycle} handled  ${res.rows[0].count} deletes`)
        // if (res.rows[0].count) {
        //     console.log(``)
        // }
        // }
        Logger.itTook(this.constructor.name, t0, `to handleDeletes `, 0)

        return changes;
    }

    private getAfterAndUntil(name: string, updatesConsidered: LeftDSDates, updatesDone: LeftDSDates) {
        const after = updatesConsidered[name] ?? new Date(0).toISOString();
        const until = updatesDone[name] ?? new Date().toISOString();
        return {after, until};
    }

    /**
     * cleanup old dependencies
     * delete dependencies where receivers have just been aggergated
     * (=they are in temp table) and they have not anymore been used by the
     * recent aggregation (=tmsp_last_aggregation less than 'currentTimestamp')
     * @param currentTimestamp
     */
    private async cleanupOldDependencies(client: PoolClient, currentTimestamp: string) {
        const t0 = Logger.start(this.constructor.name, `cleanupOldDependencies`, 0)
        const res = await brkOnErr(client.query<{count: number}>(`SELECT count(*):: integer From ${this.tempTable} `))
        const size = res.rows[0].count;
        const limit = this.cleanupDependencyBatchSize;
        // useful for debugging
        // if (this.constructor.name === 'PEntityTypeService') {
        //     console.log(`-- > ${this.cycle} handle update of ${size} items`)
        // }
        for (let offset = 0; offset < size; offset += limit) {
            const logString = `cleanupOldDependencies batch ${offset + limit > size ? size % limit : limit} (${(offset / limit) + 1} /${Math.floor(size / limit) + 1}) in cycle ${this.cycle} `
            const t2 = Logger.start(this.constructor.name, `${logString} `, 0)
            await this.cleanUpDependenciesBatch(client, limit, offset, currentTimestamp);
            Logger.itTook(this.constructor.name, t2, `to ${logString} `, 0)

        }

        // if (new Date().getTime() - t0 > 1000) {
        //     await this.printQuery(client, 'cleanup_old_deps', sql, [])
        // }
        Logger.itTook(this.constructor.name, t0, `to cleanupOldDependencies `, 0)
    }

    async cleanUpDependenciesBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string) {

        // const promises: Promise<any>[] = []
        const parts = this.isReceiverOf.map((depDS, i) => `
            tw${i} AS (
                DELETE
                FROM    ${depDS.schemaTable} t1
                WHERE   (${depDS.receiverDS.index.keyDefs.map(k => `"r_${k.name}"`).join(',')}) IN (
                            SELECT  ${depDS.receiverDS.index.keyDefs.map(k => `"${k.name}"`).join(',')}
                            FROM    ${this.tempTable}
                            LIMIT $1 OFFSET $2
                        )
                AND     t1.tmsp_last_aggregation < '${currentTimestamp}'
                RETURNING *
            )
        `).join(', ')

        const sum = `
            SELECT sum(count)
            FROM (
                ${this.isReceiverOf.map((depDS, i) => `SELECT count(*) from tw${i}`).join(' UNION ')}
            )x
        `
        const sql = `
            WITH
            ${parts}
            ${sum}
        `


        await client.query(sql, [limit, offset])
    }


    async aggregateAll(client: PoolClient, client2: PoolClient, currentTimestamp: string) {
        let changes = 0
        const res = await brkOnErr(client.query<{count: number}>(`SELECT count(*):: integer From ${this.tempTable} `))
        const size = res.rows[0].count;
        const limit = this.batchSize;
        // useful for debugging
        // if (this.constructor.name === 'PEntityTypeService') {
        //     console.log(`-- > ${this.cycle} handle update of ${size} items`)
        // }
        for (let offset = 0; offset < size; offset += limit) {
            const logString = `batch aggregate ${offset + limit > size ? size % limit : limit} (${(offset / limit) + 1} /${Math.floor(size / limit) + 1}) in cycle ${this.cycle} `
            const t0 = Logger.start(this.constructor.name, `${logString} `, 0)
            changes += await this.aggregateBatch(client, client2, limit, offset, currentTimestamp);
            Logger.itTook(this.constructor.name, t0, `to ${logString} `, 0)

        }
        return changes
    }

    async aggregateBatch(client: PoolClient, client2: PoolClient, limit: number, offset: number, currentTimestamp: string) {
        let changes = 0

        const toAggregate = await brkOnErr(client.query<KeyModel>(`
SELECT * From ${this.tempTable}
LIMIT $1 OFFSET $2
    `, [limit, offset]));

        if (toAggregate.rows.length > 0) {
            let valuesStr = '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any[] = [], addParam = (val: any) => {
                params.push(val);
                return '$' + params.length;
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const addParams = (vals: any[]) => {
                return vals.map((val) => addParam(val)).join(',');
            };
            let i = 0;
            for (const key of toAggregate.rows) {
                i++;
                const val = await brkOnErr(this.aggregate(key));
                const sql = `(${addParams([...this.index.getKeyModelValues(key), JSON.stringify(val)])}) ${i < toAggregate.rows.length ? ',' : ''} `;
                valuesStr = valuesStr + sql;
            }
            // insert or update the results of the aggregation
            const aggSql = `
INSERT INTO ${this.index.schemaTable} (${this.index.keyCols}, val)
VALUES ${valuesStr}
ON CONFLICT(${this.index.keyCols})
DO UPDATE
SET val = EXCLUDED.val
WHERE EXCLUDED.val IS DISTINCT FROM ${this.index.schemaTable}.val
RETURNING *
    `;
            const depSqls: string[] = [];
            // get the dependency sqls
            this.isReceiverOf.forEach(dep => {
                const depSql = dep.getSqlForStoringCache(currentTimestamp, params);
                if (depSql)
                    depSqls.push(depSql);
            });
            // create the full query
            const parts: string[] = [aggSql, ...depSqls];
            const tws = parts.map((part, j) => `tw${j} AS(
        ${part}
    )`).join(',');
            let twOnUpsert = '';
            if (this.onUpsertSql) {
                twOnUpsert = `
    , onUpsert AS(
        ${this.onUpsertSql('tw0')}
    )`;
            }
            const sql = `
WITH
${tws}
${twOnUpsert}
SELECT count(*):: int changes FROM tw0;
`;
            // logSql(sql, params)
            const result = await brkOnErr(client.query<{changes: number;}>(sql, params));
            changes = result.rows?.[0].changes ?? 0;
        }
        return changes;
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
    private async findWhatToAggregate(client: PoolClient, updatesConsidered: LeftDSDates, updatesDone: LeftDSDates) {
        if (this.creatorDS.length === 0) throw new Error("At least one creator DS is needed");
        const t0 = Logger.start(this.constructor.name, `findWhatToAggregate`, 0)

        const sql0 = `CREATE TEMPORARY TABLE ${this.tempTable} ON COMMIT DROP AS`
        const sql1 = this.creatorDS.map(createDS => {
            const creatorIdx = createDS.dataService.index;
            const creatorSqlParts = this.getCreatorCustomSql(createDS.customSql)
            const {after, until} = this.getAfterAndUntil(createDS.dataService.constructor.name, updatesConsidered, updatesDone);

            return `${creatorSqlParts.map(part => `
                    SELECT ${part.select ? part.select : this.index.keyCols}
                    FROM ${creatorIdx.schemaTable}
                    WHERE tmsp_last_modification > '${after}'
                    AND tmsp_last_modification <= '${until}'
                    AND (tmsp_deleted IS NULL OR tmsp_deleted > '${until}')
                    ${part.where ? `AND ${part.where}` : ''}
                `).join(' UNION ')
                }`;
        }).join(' UNION ')

        const sql2 = this.isReceiverOf.map(depDS => {
            const {after, until} = this.getAfterAndUntil(depDS.providerDS.constructor.name, updatesConsidered, updatesDone);

            return `
                UNION
                SELECT  ${depDS.receiverKeyDefs.map(k => `t1."${k.name}"`).join(',')}
                FROM    ${depDS.schema}.${depDS.table} t1,
                    ${depDS.providerDS.index.schema}.${depDS.providerDS.index.table} t2
                WHERE   ${depDS.providerDS.index.keyDefs
                    .map(k => `t2."${k.name}" = t1."p_${k.name}"`).join(' AND ')}
                AND (
                    (
                        t2.tmsp_last_modification > '${after}'
                        AND
                        t2.tmsp_last_modification <= '${until}'
                    )
                    OR
                    (
                        t2.tmsp_deleted > '${after}'
                        AND
                        t2.tmsp_deleted <= '${until}'
                    )
                )
        `;
        }).join('\n');
        await client.query(sql0 + sql1 + sql2);
        Logger.itTook(this.constructor.name, t0, `to findWhatToAggregate `, 0)

        // if (this.constructor.name === 'PEntityTypeService') {
        //     console.log('-------------')
        //     console.log(`cons: ${changesConsideredUntil}, curr: ${currentTimestamp} `)
        //     console.log('------------- agg_pentitylabel')
        //     const a = await this.index.pgPool.query('SELECT * FROM war_cache.agg_pentitylabel')
        //     console.log(JSON.stringify(a.rows, null, 2))
        //     console.log('------------- agg_pentitytype__on__agg_pentitylabel')
        //     const b = await this.index.pgPool.query('SELECT * FROM war_cache.agg_pentitytype__on__agg_pentitylabel')
        //     console.log(JSON.stringify(b.rows, null, 2))
        //     console.log(`------------- ${this.tempTable} ------------- `)
        //     console.log(`cons: ${changesConsideredUntil}, curr: ${currentTimestamp} `)
        //     const x = await client.query(`SELECT * FROM ${this.tempTable} `)
        //     console.log(JSON.stringify(x.rows, null, 2))
        //     if(x.rows.length===2){
        //         console.log(2)

        //     }
        // }
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
     * `"pkEntity", "fkProject"`
     *
     * example where column
     * `"fkDomain" as "pkClass"` -> creatorDS.fkDomain = aggDS.pkClass
     */
    private getCreatorCustomSql(customSql: CustomCreatorDsSql[] | undefined) {
        return customSql ?? [{select: this.index.keyCols}];
    }

    // /**
    //  * returns tmsp of last changes considered by this aggregator service
    //  * If not existing, returns a very early tmsp (year 1970) so that we
    //  * can assume that all changes after 1970 will be considered
    //  */
    // private async getChangesConsideredUntilTsmp() {
    //     const val = await this.wh.metaTimestamps.getFromIdx(this.constructor.name + '__changes_considered_until');
    //     return val?.tmsp ?? new Date(0).toISOString()
    // }
    // private async setChangesConsideredUntilTsmp(tmsp: string) {
    //     await this.wh.metaTimestamps.addToIdx(this.constructor.name + '__changes_considered_until', {tmsp});
    // }



    /**
     * registers the DataService that contains the items for each of them
     * an aggregation should happen
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerCreatorDS<DS extends DataService<any, any>>(...creatorDS: CreatorDS[]) {
        creatorDS.forEach((ds) => {
            this.creatorDS.push(ds);
            ds.dataService.registerIsCreatorOf(this)
        })
    }
    /**
     * Adds dep to this.isReceiverOf with the effect that this DataService acts
     * as the receiver of data for dep.
     * @param dep
     */
    registerReceiverOf<ProviderKeyModel, ProviderValModel>(dep: DependencyIndex<KeyModel, ValueModel, ProviderKeyModel, ProviderValModel>) {
        this.isReceiverOf.push(dep)
    }




    async setUpdatesConsidered(leftDsDates: LeftDSDates) {
        await this.wh.aggregationTimestamps.addToIdx(this.constructor.name + CHANGES_CONSIDERED_UNTIL_SUFFIX, leftDsDates);
    }
    async getUpdatesConsidered(): Promise<LeftDSDates> {
        const val = await this.wh.aggregationTimestamps.getFromIdx(this.constructor.name + CHANGES_CONSIDERED_UNTIL_SUFFIX);
        return val ?? {}
    }

    async getleftDSupdateDone(): Promise<LeftDSDates> {


        const leftDS = [
            ...this.isReceiverOf.map(depIdx => depIdx.providerDS),
            ...this.creatorDS.map(item => item.dataService)
        ]
        const sql = `
                    SELECT jsonb_object_agg(replace(key,'${LAST_UPDATE_DONE_SUFFIX}','') , val->>'tmsp') o
                    FROM ${this.wh.metaTimestamps.schemaTable}
                    WHERE key IN (
                        ${leftDS.map(item => `'${item.constructor.name + LAST_UPDATE_DONE_SUFFIX}'`).join(',')}
                    )
                `
        const res = await this.wh.whPgPool.query<{o: LeftDSDates}>(sql)

        const returnval = res.rows?.[0]?.o ?? {}
        return returnval

    }

    /**
     * prints a query in a file with a query for the tmpTable for debugging
     */
    private async printQuery(client: PoolClient, prefix: string, sql: string, params: any[]) {
        const dir = './dev/agg-logs';
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        const filename = prefix + '-' + new Date().toISOString()

        const tmptable = await client.query<KeyModel>(`
        SELECT ${this.index.keyDefs.map(k => `"${k.name}"`)}
        FROM  ${this.tempTable}
        `, [])
        const tmpTableDebugSql = `
        CREATE TEMP TABLE ${this.tempTable} ON COMMIT DROP AS (
          SELECT ${this.index.keyDefs.map(k => `"${k.name}"`)}
          FROM
          (VALUES ${tmptable.rows.map(r => `(${this.index.keyDefs.map(k => r[k.name as keyof KeyModel]).join(', ')})`).join(', ')}) as x(${this.index.keyDefs.map(k => `"${k.name}"`).join(',')})
        );
        `


        params.forEach((param, j) => {
            const replaceStr = new RegExp('\\$' + (j + 1) + '(?!\\d)', 'g')
            sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param)
        })
        sql = sqlFormatter.format(sql, {language: 'pl/sql'});

        const log = `BEGIN;
            ${tmpTableDebugSql}

            ${sql}
        `
        writeFileSync(dir + '/' + filename, log, 'utf-8')
        return 0
    }

}



