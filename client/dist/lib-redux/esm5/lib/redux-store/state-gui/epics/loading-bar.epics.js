/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/loading-bar.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
var LoadingBarEpics = /** @class */ (function () {
    function LoadingBarEpics(service, actions) {
        this.service = service;
        this.actions = actions;
    }
    /**
     * @return {?}
     */
    LoadingBarEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.createStartLoadingBarEpic(), this.createCompleteLoadingBarEpic());
    };
    /**
     * @private
     * @return {?}
     */
    LoadingBarEpics.prototype.createCompleteLoadingBarEpic = /**
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
        function (action$, store) { return action$.pipe(ofType(LoadingBarActions.COPMLETE), switchMap((/**
         * @return {?}
         */
        function () {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.service.complete();
                // observer.next(this.actions.stopLoading())
            }));
        }))); });
    };
    /**
     * @private
     * @return {?}
     */
    LoadingBarEpics.prototype.createStartLoadingBarEpic = /**
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
        function (action$, store) { return action$.pipe(ofType(LoadingBarActions.START), switchMap((/**
         * @return {?}
         */
        function () {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.service.start();
            }));
        }))); });
    };
    LoadingBarEpics.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoadingBarEpics.ctorParameters = function () { return [
        { type: SlimLoadingBarService },
        { type: LoadingBarActions }
    ]; };
    return LoadingBarEpics;
}());
export { LoadingBarEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadingBarEpics.prototype.service;
    /**
     * @type {?}
     * @private
     */
    LoadingBarEpics.prototype.actions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkUsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUtoRjtJQUVFLHlCQUNVLE9BQThCLEVBQzlCLE9BQTBCO1FBRDFCLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzlCLFlBQU8sR0FBUCxPQUFPLENBQW1CO0lBQ2hDLENBQUM7Ozs7SUFFRSxxQ0FBVzs7O0lBQWxCO1FBQ0UsT0FBTyxZQUFZLENBQ2pCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUNoQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FDcEMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sc0RBQTRCOzs7O0lBQXBDO1FBQUEsaUJBVUM7UUFUQzs7Ozs7UUFBTyxVQUFDLE9BQU8sRUFBRSxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUNyQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQ2xDLFNBQVM7OztRQUFDO1lBQ1IsT0FBTyxVQUFVLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsUUFBUTtnQkFDL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtnQkFDdkIsNENBQTRDO1lBQzlDLENBQUMsRUFBQyxDQUFBO1FBQ0osQ0FBQyxFQUFDLENBQ0gsRUFSMEIsQ0FRMUIsRUFBQTtJQUNILENBQUM7Ozs7O0lBRU8sbURBQXlCOzs7O0lBQWpDO1FBQUEsaUJBU0M7UUFSQzs7Ozs7UUFBTyxVQUFDLE9BQU8sRUFBRSxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUNyQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQy9CLFNBQVM7OztRQUFDO1lBQ1IsT0FBTyxVQUFVLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsUUFBUTtnQkFDL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQTtRQUNKLENBQUMsRUFBQyxDQUNILEVBUDBCLENBTzFCLEVBQUE7SUFDSCxDQUFDOztnQkFuQ0YsVUFBVTs7OztnQkFWRixxQkFBcUI7Z0JBS3JCLGlCQUFpQjs7SUF5QzFCLHNCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FuQ1ksZUFBZTs7Ozs7O0lBRXhCLGtDQUFzQzs7Ozs7SUFDdEMsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2xpbUxvYWRpbmdCYXJTZXJ2aWNlIH0gZnJvbSAnQGNpbWUvbmd4LXNsaW0tbG9hZGluZy1iYXInO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9hZGluZ0JhckFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcblxuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRpbmdCYXJFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogU2xpbUxvYWRpbmdCYXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWN0aW9uczogTG9hZGluZ0JhckFjdGlvbnMsXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5jcmVhdGVTdGFydExvYWRpbmdCYXJFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUNvbXBsZXRlTG9hZGluZ0JhckVwaWMoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbXBsZXRlTG9hZGluZ0JhckVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKExvYWRpbmdCYXJBY3Rpb25zLkNPUE1MRVRFKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLmNvbXBsZXRlKClcbiAgICAgICAgICAvLyBvYnNlcnZlci5uZXh0KHRoaXMuYWN0aW9ucy5zdG9wTG9hZGluZygpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN0YXJ0TG9hZGluZ0JhckVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKExvYWRpbmdCYXJBY3Rpb25zLlNUQVJUKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLnN0YXJ0KCk7XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19