/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/account.epics.ts
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
var AccountEpics = /** @class */ (function () {
    function AccountEpics(actions, loadingBarActions, accountApi, notificationActions) {
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.accountApi = accountApi;
        this.notificationActions = notificationActions;
    }
    /**
     * @return {?}
     */
    AccountEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.loadRoles());
    };
    /**
     * @private
     * @return {?}
     */
    AccountEpics.prototype.loadRoles = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(AccountActions.LOAD_ROLES), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        function (globalStore) {
            globalStore.next(_this.loadingBarActions.startLoading());
            _this.accountApi.getRoles(action.meta.accountId)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                globalStore.next(_this.loadingBarActions.completeLoading());
                globalStore.next(_this.actions.loadRolesSucceeded(data));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                globalStore.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })); }))); });
    };
    AccountEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AccountEpics.ctorParameters = function () { return [
        { type: AccountActions },
        { type: LoadingBarActions },
        { type: PubAccountApi },
        { type: NotificationsAPIActions }
    ]; };
    /** @nocollapse */ AccountEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AccountEpics_Factory() { return new AccountEpics(i0.ɵɵinject(i1.AccountActions), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.PubAccountApi), i0.ɵɵinject(i4.NotificationsAPIActions)); }, token: AccountEpics, providedIn: "root" });
    return AccountEpics;
}());
export { AccountEpics };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9lcGljcy9hY2NvdW50LmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHdEQsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQWlCLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7QUFLM0U7SUFJRSxzQkFDVSxPQUF1QixFQUN2QixpQkFBb0MsRUFDcEMsVUFBeUIsRUFDekIsbUJBQTRDO1FBSDVDLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXlCO0lBQ2xELENBQUM7Ozs7SUFFRSxrQ0FBVzs7O0lBQWxCO1FBQ0UsT0FBTyxZQUFZLENBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FDakIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sZ0NBQVM7Ozs7SUFBakI7UUFBQSxpQkFtQkM7UUFsQkM7Ozs7O1FBQU8sVUFBQyxPQUFPLEVBQUUsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FDckMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFDakMsUUFBUTs7OztRQUFDLFVBQUMsTUFBcUIsSUFBSyxPQUFBLElBQUksVUFBVTs7OztRQUFTLFVBQUMsV0FBVztZQUVyRSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUM1QyxTQUFTOzs7O1lBQUMsVUFBQyxJQUFtQjtnQkFDN0IsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQzs7OztZQUFFLFVBQUEsS0FBSztnQkFDTixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7b0JBQ2pELElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7aUJBQzFCLENBQUMsQ0FBQyxDQUFBO1lBQ0wsQ0FBQyxFQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsRUFia0MsQ0FhbEMsRUFBQyxDQUVKLEVBakIwQixDQWlCMUIsRUFBQTtJQUNILENBQUM7O2dCQXBDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVR1QixjQUFjO2dCQUM3QixpQkFBaUI7Z0JBUGpCLGFBQWE7Z0JBUWIsdUJBQXVCOzs7dUJBVGhDO0NBcURDLEFBdkNELElBdUNDO1NBcENZLFlBQVk7Ozs7OztJQUVyQiwrQkFBK0I7Ozs7O0lBQy9CLHlDQUE0Qzs7Ozs7SUFDNUMsa0NBQWlDOzs7OztJQUNqQywyQ0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQdWJBY2NvdW50QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWNjb3VudEFjdGlvbiwgQWNjb3VudEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2FjY291bnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IEFjY291bnRSb2xlIH0gZnJvbSAnLi4vbW9kZWxzL2FjY291bnQubW9kZWwnO1xuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY2NvdW50QWN0aW9ucyxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIGFjY291bnRBcGk6IFB1YkFjY291bnRBcGksXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25BY3Rpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmxvYWRSb2xlcygpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJvbGVzKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTKSxcbiAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjY291bnRBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG5cbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcbiAgICAgICAgdGhpcy5hY2NvdW50QXBpLmdldFJvbGVzKGFjdGlvbi5tZXRhLmFjY291bnRJZClcbiAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhOiBBY2NvdW50Um9sZVtdKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFJvbGVzU3VjY2VlZGVkKGRhdGEpKTtcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH0pXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG5cbn1cbiJdfQ==