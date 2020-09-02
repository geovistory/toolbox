import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../../base/classes/IndexDBGeneric';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {sqlForTsVector, stringToREntityId, rEntityIdToString} from '../../../base/functions';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {REntityClassLabelAggregator} from './REntityClassLabelAggregator';
import {REntityClassLabelProviders} from './REntityClassLabelPoviders';


type ValueModel = string
export class REntityClassLabelService extends AggregatedDataService<REntityId, ValueModel, REntityClassLabelAggregator>{
    updater: Updater<REntityId, REntityClassLabelAggregator>;

    index = new IndexDBGeneric<REntityId, ValueModel>(rEntityIdToString, stringToREntityId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: REntityId) => {
            const providers = new REntityClassLabelProviders(this.wh.dep.rEntityClassLabel, id)
            return new REntityClassLabelAggregator(providers, id).create()
        }
        const register = async (result: REntityClassLabelAggregator) => {
            await this.put(result.id, result.entityClassLabel)
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            rEntityIdToString,
            stringToREntityId
        )

        const upsertQueue = new SqlUpsertQueue<REntityId, ValueModel>(
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
            (item) => [item.key.pkEntity, 0, item.val],
            rEntityIdToString
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

