import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ofSubstore } from 'projects/app-toolbox/src/app/core/redux-store/redux-store.module';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ListAPIActions } from './list.actions';
let ListAPIEpics = class ListAPIEpics {
    constructor(entityPreviewApi, actions, loadingBarActions, notificationsActions) {
        this.entityPreviewApi = entityPreviewApi;
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.notificationsActions = notificationsActions;
    }
    createEpics(c) {
        return combineEpics(this.createSearchEpic(c));
    }
    createSearchEpic(c) {
        return (action$, store) => {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            ofType(ListAPIActions.SEARCH), filter(action => ofSubstore(c.basePath)(action)), switchMap((action) => new Observable((globalStore) => {
                /**
                 * Emit the global action that activates the loading bar
                 */
                globalStore.next(this.loadingBarActions.startLoading());
                /**
                 * Emit the local action that sets the loading flag to true
                 */
                c.localStore.dispatch(this.actions.searchStarted());
                /**
                 * Do some api call
                 */
                this.entityPreviewApi.warEntityPreviewControllerSearch({
                    projectId: action.meta.pkProject,
                    searchString: action.meta.searchString,
                    pkClasses: action.meta.pkClasses,
                    entityType: action.meta.entityType,
                    limit: action.meta.limit,
                    page: action.meta.page
                })
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
                    c.localStore.dispatch(this.actions.searchSucceeded(data));
                }, error => {
                    /**
                     * Emit the global action that shows some loading error message
                     */
                    globalStore.next(this.loadingBarActions.completeLoading());
                    globalStore.next(this.notificationsActions.addToast({
                        type: 'error',
                        options: {
                            title: error.message
                        }
                    }));
                    /**
                    * Emit the local action on loading failed
                    */
                    c.localStore.dispatch(this.actions.searchFailed({ status: '' + error.status }));
                });
            })), takeUntil(c.destroy$));
        };
    }
};
ListAPIEpics = tslib_1.__decorate([
    Injectable()
], ListAPIEpics);
export { ListAPIEpics };
//# sourceMappingURL=list.epics.js.map