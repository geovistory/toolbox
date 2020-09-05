import {ClearAll} from './ClearAll';
export abstract class Dependencies implements ClearAll {
    registered: ClearAll[] = [];

    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }


    registerDepIdx<M extends ClearAll>(dep: M) {
        this.registered.push(dep);
        return dep;
    }

    async initIdx(): Promise<void> {};

}
