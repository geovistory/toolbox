

import {PoolClient} from 'pg';
import {brkOnErr, logSql} from '../../../../utils/helpers';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {AggregatorSqlBuilder} from '../../../base/classes/AggregatorSqlBuilder';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from '../../../primary-ds/edge/edge.commons';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityLabelConfigVal} from '../../../primary-ds/ProEntityLabelConfigService';
import {Warehouse} from '../../../Warehouse';
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {EntityLabelVal} from '../entity-label.commons';
import {REntityLabelAggregator} from './REntityLabelAggregator';
import {REntityLabelProviders} from './REntityLabelPoviders';

export class REntityLabelService extends AggregatedDataService2<REntityId, EntityLabelVal>{
    creatorDS: REntityService
    aggregator = REntityLabelAggregator;
    providers = REntityLabelProviders;

    rEntity: DependencyIndex<REntityId, EntityLabelVal, REntityId, REntity>
    proEntityLabelConfig: DependencyIndex<REntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>
    identifyingProperty: DependencyIndex<REntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    rEntityLabel: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityLabelVal>
    rEdge: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityFields>

    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityKeyDefs
        )

        this.registerCreatorDS(this.wh.prim.rEntity)

        this.rEntity = this.addDepencency(wh.prim.rEntity)
        this.proEntityLabelConfig = this.addDepencency(wh.prim.proEntityLabelConfig)
        this.identifyingProperty = this.addDepencency(wh.agg.identifyingProperty)
        this.rEntityLabel = this.addDepencency(this)
        this.rEdge = this.addDepencency(wh.prim.rEdge)

    }

    getDependencies() {
        return this.wh.dep.rEntityLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET entity_label = ${tableAlias}.val->>'entityLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = 0
        AND entity_label IS DISTINCT FROM ${tableAlias}.val->>'entityLabel'`
    }


    async aggregateBatch(client: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
        let changes = 0
        const builder = new AggregatorSqlBuilder(this, currentTimestamp)

        const twBatch = builder.twBatch(limit, offset)

        const rentity = builder.joinProvider({
            receiverTableAlias: twBatch.tw,
            dependencyIdx: this.rEntity,
            keyMapping: {
                pkEntity: {receiverCol: 'pkEntity'}
            },
            hasCondition: {
                providerKey: {pkEntity: 'IS NOT NULL'}
            }
        })
        // const redges = builder.joinProvider({
        //     receiverTableAlias: twBatch.tw,
        //     dependencyIdx: this.rEdge,
        //     keyMapping: {
        //         pkEntity: {receiverCol: 'pkEntity'}
        //     },
        //     hasCondition: {
        //         providerVal: {incoming: 'IS NOT NULL'}
        //     }
        // })

        const count = builder.twCount()

        const hook = builder.twOnUpsertHook()


        const sql = `
        ${twBatch.sql},
        ${rentity.sql},
        ${hook.sql},
        ${count.sql}
        `
        logSql(sql, builder.params)
        const result = await brkOnErr(client.query<{changes: number;}>(
            sql, builder.params));
        changes = result.rows?.[0].changes ?? 0;
        return changes
    }
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

// export class REntityLabelService extends AggregatedDataService<REntityId, EntityLabelVal>{
//     creatorDS: REntityService
//     aggregator = REntityLabelAggregator;
//     providers = REntityLabelProviders;
//     constructor(public wh: Warehouse) {
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

