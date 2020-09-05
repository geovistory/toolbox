import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../../base/classes/IndexDBGeneric';
import {Updater} from '../../../base/classes/Updater';
import {rClassFieldIdToString, stringToRClassFieldId} from '../../../base/functions';
import {Warehouse} from '../../../Warehouse';
import {RClassFieldLabelAggregator} from './RClassFieldLabelAggregator';
import {RClassFieldLabelProviders} from './RClassFieldLabelProviders';

export interface RClassFieldId {
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}

type ValueModel = string
export class RClassFieldLabelService extends AggregatedDataService<RClassFieldId, ValueModel, RClassFieldLabelAggregator>{
    updater: Updater<RClassFieldId, RClassFieldLabelAggregator>;
    index: IndexDBGeneric<RClassFieldId, ValueModel>

    constructor(private wh: Warehouse) {
        super()
        this.index = new IndexDBGeneric(rClassFieldIdToString, stringToRClassFieldId, this.constructor.name)
        const aggregatorFactory = async (id: RClassFieldId) => {
            const providers = new RClassFieldLabelProviders(this.wh.dep.rClassFieldLabel, id)
            return new RClassFieldLabelAggregator(providers, id).create()
        }
        const register = async (result: RClassFieldLabelAggregator) => {
            await this.put(result.id, result.propertyLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            rClassFieldIdToString,
            stringToRClassFieldId,
        )



    }


}
