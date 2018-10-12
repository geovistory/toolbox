import { Subject } from 'rxjs';
import { ObservableStore } from '@angular-redux/store';

/**
 * Interface of a component that is connected to a slice of the
 * redux store.
 */
export interface SubstoreComponent {
    destroy$: Subject<boolean>;
    localStore: ObservableStore<any>;
    basePath?;
}
