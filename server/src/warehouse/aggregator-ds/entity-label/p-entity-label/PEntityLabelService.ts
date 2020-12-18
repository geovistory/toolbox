import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityLabelConfigVal, ProEntityLabelConfigService} from '../../../primary-ds/ProEntityLabelConfigService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../Warehouse';
import {EntityLabelVal, LabelPartCustom, LabelPartKeys, labelPartsForAppeInLang365, labelPartsForNormalEntities} from '../entity-label.commons';

@Injectable()
export class PEntityLabelService extends AggregatedDataService2<PEntityId, EntityLabelVal>{
    // aggregator = PEntityLabelAggregator;
    // providers = PEntityLabelProviders;

    depPEntity: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, PEntity>
    depProEntityLabelConfig: DependencyIndex<PEntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>
    // depIdentifyingProperty: DependencyIndex<PEntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    depPEntityLabel: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>
    depPEdge: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityFields>

    batchSize= 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => ProEntityLabelConfigService)) entityLabelConfig: ProEntityLabelConfigService,
        // @Inject(forwardRef(() => IdentifyingPropertyService)) identifyingProperty: IdentifyingPropertyService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS({dataService: pEntity})
        this.depPEntity = this.addDepencency(pEntity);
        this.depProEntityLabelConfig = this.addDepencency(entityLabelConfig);
        // this.depIdentifyingProperty = this.addDepencency(identifyingProperty);
        this.depPEntityLabel = this.addDepencency(this);
        this.depPEdge = this.addDepencency(pEdge);
    }
    getDependencies() {
        return this
    };
    // onUpsertSql(tableAlias: string) {
    //     return `
    //     UPDATE war.entity_preview
    //     SET entity_label = val->>'entityLabel'
    //     FROM ${tableAlias}
    //     WHERE pk_entity = "pkEntity"
    //     AND project = "fkProject"
    //     AND entity_label IS DISTINCT FROM val->>'entityLabel'`
    // }

    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const pentity = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depPEntity,
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
                fkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `jsonb_build_object('fkClass', (t2.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
        })
        const pEdges = await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depPEdge,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
                fkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                or: [
                    {providerVal: {outgoing: 'is not {}', }},
                    {providerVal: {incoming: 'is not {}', }},
                ]
            },
            createCustomObject: ((provider) => `t1.custom`) as CustomValSql<{fkClass: number}>,
        })

        const customVal: CustomValSql<{
            fkClass: number,
            entityLabelConfig: EntityLabelConfigVal
        }> = () => `jsonb_build_object(
            'fkClass', t1.custom->>'fkClass',
            'entityLabelConfig', t2.val
        )`
        const pEntityLabelConfig = await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depProEntityLabelConfig,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
                fkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                providerKey: {pkClass: 'IS NOT NULL'}
            },
            createCustomObject: customVal,
        })
        const defaultEntityLabelConfig = await builder.joinProviderThroughDepIdx({
            leftTable: pEntityLabelConfig.aggregation.tableDef,
            joinWithDepIdx: this.depProEntityLabelConfig,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT}
            },
            conditionTrueIf: {},
            createCustomObject: customVal
        })



        /**
         * Expand Label parts for each entity
         */
        const labelPartsTbl = builder.createTableName();
        const createlabelPartsTbl = builder.createTableStmt(labelPartsTbl)

        const labelPartsSql = `
        -- expands all labelParts for each entity
        ${createlabelPartsTbl} (
            WITH tw1 AS (
                SELECT
                t1. "r_pkEntity",
                t1. "r_fkProject",
                t1. "p_pkClass",
                CASE WHEN (t1.custom->>'fkClass')::int = 365 THEN
                    '${JSON.stringify(labelPartsForAppeInLang365)}'::jsonb
                WHEN t1.custom ->'entityLabelConfig'->> 'labelParts' IS NOT NULL THEN
                    t1.custom ->'entityLabelConfig'-> 'labelParts'
                WHEN t2.custom ->'entityLabelConfig'->> 'labelParts' IS NOT NULL THEN
                    t2.custom ->'entityLabelConfig'-> 'labelParts'
                ELSE
                '${JSON.stringify(labelPartsForNormalEntities)}'::jsonb
                END label_parts
                FROM ${pEntityLabelConfig.aggregation.tableDef.tableName} t1
                LEFT JOIN ${defaultEntityLabelConfig.aggregation.tableDef.tableName} t2
                ON t1. "r_pkEntity" = t2. "r_pkEntity"
                AND t1. "r_fkProject" = t2. "r_fkProject"
            )
            SELECT t1.*, jsonb_array_elements(label_parts) label_part
            FROM tw1 t1
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
            t1."r_fkProject",
            t1."p_pkClass",
            label_part->'field'->>'fkProperty' property,
            label_part->'field'->>'nrOfStatementsInLabel',
            CASE WHEN (label_part->'field'->>'isOutgoing')::bool = true THEN 'outgoing' ELSE 'incoming' END direction,
            label_part->>'ordNum' fielOrdNum,
            generate_series(1,(label_part->'field'->>'nrOfStatementsInLabel')::int) stmtOrdNum
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
                t1."r_pkEntity", t1."r_fkProject", t2.property, t2.direction, t2.fielOrdNum, t2.stmtOrdNum, t1.p_val->t2.direction->t2.property->(t2.stmtOrdNum-1) stmt
            FROM
                 ${pEdges.aggregation.tableDef.tableName} t1,
                 ${slotsTbl} t2
            WHERE
                t1."r_pkEntity"=t2."r_pkEntity"
            AND
                 t1."r_fkProject"=t2."r_fkProject"

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
            t1."r_fkProject",
            t1.property,
            t1.direction,
            t1.fielOrdNum,
            t1.stmtOrdNum,
            (t1.stmt->>'targetIsEntity')::bool condition,
            jsonb_build_object(
                'fkTarget', (t1.stmt->>'fkTarget')::int,
                'targetLabel', t1.stmt->>'targetLabel'
            ) custom
            FROM ${stmtsTbl} t1
        )`
        const labelParts = builder.registerTmpTable<LabelPartKeys & {fkProject: number}, never, LabelPartCustom>(finalSql, [], finalTbl)

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
            joinWithDepIdx: this.depPEntityLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkTarget', type: 'int'}},
                fkProject: {leftCol: 'fkProject'}
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
            t1."r_fkProject",
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
            ON t1."r_pkEntity"=t2."r_pkEntity"
            AND t1."r_fkProject"=t2."r_fkProject"
            AND t1.property=t2.custom->>'property'
            AND t1.direction=t2.custom->>'direction'
            AND t1.fielOrdNum=t2.custom->>'fielOrdNum'
            AND t1.stmtOrdNum=(t2.custom->>'stmtOrdNum')::int
            GROUP BY t1."r_pkEntity", t1."r_fkProject"
        )`
        const aggregateLabels = builder.registerTmpTable<LabelPartKeys, never, LabelPartCustom>(aggLabelsSql, [], aggLabelsTbl)



        await builder.tmpTableUpsertAggregations(this.index, aggregateLabels.tableDef.tableName, '= true')
        builder.registerUpsertHook()
        // await builder.printQueries()
        const count = builder.executeQueries()

        return count
    }


}

