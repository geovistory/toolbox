import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {Updater} from '../../base/classes/Updater';
import {entityIdToString, stringToEntityId} from '../../base/functions';
import {PEntityId} from '../../primary-ds/PEntityService';
import {Warehouse} from '../../Warehouse';
import {PEntityClassLabelAggregator} from './PEntityClassLabelAggregator';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';
import {SqlUpsertQueue} from '../../base/classes/SqlUpsertQueue';

type ValueModel = string
export class PEntityClassLabelService extends AggregatedDataService<PEntityId, ValueModel, PEntityClassLabelAggregator>{
    updater: Updater<PEntityId, PEntityClassLabelAggregator>;

    index = new IndexDBGeneric<PEntityId, ValueModel>(entityIdToString, stringToEntityId)

    constructor(private wh: Warehouse) {
        super()
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
            entityIdToString,
            stringToEntityId
        )

        const upsertQueue = new SqlUpsertQueue<PEntityId, ValueModel>(
            'war.entity_preview (class_label)',
            wh.pgClient,
            (valuesStr: string) => `
                INSERT INTO war.entity_preview (pk_entity, fk_project, project, class_label)
                VALUES ${valuesStr}
                ON CONFLICT (pk_entity, project) DO UPDATE
                SET class_label = EXCLUDED.class_label
                WHERE EXCLUDED.class_label IS DISTINCT FROM war.entity_preview.class_label;`,
            (item) => [item.key.pkEntity, item.key.fkProject, item.key.fkProject, item.val],
            entityIdToString
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

