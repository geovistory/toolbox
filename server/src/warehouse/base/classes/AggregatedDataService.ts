import {PoolClient} from 'pg';
import {ReplaySubject} from 'rxjs';
import {brkOnErr} from '../../../utils/helpers';
import {Warehouse} from '../../Warehouse';
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

export abstract class AggregatedDataService<KeyModel, ValueModel> extends DataService<KeyModel, ValueModel> {

    // updater: Updater<KeyModel, Aggregator>Ú

    index: DataIndexPostgres<KeyModel, ValueModel>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract creatorDS: DataService<any, any>
    abstract getDependencies(): Dependencies | void
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

    tempTableName: string;
    tempTable: string;
    batchSize = 100;

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
        this.tempTableName = tableName + '_tmp'
        this.tempTable = tableName + '_tmp' // `${this.index.schema}.${this.tempTableName}`
    }
    emitReady() {
        this.index.ready$.subscribe((b) => {
            if (b) this.ready$.next(b)
        })
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
        // if (this.constructor.name === 'REntityLabelService') {
        //     console.log(`------------- doUpdate, current cycle: ${this.cycle}, is updating:${this.updating}`)
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
    /**
      * updates this aggregated data for time between last update and currentTimestamp
      * to be exact, the changes considered are:
      * changeTmsp > this.changesConsideredUntil AND <= currentTimestamp
      *
      * @param currentTimestamp consider changes until (less or eq) to this tmsp
      */
    private async update(currentTimestamp: string) {
        const t0 = Logger.start(this.constructor.name, `Run aggregation cycle ${this.cycle}`, 0)

        this.updating = true
        let changes = 0;

        // get the 'changesConsideredUntil'-timestamp
        const changesConsideredUntil = await this.getChangesConsideredUntilTsmp()
        // useful for debugging
        // if (this.constructor.name === 'REntityLabelService') {
        //     console.log(`------------- update (cycle ${this.cycle}) from ${changesConsideredUntil} to ${currentTimestamp}`)
        // }
        /**
         * Handle deletes
         */
        changes += await this.handleDeletes(changesConsideredUntil, currentTimestamp);

        /**
         * Handle upserts
         */
        // create client for the aggregation
        const client = await this.wh.pgPool.connect()
        try {
            await client.query('BEGIN')

            // find what to aggregate (store it in temp table)
            await this.findWhatToAggregate(client, changesConsideredUntil, currentTimestamp);

            // aggregate batchwise, reading from temp table
            changes += await this.aggregateAll(client, currentTimestamp)

            // cleanup dependencies
            await this.cleanupOldDependencies(client, currentTimestamp);

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }

        // update 'changesConsideredUntil'-timestamp
        await this.setChangesConsideredUntilTsmp(currentTimestamp)


        // finalize
        this.updating = false;
        if (this.shouldRestart) {
            // useful for debugging
            // if (this.constructor.name === 'REntityLabelService') {
            //     console.log('------------- restart startUpdate()')
            // }
            Logger.itTook(this.constructor.name, t0, `for cycle ${this.cycle}, start over...`, 0)

            // restart
            currentTimestamp = await this.wh.pgNow();
            const nextChanges = await this.doUpdate(currentTimestamp);
            changes = changes + nextChanges;
        }


        // - emit this.afterUpdate$ if anything has changed
        if (changes > 0) this.afterChange$.next()
        // useful for debugging
        // if (this.constructor.name === 'REntityLabelService') {
        //     console.log(`-------------  finalized cycle ${this.cycle} for time until ${currentTimestamp}`)
        // }

        Logger.msg(this.constructor.name, `restart within cycle ${this.cycle}`, 0)

        return changes
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
    private async handleDeletes(changesConsideredUntil: string, currentTimestamp: string) {
        let changes = 0
        let twOnDelete = '';
        if (this.onDeleteSql) {
            twOnDelete = `,
            delete AS (
                ${this.onDeleteSql('tw1')}
            )`;
        }
        const handleDeletes = `
        -- find new deletes in creatorDS
        WITH tw1 AS (
            ${this.getCreatorDsSqls().map(part => `
            SELECT ${part.select ? part.select : this.index.keyCols}
            FROM ${this.creatorDS.index.schemaTable}
            WHERE tmsp_deleted > '${changesConsideredUntil}'
            AND tmsp_deleted <= '${currentTimestamp}'
            ${part.where ? `AND ${part.where}` : ''}
            `).join(' UNION ')}
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
        `;
        // useful for debugging
        // logSql(handleDeletes, [])
        // if (this.constructor.name === 'REntityLabelService') {
        //     console.log(`--> ${this.cycle} handle deletes between ${changesConsideredUntil} and ${currentTimestamp}`)
        // }
        const res = await this.wh.pgPool.query<{count: number;}>(handleDeletes);
        changes += res.rows[0].count;
        // useful for debugging
        // if (this.constructor.name === 'PEntityTimeSpanService') {
        //     console.log(`--> ${this.cycle} handled ${res.rows[0].count}`)
        // }
        return changes;
    }

    /**
     * cleanup old dependencies
     * delete dependencies where receivers have just been aggergated
     * (=they are in temp table) and they have not anymore been used by the
     * recent aggregation (=tmsp_last_aggregation less than 'currentTimestamp')
     * @param currentTimestamp
     */
    private async cleanupOldDependencies(client: PoolClient, currentTimestamp: string) {
        const depDS = this.isReceiverOf[0];
        const cleanupSql = `
            DELETE
            FROM    ${depDS.schemaTable} t1
            USING   ${this.tempTable} t2
            WHERE   ${depDS.receiverDS.index.keyDefs
                .map(k => `t2."${k.name}" = t1."r_${k.name}"`).join(' AND ')}
            AND t1.tmsp_last_aggregation < '${currentTimestamp}'
        `;
        await client.query(cleanupSql);
    }

    async aggregateAll(client: PoolClient, currentTimestamp: string) {
        let changes = 0
        const res = await brkOnErr(client.query<{count: number}>(`SELECT count(*)::integer From ${this.tempTable}`))
        const size = res.rows[0].count;
        const limit = this.batchSize;
        // useful for debugging
        // if (this.constructor.name === 'REntityLabelService') {
        //     console.log(`--> ${this.cycle} handle update of ${size} items`)
        // }
        for (let offset = 0; offset < size; offset += limit) {
            const logString = `batch aggregate ${offset + limit > size ? size % limit : limit} (${(offset / limit) + 1}/${Math.floor(size / limit) + 1}) in cycle ${this.cycle}`
            const t0 = Logger.start(this.constructor.name, `${logString}`, 0)
            changes += await this.aggregateBatch(client, limit, offset, currentTimestamp);
            Logger.itTook(this.constructor.name, t0, `to ${logString}`, 0)

        }
        return changes
    }

    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string) {
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
                const sql = `(${addParams([...this.index.getKeyModelValues(key), JSON.stringify(val)])})${i < toAggregate.rows.length ? ',' : ''}`;
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
            const tws = parts.map((part, j) => `tw${j} AS (
                    ${part}
                )`).join(',');
            let twOnUpsert = '';
            if (this.onUpsertSql) {
                twOnUpsert = `
                , onUpsert AS (
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
    private async findWhatToAggregate(client: PoolClient, changesConsideredUntil: string, currentTimestamp: string) {
        if (this.creatorDS) {
            const creatorIdx = this.creatorDS.index;
            const creatorSqlParts = this.getCreatorDsSqls();

            const sql1 = `
                CREATE TEMPORARY TABLE ${this.tempTable} ON COMMIT DROP AS
                ${creatorSqlParts.map(part => `
                    SELECT ${part.select ? part.select : this.index.keyCols}
                    FROM ${creatorIdx.schemaTable}
                    WHERE tmsp_last_modification > '${changesConsideredUntil}'
                    AND tmsp_last_modification <= '${currentTimestamp}'
                    AND (tmsp_deleted IS NULL OR tmsp_deleted > '${currentTimestamp}')
                    ${part.where ? `AND ${part.where}` : ''}
                `).join(' UNION ')}
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
            await client.query(sql1 + sql2);

            // if (this.constructor.name === 'REntityLabelService') {
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
    private getCreatorDsSqls(): CustomCreatorDsSql[] {
        return this.customCreatorDSSql ?
            this.customCreatorDSSql : [{select: this.index.keyCols}];
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



