import { AbstractAggregator } from './AbstractAggregator';
import { DataService } from './DataService';
import { Updater } from './Updater';

export abstract class AggregatedDataService<KeyModel, ValueModel, A extends AbstractAggregator<KeyModel>> extends DataService<KeyModel, ValueModel> {
    abstract updater: Updater<KeyModel, A>

    async clearAll() {
        await Promise.all([this.index.clearIdx(), this.updater.clearIdx()])
    }

    async initIdx() {
        await Promise.all([this.index.clearIdx(), this.updater.clearIdx()])
    }

}



