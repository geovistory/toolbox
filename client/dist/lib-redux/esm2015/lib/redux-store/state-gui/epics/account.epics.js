/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/account.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PubAccountApi } from '@kleiolab/lib-sdk-lb3';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountActions } from '../actions/account.actions';
import { LoadingBarActions } from '../actions/loading-bar.actions';
import { NotificationsAPIActions } from '../actions/notifications.actions';
import * as i0 from "@angular/core";
import * as i1 from "../actions/account.actions";
import * as i2 from "../actions/loading-bar.actions";
import * as i3 from "@kleiolab/lib-sdk-lb3";
import * as i4 from "../actions/notifications.actions";
export class AccountEpics {
    /**
     * @param {?} actions
     * @param {?} loadingBarActions
     * @param {?} accountApi
     * @param {?} notificationActions
     */
    constructor(actions, loadingBarActions, accountApi, notificationActions) {
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.accountApi = accountApi;
        this.notificationActions = notificationActions;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.loadRoles());
    }
    /**
     * @private
     * @return {?}
     */
    loadRoles() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(AccountActions.LOAD_ROLES), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        (globalStore) => {
            globalStore.next(this.loadingBarActions.startLoading());
            this.accountApi.getRoles(action.meta.accountId)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                globalStore.next(this.loadingBarActions.completeLoading());
                globalStore.next(this.actions.loadRolesSucceeded(data));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        }))))));
    }
}
AccountEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AccountEpics.ctorParameters = () => [
    { type: AccountActions },
    { type: LoadingBarActions },
    { type: PubAccountApi },
    { type: NotificationsAPIActions }
];
/** @nocollapse */ AccountEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AccountEpics_Factory() { return new AccountEpics(i0.ɵɵinject(i1.AccountActions), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.PubAccountApi), i0.ɵɵinject(i4.NotificationsAPIActions)); }, token: AccountEpics, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.loadingBarActions;
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.accountApi;
    /**
     * @type {?}
     * @private
     */
    AccountEpics.prototype.notificationActions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd0RCxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBaUIsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7OztBQVEzRSxNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQUN2QixZQUNVLE9BQXVCLEVBQ3ZCLGlCQUFvQyxFQUNwQyxVQUF5QixFQUN6QixtQkFBNEM7UUFINUMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7SUFDbEQsQ0FBQzs7OztJQUVFLFdBQVc7UUFDaEIsT0FBTyxZQUFZLENBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FDakIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmOzs7OztRQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDckMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFDakMsUUFBUTs7OztRQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQUMsSUFBSSxVQUFVOzs7O1FBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUV6RSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUM1QyxTQUFTOzs7O1lBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUU7Z0JBQ2pDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQzNELFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUM7Ozs7WUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDVCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7b0JBQ2pELElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7aUJBQzFCLENBQUMsQ0FBQyxDQUFBO1lBQ0wsQ0FBQyxFQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsRUFBQyxDQUVKLEVBQUE7SUFDSCxDQUFDOzs7WUFwQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVHVCLGNBQWM7WUFDN0IsaUJBQWlCO1lBUGpCLGFBQWE7WUFRYix1QkFBdUI7Ozs7Ozs7O0lBVTVCLCtCQUErQjs7Ozs7SUFDL0IseUNBQTRDOzs7OztJQUM1QyxrQ0FBaUM7Ozs7O0lBQ2pDLDJDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB1YkFjY291bnRBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBY2NvdW50QWN0aW9uLCBBY2NvdW50QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudFJvbGUgfSBmcm9tICcuLi9tb2RlbHMvYWNjb3VudC5tb2RlbCc7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IEFjY291bnRBY3Rpb25zLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgYWNjb3VudEFwaTogUHViQWNjb3VudEFwaSxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMubG9hZFJvbGVzKClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUm9sZXMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVMpLFxuICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWNjb3VudEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcblxuICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuICAgICAgICB0aGlzLmFjY291bnRBcGkuZ2V0Um9sZXMoYWN0aW9uLm1ldGEuYWNjb3VudElkKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IEFjY291bnRSb2xlW10pID0+IHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUm9sZXNTdWNjZWVkZWQoZGF0YSkpO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfSlcbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cblxufVxuIl19