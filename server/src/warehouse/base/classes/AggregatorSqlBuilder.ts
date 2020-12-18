/* eslint-disable @typescript-eslint/no-explicit-any */
import {PoolClient} from 'pg';
import {pgLogOnErr} from '../../../utils/helpers';
import {SqlBuilderBase} from '../../../utils/sql-builders/sql-builder-base';
import {AggregatedDataService2} from './AggregatedDataService2';
import {DataIndexPostgres} from './DataIndexPostgres';
import {DependencyIndex} from './DependencyIndex';
import {existsSync, mkdirSync, writeFileSync} from 'fs';
import sqlFormatter from 'sql-formatter';
export interface TableDef<Keys, Val, CustomObject> {
  tableName: string
}
export type CustomValSql<M> = (q: SqlBuilderBase) => string
export type ProviderKeyColMapping<RK, RV, PK, CustomObject> = {
  [key in keyof PK]: {
    leftCol?: keyof RK,
    leftVal?: {name: keyof RV, type: 'int' | 'text' | 'bool'},
    leftCustom?: {name: keyof CustomObject, type: 'int' | 'text' | 'bool'},
    value?: string | number
  }
}
type HasValOperator = 'IS NOT NULL' | 'is not {}'
export type HasValCondition<PV> = {
  [key in keyof PV]?: HasValOperator
}
export type HasKeyCondition<PK> = {
  [key in keyof PK]?: 'IS NOT NULL'
}
export type HasCondition<PK, PV> = {
  and?: HasCondition<PK, PV>[],
  or?: HasCondition<PK, PV>[],
  providerKey?: HasKeyCondition<PK>,
  providerVal?: HasValCondition<PV>
  custom?: string
}
export type AggregateWhereCondition = '= true' | '= false'
interface JoinProviderConfig<LeftKeys, LeftVal, RK, RV, PK, PV, LeftCustom, RightCustom> {
  leftTable: TableDef<LeftKeys, LeftVal, LeftCustom>,
  joinWithDepIdx: DependencyIndex<RK, RV, PK, PV>,
  joinOnKeys: ProviderKeyColMapping<LeftKeys, LeftVal, PK, LeftCustom>,
  joinOnCustom?: string[],
  joinWhereLeftTableCondition?: AggregateWhereCondition,
  conditionTrueIf: HasCondition<PK, PV>,
  createAggregationVal?: {
    sql: (provTable: string) => string
    upsert: boolean | {whereCondition: '= true' | '= false'}
  },
  createCustomObject?: CustomValSql<RightCustom>
}
export interface TmpTableResult<KeyModel, ValueModel, CustomModel> {
  sql: string;
  params: any[]
  tableDef: TableDef<KeyModel, ValueModel, CustomModel>;
}
export interface QueryDef {
  sql: string;
  params: any[]
  // optional alternative sql used instead of sql by this.printQueries()
  debugSql?: string;
}
export interface TmpTableQeryDef {
  sql: string;
  params: any[]
}
export interface JoinedProvider<KeyModel, ValueModel, RightCustom> {
  aggregation: TmpTableResult<KeyModel, ValueModel, RightCustom>;
  dependencyUpsert: TmpTableResult<KeyModel, ValueModel, never>;
  aggregationUpsert?: TmpTableResult<KeyModel, ValueModel, never>;
}

export class AggregatorSqlBuilder<KeyModel, ValueModel> {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any[] = []
  tws = 0;
  aggUpsertTws: string[] = []
  debugTableNames: string[] = []

  batchTmpTable: {
    sql: string;
    debugSql?: string;
    params: any[];
    tableDef: TableDef<KeyModel, ValueModel, never>;
  }
  // List of queries that can be executed by calling executeQueries()
  queryRequests: QueryDef[] = [];


  constructor(
    private agg: AggregatedDataService2<KeyModel, ValueModel>,
    private client: PoolClient,
    private currentTimestamp: string,
    private limit: number,
    private offset: number,
  ) {
    this.batchTmpTable = this.tmpTableBatch(limit, offset)
  }

