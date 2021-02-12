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
        { type: Injectable }
    ];
    /** @nocollapse */
    AccountEpics.ctorParameters = function () { return [
        { type: AccountActions },
        { type: LoadingBarActions },
        { type: PubAccountApi },
        { type: NotificationsAPIActions }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd0RCxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBaUIsY0FBYyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBTXZHO0lBRUUsc0JBQ1UsT0FBdUIsRUFDdkIsaUJBQW9DLEVBQ3BDLFVBQXlCLEVBQ3pCLG1CQUE0QztRQUg1QyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDekIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF5QjtJQUNsRCxDQUFDOzs7O0lBRUUsa0NBQVc7OztJQUFsQjtRQUNFLE9BQU8sWUFBWSxDQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQ2pCLENBQUM7SUFDSixDQUFDOzs7OztJQUVPLGdDQUFTOzs7O0lBQWpCO1FBQUEsaUJBbUJDO1FBbEJDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQ2pDLFFBQVE7Ozs7UUFBQyxVQUFDLE1BQXFCLElBQUssT0FBQSxJQUFJLFVBQVU7Ozs7UUFBUyxVQUFDLFdBQVc7WUFFckUsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDNUMsU0FBUzs7OztZQUFDLFVBQUMsSUFBbUI7Z0JBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQzNELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUM7Ozs7WUFBRSxVQUFBLEtBQUs7Z0JBQ04sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDO29CQUNqRCxJQUFJLEVBQUUsT0FBTztvQkFDYixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2lCQUMxQixDQUFDLENBQUMsQ0FBQTtZQUNMLENBQUMsRUFBQyxDQUFBO1FBQ04sQ0FBQyxFQUFDLEVBYmtDLENBYWxDLEVBQUMsQ0FFSixFQWpCMEIsQ0FpQjFCLEVBQUE7SUFDSCxDQUFDOztnQkFsQ0YsVUFBVTs7OztnQkFOYSxjQUFjO2dCQUFFLGlCQUFpQjtnQkFOaEQsYUFBYTtnQkFNcUMsdUJBQXVCOztJQTJDbEYsbUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXBDWSxZQUFZOzs7Ozs7SUFFckIsK0JBQStCOzs7OztJQUMvQix5Q0FBNEM7Ozs7O0lBQzVDLGtDQUFpQzs7Ozs7SUFDakMsMkNBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHViQWNjb3VudEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjY291bnRBY3Rpb24sIEFjY291bnRBY3Rpb25zLCBMb2FkaW5nQmFyQWN0aW9ucywgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IEFjY291bnRSb2xlIH0gZnJvbSAnLi4vbW9kZWxzL2FjY291bnQubW9kZWwnO1xuXG5cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjb3VudEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY2NvdW50QWN0aW9ucyxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIGFjY291bnRBcGk6IFB1YkFjY291bnRBcGksXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25BY3Rpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmxvYWRSb2xlcygpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJvbGVzKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTKSxcbiAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjY291bnRBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG5cbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcbiAgICAgICAgdGhpcy5hY2NvdW50QXBpLmdldFJvbGVzKGFjdGlvbi5tZXRhLmFjY291bnRJZClcbiAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhOiBBY2NvdW50Um9sZVtdKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFJvbGVzU3VjY2VlZGVkKGRhdGEpKTtcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH0pXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG5cbn1cbiJdfQ==