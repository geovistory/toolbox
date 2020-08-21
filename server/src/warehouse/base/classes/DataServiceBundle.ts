import {ClearAll} from './ClearAll';
export abstract class DataServiceBundle {
    registered: ClearAll[] = [];


    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }

    async initAllIndexes() {
        await Promise.all(this.registered.map(x => x.initIdx()));
    }

    registerDataService<M extends ClearAll>(dep: M) {
        this.registered.push(dep);
        return dep;
    }
}
