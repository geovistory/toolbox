/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {PClassId, ProClassFieldsConfigService, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService';
import {Warehouse, PK_DEFAULT_CONFIG_PROJECT} from '../../../Warehouse';
import {PClassFieldLabelId, PClassFieldLabelService, PClassFieldLabelVal} from '../../class-field-label/p-class-field-label/PClassFieldLabelService';
import {PClassLabelService, PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {PEntityLabelService} from '../../entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {PEntityFullTextAggregator} from './PEntityFullTextAggregator';
import {PEntityFullTextProviders} from './PEntityFullTextPoviders';
import {PoolClient} from 'pg';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';

export interface PEntityFullTextVal {fullText?: string};

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityFullTextVal (fkType, typeLabel)
 *
 * One example key-value pair in the this.index is:
 * Key for the Project Entity Geo. Place 'Madrid' with pkEntity = 2002 in fkProject = 3001
 *  - '2002_3001'
 *
 * Val for the Geo. Place Type 'City' with pkEntity = 2003 in fkProject = 3001
 *  - fkType: 2003
 *  - typeLabel: 'Citiy'
 *
 *
 *
 * -> The Val is the result of the PEntityFullTextAggregator
 *
 */
@Injectable()
export class PEntityFullTextService extends AggregatedDataService2<PEntityId, PEntityFullTextVal>{
    creatorDS: PEntityService
    aggregator = PEntityFullTextAggregator;
    providers = PEntityFullTextProviders;
    depPEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, PEntity>
    depPEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityLabelVal>
    depREntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, REntityId, EntityLabelVal>
    depPEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    depPClassLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, PClassLabelVal>
    depPClassFields: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>
    depPClassFieldLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassFieldLabelId, PClassFieldLabelVal>
    batchSize = 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PEntityLabelService)) pEntityLabel: PEntityLabelService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
        @Inject(forwardRef(() => PClassLabelService)) pClassLabel: PClassLabelService,
        @Inject(forwardRef(() => ProClassFieldsConfigService)) pClassFields: ProClassFieldsConfigService,
        @Inject(forwardRef(() => PClassFieldLabelService)) pClassFieldLabel: PClassFieldLabelService,
    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS(pEntity)

        this.depPEntity = this.addDepencency(pEntity);
        this.depPEntityLabel = this.addDepencency(pEntityLabel);
        this.depREntityLabel = this.addDepencency(rEntityLabel);
        this.depPEdge = this.addDepencency(pEdge);
        this.depPClassLabel = this.addDepencency(pClassLabel);
        this.depPClassFields = this.addDepencency(pClassFields);
        this.depPClassFieldLabel = this.addDepencency(pClassFieldLabel);
    }


    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET full_text = val->>'fullText'
        FROM ${tableAlias}
        WHERE pk_entity = "pkEntity"
        AND project = "fkProject"
        AND full_text IS DISTINCT FROM val->>'fullText'`
    }
    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)
        const pEntity = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depPEntity,
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
                pkEntity: {leftCol: 'pkEntity'}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `jsonb_build_object('fkClass', (t2.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
        })

        const pEdges = await builder.joinProviderThroughDepIdx({
            leftTable: pEntity.aggregation.tableDef,
            joinWithDepIdx: this.depPEdge,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
                pkEntity: {leftCol: 'pkEntity'}
            },
            conditionTrueIf: {
                or: [
                    {providerVal: {outgoing: 'is not {}', }},
                    {providerVal: {incoming: 'is not {}', }},
                ]
            },
            createCustomObject: ((provider) => `jsonb_build_object(
                'fkClass', (t1.custom->>'fkClass')::int,
                'edges', t2.val
                )
            `) as CustomValSql<{
                fkClass: number,
                edges: EntityFields
            }>,
        })

        // first look for config of this project
        const projectClassFields = await builder.joinProviderThroughDepIdx({
            leftTable: pEntity.aggregation.tableDef,
            joinWithDepIdx: this.depPClassFields,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}}
            },
            conditionTrueIf: {
                providerKey: {pkClass: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `jsonb_build_object(
                'fkClass', (t1.custom->>'fkClass')::int,
                'classFields', t2.val
                )
            `) as CustomValSql<{
                fkClass: number,
                edges: EntityFields,
                classFields: ProClassFieldVal
            }>,
        })

        // second look for config of default config project
        const defaultClassFields = await builder.joinProviderThroughDepIdx({
            leftTable: projectClassFields.aggregation.tableDef,
            joinWithDepIdx: this.depPClassFields,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                fkProject: {value: PK_DEFAULT_CONFIG_PROJECT},
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}}
            },
            conditionTrueIf: {
                providerKey: {pkClass: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `jsonb_build_object(
                'fkClass', (t1.custom->>'fkClass')::int,
                'classFields', t2.val
                )
            `) as CustomValSql<{
                fkClass: number,
                edges: EntityFields,
                classFields: ProClassFieldVal
            }>,
        })

        /**
         * expand entity fields (statements grouped by property and direction)
         */
        const entityFieldsTbl = builder.createTableName();
        const createEntityFieldsTbl = builder.createTableStmt(entityFieldsTbl)
        const entityFieldsSql = `
        -- expand entity fields (statements grouped by property and direction)
        ${createEntityFieldsTbl} (
            SELECT
                t1."r_pkEntity",
                t1."r_fkProject",
                jsonb_build_object (
                    'fk_class', t1.custom->>'fkClass',
                    'fk_property', jsonb_object_keys(t1.custom->'edges'->'incoming'),
                    'direction', 'incoming',
                    'is_outgoing', false
                ) custom
            FROM ${pEdges.aggregation.tableDef.tableName} t1
            UNION ALL
            SELECT
                t1."r_pkEntity",
                t1."r_fkProject",
                jsonb_build_object (
                    'fk_class', t1.custom->>'fkClass',
                    'fk_property', jsonb_object_keys(t1.custom->'edges'->'outgoing'),
                    'direction', 'outgoing',
                    'is_outgoing', true
                ) custom
            FROM ${pEdges.aggregation.tableDef.tableName} t1
        )`
        const entityFields = builder.registerTmpTable<{
            pkEntity: number,
            fkProject: number,
        }, {
            fk_class: number,
            fk_property: number,
            direction: 'outgoing' | 'incoming',
            is_outgoing: boolean
        }, never>(entityFieldsSql, [], entityFieldsTbl)


        const classFieldLabelCustom: CustomValSql<{
            pkEntity: number
            fkProject: number
            fkClass: number
            fkProperty: number
            isOutgoing: boolean
        }> = () => {
            return `jsonb_build_object(
                'pkEntity',  t1."r_pkEntity",
                'fkProject', t1."r_fkProject",
                'fkClass', t1.custom->>'fk_class',
                'fkProperty', t1.custom->>'fk_property',
                'isOutgoing', t1.custom->>'is_outgoing',
                'direction', t1.custom->>'direction',
                'classFieldLabel', t2.val->>'label'
            )`
        }

        /**
         * join class field labels throug dep index
         */
        const classFieldLabel = await builder.joinProviderThroughDepIdx({
            leftTable: entityFields.tableDef,
            joinWithDepIdx: this.depPClassFieldLabel,
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
                fkClass: {leftCustom: {name: 'fk_class', type: 'int'}},
                fkProperty: {leftCustom: {name: 'fk_property', type: 'int'}},
                isOutgoing: {leftCustom: {name: 'is_outgoing', type: 'bool'}},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createCustomObject: classFieldLabelCustom
        })

        /**
         * expand edges (max. 10 per entity field) and join with field order
         */
        const edgesTbl = builder.createTableName();
        const createEdgesTbl = builder.createTableStmt(edgesTbl)
        const edgesSql = `
        -- expand entity fields (statements grouped by property and direction)
        ${createEdgesTbl} (
            WITH tw1 AS (
                -- left join class fields (to get ord number)
                SELECT
                  t1. *,
                  t1.custom ->> 'fkClass' fk_class,
                  CASE
                    WHEN t2.custom ->> 'classFields' IS NOT NULL THEN t2.custom -> 'classFields'
                    ELSE t3.custom -> 'classFields'
                  END class_fields
                FROM
                  ${pEdges.aggregation.tableDef.tableName} t1
                  LEFT JOIN ${projectClassFields.aggregation.tableDef.tableName} t2 ON t1. "r_pkEntity" = t2. "r_pkEntity"
                  AND t1. "r_fkProject" = t2. "r_fkProject"
                  LEFT JOIN ${defaultClassFields.aggregation.tableDef.tableName}  t3 ON t1. "r_pkEntity" = t3. "r_pkEntity"
                  AND t1. "r_fkProject" = t3. "r_fkProject"
            )
            SELECT
                -- statements and ord number of field
                t1. "r_pkEntity",
                t1. "r_fkProject",
                jsonb_build_object(
                    'fkClass', t1.fk_class,
                    'fkProperty', t2.custom ->> 'fkProperty',
                    'isOutgoing', t2.custom ->> 'isOutgoing',
                    'classFieldLabel', t2.custom->>'classFieldLabel',
                    'fieldOrder', t1.class_fields -> (t2.custom ->> 'direction') -> (t2.custom ->> 'fkProperty') -> 'ordNum',
                    'stmtOrder', x.stmt_order,
                    'edge', x.edge,
                    'fkTarget', x.edge->>'fkTarget'
                ) custom,
                (x.edge->>'targetIsEntity')::bool condition
            FROM
                tw1 t1
                JOIN ${classFieldLabel.aggregation.tableDef.tableName} t2 ON t1. "r_pkEntity" = (t2.custom ->> 'pkEntity') :: int
                AND t1. "r_fkProject" = (t2.custom ->> 'fkProject') :: int
                cross join lateral (
                select
                    *
                from
                    jsonb_array_elements(
                    t1.custom -> 'edges' -> (t2.custom ->> 'direction') -> (t2.custom ->> 'fkProperty')
                    ) with ordinality as x(edge, stmt_order)
                order by
                    x.stmt_order
                limit
                    10 -- maximally 10
                ) x
        )
        `
        const edges = builder.registerTmpTable<{
            pkEntity: number,
            fkProject: number,
        }, {
            fkClass: number,
            fkProperty: number,
            isOutgoing: boolean,
            classFieldLabel?: string,
            fieldOrder?: number,
            stmtOrder?: number,
            fkTarget?: number
        }, never>(edgesSql, [], edgesTbl)



        /**
         * join pEntityLabel
         */
        const pEntityLabel = await builder.joinProviderThroughDepIdx({
            leftTable: edges.tableDef,
            joinWithDepIdx: this.depPEntityLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
                pkEntity: {leftCustom: {name: 'fkTarget', type: 'int'}}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `jsonb_insert(t1.custom, '{targetEntityLabel}', t2.val->'entityLabel')
            `) as CustomValSql<{
                fkClass: number,
                fkProperty: number,
                isOutgoing: boolean,
                classFieldLabel?: string,
                fieldOrder?: number,
                stmtOrder?: number,
                fkTarget?: number,
                targetEntityLabel?: string
            }>,
        })
        /**
         * join rEntityLabel where no pEntityLabel
         */
        const rEntityLabel = await builder.joinProviderThroughDepIdx({
            leftTable: pEntityLabel.aggregation.tableDef,
            joinWithDepIdx: this.depREntityLabel,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkTarget', type: 'int'}}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `jsonb_insert(t1.custom, '{targetEntityLabel}', t2.val->'entityLabel')
            `) as CustomValSql<{
                fkClass: number,
                fkProperty: number,
                isOutgoing: boolean,
                classFieldLabel?: string,
                fieldOrder?: number,
                stmtOrder?: number,
                fkTarget?: number,
                targetEntityLabel?: string
            }>
        })
        /**
         * aggregate texts provided by edges (directed statements)
         */
        const textsTbl = builder.createTableName();
        const createTextsTbl = builder.createTableStmt(textsTbl)
        const textsSql = `
        -- aggregate texts provided by edges (directed statements)
        ${createTextsTbl} (
            WITH tw1 AS(
                SELECT
                t2.custom->>'classFieldLabel' ||': '|| string_agg(
                    '''' ||
                    coalesce(
                        t2.custom->'edge'->>'targetLabel',
                        t3.custom->>'targetEntityLabel',
                        t3.custom->>'targetEntityLabel'
                    )
                    || ''''
                    , ', '
                    ORDER BY
                    (t2.custom->'edge'->>'fieldOrder')::int
                ) as field_text,
                t1."r_pkEntity",
                t1."r_fkProject",
                t2.custom->'fkProperty',
                t2.custom->'isOutgoing',
                t5.custom->>'fkClass' fk_class,
                (t2.custom ->> 'fieldOrder') :: int fieldOrder
                FROM ${builder.batchTmpTable.tableDef.tableName} t1
                LEFT JOIN ${edges.tableDef.tableName} t2
                    ON t1."r_pkEntity" = t2."r_pkEntity"
                    AND t1."r_fkProject" = t2."r_fkProject"
                LEFT JOIN ${pEntityLabel.aggregation.tableDef.tableName} t3
                    ON (t2.custom->'edge'->>'fkStatement')::int = (t3.custom->'edge'->>'fkStatement')::int
                    AND (t2.custom->'edge'->>'fkTarget')::int = (t3.custom->'edge'->>'fkTarget')::int
                    AND t2."r_fkProject" = t3."r_fkProject"
                LEFT JOIN ${rEntityLabel.aggregation.tableDef.tableName} t4
                    ON (t2.custom->'edge'->>'fkStatement')::int = (t4.custom->'edge'->>'fkStatement')::int
                    AND (t2.custom->'edge'->>'fkTarget')::int = (t4.custom->'edge'->>'fkTarget')::int
                    AND t2."r_fkProject" = t3."r_fkProject"
                LEFT JOIN tw_0_2 t5 ON t1. "r_pkEntity" = t5. "r_pkEntity"
                    AND t1. "r_fkProject" = t5. "r_fkProject"
                GROUP BY
                t1."r_pkEntity",
                t1."r_fkProject",
                t5.custom->>'fkClass',
                t2.custom->'fkProperty',
                t2.custom->'isOutgoing',
                t2.custom->>'classFieldLabel',
                t2.custom ->> 'fieldOrder'
            )
            -- group by entity

            SELECT
            t2."r_pkEntity",
            t2."r_fkProject",
            jsonb_build_object(
                'fkClass', t2.fk_class,
                'texts', string_agg(field_text, ', '  ORDER BY  t2.fieldOrder :: int ASC)
            ) custom,
            t2.fk_class IS NOT NULL condition
            FROM tw1 t2
            GROUP BY
            t2."r_pkEntity",
            t2."r_fkProject",
            t2.fk_class
        )
        `
        const texts = builder.registerTmpTable<{
            pkEntity: number,
            fkProject: number,
        },
            never,
            {
                texts: string,
                fkClass: string
            }
        >(textsSql, [], textsTbl)

        /**
        * join pClassLabel
        */
        const classLabel = await builder.joinProviderThroughDepIdx({
            leftTable: texts.tableDef,
            joinWithDepIdx: this.depPClassLabel,
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
            },
            conditionTrueIf: {
                providerVal: {label: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `jsonb_insert(t1.custom, '{classLabel}', t2.val->'label')
            `) as CustomValSql<{
                fkClass: number,
                fkProperty: number,
                isOutgoing: boolean,
                classFieldLabel?: string,
                fieldOrder?: number,
                stmtOrder?: number,
                fkTarget?: number,
                targetEntityLabel?: string
                classLabel?: string
            }>
        })
        /**
         * create final table concatenating class label and texts from edges
         */
        const finalTbl = builder.createTableName();
        const createfinalTbl = builder.createTableStmt(finalTbl)
        const finalSql = `
        -- create final table
        ${createfinalTbl} (
            SELECT
                "r_pkEntity",
                "r_fkProject",
                jsonb_build_object(
                    'fullText', (custom->>'classLabel' )::text ||' – ' || (custom->>'texts' )::text
                ) val
            FROM ${classLabel.aggregation.tableDef.tableName}
        )
        `
        const final = builder.registerTmpTable<{
            pkEntity: number,
            fkProject: number,
        },
            PEntityFullTextVal,
            never
        >(finalSql, [], finalTbl)




        await builder.tmpTableUpsertAggregations(this.index, final.tableDef.tableName)

        builder.registerUpsertHook()
        // await builder.printQueries()
        const count = builder.executeQueries()

        return count

    }
}

