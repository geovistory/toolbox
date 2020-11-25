import {AggregatedDataService2} from './AggregatedDataService2';
import {DependencyIndex} from './DependencyIndex';

export type ProviderKeyColMapping<RK, PK> = {
  [key in keyof PK]: {
    receiverCol?: keyof RK,
    value?: string | number
  }
}
export type HasValCondition<PV> = {
  [key in keyof PV]: 'IS NOT NULL'
}
export type HasKeyCondition<PK> = {
  [key in keyof PK]: 'IS NOT NULL'
}
export type HasCondition<PK, PV> = {
  providerKey?: HasKeyCondition<PK>,
  providerVal?: HasValCondition<PV>
}
export type AggregateWhereCondition = '= true' | '= false'

export class AggregatorSqlBuilder<KeyModel, ValueModel> {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any[] = []
  tws = 0;
  aggUpsertTws: string[] = []
  constructor(
    private agg: AggregatedDataService2<KeyModel, ValueModel>,
    private currentTimestamp: string
  ) { }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addParam(val: any) {
    this.params.push(val);
    return '$' + this.params.length;
  };
  addTw() {
    this.tws++
    return 'tw' + this.tws
  }
  addAggUpsertTw() {
    const tw = this.addTw()
    this.aggUpsertTws.push(tw)
    return tw
  }

  public twBatch(limit: number, offset: number) {
    const tw = this.addTw()
    const sql = `
    WITH ${tw} AS (
      SELECT ${this.agg.index.keyDefs.map(k => `"${k.name}" as "r_${k.name}"`)}
      FROM ${this.agg.tempTable}
      LIMIT ${this.addParam(limit)} OFFSET ${this.addParam(offset)}
    )`
    return {sql, tw}
  }

  public joinProvider<RK, RV, PK, PV>(c: {
    receiverTableAlias: string,
    dependencyIdx: DependencyIndex<RK, RV, PK, PV>,
    keyMapping: ProviderKeyColMapping<RK, PK>,
    hasCondition: HasCondition<PK, PV>,
    aggregateWhereHasVal?: AggregateWhereCondition,
    createReceiverVal?: (provTable: string) => string
  }
  ) {
    const provider = c.dependencyIdx.providerDS.index

    const {selectProviderKeys, joinOns} = this.aggSelectAndJoin(c.keyMapping);
    const conditionSql = this.aggCondition(c.hasCondition);
    const whereHasValSql = this.aggWhereHasVal(c.aggregateWhereHasVal)
    const receiverValSql = this.aggCreateReceiverVal(c.createReceiverVal)

    const aggTw = this.addTw()
    const aggUpsertTw = this.addAggUpsertTw()
    const depUpsertTw = this.addTw()

    const sql = `-- aggregate from geovistory
    ${aggTw} AS (
        SELECT
                    --receiver keys
                    ${this.agg.index.keyDefs.map(k => `t1."r_${k.name}"`)},
                    --provider keys
                    ${selectProviderKeys.join(',')},
                    --val
                    ${receiverValSql} val,
                    --condition
                    (${conditionSql.join(' AND ')}) condition
        FROM        ${c.receiverTableAlias} t1
        LEFT JOIN   ${provider.schemaTable} t2
        ON          ${joinOns.join(' AND ')}
        AND         tmsp_deleted IS NULL
                    ${whereHasValSql}
    ),
    -- insert or update aggregation results
    ${aggUpsertTw} AS (
        INSERT INTO ${this.agg.index.schemaTable} (${this.agg.index.keyCols},val)
        SELECT
                    --receiver keys
                    ${this.agg.index.keyDefs.map(k => `"r_${k.name}"`)},
                    --val
                    val
        FROM        ${aggTw}
        WHERE       condition = true
        ON CONFLICT (${this.agg.index.keyCols})
        DO UPDATE
                    SET val = EXCLUDED.val
        WHERE
                    EXCLUDED.val IS DISTINCT FROM ${this.agg.index.schemaTable}.val
        RETURNING *
    ),
    -- insert or update dependencies
    ${depUpsertTw} AS (
        INSERT INTO
                    ${c.dependencyIdx.schemaTable}
                    (${c.dependencyIdx.keyCols}, tmsp_last_aggregation)
        SELECT
                    --dep index keys
                    ${c.dependencyIdx.providerKeyCols},
                    ${c.dependencyIdx.receiverKeyCols},
                    --tmsp_last_aggregation
                    ${this.addParam(this.currentTimestamp)}
        FROM        ${aggTw}
        ON CONFLICT (${c.dependencyIdx.keyCols})
        DO UPDATE
                    SET tmsp_last_aggregation = EXCLUDED.tmsp_last_aggregation
    )`;
    return {sql, aggTw, aggUpsertTw, depUpsertTw}
  }

  private aggCreateReceiverVal(createReceiverVal?: ((provTable: string) => string)) {
    return !createReceiverVal ? '{}::jsonb' :
      createReceiverVal('t2');
  }

  twCount() {
    const tw = this.addTw()
    const sql = `
    -- count nr of changes
    ${tw} AS (
        ${this.aggUpsertTws.map(aggUpsertTw => `SELECT count(*)::int FROM ${aggUpsertTw}`).join(' UNION ALL ')}
    )
    SELECT sum(count) as changes
    FROM ${tw};`
    return {sql, tw}
  }

  twOnUpsertHook() {
    let sql = ''
    let tw = ''
    if (this.agg.onUpsertSql) {
      tw = this.addTw()
      const from = `
      (
        ${this.aggUpsertTws.map(aggUpsertTw => `SELECT * FROM ${aggUpsertTw}`).join(' UNION ALL ')}
      ) sub`
      sql = `
      ${tw} AS (
        ${this.agg.onUpsertSql(from)}
      )
      `
    }
    return {sql, tw}
  }

  private aggWhereHasVal(aggregateWhereHasVal?: AggregateWhereCondition) {
    return aggregateWhereHasVal ? `AND t1.condition ${aggregateWhereHasVal}` : '';
  }

  private aggCondition<PK, PV>(hasCondition: HasCondition<PK, PV>) {
    const conditions: string[] = [];
    const valConditions = hasCondition.providerVal;
    const keyConditions = hasCondition.providerKey;
    if (valConditions) {
      for (const valProp in valConditions) {
        if (Object.prototype.hasOwnProperty.call(valConditions, valProp)) {
          const operator = valConditions[valProp];
          conditions.push(`t2.val->>'${valProp}' ${operator}`);
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
    return conditions;
  }

  private aggSelectAndJoin<RK, RV, PK, PV>(
    keyMapping: ProviderKeyColMapping<RK, PK>
  ) {
    const selectProviderKeys: string[] = [];
    const joinOns: string[] = [];
    for (const providerCol in keyMapping) {
      if (Object.prototype.hasOwnProperty.call(keyMapping, providerCol)) {
        const e = keyMapping[providerCol];
        let select: string;
        let joinOn: string;
        if (e.receiverCol) {
          select = `t1."r_${e.receiverCol}" "p_${providerCol}"`;
          joinOn = `t1."r_${e.receiverCol}" = t2."${providerCol}"`;
        }
        else if (e.value) {
          const parse = typeof e.value === 'number' ? '::int' : '';
          joinOn = `${this.addParam(e.value)} = t2."${providerCol}"`;

          select = `${this.addParam(e.value)}${parse} "p_${providerCol}"`;
        }
        else {
          throw new Error('Please provide how to map this key');
        }
        selectProviderKeys.push(select);
        joinOns.push(joinOn);
      }
    }
    return {selectProviderKeys, joinOns};
  }




}
