import {AbstractAggregator} from './AbstractAggregator';
import {DataService} from './DataService';
import {Updater} from './Updater';
import {IndexDBGeneric} from './IndexDBGeneric';
import {Warehouse} from '../../Warehouse';

export abstract class AggregatedDataService<KeyModel, ValueModel, Aggregator extends AbstractAggregator<KeyModel>> extends DataService<KeyModel, ValueModel> {

    updater: Updater<KeyModel, Aggregator>

    index: IndexDBGeneric<KeyModel, ValueModel>

    constructor(
        public wh: Warehouse,
        public keyToString: (key: KeyModel) => string,
        public stringToKey: (str: string) => KeyModel,
    ) {
        super()
        this.index = new IndexDBGeneric(
            keyToString,
            stringToKey,
            this.constructor.name,
            wh
        )

    }

    async clearAll() {
        await Promise.all([this.index.clearIdx(), this.updater.clearIdx()])
    }

    async initIdx() {
        await Promise.all([this.index.clearIdx(), this.updater.clearIdx()])
    }

}



