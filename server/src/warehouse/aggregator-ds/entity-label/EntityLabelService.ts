import { entityIdToString, stringToEntityId } from '../../base/functions';
import { IndexDBGeneric } from '../../base/classes/IndexDBGeneric';
import { AggregatedDataService } from '../../base/classes/AggregatedDataService';
import { Updater } from '../../base/classes/Updater';
import { EntityId } from '../../primary-ds/EntityService';
import { Warehouse } from '../../Warehouse';
import { EntityLabelAggregator } from './EntityLabelAggregator';
import { EntityLabelProviders } from './EntityLabelPoviders';

type ValueModel = string
export class EntityLabelService extends AggregatedDataService<EntityId, ValueModel, EntityLabelAggregator>{
    updater: Updater<EntityId, EntityLabelAggregator>;

    index = new IndexDBGeneric<EntityId, ValueModel>(entityIdToString, stringToEntityId)

    constructor(private main: Warehouse) {
        super()
        const aggregatorFactory = async (id: EntityId) => {
            const providers = new EntityLabelProviders(this.main.dep.entityLabel, id)
            return new EntityLabelAggregator(providers, id).create()
        }
        const register = async (result: EntityLabelAggregator) => {
            await this.put(result.id, result.entityLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.constructor.name,
            aggregatorFactory,
            register,
            entityIdToString,
            stringToEntityId)
    }
}

