import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {pEntityIdToString, sqlForTsVector, stringToPEntityId} from '../../../base/functions';
import {PEntityId} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityClassLabelAggregator} from './PEntityClassLabelAggregator';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';
import {Logger} from '../../../base/classes/Logger';

type ValueModel = string
export class PEntityClassLabelService extends AggregatedDataService<PEntityId, ValueModel, PEntityClassLabelAggregator>{
    updater: Updater<PEntityId, PEntityClassLabelAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            pEntityIdToString,
            stringToPEntityId
        )

        const aggregatorFactory = async (id: PEntityId) => {
            const providers = new PEntityClassLabelProviders(this.wh.dep.pEntityClassLabel, id)
            return new PEntityClassLabelAggregator(providers, id).create()
        }
        const register = async (result: PEntityClassLabelAggregator) => {
            await this.put(result.id, result.entityClassLabel)
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            pEntityIdToString,
            stringToPEntityId
        )

        const upsertQueue = new SqlUpsertQueue<PEntityId, ValueModel>(
            wh,
            'war.entity_preview (class_label)',
            (valuesStr: string) => `
                UPDATE war.entity_preview
                SET class_label = x.column3,
                ${sqlForTsVector}
                FROM
                (
                    values ${valuesStr}
                ) as x
                WHERE pk_Entity = x.column1::int
                AND project = x.column2::int
                AND class_label IS DISTINCT FROM x.column3`,
            (item) => [item.key.pkEntity, item.key.fkProject, item.val],
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