  /**
   * Function to join a providerDS through dependency index with the current
   * AggregatorDS (= receiverDS).
   *
   * @param c
   */
  public async joinProviderThroughDepIdx<LeftKeys, LeftVal, RK, RV, PK, PV, LeftCustom, RightCustom>(
    c: JoinProviderConfig<LeftKeys, LeftVal, RK, RV, PK, PV, LeftCustom, RightCustom>
  ): Promise<JoinedProvider<KeyModel, ValueModel, RightCustom>> {
    // tmpTable for aggregation
    const aggregation = await this.tmpTableAggregate(c)

    // tmpTable for upsert deps
    const dependencyUpsert = await this.tmpTableUpsertDependencies(c.joinWithDepIdx, aggregation.tableDef.tableName)

    if (c.createAggregationVal?.upsert) {
      const aggDs = c.joinWithDepIdx.receiverDS.index
      const tableName = aggregation.tableDef.tableName
      const whereCondition = c.createAggregationVal.upsert === true ? undefined :
        c.createAggregationVal.upsert.whereCondition
      // tmpTable for upsert aggregation
      const aggregationUpsert = await this.tmpTableUpsertAggregations(aggDs, tableName, whereCondition);
      return {aggregation, dependencyUpsert, aggregationUpsert}
    }

    return {aggregation, dependencyUpsert}

  }

  /**********
   * Table creators
   ***********/

  private tmpTableBatch(limit: number, offset: number): TmpTableResult<KeyModel, ValueModel, never> {
    const q = new SqlBuilderBase()
    const tableName = this.createTableName()
    const createTableStmt = this.createTableStmt(tableName)
    const sql = `
    ${createTableStmt} (
      SELECT ${this.agg.index.keyDefs.map(k => `"${k.name}" as "r_${k.name}"`)}
      FROM ${this.agg.tempTable}
      LIMIT ${q.addParam(limit)} OFFSET ${q.addParam(offset)}
    )`
    const debugSql = `
      SELECT
      'CREATE TEMP TABLE ${tableName} ON COMMIT DROP AS (
        SELECT ${this.agg.index.keyDefs.map(k => `"${k.name}" as "r_${k.name}"`)}
        FROM
        (VALUES ' || string_agg(
          '(' || ${this.agg.index.keyDefs.map(k => ` t1."${k.name}"::text `).join(`||','||`)} ||')',
           ','
        ) ||') as x(${this.agg.index.keyDefs.map(k => `"${k.name}"`).join(',')})
      )' as sql
      FROM (
        SELECT ${this.agg.index.keyDefs.map(k => `"${k.name}"`)}
        FROM  ${this.agg.tempTable}
        LIMIT ${limit} OFFSET ${offset}
      ) t1
    `

    return this.registerTmpTable<KeyModel, ValueModel, never>(sql, q.params, tableName, debugSql);

  }


