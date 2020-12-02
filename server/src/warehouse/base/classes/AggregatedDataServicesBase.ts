/* eslint-disable @typescript-eslint/no-explicit-any */
import {combineLatest, Observable} from 'rxjs';
import {filter, mapTo} from 'rxjs/operators';
import {AggregatedDataService} from './AggregatedDataService';
import {DataServiceBundle} from './DataServiceBundle';

export abstract class AggregatedDataServicesBase extends DataServiceBundle<AggregatedDataService<any, any>> {


    ready$: Observable<boolean>

    constructor(...aggDs: AggregatedDataService<any, any>[]) {
        super()

        this.registered = aggDs;

        this.ready$ = combineLatest(
            this.registered.map(ds => ds.ready$.pipe(filter(r => r === true))),
        ).pipe(mapTo(true))
    }


    async startCycling() {
        for (const ds of this.registered) {
            await ds.startUpdate()
        }
    }

}
