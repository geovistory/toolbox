

import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
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

    batchSize = 10000
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
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const rentity = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depREntity,
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `jsonb_build_object('fkClass', (t2.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
        })
        const rEdges = await builder.joinProviderThroughDepIdx({
            leftTable: rentity.aggregation.tableDef,
            joinWithDepIdx: this.depREdge,
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
        const entityLabelConfCustom: CustomValSql<EntityLabelConfigVal> = (q) => {
            return `
                CASE WHEN (t1.custom->>'fkClass')::int = 365 THEN
                    ${q.addParam(JSON.stringify({
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
                ${q.addParam(JSON.stringify({
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
        const entityLabelConfig = await builder.joinProviderThroughDepIdx({
            leftTable: rentity.aggregation.tableDef,
            joinWithDepIdx: this.depProEntityLabelConfig,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT}
            },
            conditionTrueIf: {},
            createCustomObject: entityLabelConfCustom
        })

        /**
         * Expand Label parts for each entity
         */
        const labelPartsTbl = builder.createTableName();
        const createlabelPartsTbl = builder.createTableStmt(labelPartsTbl)
        const labelPartsSql = `
        -- expands all labelParts for each entity
        ${createlabelPartsTbl} (
            SELECT t1.*, jsonb_array_elements(t1.custom->'labelParts') label_part
            FROM ${entityLabelConfig.aggregation.tableDef.tableName} t1
        )`
        builder.registerTmpTable(labelPartsSql, [], labelPartsTbl)

        /**
         * expands all 'slots' per labelPart according to nrOfStatementsInLabel
         */
        const slotsTbl = builder.createTableName();
        const createSlotsTbl = builder.createTableStmt(slotsTbl)
        const slotsSql = `
        -- expands all 'slots' per labelPart according to nrOfStatementsInLabel
        ${createSlotsTbl} (
            SELECT
            t1."r_pkEntity",
            t1."p_pkClass",
            label_part->'field'->>'fkProperty' property,
            label_part->'field'->>'nrOfStatementsInLabel',
            CASE WHEN (label_part->'field'->'isOutgoing')::bool = true THEN 'outgoing' ELSE 'incoming' END direction,
            label_part->>'ordNum' fielOrdNum,
            generate_series(1,(label_part->'field'->'nrOfStatementsInLabel')::int) stmtOrdNum
            FROM ${labelPartsTbl} t1
        )`
        builder.registerTmpTable(slotsSql, [], slotsTbl)

        /**
         * expands all 'slots' per labelPart according to nrOfStatementsInLabel
         */
        const stmtsTbl = builder.createTableName();
        const createStmtsTbl = builder.createTableStmt(stmtsTbl)
        const stmtsSql = `
        -- joins slots with statements
        ${createStmtsTbl} (
            SELECT
                t1."r_pkEntity", t2.property, t2.direction, t2.fielOrdNum, t2.stmtOrdNum, t1.p_val->t2.direction->t2.property->(t2.stmtOrdNum-1) stmt
            FROM
                 ${rEdges.aggregation.tableDef.tableName} t1,
                 ${slotsTbl} t2
            WHERE
                t1."r_pkEntity"=t2."r_pkEntity"
        )`
        builder.registerTmpTable(stmtsSql, [], stmtsTbl)


        /**
         * stmts relevant for entity label
         */
        const finalTbl = builder.createTableName();
        const createFinalTbl = builder.createTableStmt(finalTbl)
        const finalSql = `
        -- stmts relevant for entity label
        ${createFinalTbl} (
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
            FROM ${stmtsTbl} t1
        )`
        const labelParts = builder.registerTmpTable<LabelPartKeys, never, LabelPartCustom>(finalSql, [], finalTbl)

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
        const remoteEntityLabel = await builder.joinProviderThroughDepIdx({
            leftTable: labelParts.tableDef,
            joinWithDepIdx: this.depREntityLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkTarget', type: 'int'}},
            },
            conditionTrueIf: {},
            createCustomObject: remoteEntityLabelCustom
        })

        // const hook = builder.twOnUpsertHook()

        /**
         * aggregate labels
         */
        const labelPartsTable = labelParts.tableDef.tableName
        const remoteEntityLabelTable = remoteEntityLabel.aggregation.tableDef.tableName
        const aggLabelsTbl = builder.createTableName();
        const createAggLabelsTbl = builder.createTableStmt(aggLabelsTbl)
        const aggLabelsSql = `
        -- aggregate entity labels
        ${createAggLabelsTbl} (
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
        )`
        const aggregateLabels =  builder.registerTmpTable<LabelPartKeys, never, LabelPartCustom>(aggLabelsSql, [], aggLabelsTbl)



        await builder.tmpTableUpsertAggregations(this.index, aggregateLabels.tableDef.tableName, '= true')
        builder.registerUpsertHook()
        // const count = builder.printQueries()
        const count = builder.executeQueries()

        return count
    }

    private aggregateLabels(
        builder: AggregatorSqlBuilder<REntityId, EntityLabelVal>,
        labelPartsTable: string,
        remoteEntityLabelTable: string
    ) {
        const tw = builder.createTableName();
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

    // private expandLabelParts(
    //     builder: AggregatorSqlBuilder<REntityId, EntityLabelVal>,
    //     entityLabelConfigTableName: string,
    //     aggTableDefTableName: string
    // ) {
    //     const labelPartsTw = builder.createTableName();
    //     const slotsTw = builder.createTableName();
    //     const stmtsTw = builder.createTableName();
    //     const finalTw = builder.createTableName();
    //     const sql = `
    //     -- expands all labelParts for each entity
    //     ${labelPartsTw} (
    //         SELECT t1.*, jsonb_array_elements(t1.custom->'labelParts') label_part
    //         FROM ${entityLabelConfigTableName} t1
    //     ),
    //     -- expands all 'slots' per labelPart according to nrOfStatementsInLabel
    //     ${slotsTw} AS (
    //         SELECT
    //         t1."r_pkEntity",
    //         t1."p_pkClass",
    //         label_part->'field'->>'fkProperty' property,
    //         label_part->'field'->>'nrOfStatementsInLabel',
    //         CASE WHEN (label_part->'field'->'isOutgoing')::bool = true THEN 'outgoing' ELSE 'incoming' END direction,
    //         label_part->>'ordNum' fielOrdNum,
    //         generate_series(1,(label_part->'field'->'nrOfStatementsInLabel')::int) stmtOrdNum
    //         FROM ${labelPartsTw} t1
    //     ),
    //     -- joins slots with statements
    //     ${stmtsTw} AS (
    //         SELECT
    //             t1."r_pkEntity", t2.property, t2.direction, t2.fielOrdNum, t2.stmtOrdNum, t1.p_val->t2.direction->t2.property->(t2.stmtOrdNum-1) stmt
    //         FROM
    //              ${aggTableDefTableName} t1,
    //              ${slotsTw} t2
    //         WHERE
    //             t1."r_pkEntity"=t2."r_pkEntity"
    //     ),
    //     -- stmts relevant for entity label
    //     ${finalTw} AS (
    //         SELECT
    //         t1."r_pkEntity",
    //         t1.property,
    //         t1.direction,
    //         t1.fielOrdNum,
    //         t1.stmtOrdNum,
    //         (t1.stmt->'targetIsEntity')::bool condition,
    //         jsonb_build_object(
    //             'fkTarget', (t1.stmt->'fkTarget')::int,
    //             'targetLabel', t1.stmt->>'targetLabel'
    //         ) custom
    //         FROM ${stmtsTw} t1
    //     )`;
    //     const tableDef: TableDef<LabelPartKeys, never, LabelPartCustom> = {
    //         tableName: finalTw
    //     }
    //     return {sql, tableDef};
    // }
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

