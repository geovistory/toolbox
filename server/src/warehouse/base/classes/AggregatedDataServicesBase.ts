/* eslint-disable @typescript-eslint/no-explicit-any */
import {combineLatest, Observable} from 'rxjs';
import {filter, mapTo} from 'rxjs/operators';
import {AggregatedDataService2} from './AggregatedDataService2';
import {DataServiceBundle} from './DataServiceBundle';

export abstract class AggregatedDataServicesBase extends DataServiceBundle<AggregatedDataService2<any, any>> {


    ready$: Observable<boolean>

    constructor(...aggDs: AggregatedDataService2<any, any>[]) {
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
