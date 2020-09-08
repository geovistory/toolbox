import {ClearAll} from './ClearAll';
import {DepIdx} from './DependencyIndex';

export abstract class Dependencies implements ClearAll {

    registered: DepIdx[] = [];

    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }


    registerDepIdx<M extends DepIdx>(dep: M) {
        this.registered.push(dep);
        return dep;
    }

    async initIdx(): Promise<void> {};

}
