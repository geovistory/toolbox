import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {Updater} from '../../base/classes/Updater';
import {classIdToString, stringToClassId} from '../../base/functions';
import {ClassId} from '../../primary-ds/FieldsConfigService';
import {Warehouse} from '../../Warehouse';
import {ClassLabelAggregator} from './ClassLabelAggregator';
import {ClassLabelProviders} from './ClassLabelProviders';

type ValueModel = string
export class ClassLabelService extends AggregatedDataService<ClassId, ValueModel, ClassLabelAggregator>{
    updater: Updater<ClassId, ClassLabelAggregator>;

    index = new IndexDBGeneric<ClassId, ValueModel>(classIdToString, stringToClassId)

    constructor(private main: Warehouse) {
        super()
        const aggregatorFactory = async (id: ClassId) => {
            const providers = new ClassLabelProviders(this.main.dep.classLabel, id)
            return new ClassLabelAggregator(providers, id).create()
        }
        const register = async (result: ClassLabelAggregator) => {
            await this.put(result.id, result.classLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.constructor.name,
            aggregatorFactory,
            register,
            classIdToString,
            stringToClassId)
    }

}
