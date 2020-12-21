import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {RClassLabelService, RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService';
import {REntityClassLabelAggregator} from './REntityClassLabelAggregator';
import {REntityClassLabelProviders} from './REntityClassLabelPoviders';
import {PoolClient} from 'pg';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';


export interface REntityClassLabelVal {entityClassLabel?: string}
@Injectable()
export class REntityClassLabelService extends AggregatedDataService2<REntityId, REntityClassLabelVal>{
    aggregator = REntityClassLabelAggregator;
    providers = REntityClassLabelProviders;
    depREntity: DependencyIndex<REntityId, REntityClassLabelVal, REntityId, REntity>
    depRClassLabel: DependencyIndex<REntityId, REntityClassLabelVal, RClassId, RClassLabelValue>
    batchSize = 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => REntityService)) rEntity: REntityService,
        @Inject(forwardRef(() => RClassLabelService)) rClassLabel: RClassLabelService
    ) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS({dataService: rEntity})
        this.depREntity = this.addDepencency(rEntity)
        this.depRClassLabel = this.addDepencency(rClassLabel)
    }
    getDependencies() {
        return this
    };
    // onUpsertSql(tableAlias: string) {
    //     return `
    //     UPDATE war.entity_preview
    //     SET class_label = val->>'entityClassLabel'
    //     FROM ${tableAlias}
    //     WHERE pk_entity = "pkEntity"
    //     AND project = 0
    //     AND class_label IS DISTINCT FROM val->>'entityClassLabel'`
    // }


    async aggregateBatch(client: PoolClient, client2: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)
        /**
        * join entity
        */
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

        /**
        * join pClassLabel, create value and upsert it
        */
        await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depRClassLabel,
            joinOnKeys: {
                pkClass: {leftCustom: {name: 'fkClass', type: 'int'}},
            },
            conditionTrueIf: {
                providerKey: {pkClass: 'IS NOT NULL'}
            },
            createAggregationVal: {
                sql: () => `jsonb_build_object('entityClassLabel', t2.val->>'label')`,
                upsert: true
            }

        })

        // await builder.printQueries()
        const count = await builder.executeQueries()
        return count
    }
}