  private async tmpTableAggregate<LeftKeys, LeftVal, RK, RV, PK, PV, LeftCustom, RightCustom>(
    c: JoinProviderConfig<LeftKeys, LeftVal, RK, RV, PK, PV, LeftCustom, RightCustom>
  ): Promise<TmpTableResult<KeyModel, ValueModel, RightCustom>> {
    const q = new SqlBuilderBase()
    const tableName = this.createTableName()

    const provider = c.joinWithDepIdx.providerDS.index
    const receiver = c.joinWithDepIdx.receiverDS.index
    const {selectProviderKeys, joinOns} = this.aggSelectAndJoin(q, c.joinOnKeys, c.joinOnCustom);
    const createConditionSql = this.aggCondition(c.conditionTrueIf);
    const whereConditionSql = this.aggWhereCondition(c.joinWhereLeftTableCondition)
    const receiverValSql = this.aggCreateReceiverVal(c.createAggregationVal?.sql)
    const customObjectSql = this.aggCreateCustomObject<RightCustom>(q, c.createCustomObject)
    const createTableStmt = this.createTableStmt(tableName)

    const sql = `
    -- aggregate
    ${createTableStmt} (
      SELECT
      --receiver keys
      ${receiver.keyDefs.map(k => `t1."r_${k.name}"`)},
      --provider keys
      ${selectProviderKeys.join(',')},
      --provider val
      t2.val p_val,
      --val
      ${receiverValSql} val,
      --custom
      ${customObjectSql} custom,
      --condition
      ${createConditionSql} condition
      FROM        ${c.leftTable.tableName} t1
      LEFT JOIN   ${provider.schemaTable} t2
      ON          ${joinOns.join(' AND ')}
      AND         tmsp_deleted IS NULL
      ${whereConditionSql}
      )`;

    return this.registerTmpTable(sql, q.params, tableName);
  }



  private async tmpTableUpsertDependencies<RK, RV, PK, PV>(
    depIdx: DependencyIndex<RK, RV, PK, PV>,
    leftTableName: string
  ): Promise<TmpTableResult<KeyModel, ValueModel, never>> {
    const q = new SqlBuilderBase()
    const tableName = this.createTableName()
    const createTableStmt = this.createTableStmt(tableName)

    const sql = `
    -- insert or update dependencies
    ${createTableStmt} (
      WITH tw1 AS (
          INSERT INTO
                      ${depIdx.schemaTable}
                      (${depIdx.keyCols}, tmsp_last_aggregation)
          SELECT DISTINCT ON (
            ${depIdx.providerKeyCols},
            ${depIdx.receiverKeyCols}
          )
                      --dep index keys
                      ${depIdx.providerKeyCols},
                      ${depIdx.receiverKeyCols},
                      --tmsp_last_aggregation
                      ${q.addParam(this.currentTimestamp)}
          FROM        ${leftTableName}
          ON CONFLICT (${depIdx.keyCols})
          DO UPDATE
                      SET tmsp_last_aggregation = EXCLUDED.tmsp_last_aggregation
          RETURNING *
      )
      SELECT * FROM tw1
    )`;
    return this.registerTmpTable(sql, q.params, tableName);
  }



  async tmpTableUpsertAggregations<RK, RV>(
    aggregatorDS: DataIndexPostgres<RK, RV>,
    aggregationTableName: string,
    whereCondition?: AggregateWhereCondition):
    Promise<TmpTableResult<KeyModel, ValueModel, never>> {
    const tableName = this.addAggUpsertTw();
    const createTableStmt = this.createTableStmt(tableName)

    const sql = `
      -- insert or update aggregation results
      ${createTableStmt} (
        WITH tw1 AS (
          INSERT INTO ${aggregatorDS.schemaTable} (${aggregatorDS.keyCols},val)
          SELECT DISTINCT ON (${aggregatorDS.keyDefs.map(k => `"r_${k.name}"`)})
          --receiver keys
          ${aggregatorDS.keyDefs.map(k => `"r_${k.name}"`)},
          --val
          val
          FROM        ${aggregationTableName}
          ${whereCondition ? `
          WHERE       condition ${whereCondition}` : ''}
          ON CONFLICT (${aggregatorDS.keyCols})
          DO UPDATE
          SET val = EXCLUDED.val
          WHERE
          EXCLUDED.val IS DISTINCT FROM ${aggregatorDS.schemaTable}.val
          RETURNING *
        )
        SELECT * FROM tw1
      )`;
    return this.registerTmpTable(sql, [], tableName);

  }




  registerUpsertHook() {
    let sql = ''
    if (this.agg.onUpsertSql) {
      sql = `
        ${this.agg.onUpsertSql(`
        (
          ${this.aggUpsertTws.map(aggUpsertTw => `SELECT * FROM ${aggUpsertTw}`).join(' UNION ALL ')}
        ) sub`)}
      `
      this.registerQueryRequest(sql, [])
    }
  }

