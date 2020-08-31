import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {Updater} from '../../base/classes/Updater';
import {classIdToString, stringToClassId} from '../../base/functions';
import {ClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {Warehouse} from '../../Warehouse';
import {IdentifyingPropertyAggregator} from './IdentifyingPropertyAggregator';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';
import {OutgoingPropertyVal} from '../../primary-ds/DfhOutgoingPropertyService';


export type IdentifyingPropertyVal = OutgoingPropertyVal[]
export class IdentifyingPropertyService extends AggregatedDataService<ClassId, IdentifyingPropertyVal, IdentifyingPropertyAggregator>{
    updater: Updater<ClassId, IdentifyingPropertyAggregator>;

    index = new IndexDBGeneric<ClassId, IdentifyingPropertyVal>(classIdToString, stringToClassId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: ClassId) => {
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
            classIdToString,
            stringToClassId,
        )



    }


}
