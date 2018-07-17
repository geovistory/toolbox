import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';


import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InfEntityProjectRel, InfEntityProjectRelApi, LoadingBarAction, LoadingBarActions } from 'app/core';
import { IAppState } from 'app/core/store/model';
import { FluxStandardAction } from 'flux-standard-action';
import { equals } from 'ramda';
import { createEpicMiddleware, Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { RoleSet } from '../information.models';
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

    public createEpics(subStore: ObservableStore<RoleSet>, path: string[]) {
        return [
            createEpicMiddleware(this.createUpdateOrderEpic(subStore, path))
        ];
    }

    private createUpdateOrderEpic(subStore: ObservableStore<RoleSet>, path: string[]): Epic<FluxStandardAction<any, any>, IAppState> {
        return (action$, store) => {
            return action$
                .ofType(RoleSetActions.ROLE_SET_UPDATE_ORDER)
                .filter(action => ofSubstore(path)(action))
                .switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
                    globalStore.next(this.loadingBarActions.startLoading());
                    // subStore.dispatch(this.actions.loadStarted());

                    Observable.combineLatest(
                        action.meta.eprs.map(data => this.eprApi.patchOrCreate(data))
                    )
                        .subscribe((data:InfEntityProjectRel[]) => {
                            globalStore.next(this.loadingBarActions.completeLoading());

                            subStore.dispatch(this.actions.updateOrderSucceeded(data));
                        }, error => {
                            // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
                        })
                }))
        }
    }


}
