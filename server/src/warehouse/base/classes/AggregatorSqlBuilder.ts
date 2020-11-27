import {AggregatedDataService2} from './AggregatedDataService2';
import {DependencyIndex} from './DependencyIndex';
import {DataIndexPostgres} from './DataIndexPostgres';
export interface TableDef<Keys, Val, CustomObject> {
  tableName: string
}
export type CustomValSql<M> = (provTable: string) => string
export type ProviderKeyColMapping<RK, RV, PK, CustomObject> = {
  [key in keyof PK]: {
    leftCol?: keyof RK,
    leftVal?: {name: keyof RV, type: 'int' | 'text'},
    leftCustom?: {name: keyof CustomObject, type: 'int' | 'text'},
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
    const tableDef: TableDef<KeyModel, ValueModel, never> = {
      tableName: tw
    }
    return {sql, tableDef}
  }

  public joinProviderThroughDepIdx<LeftKeys, LeftVal, RK, RV, PK, PV, LeftCustom, RightCustom>(c: {
    leftTable: TableDef<LeftKeys, LeftVal, LeftCustom>,
    joinWith: DependencyIndex<RK, RV, PK, PV>,
    joinOnKeys: ProviderKeyColMapping<LeftKeys, LeftVal, PK, LeftCustom>,
    joinWhereLeftTableCondition?: AggregateWhereCondition,
    conditionTrueIf: HasCondition<PK, PV>,
    createAggregationVal?: {
      sql: (provTable: string) => string
      upsert: false | {whereCondition: '= true' | '= false'}
    },
    createCustomObject?: CustomValSql<RightCustom>
  }
  ) {
    const provider = c.joinWith.providerDS.index
    const receiver = c.joinWith.receiverDS.index

    const {selectProviderKeys, joinOns} = this.aggSelectAndJoin(c.joinOnKeys);
    const createConditionSql = this.aggCondition(c.conditionTrueIf);
    const whereConditionSql = this.aggWhereCondition(c.joinWhereLeftTableCondition)
    const receiverValSql = this.aggCreateReceiverVal(c.createAggregationVal?.sql)
    const customObjectSql = this.aggCreateCustomObject<RightCustom>(c.createCustomObject)

    const aggTw = this.addTw()
    const depUpsertTw = this.addTw()
    let sql = `
    -- aggregate
    ${aggTw} AS (
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
        WHERE       tmsp_deleted IS NULL
                    ${whereConditionSql}
    ),
    -- insert or update dependencies
    ${depUpsertTw} AS (
        INSERT INTO
                    ${c.joinWith.schemaTable}
                    (${c.joinWith.keyCols}, tmsp_last_aggregation)
        SELECT DISTINCT ON (
          ${c.joinWith.providerKeyCols},
          ${c.joinWith.receiverKeyCols}
        )
                    --dep index keys
                    ${c.joinWith.providerKeyCols},
                    ${c.joinWith.receiverKeyCols},
                    --tmsp_last_aggregation
                    ${this.addParam(this.currentTimestamp)}
        FROM        ${aggTw}
        ON CONFLICT (${c.joinWith.keyCols})
        DO UPDATE
                    SET tmsp_last_aggregation = EXCLUDED.tmsp_last_aggregation
    )`;

    if (c.createAggregationVal?.upsert) {
      const whereCondition = c.createAggregationVal.upsert.whereCondition
      const {sql: s} = this.upsertAggResults(receiver, aggTw, whereCondition);

      sql = `${sql},
        ${s}
      `


    }
    const aggTableDef: TableDef<RK, PV, RightCustom> = {
      tableName: aggTw
    }

    return {sql, aggTableDef, depUpsertTw}
  }

   upsertAggResults<RK, RV>(
    receiver: DataIndexPostgres<RK, RV>,
    aggTw: string,
    whereCondition: AggregateWhereCondition) {
    const tw = this.addAggUpsertTw();
    const sql = `
      -- insert or update aggregation results
      ${tw} AS (
        INSERT INTO ${receiver.schemaTable} (${receiver.keyCols},val)
        SELECT DISTINCT ON (${receiver.keyDefs.map(k => `"r_${k.name}"`)})
        --receiver keys
        ${receiver.keyDefs.map(k => `"r_${k.name}"`)},
        --val
        val
        FROM        ${aggTw}
        WHERE       condition ${whereCondition}
        ON CONFLICT (${receiver.keyCols})
        DO UPDATE
        SET val = EXCLUDED.val
        WHERE
        EXCLUDED.val IS DISTINCT FROM ${receiver.schemaTable}.val
        RETURNING *
        )`;
    return {sql, tw};
  }

  private aggCreateReceiverVal(createReceiverVal?: ((provTable: string) => string)) {
    return !createReceiverVal ? `'{}'::jsonb` :
      createReceiverVal('t2');
  }

  private aggCreateCustomObject<M>(createCustomObject?: CustomValSql<M>) {
    return !createCustomObject ? `'{}'::jsonb` :
      createCustomObject('t2');
  }

  twCount() {
    const tw = this.addTw()
    let counts = 'SELECT 0 as count'
    if (this.aggUpsertTws.length) {
      counts = `${this.aggUpsertTws.map(aggUpsertTw => `SELECT count(*)::int FROM ${aggUpsertTw}`).join(' UNION ALL ')}`
    }
    const sql = `
    -- count nr of changes
    ${tw} AS (${counts})
    SELECT sum(count)::int as changes
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

  private aggWhereCondition(aggregateWhereHasVal?: AggregateWhereCondition) {
    return aggregateWhereHasVal ? `AND t1.condition ${aggregateWhereHasVal}` : '';
  }

  private createLeafCondition<PK, PV>(hasCondition: HasCondition<PK, PV>) {
    const conditions: string[] = [];
    const valConditions = hasCondition.providerVal;
    const keyConditions = hasCondition.providerKey;
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
    return conditions.join(' AND ');
  }
  private aggCondition<PK, PV>(hasCondition: HasCondition<PK, PV>): string {
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
    keyMapping: ProviderKeyColMapping<RK, RV, PK, LeftCustom>
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
