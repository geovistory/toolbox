import {forwardRef, Inject, Injectable} from 'injection-js';
import {PoolClient} from 'pg';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder, CustomValSql} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {Warehouse} from '../../../Warehouse';
import {PClassLabelService, PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';
import {PEntityClassLabelAggregator} from './PEntityClassLabelAggregator';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';

export interface PEntityClassLabelVal {entityClassLabel: string}
@Injectable()
export class PEntityClassLabelService extends AggregatedDataService2<PEntityId, PEntityClassLabelVal>{
    aggregator = PEntityClassLabelAggregator;
    providers = PEntityClassLabelProviders;
    depPEntity: DependencyIndex<PEntityId, PEntityClassLabelVal, PEntityId, PEntity>
    depPClassLabel: DependencyIndex<PEntityId, PEntityClassLabelVal, PClassId, PClassLabelVal>
    batchSize = 100000;
    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PClassLabelService)) pClassLabel: PClassLabelService
    ) {
        super(
            wh,
            pEntityKeyDefs
        )
        this.registerCreatorDS({dataService: pEntity})
        this.depPEntity = this.addDepencency(pEntity)
        this.depPClassLabel = this.addDepencency(pClassLabel)
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
    //     AND project = "fkProject"
    //     AND class_label IS DISTINCT FROM val->>'entityClassLabel'`
    // }


    async aggregateBatch(client: PoolClient, client2: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)
        /**
        * join entity
        */
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

        /**
        * join pClassLabel, create value and upsert it
        */
        await builder.joinProviderThroughDepIdx({
            leftTable: pentity.aggregation.tableDef,
            joinWithDepIdx: this.depPClassLabel,
            joinOnKeys: {
                fkProject: {leftCol: 'fkProject'},
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

