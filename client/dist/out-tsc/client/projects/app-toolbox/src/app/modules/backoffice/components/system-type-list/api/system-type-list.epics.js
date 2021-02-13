import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SystemTypeListAPIActions } from './system-type-list.actions';
let SystemTypeListAPIEpics = class SystemTypeListAPIEpics {
    constructor(systemtypeApi, // <- change the api
    actions, loadingBarActions) {
        this.systemtypeApi = systemtypeApi;
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
    }
    createEpics(c) {
        return combineEpics(this.createLoadSystemTypeListEpic(c));
    }
    createLoadSystemTypeListEpic(c) {
        return (action$, store) => {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            ofType(SystemTypeListAPIActions.LOAD), switchMap((action) => new Observable((globalStore) => {
                /**
                 * Emit the global action that activates the loading bar
                 */
                globalStore.next(this.loadingBarActions.startLoading());
                /**
                 * Emit the local action that sets the loading flag to true
                 */
                c.localStore.dispatch(this.actions.loadStarted());
                /**
                 * Do some api call
                 */
                this.systemtypeApi.find() // <- change api call here
                    /**
                     * Subscribe to the api call
                     */
                    .subscribe((data) => {
                    /**
                     * Emit the global action that completes the loading bar
                     */
                    globalStore.next(this.loadingBarActions.completeLoading());
                    /**
                     * Emit the local action on loading succeeded
                     */
                    c.localStore.dispatch(this.actions.loadSucceeded(data));
                }, error => {
                    /**
                     * Emit the global action that shows some loading error message
                     */
                    // globalStore.next(this.loadingBarActions.completeLoading());
                    /**
                    * Emit the local action on loading failed
                    */
                    c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }));
                });
            })), takeUntil(c.destroy$));
        };
    }
};
SystemTypeListAPIEpics = tslib_1.__decorate([
    Injectable()
], SystemTypeListAPIEpics);
export { SystemTypeListAPIEpics };
//# sourceMappingURL=system-type-list.epics.js.map