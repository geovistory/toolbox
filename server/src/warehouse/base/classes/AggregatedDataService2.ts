import {combineLatest} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {AggregatedDataService} from './AggregatedDataService';
import {DataService} from './DataService';
import {DependencyIndex} from './DependencyIndex';


export abstract class AggregatedDataService2<KeyModel, ValueModel> extends AggregatedDataService<KeyModel, ValueModel> {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencyIndexes: DependencyIndex<KeyModel, ValueModel, any, any>[] = [];

    constructor(
        public wh: Warehouse,
        protected keyDefs: KeyDefinition[]
    ) {
        super(wh, keyDefs)
    }

    getDependencies() { }

    emitReady() {
        combineLatest([this.index.ready$, ...this.dependencyIndexes.map(d => d.ready$)]).pipe(
            filter(d => !d.some(item => item !== true)),
        ).subscribe((data) => {
            this.ready$.next(true)
        })
    }

    async clearAll() {
        await Promise.all(this.dependencyIndexes.map(x => x.clearAll()));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private registerDepIdx<M extends DependencyIndex<KeyModel, ValueModel, any, any>>(dep: M) {
        this.dependencyIndexes.push(dep);
        return dep;
    }
    addDepencency<ProviderKeyModel, ProviderValModel>(providerDS: DataService<ProviderKeyModel, ProviderValModel>) {
        return this.registerDepIdx(new DependencyIndex(
            this.wh,
            this,
            providerDS,
        ))
    }











}



