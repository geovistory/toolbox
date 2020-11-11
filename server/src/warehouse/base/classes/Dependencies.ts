import {ClearAll} from './ClearAll';
import {DependencyIndex} from './DependencyIndex';

export abstract class Dependencies implements ClearAll {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registered: DependencyIndex<any,any,any,any>[] = [];

    async clearAll() {
        await Promise.all(this.registered.map(x => x.clearAll()));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerDepIdx<M extends DependencyIndex<any,any,any,any>>(dep: M) {
        this.registered.push(dep);
        return dep;
    }

    async initIdx(): Promise<void> { };

}
