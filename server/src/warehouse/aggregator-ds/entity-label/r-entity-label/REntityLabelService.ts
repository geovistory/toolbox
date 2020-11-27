

import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {logSql} from '../../../../utils/helpers';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql, TableDef} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {REdgeService} from '../../../primary-ds/edge/REdgeService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityLabelConfigVal, ProEntityLabelConfigService} from '../../../primary-ds/ProEntityLabelConfigService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../Warehouse';
import {IdentifyingPropertyService, IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {EntityLabelVal} from '../entity-label.commons';
import {REntityLabelAggregator} from './REntityLabelAggregator';
import {REntityLabelProviders} from './REntityLabelPoviders';

@Injectable()
export class REntityLabelService extends AggregatedDataService2<REntityId, EntityLabelVal>{
    creatorDS: REntityService
    aggregator = REntityLabelAggregator;
    providers = REntityLabelProviders;

    depREntity: DependencyIndex<REntityId, EntityLabelVal, REntityId, REntity>
    depProEntityLabelConfig: DependencyIndex<REntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>
    depIdentifyingProperty: DependencyIndex<REntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    depREntityLabel: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityLabelVal>
    depREdge: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityFields>

    batchSize = 100
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => ProEntityLabelConfigService)) private proEntityLabelConfig: ProEntityLabelConfigService,
        @Inject(forwardRef(() => IdentifyingPropertyService)) private identifyingProperty: IdentifyingPropertyService,
        @Inject(forwardRef(() => REdgeService)) private rEdge: REdgeService,
        @Inject(forwardRef(() => REntityService)) private rEntity: REntityService,
    ) {
        super(
            wh,
            rEntityKeyDefs
        )

        this.registerCreatorDS(this.rEntity)

        this.depREntity = this.addDepencency(this.rEntity)
        this.depProEntityLabelConfig = this.addDepencency(this.proEntityLabelConfig)
        this.depIdentifyingProperty = this.addDepencency(this.identifyingProperty)
        this.depREntityLabel = this.addDepencency(this)
        this.depREdge = this.addDepencency(this.rEdge)

    }


    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET entity_label = val->>'entityLabel'
        FROM ${tableAlias}
        WHERE pk_entity = "pkEntity"
        AND project = 0
        AND entity_label IS DISTINCT FROM val->>'entityLabel'`
    }


    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        let changes = 0
        const builder = new AggregatorSqlBuilder(this, currentTimestamp)

        // helpful for debugging
        // const res = await client.query(`
        // SELECT  string_agg( '(' || ${this.index.keyDefs.map(k => `"${k.name}" `).join(` || ',' || `)} || ')', ', ')
        // FROM ${this.tempTable}
        // LIMIT ${limit} OFFSET ${offset}
        // `)
        // console.log('\n')
        // console.log(res?.rows?.[0]?.string_agg)


        const twBatch = builder.twBatch(limit, offset)

        const rentity = builder.joinProviderThroughDepIdx({
            leftTable: twBatch.tableDef,
            joinWith: this.depREntity,
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `jsonb_build_object('fkClass', (${provider}.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
        })
        const rEdges = builder.joinProviderThroughDepIdx({
            leftTable: rentity.aggTableDef,
            joinWith: this.depREdge,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'}
            },
            conditionTrueIf: {
                or: [
                    {providerVal: {outgoing: 'is not {}', }},
                    {providerVal: {incoming: 'is not {}', }},
                ]
            },
            createCustomObject: ((provider) => `t1.custom`) as CustomValSql<{fkClass: number}>,
        })
        const entityLabelConfCustom: CustomValSql<EntityLabelConfigVal> = () => {
            return `
                CASE WHEN (t1.custom->>'fkClass')::int = 365 THEN
                    ${builder.addParam(JSON.stringify({
                labelParts: [
                    {
                        ordNum: 1,
                        field: {
                            fkProperty: 1113,
                            isOutgoing: true,
                            nrOfStatementsInLabel: 1
                        }
                    }
                ]
            }))}::jsonb
                WHEN t2.val->>'labelParts' IS NOT NULL THEN
                    t2.val
                ELSE
                ${builder.addParam(JSON.stringify({
                labelParts: [
                    {
                        ordNum: 1,
                        field: {
                            fkProperty: 1111,
                            isOutgoing: false,
                            nrOfStatementsInLabel: 1
                        }
                    }
                ]
            }))}::jsonb
                END
            `
        }
        const entityLabelConfig = builder.joinProviderThroughDepIdx({
            leftTable: rentity.aggTableDef,
            joinWith: this.depProEntityLabelConfig,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT}
            },
            conditionTrueIf: {},
            createCustomObject: entityLabelConfCustom
        })

        const labelParts = this.expandLabelParts(
            builder,
            entityLabelConfig.aggTableDef.tableName,
            rEdges.aggTableDef.tableName
        );

        const remoteEntityLabelCustom: CustomValSql<{
            string: string
            pkEntity: number
            property: number
            direction: string
            fielOrdNum: number
            stmtOrdNum: number
            condition: boolean
        }> = () => {
            return `jsonb_build_object(
                'string', t2.val->>'entityLabel',
                'r_pkEntity', t1."r_pkEntity",
                'property', t1.property,
                'direction', t1.direction,
                'fielOrdNum', t1.fielOrdNum,
                'stmtOrdNum', t1.stmtOrdNum
            )`
        }
        const remoteEntityLabel = builder.joinProviderThroughDepIdx({
            leftTable: labelParts.tableDef,
            joinWith: this.depREntityLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkTarget', type: 'int'}},
            },
            conditionTrueIf: {},
            createCustomObject: remoteEntityLabelCustom
        })

        // const hook = builder.twOnUpsertHook()
        const labelPartsTable = labelParts.tableDef.tableName
        const remoteEntityLabelTable = remoteEntityLabel.aggTableDef.tableName
        const aggregateLabels = this.aggregateLabels(builder, labelPartsTable, remoteEntityLabelTable);

        const upsertAggregations = builder.upsertAggResults(this.index, aggregateLabels.tw, '= true')
        const hook = builder.twOnUpsertHook()
        const count = builder.twCount()

        const sql = `
        ${twBatch.sql},
        ${rentity.sql},
        ${rEdges.sql},
        ${entityLabelConfig.sql},
        ${labelParts.sql},
        ${remoteEntityLabel.sql},
        ${aggregateLabels.sql},
        ${upsertAggregations.sql},
        ${hook.sql},
        ${count.sql}
        `
        logSql(sql, builder.params)

        const result = await client.query<{changes: number;}>(
            sql, builder.params);
        changes = result.rows?.[0].changes ?? 0;

        return changes
    }

    private aggregateLabels(
        builder: AggregatorSqlBuilder<REntityId, EntityLabelVal>,
        labelPartsTable: string,
        remoteEntityLabelTable: string
    ) {
        const tw = builder.addTw();
        const sql = `
        ${tw} AS (
            SELECT
            t1."r_pkEntity",
            jsonb_build_object(
                'entityLabel', coalesce(
                    string_agg(
                        coalesce(
                            t2.custom->>'string',
                            t1.custom->>'targetLabel'
                            -- if we ever implement a placeholder for not available stmt, put val here
                        ),
                        ', '
                        ORDER BY t1.fielOrdNum ASC,t1.stmtOrdNum ASC
                    ),
                    '(no label)'
                ),
                'labelMissing', string_agg(coalesce( t2.custom->>'string', t1.custom->>'targetLabel' ),'') IS NULL
            ) val,
            true::boolean condition
            FROM ${labelPartsTable} t1
            LEFT JOIN ${remoteEntityLabelTable} t2
            ON t1."r_pkEntity"=(t2.custom->>'r_pkEntity')::int
            AND t1.property=t2.custom->>'property'
            AND t1.direction=t2.custom->>'direction'
            AND t1.fielOrdNum=t2.custom->>'fielOrdNum'
            AND t1.stmtOrdNum=(t2.custom->>'stmtOrdNum')::int
            GROUP BY t1."r_pkEntity"
        )
        `;
        return {sql, tw}
    }

    private expandLabelParts(
        builder: AggregatorSqlBuilder<REntityId, EntityLabelVal>,
        entityLabelConfigTableName: string,
        aggTableDefTableName: string
    ) {
        const labelPartsTw = builder.addTw();
        const slotsTw = builder.addTw();
        const stmtsTw = builder.addTw();
        const finalTw = builder.addTw();
        const sql = `
        -- expands all labelParts for each entity
        ${labelPartsTw} AS(
            SELECT t1.*, jsonb_array_elements(t1.custom->'labelParts') label_part
            FROM ${entityLabelConfigTableName} t1
        ),
        -- expands all 'slots' per labelPart according to nrOfStatementsInLabel
        ${slotsTw} AS (
            SELECT
            t1."r_pkEntity",
            t1."p_pkClass",
            label_part->'field'->>'fkProperty' property,
            label_part->'field'->>'nrOfStatementsInLabel',
            CASE WHEN (label_part->'field'->'isOutgoing')::bool = true THEN 'outgoing' ELSE 'incoming' END direction,
            label_part->>'ordNum' fielOrdNum,
            generate_series(1,(label_part->'field'->'nrOfStatementsInLabel')::int) stmtOrdNum
            FROM ${labelPartsTw} t1
        ),
        -- joins slots with statements
        ${stmtsTw} AS (
            SELECT
                t1."r_pkEntity", t2.property, t2.direction, t2.fielOrdNum, t2.stmtOrdNum, t1.p_val->t2.direction->t2.property->(t2.stmtOrdNum-1) stmt
            FROM
                 ${aggTableDefTableName} t1,
                 ${slotsTw} t2
            WHERE
                t1."r_pkEntity"=t2."r_pkEntity"
        ),
        -- label relevant stmts
        ${finalTw} AS (
            SELECT
            t1."r_pkEntity",
            t1.property,
            t1.direction,
            t1.fielOrdNum,
            t1.stmtOrdNum,
            (t1.stmt->'targetIsEntity')::bool condition,
            jsonb_build_object(
                'fkTarget', (t1.stmt->'fkTarget')::int,
                'targetLabel', t1.stmt->>'targetLabel'
            ) custom
            FROM ${stmtsTw} t1
        )`;
        const tableDef: TableDef<LabelPartKeys, never, LabelPartCustom> = {
            tableName: finalTw
        }
        return {sql, tableDef};
    }
}

interface LabelPartKeys {
    pkEntity: number,
    property: number
    direction: string
    fielOrdNum: number
    stmtOrdNum: number
    condition: boolean
    fkEntity: number
}
interface LabelPartCustom {
    targetLabel: string,
    fkTarget: number,
}
/*****
 * OLD AGGREGATOR
 *
 */


// import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
// import {REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
// import {Warehouse} from '../../../Warehouse';
// import {EntityLabelVal} from '../entity-label.commons';
// import {REntityLabelAggregator} from './REntityLabelAggregator';
// import {REntityLabelProviders} from './REntityLabelPoviders';

// @Injectable()
// export class REntityLabelService extends AggregatedDataService<REntityId, EntityLabelVal>{
//     creatorDS: REntityService
//     aggregator = REntityLabelAggregator;
//     providers = REntityLabelProviders;
//     constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
//         super(
//             wh,
//             rEntityKeyDefs
//         )

//         this.registerCreatorDS(this.wh.prim.rEntity)

//     }

//     getDependencies() {
//         return this.wh.dep.rEntityLabel
//     };
//     onUpsertSql(tableAlias: string) {
//         return `
//         UPDATE war.entity_preview
//         SET entity_label = ${tableAlias}.val->>'entityLabel'
//         FROM ${tableAlias}
//         WHERE pk_entity = ${tableAlias}."pkEntity"
//         AND project = 0
//         AND entity_label IS DISTINCT FROM ${tableAlias}.val->>'entityLabel'`
//     }
// }

