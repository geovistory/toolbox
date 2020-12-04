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
        SET full_text = ${tableAlias}.val->>'fullText'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND full_text IS DISTINCT FROM ${tableAlias}.val->>'fullText'`
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
                'classFieldLabel', t2.val->>'label'
            )`
        }
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

        // builder.registerUpsertHook()
        const count = builder.printQueries()
        // const count = builder.executeQueries()

        return count

    }
}

