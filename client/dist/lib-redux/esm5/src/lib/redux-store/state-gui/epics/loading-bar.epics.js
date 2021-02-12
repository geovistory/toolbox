/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/loading-bar.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingBarActions } from '../actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvbG9hZGluZy1iYXIuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBSy9DO0lBRUUseUJBQ1UsT0FBOEIsRUFDOUIsT0FBMEI7UUFEMUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7SUFDaEMsQ0FBQzs7OztJQUVFLHFDQUFXOzs7SUFBbEI7UUFDRSxPQUFPLFlBQVksQ0FDakIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEVBQ2hDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUNwQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTyxzREFBNEI7Ozs7SUFBcEM7UUFBQSxpQkFVQztRQVRDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFDbEMsU0FBUzs7O1FBQUM7WUFDUixPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUN2Qiw0Q0FBNEM7WUFDOUMsQ0FBQyxFQUFDLENBQUE7UUFDSixDQUFDLEVBQUMsQ0FDSCxFQVIwQixDQVExQixFQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxtREFBeUI7Ozs7SUFBakM7UUFBQSxpQkFTQztRQVJDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFDL0IsU0FBUzs7O1FBQUM7WUFDUixPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFBO1FBQ0osQ0FBQyxFQUFDLENBQ0gsRUFQMEIsQ0FPMUIsRUFBQTtJQUNILENBQUM7O2dCQW5DRixVQUFVOzs7O2dCQVRGLHFCQUFxQjtnQkFJckIsaUJBQWlCOztJQXlDMUIsc0JBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQW5DWSxlQUFlOzs7Ozs7SUFFeEIsa0NBQXNDOzs7OztJQUN0QyxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBTbGltTG9hZGluZ0JhclNlcnZpY2UgfSBmcm9tICdAY2ltZS9uZ3gtc2xpbS1sb2FkaW5nLWJhcic7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuXG5cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGluZ0JhckVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBTbGltTG9hZGluZ0JhclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmNyZWF0ZVN0YXJ0TG9hZGluZ0JhckVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ29tcGxldGVMb2FkaW5nQmFyRXBpYygpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tcGxldGVMb2FkaW5nQmFyRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoTG9hZGluZ0JhckFjdGlvbnMuQ09QTUxFVEUpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICB0aGlzLnNlcnZpY2UuY29tcGxldGUoKVxuICAgICAgICAgIC8vIG9ic2VydmVyLm5leHQodGhpcy5hY3Rpb25zLnN0b3BMb2FkaW5nKCkpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU3RhcnRMb2FkaW5nQmFyRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoTG9hZGluZ0JhckFjdGlvbnMuU1RBUlQpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhcnQoKTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG4iXX0=