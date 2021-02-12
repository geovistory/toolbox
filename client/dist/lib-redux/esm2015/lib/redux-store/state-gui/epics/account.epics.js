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
import { AccountActions, LoadingBarActions, NotificationsAPIActions } from '../actions';
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
    { type: Injectable }
];
/** @nocollapse */
AccountEpics.ctorParameters = () => [
    { type: AccountActions },
    { type: LoadingBarActions },
    { type: PubAccountApi },
    { type: NotificationsAPIActions }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd0RCxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBaUIsY0FBYyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBT3ZHLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBQ3ZCLFlBQ1UsT0FBdUIsRUFDdkIsaUJBQW9DLEVBQ3BDLFVBQXlCLEVBQ3pCLG1CQUE0QztRQUg1QyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDekIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF5QjtJQUNsRCxDQUFDOzs7O0lBRUUsV0FBVztRQUNoQixPQUFPLFlBQVksQ0FDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUNqQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTyxTQUFTO1FBQ2Y7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNyQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUNqQyxRQUFROzs7O1FBQUMsQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFVBQVU7Ozs7UUFBUyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBRXpFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQzVDLFNBQVM7Ozs7WUFBQyxDQUFDLElBQW1CLEVBQUUsRUFBRTtnQkFDakMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQzs7OztZQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztvQkFDakQsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtpQkFDMUIsQ0FBQyxDQUFDLENBQUE7WUFDTCxDQUFDLEVBQUMsQ0FBQTtRQUNOLENBQUMsRUFBQyxFQUFDLENBRUosRUFBQTtJQUNILENBQUM7OztZQWxDRixVQUFVOzs7O1lBTmEsY0FBYztZQUFFLGlCQUFpQjtZQU5oRCxhQUFhO1lBTXFDLHVCQUF1Qjs7Ozs7OztJQVM5RSwrQkFBK0I7Ozs7O0lBQy9CLHlDQUE0Qzs7Ozs7SUFDNUMsa0NBQWlDOzs7OztJQUNqQywyQ0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQdWJBY2NvdW50QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWNjb3VudEFjdGlvbiwgQWNjb3VudEFjdGlvbnMsIExvYWRpbmdCYXJBY3Rpb25zLCBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudFJvbGUgfSBmcm9tICcuLi9tb2RlbHMvYWNjb3VudC5tb2RlbCc7XG5cblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2NvdW50RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IEFjY291bnRBY3Rpb25zLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgYWNjb3VudEFwaTogUHViQWNjb3VudEFwaSxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMubG9hZFJvbGVzKClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUm9sZXMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVMpLFxuICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWNjb3VudEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcblxuICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuICAgICAgICB0aGlzLmFjY291bnRBcGkuZ2V0Um9sZXMoYWN0aW9uLm1ldGEuYWNjb3VudElkKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IEFjY291bnRSb2xlW10pID0+IHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUm9sZXNTdWNjZWVkZWQoZGF0YSkpO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfSlcbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cblxufVxuIl19