import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {Updater} from '../../../base/classes/Updater';
import {pClassFieldIdToString, stringToPClassFieldId} from '../../../base/functions';
import {Warehouse} from '../../../Warehouse';
import {PClassFieldLabelAggregator} from './PClassFieldLabelAggregator';
import {PClassFieldLabelProviders} from './PClassFieldLabelProviders';

export interface PClassFieldId {
    fkProject: number,
    fkClass: number
    fkProperty: number
    isOutgoing: boolean
}

type ValueModel = string
export class PClassFieldLabelService extends AggregatedDataService<PClassFieldId, ValueModel, PClassFieldLabelAggregator>{
    updater: Updater<PClassFieldId, PClassFieldLabelAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            pClassFieldIdToString,
            stringToPClassFieldId
        )
        const aggregatorFactory = async (id: PClassFieldId) => {
            const providers = new PClassFieldLabelProviders(this.wh.dep.pClassFieldLabel, id)
            return new PClassFieldLabelAggregator(providers, id).create()
        }
        const register = async (result: PClassFieldLabelAggregator) => {
            await this.put(result.id, result.propertyLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            pClassFieldIdToString,
            stringToPClassFieldId,
        )



    }


}