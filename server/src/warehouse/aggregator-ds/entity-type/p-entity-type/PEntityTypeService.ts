import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {DfhClassHasTypePropertyService, DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {PEntityLabelService} from '../../entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {PEntityTypeAggregator} from './PEntityTypeAggregator';
import {PEntityTypeProviders} from './PEntityTypePoviders';

export interface PEntityTypeVal {
    fkType?: number,
    typeLabel?: string
}

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityTypeVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityTypeAggregator
 *
 */
@Injectable()
export class PEntityTypeService extends AggregatedDataService2<PEntityId, PEntityTypeVal>{
    creatorDS: PEntityService
    aggregator = PEntityTypeAggregator;
    providers = PEntityTypeProviders;

    depPEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, PEntity>
    depPEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityLabelVal>
    depREntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, REntityId, EntityLabelVal>
    depPEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityFields>
    depDfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>
    batchSize: 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PEntityLabelService)) pEntityLabel: PEntityLabelService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
        @Inject(forwardRef(() => DfhClassHasTypePropertyService)) dfhClassHasTypeProp: DfhClassHasTypePropertyService,
    ) {
        super(
            wh,
            pEntityKeyDefs
        )

        this.registerCreatorDS(pEntity)
        this.depPEntity = this.addDepencency(pEntity)
        this.depPEntityLabel = this.addDepencency(pEntityLabel)
        this.depREntityLabel = this.addDepencency(rEntityLabel)
        this.depPEdge = this.addDepencency(pEdge)
        this.depDfhClassHasTypeProp = this.addDepencency(dfhClassHasTypeProp)

    }

    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET type_label = val->>'typeLabel',
            fk_type = (val->>'fkType')::int
        FROM ${tableAlias}
        WHERE pk_entity = "pkEntity"
        AND project = "fkProject"
        AND (
            type_label IS DISTINCT FROM val->>'typeLabel'
            OR
            fk_type IS DISTINCT FROM (val->>'fkType')::int
        )`
    }
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
        const dfhClassHasTypeProp = await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depDfhClassHasTypeProp,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
            },
            conditionTrueIf: {
                providerVal: {fkProperty: 'IS NOT NULL'}
            },
            createCustomObject: ((provider) => `t2.val`) as CustomValSql<DfhClassHasTypePropVal>,
            // upsert no entity type where fk property is null
            createAggregationVal: {
                sql: () => `jsonb_build_object()`,
                upsert: {
                    whereCondition: '= false'
                }
            }
        })

        const pEdges = await builder.joinProviderThroughDepIdx({
            leftTable: dfhClassHasTypeProp.aggregation.tableDef,
            joinWithDepIdx: this.depPEdge,
            // join only where fk property is is given
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
                fkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                custom: `t2.val->'outgoing'->(t1.custom->>'fkProperty')->0->'fkTarget' IS NOT NULL`
            },
            createCustomObject: ((provider) =>
                `jsonb_build_object('fkType', t2.val->'outgoing'->(t1.custom->>'fkProperty')->0->'fkTarget')`) as CustomValSql<{fkType?: number}>,
        })


        const remotePEntityLabel = await builder.joinProviderThroughDepIdx({
            leftTable: pEdges.aggregation.tableDef,
            joinWithDepIdx: this.depPEntityLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkType', type: 'int'}},
                fkProject: {leftCol: 'fkProject'}
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkType?: number}>,
            createAggregationVal: {
                sql: () => `jsonb_build_object(
                    'entityTypeLabel', t2.val->>'entityLabel',
                    'fkType', t1.custom->>'fkType'
                )`,
                upsert: {
                    whereCondition: '= true'
                }
            }
        })


        await builder.joinProviderThroughDepIdx({
            leftTable: remotePEntityLabel.aggregation.tableDef,
            joinWithDepIdx: this.depREntityLabel,
            joinWhereLeftTableCondition: '= false',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkType', type: 'int'}}
            },
            conditionTrueIf: {},
            createAggregationVal: {
                sql: () => `jsonb_build_object(
                    'entityTypeLabel', t2.val->>'entityLabel',
                    'fkType', t1.custom->>'fkType'
                )`,
                upsert: true
            }
        })

        builder.registerUpsertHook()
        await builder.printQueries()
        const count = builder.executeQueries()

        return count
    }


}


