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
import { RoleSetBase } from './role-set.base';


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

    public createEpics(c: RoleSetBase) {
        return combineEpics(
            this.createUpdateOrderEpic(c),
            this.listenToRoleListLength(c),
            // this.listenToStopCreateNewRole(c)
        );
    }

    private createUpdateOrderEpic(c: RoleSetBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(RoleSetActions.ROLE_SET_UPDATE_ORDER),
                filter(action => ofSubstore(c.basePath)(action)),
                switchMap((action: FluxStandardAction<any, any>) => new Observable<LoadingBarAction>((globalStore) => {
                    globalStore.next(this.loadingBarActions.startLoading());
                    // subStore.dispatch(this.actions.loadStarted());

                    combineLatest(
                        action.meta.eprs.map(data => this.eprApi.patchOrCreate(data))
                    )
                        .subscribe((data: InfEntityProjectRel[]) => {
                            globalStore.next(this.loadingBarActions.completeLoading());

                            c.localStore.dispatch(this.actions.updateOrderSucceeded(data));
                        }, error => {
                            // c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
                        })
                })),
                takeUntil(c.destroy$)
            )
        }
    }

    private listenToRoleListLength(c: RoleSetBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(
                    RoleSetActions.REMOVE_ROLE_FROM_ROLE_LIST,
                    RoleSetActions.ROLE_REMOVED_FROM_PROJECT,
                    RoleSetActions.STOP_CREATE_NEW_ROLE
                ),
                filter(action => ofSubstore(c.basePath)(action)),
                switchMap((action: FluxStandardAction<any, any>) => new Observable<LoadingBarAction>((globalStore) => {
                    const state = c.localStore.getState();
                    if (!state._role_list ||  Object.keys(state._role_list).length === 0) {
                        c.localStore.dispatch(this.actions.removeRoleSet());
                    }

                })),
                takeUntil(c.destroy$)
            )
        }
    }

    // private listenToStopCreateNewRole(c: RoleSetBase): Epic {
    //     return (action$, store) => {
    //         return action$.pipe(
    //             ofType(RoleSetActions.STOP_CREATE_NEW_ROLE),
    //             filter(action => ofSubstore(c.basePath)(action)),
    //             switchMap((action: FluxStandardAction<any, any>) => new Observable<LoadingBarAction>((globalStore) => {
    //                 const state = c.localStore.getState();
    //                 // if the only roleDetail is _undefined, remove the roleSet
    //                 if (state._role_list && Object.keys(state._role_list).length === 1 && state._role_list._undefined
    //                 ) {
    //                     c.localStore.dispatch(this.actions.removeRoleSet());
    //                 }

    //             })),
    //             takeUntil(c.destroy$)
    //         )
    //     }
    // }

}
