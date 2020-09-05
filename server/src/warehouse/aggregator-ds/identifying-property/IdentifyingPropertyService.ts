import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {Updater} from '../../base/classes/Updater';
import {rClassIdToString, stringToRClassId} from '../../base/functions';
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {Warehouse} from '../../Warehouse';
import {IdentifyingPropertyAggregator} from './IdentifyingPropertyAggregator';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';
import {OutgoingPropertyVal} from '../../primary-ds/DfhOutgoingPropertyService';


export type IdentifyingPropertyVal = OutgoingPropertyVal[]
export class IdentifyingPropertyService extends AggregatedDataService<RClassId, IdentifyingPropertyVal, IdentifyingPropertyAggregator>{
    updater: Updater<RClassId, IdentifyingPropertyAggregator>;

    index: IndexDBGeneric<RClassId, IdentifyingPropertyVal>

    constructor(private wh: Warehouse) {
        super()
        this.index = new IndexDBGeneric(rClassIdToString, stringToRClassId, this.constructor.name)
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
