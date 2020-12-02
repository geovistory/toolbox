/* eslint-disable @typescript-eslint/no-explicit-any */
import {combineLatest, Observable} from 'rxjs';
import {filter, mapTo} from 'rxjs/operators';
import {DataServiceBundle} from './DataServiceBundle';
import {PrimaryDataService} from './PrimaryDataService';

export abstract class PrimaryDataServicesBase extends DataServiceBundle<PrimaryDataService<any, any>> {


    ready$: Observable<boolean>

    constructor(...aggDs: PrimaryDataService<any, any>[]
    ) {
        super()
        this.registered = aggDs;

        this.ready$ = combineLatest(
            this.registered.map(ds => ds.index.ready$.pipe(filter(r => r === true)))
        ).pipe(mapTo(true))

    }

    async initAllIndexes() {
        for (const ds of this.registered) {
            await ds.initIdx()
        }
    }

    async everythingInitialized(): Promise<boolean> {
        const doneDates = await Promise.all(this.registered.map(ds => ds.getLastUpdateDone()))
        if (doneDates.includes(undefined)) return false
        return true
    }
}
