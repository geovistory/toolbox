import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InfEntityProjectRel, InfEntityProjectRelApi, LoadingBarAction, LoadingBarActions } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { equals } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { RoleSet } from 'app/core/state/models';
import { RoleSetActions } from './role-set.actions';


const ofSubstore = (path: string[]) => (action): boolean => {
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    const bool = equals(actionPath, path);
    return bool;
}

@Injectable()
export class RoleSetApiEpics {
    constructor(
        private eprApi: InfEntityProjectRelApi,
        private actions: RoleSetActions,
        private loadingBarActions: LoadingBarActions
    ) { }

    public createEpics(subStore: ObservableStore<RoleSet>, path: string[], until$: Subject<boolean>) {
        return combineEpics(this.createUpdateOrderEpic(subStore, path, until$));
    }

    private createUpdateOrderEpic(subStore: ObservableStore<RoleSet>, path: string[], until$: Subject<boolean>): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(RoleSetActions.ROLE_SET_UPDATE_ORDER),
                filter(action => ofSubstore(path)(action)),
                switchMap((action: FluxStandardAction<any, any>) => new Observable<LoadingBarAction>((globalStore) => {
                    globalStore.next(this.loadingBarActions.startLoading());
                    // subStore.dispatch(this.actions.loadStarted());

                    combineLatest(
                        action.meta.eprs.map(data => this.eprApi.patchOrCreate(data))
                    )
                        .subscribe((data: InfEntityProjectRel[]) => {
                            globalStore.next(this.loadingBarActions.completeLoading());

                            subStore.dispatch(this.actions.updateOrderSucceeded(data));
                        }, error => {
                            // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
                        })
                })),
                takeUntil(until$)
            )
        }
    }


}
