import {combineLatest, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {DataServiceBundle} from './DataServiceBundle';
import {Dependencies} from './Dependencies';

export abstract class DependencyDataServicesBase extends DataServiceBundle<Dependencies> {


    ready$: Observable<boolean>

    constructor(...aggDs: Dependencies[]) {
        super()

        this.registered = aggDs;
        const readies$ = []
        for (const reg1 of this.registered) {
            for (const reg2 of reg1.registered) {
                readies$.push(reg2.ready$)
            }
        }
        this.ready$ = combineLatest(readies$).pipe(mapTo(true))
    }

}
