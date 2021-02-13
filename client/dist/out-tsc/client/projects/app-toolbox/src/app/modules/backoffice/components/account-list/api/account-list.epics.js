import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { AccountListAPIActions } from './account-list.actions';
import { ofSubstore } from 'projects/app-toolbox/src/app/core/redux-store/redux-store.module';
let AccountListAPIEpics = class AccountListAPIEpics {
    constructor(accountApi, actions, loadingBarActions, notificationActions) {
        this.accountApi = accountApi;
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
    }
    createEpics(c) {
        return combineEpics(this.createLoadAccountListEpic(c));
    }
    createLoadAccountListEpic(c) {
        return (action$, store) => {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            ofType(AccountListAPIActions.LOAD), filter(action => ofSubstore(c.basePath)(action)), switchMap((action) => new Observable((globalStore) => {
                globalStore.next(this.loadingBarActions.startLoading());
                this.accountApi.withRolesAndProjects()
                    .subscribe((data) => {
                    globalStore.next(this.loadingBarActions.completeLoading());
                    /**
                     * Emit the local action on loading succeeded
                     */
                    c.localStore.dispatch(this.actions.loadSucceeded(data));
                }, error => {
                    /**
                    * Emit the global action that shows some loading error message
                    */
                    globalStore.next(this.loadingBarActions.completeLoading());
                    globalStore.next(this.notificationActions.addToast({
                        type: 'error',
                        options: {
                            title: error.message
                        }
                    }));
                    /**
                     * Emit the local action on loading failed
                     */
                    c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }));
                });
            })), takeUntil(c.destroy$));
        };
    }
};
AccountListAPIEpics = tslib_1.__decorate([
    Injectable()
], AccountListAPIEpics);
export { AccountListAPIEpics };
//# sourceMappingURL=account-list.epics.js.map