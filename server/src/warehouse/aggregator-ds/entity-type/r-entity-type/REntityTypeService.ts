import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {DfhClassHasTypePropertyService, DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {REdgeService} from '../../../primary-ds/edge/REdgeService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {REntityLabelService} from '../../entity-label/r-entity-label/REntityLabelService';
import {REntityTypeAggregator} from './REntityTypeAggregator';
import {REntityTypeProviders} from './REntityTypePoviders';
import {PoolClient} from 'pg';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';

export interface REntityTypeVal {
    fkType?: number,
    typeLabel?: string
}

/**
 * This Data Service manages the key-value store containing
 * as a key the REntityId (pkEntity and fkProject)
 * and as value the REntityTypeVal (fkType, typeLabel)
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
 * -> The Val is the result of the REntityTypeAggregator
 *
 */
@Injectable()
export class REntityTypeService extends AggregatedDataService2<REntityId, REntityTypeVal>{
    aggregator = REntityTypeAggregator;
    providers = REntityTypeProviders;

    depREntity: DependencyIndex<REntityId, REntityTypeVal, REntityId, REntity>
    depREntityLabel: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityLabelVal>
    depREdge: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityFields>
    depDfhClassHasTypeProp: DependencyIndex<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>
    batchSize= 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => REntityService)) rEntity: REntityService,
        @Inject(forwardRef(() => REntityLabelService)) rEntityLabel: REntityLabelService,
        @Inject(forwardRef(() => REdgeService)) rEdge: REdgeService,
        @Inject(forwardRef(() => DfhClassHasTypePropertyService)) dfhClassHasTypeProp: DfhClassHasTypePropertyService,

    ) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS({dataService: rEntity})
        this.depREntity = this.addDepencency(rEntity);
        this.depREntityLabel = this.addDepencency(rEntityLabel);
        this.depREdge = this.addDepencency(rEdge);
        this.depDfhClassHasTypeProp = this.addDepencency(dfhClassHasTypeProp);
    }

    getDependencies() {
        return this
    };
    // onUpsertSql(tableAlias: string) {
    //     return `
    //     UPDATE war.entity_preview
    //     SET type_label = val->>'typeLabel',
    //         fk_type = (val->>'fkType')::int
    //     FROM ${tableAlias}
    //     WHERE pk_entity = "pkEntity"
    //     AND project = 0
    //     AND (
    //         type_label IS DISTINCT FROM val->>'typeLabel'
    //         OR
    //         fk_type IS DISTINCT FROM (val->>'fkType')::int
    //     )`
    // }

    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

        const pentity = await builder.joinProviderThroughDepIdx({
            leftTable: builder.batchTmpTable.tableDef,
            joinWithDepIdx: this.depREntity,
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
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
            joinWithDepIdx: this.depREdge,
            // join only where fk property is is given
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCol: 'pkEntity'},
            },
            conditionTrueIf: {
                custom: `t2.val->'outgoing'->(t1.custom->>'fkProperty')->0->'fkTarget' IS NOT NULL`
            },
            createCustomObject: ((provider) =>
                `jsonb_build_object('fkType', t2.val->'outgoing'->(t1.custom->>'fkProperty')->0->'fkTarget')`) as CustomValSql<{fkType?: number}>,
            // upsert no entity type where no has type stmt with fkTarget found
            createAggregationVal: {
                sql: () => `jsonb_build_object()`,
                upsert: {
                    whereCondition: '= false'
                }
            }
        })


        await builder.joinProviderThroughDepIdx({
            leftTable: pEdges.aggregation.tableDef,
            joinWithDepIdx: this.depREntityLabel,
            joinWhereLeftTableCondition: '= true',
            joinOnKeys: {
                pkEntity: {leftCustom: {name: 'fkType', type: 'int'}},
            },
            conditionTrueIf: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            },
            createCustomObject: (() => `t1.custom`) as CustomValSql<{fkType?: number}>,
            createAggregationVal: {
                sql: () => `jsonb_build_object(
                    'typeLabel', t2.val->>'entityLabel',
                    'fkType', t1.custom->>'fkType'
                )`,
                upsert: {
                    whereCondition: '= true'
                }
            }
        })




        builder.registerUpsertHook()
        // await builder.printQueries()
        const count = builder.executeQueries()

        return count
    }
}


