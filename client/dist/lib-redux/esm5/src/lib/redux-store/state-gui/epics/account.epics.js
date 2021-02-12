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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9lcGljcy9hY2NvdW50LmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHdEQsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQWlCLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQU12RztJQUVFLHNCQUNVLE9BQXVCLEVBQ3ZCLGlCQUFvQyxFQUNwQyxVQUF5QixFQUN6QixtQkFBNEM7UUFINUMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7SUFDbEQsQ0FBQzs7OztJQUVFLGtDQUFXOzs7SUFBbEI7UUFDRSxPQUFPLFlBQVksQ0FDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUNqQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTyxnQ0FBUzs7OztJQUFqQjtRQUFBLGlCQW1CQztRQWxCQzs7Ozs7UUFBTyxVQUFDLE9BQU8sRUFBRSxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUNyQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUNqQyxRQUFROzs7O1FBQUMsVUFBQyxNQUFxQixJQUFLLE9BQUEsSUFBSSxVQUFVOzs7O1FBQVMsVUFBQyxXQUFXO1lBRXJFLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQzVDLFNBQVM7Ozs7WUFBQyxVQUFDLElBQW1CO2dCQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDOzs7O1lBQUUsVUFBQSxLQUFLO2dCQUNOLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztvQkFDakQsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtpQkFDMUIsQ0FBQyxDQUFDLENBQUE7WUFDTCxDQUFDLEVBQUMsQ0FBQTtRQUNOLENBQUMsRUFBQyxFQWJrQyxDQWFsQyxFQUFDLENBRUosRUFqQjBCLENBaUIxQixFQUFBO0lBQ0gsQ0FBQzs7Z0JBbENGLFVBQVU7Ozs7Z0JBTmEsY0FBYztnQkFBRSxpQkFBaUI7Z0JBTmhELGFBQWE7Z0JBTXFDLHVCQUF1Qjs7SUEyQ2xGLG1CQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FwQ1ksWUFBWTs7Ozs7O0lBRXJCLCtCQUErQjs7Ozs7SUFDL0IseUNBQTRDOzs7OztJQUM1QyxrQ0FBaUM7Ozs7O0lBQ2pDLDJDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB1YkFjY291bnRBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBY2NvdW50QWN0aW9uLCBBY2NvdW50QWN0aW9ucywgTG9hZGluZ0JhckFjdGlvbnMsIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBBY2NvdW50Um9sZSB9IGZyb20gJy4uL21vZGVscy9hY2NvdW50Lm1vZGVsJztcblxuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjY291bnRFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogQWNjb3VudEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyQWN0aW9uczogTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgcHJpdmF0ZSBhY2NvdW50QXBpOiBQdWJBY2NvdW50QXBpLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uQWN0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5sb2FkUm9sZXMoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRSb2xlcygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFUyksXG4gICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY2NvdW50QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuXG4gICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG4gICAgICAgIHRoaXMuYWNjb3VudEFwaS5nZXRSb2xlcyhhY3Rpb24ubWV0YS5hY2NvdW50SWQpXG4gICAgICAgICAgLnN1YnNjcmliZSgoZGF0YTogQWNjb3VudFJvbGVbXSkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmxvYWRSb2xlc1N1Y2NlZWRlZChkYXRhKSk7XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvciB9XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9KVxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuXG59XG4iXX0=