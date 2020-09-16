import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {pEntityIdToString, sqlForTsVector, stringToPEntityId} from '../../../base/functions';
import {PEntityId} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../entity-label.commons';
import {PEntityLabelAggregator} from './PEntityLabelAggregator';
import {PEntityLabelProviders} from './PEntityLabelPoviders';

export class PEntityLabelService extends AggregatedDataService<PEntityId, EntityLabelVal, PEntityLabelAggregator>{
    updater: Updater<PEntityId, PEntityLabelAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            pEntityIdToString,
            stringToPEntityId
        )
        const aggregatorFactory = async (id: PEntityId) => {
            const providers = new PEntityLabelProviders(this.wh.dep.pEntityLabel, id)
            return new PEntityLabelAggregator(providers, id).create()
        }
        const register = async (result: PEntityLabelAggregator) => {
            await this.put(result.id, {
                entityLabel: result.entityLabel,
                labelMissing: result.labelMissing
            })
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            pEntityIdToString,
            stringToPEntityId,
        )

        const upsertQueue = new SqlUpsertQueue<PEntityId, EntityLabelVal>(
            wh,
            'war.entity_preview (entity_label)',
            (valuesStr: string) => `
                UPDATE war.entity_preview
                SET entity_label = x.column3,
                ${sqlForTsVector}
                FROM
                (
                    values ${valuesStr}
                ) as x
                WHERE pk_entity = x.column1::int
                AND project = x.column2::int
                AND entity_label IS DISTINCT FROM x.column3;`,
            (item) => [item.key.pkEntity, item.key.fkProject, item.val.entityLabel],
            pEntityIdToString
        )

        /**
         * Add actions after a new class label is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })
    }

}

