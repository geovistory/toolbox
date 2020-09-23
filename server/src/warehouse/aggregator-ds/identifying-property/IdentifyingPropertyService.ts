import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {Updater} from '../../base/classes/Updater';
import {rClassIdToString, stringToRClassId} from '../../base/functions';
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {OutgoingPropertyVal} from '../../primary-ds/DfhOutgoingPropertyService';
import {Warehouse} from '../../Warehouse';
import {IdentifyingPropertyAggregator} from './IdentifyingPropertyAggregator';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';


export type IdentifyingPropertyVal = OutgoingPropertyVal[]
export class IdentifyingPropertyService extends AggregatedDataService<RClassId, IdentifyingPropertyVal, IdentifyingPropertyAggregator>{
    updater: Updater<RClassId, IdentifyingPropertyAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            rClassIdToString,
            stringToRClassId
        )
        const aggregatorFactory = async (id: RClassId) => {
            const providers = new IdentifyingPropertyProviders(this.wh.dep.identifyingProperty, id)
            return new IdentifyingPropertyAggregator(providers, id).create()
        }
        const register = async (result: IdentifyingPropertyAggregator) => {
            await this.put(result.id, result.identyfyingProperties)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            rClassIdToString,
            stringToRClassId,
        )



    }


}
