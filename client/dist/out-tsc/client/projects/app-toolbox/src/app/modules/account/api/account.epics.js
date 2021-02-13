import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountActions } from './account.actions';
let AccountEpics = class AccountEpics {
    constructor(actions, loadingBarActions, accountApi, notificationActions) {
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.accountApi = accountApi;
        this.notificationActions = notificationActions;
    }
    createEpics() {
        return combineEpics(this.loadRoles());
    }
    loadRoles() {
        return (action$, store) => action$.pipe(ofType(AccountActions.LOAD_ROLES), mergeMap((action) => new Observable((globalStore) => {
            globalStore.next(this.loadingBarActions.startLoading());
            this.accountApi.getRoles(action.meta.accountId)
                .subscribe((data) => {
                globalStore.next(this.loadingBarActions.completeLoading());
                globalStore.next(this.actions.loadRolesSucceeded(data));
            }, error => {
                globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            });
        })));
    }
};
AccountEpics = tslib_1.__decorate([
    Injectable()
], AccountEpics);
export { AccountEpics };
//# sourceMappingURL=account.epics.js.map