  private createCountSql() {
    let counts = 'SELECT 0 as count';
    if (this.aggUpsertTws.length) {
      counts = `${this.aggUpsertTws.map(aggUpsertTw => `SELECT count(*)::int FROM ${aggUpsertTw}`).join(' UNION ALL ')}`;
    }
    const sql = `
    -- count nr of changes
    WITH tw1 AS (${counts})
    SELECT sum(count)::int as changes
    FROM tw1;`;
    return sql;
  }

  /**
   * Function to count number of inserted or updated rows on the table
   * of the AggregationDS referenced by this.agg
   */
  private async executeCountSql(): Promise<number> {
    const sql = this.createCountSql();
    const result = await this.query<{changes: number}>(sql)
    const changes = result?.rows?.[0].changes ?? 0;

    return changes
  }





  /**********
   * Medium helpers for specific table creators
   ***********/
  private aggWhereCondition(aggregateWhereHasVal?: AggregateWhereCondition) {
    return aggregateWhereHasVal ? `WHERE t1.condition ${aggregateWhereHasVal}` : '';
  }

  private aggCondition<PK, PV>(
    hasCondition: HasCondition<PK, PV>): string {
    if (Object.keys(hasCondition).length === 0) {
      return `null::boolean`
    }
    else if (hasCondition.or) {
      return `(${hasCondition.or.map(c => `${this.aggCondition(c)}`).join(' OR ')} )`

    } else if (hasCondition.and) {
      return `(${hasCondition.and.map(c => `${this.aggCondition(c)}`).join(' AND ')} )`
    }
    else {
      return this.createLeafCondition(hasCondition)
    }

  }
  private aggSelectAndJoin<RK, RV, PK, LeftCustom>(
    q: SqlBuilderBase,
    keyMapping: ProviderKeyColMapping<RK, RV, PK, LeftCustom>,
    joinOnCustom: string[] = []
  ) {
    const selectProviderKeys: string[] = [];
    const joinOns: string[] = [];
    for (const providerCol in keyMapping) {
      if (Object.prototype.hasOwnProperty.call(keyMapping, providerCol)) {
        const e = keyMapping[providerCol];
        let select: string;
        let joinOn: string;
        if (e.leftCol) {
          select = `t1."r_${e.leftCol}" "p_${providerCol}"`;
          joinOn = `t1."r_${e.leftCol}" = t2."${providerCol}"`;
        }
        else if (e.leftCustom) {
          select = `(t1.custom->>'${e.leftCustom.name}')::${e.leftCustom.type} "p_${providerCol}"`;
          joinOn = `(t1.custom->>'${e.leftCustom.name}')::${e.leftCustom.type} = t2."${providerCol}"`;
        }
        else if (e.leftVal) {
          select = `(t1.val->>'${e.leftVal.name}')::${e.leftVal.type} "p_${providerCol}"`;
          joinOn = `(t1.val->>'${e.leftVal.name}')::${e.leftVal.type} = t2."${providerCol}"`;
        }
        else if (e.value) {
          const parse = typeof e.value === 'number' ? '::int' : '';
          joinOn = `${q.addParam(e.value)} = t2."${providerCol}"`;

          select = `${q.addParam(e.value)}${parse} "p_${providerCol}"`;
        }
        else {
          throw new Error('Please provide how to map this key');
        }
        selectProviderKeys.push(select);
        joinOns.push(joinOn);
      }
    }
    for (const joinCustom of joinOnCustom) {
      joinOns.push(joinCustom)
    }
    return {selectProviderKeys, joinOns};
  }

  private aggCreateReceiverVal(createReceiverVal?: ((provTable: string) => string)) {
    return !createReceiverVal ? `'{}'::jsonb` :
      createReceiverVal('t2');
  }

