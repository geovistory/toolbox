import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {AggregatedDataService} from './AggregatedDataService';


export abstract class AggregatedDataService2<KeyModel, ValueModel> extends AggregatedDataService<KeyModel, ValueModel> {



    constructor(
        public wh: Warehouse,
        protected keyDefs: KeyDefinition[]
    ) {
        super(wh, keyDefs)
    }


}



