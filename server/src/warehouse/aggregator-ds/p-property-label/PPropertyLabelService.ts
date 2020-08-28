import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {Updater} from '../../base/classes/Updater';
import {pFieldIdToString, stringToPFieldId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {PPropertyLabelAggregator} from './PPropertyLabelAggregator';
import {PPropertyLabelProviders} from './PPropertyLabelProviders';

export interface PFieldId {
    fkProject: number,
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}

type ValueModel = string
export class PPropertyLabelService extends AggregatedDataService<PFieldId, ValueModel, PPropertyLabelAggregator>{
    updater: Updater<PFieldId, PPropertyLabelAggregator>;

    index = new IndexDBGeneric<PFieldId, ValueModel>(pFieldIdToString, stringToPFieldId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: PFieldId) => {
            const providers = new PPropertyLabelProviders(this.wh.dep.pPropertyLabel, id)
            return new PPropertyLabelAggregator(providers, id).create()
        }
        const register = async (result: PPropertyLabelAggregator) => {
            await this.put(result.id, result.propertyLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            pFieldIdToString,
            stringToPFieldId,
        )



    }


}