  private aggCreateCustomObject<M>(q: SqlBuilderBase, createCustomObject?: CustomValSql<M>) {
    return !createCustomObject ? `'{}'::jsonb` :
      createCustomObject(q);
  }
  private createLeafCondition<PK, PV>(hasCondition: HasCondition<PK, PV>) {
    const conditions: string[] = [];
    const valConditions = hasCondition.providerVal;
    const keyConditions = hasCondition.providerKey;
    const custom = hasCondition.custom;
    if (valConditions) {
      for (const valProp in valConditions) {
        if (Object.prototype.hasOwnProperty.call(valConditions, valProp)) {
          const operator: HasValOperator | undefined = valConditions[valProp];
          if (operator === 'IS NOT NULL') {
            conditions.push(`t2.val->>'${valProp}' IS NOT NULL`);
          } else if (operator === 'is not {}') {
            conditions.push(`t2.val->'${valProp}' != '{}'::jsonb`);
          }
        }
      }
    }
    if (keyConditions) {
      for (const keyCol in keyConditions) {
        if (Object.prototype.hasOwnProperty.call(keyConditions, keyCol)) {
          const operator = keyConditions[keyCol];
          conditions.push(`t2."${keyCol}" ${operator}`);
        }
      }
    }
    if (custom) {
      conditions.push(custom);
    }
    return conditions.join(' AND ');
  }

  /**********
   * Small generic helpers
   ***********/
  createTableName() {
    this.tws++
    return `tw_${this.offset}_${this.tws}`

  }
  addAggUpsertTw() {
    const tw = this.createTableName()
    this.aggUpsertTws.push(tw)
    return tw
  }
  createTableStmt(tableName: string) {
    return `CREATE TEMP TABLE ${tableName} ON COMMIT DROP AS`;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query<M>(sql: string, params: any[] = []) {
    return pgLogOnErr((s, p) => this.client.query<M>(s, p), sql, params)
  }

  registerTmpTable<KeyModel, ValueModel, RightCustom>(
    sql: string,
    params: any[],
    tableName: string,
    debugSql?: string) {
    this.registerQueryRequest(sql, params, debugSql);
    const tableDef: TableDef<KeyModel, ValueModel, RightCustom> = {
      tableName
    };
    return {sql, debugSql, params, tableDef};
  }

  registerQueryRequest(sql: string, params: any[], debugSql?: string) {
    this.queryRequests.push({sql, params, debugSql})
  }

  /**
   * execute the queries in queryRequests list
   * and returns the result of count query
   */
  async executeQueries() {
    for (const q of this.queryRequests) {
      await this.query(q.sql, q.params)
    }
    return this.executeCountSql()
  }
  /**
   * prints the queries in queryRequests list including the count query
   * for debugging
   */
  async printQueries() {
    const dir = './dev/agg-logs';
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    const filename = this.agg.tempTable + '-' + new Date().toISOString()
    let log = ``
    const countSql = this.createCountSql()
    const allQueries = [...this.queryRequests, {sql: countSql, params: []}];
    for (let i = 0; i < allQueries.length; i++) {
      const q = allQueries[i];
      const params = q.params
      let sql = q.sql;
      if (i === 0 && q.debugSql) {
        const res = await this.query<{sql: string}>(q.debugSql, [])
        sql = res.rows?.[0].sql ?? '';
      }
      params.forEach((param, j) => {
        const replaceStr = new RegExp('\\$' + (j + 1) + '(?!\\d)', 'g')
        sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param)
      })
      sql = sqlFormatter.format(sql, {language: 'pl/sql'});
      log = `${log}\n\n${sql};`
    }
    log = `BEGIN;
    -- the subsequent blocks create tmp tables. see last line for how to select
    -- their content for debugging
    ${log}

    -- You can select from a tmp table:
    -- SELECT * FROM tw2;
    `
    writeFileSync(dir + '/' + filename, log, 'utf-8')
    return 0
  }

}
