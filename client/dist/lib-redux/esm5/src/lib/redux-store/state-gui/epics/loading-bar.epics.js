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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvbG9hZGluZy1iYXIuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFLaEY7SUFFRSx5QkFDVSxPQUE4QixFQUM5QixPQUEwQjtRQUQxQixZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUM5QixZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUNoQyxDQUFDOzs7O0lBRUUscUNBQVc7OztJQUFsQjtRQUNFLE9BQU8sWUFBWSxDQUNqQixJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFDaEMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQ3BDLENBQUM7SUFDSixDQUFDOzs7OztJQUVPLHNEQUE0Qjs7OztJQUFwQztRQUFBLGlCQVVDO1FBVEM7Ozs7O1FBQU8sVUFBQyxPQUFPLEVBQUUsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FDckMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUNsQyxTQUFTOzs7UUFBQztZQUNSLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQ3ZCLDRDQUE0QztZQUM5QyxDQUFDLEVBQUMsQ0FBQTtRQUNKLENBQUMsRUFBQyxDQUNILEVBUjBCLENBUTFCLEVBQUE7SUFDSCxDQUFDOzs7OztJQUVPLG1EQUF5Qjs7OztJQUFqQztRQUFBLGlCQVNDO1FBUkM7Ozs7O1FBQU8sVUFBQyxPQUFPLEVBQUUsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FDckMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUMvQixTQUFTOzs7UUFBQztZQUNSLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUE7UUFDSixDQUFDLEVBQUMsQ0FDSCxFQVAwQixDQU8xQixFQUFBO0lBQ0gsQ0FBQzs7Z0JBbkNGLFVBQVU7Ozs7Z0JBVkYscUJBQXFCO2dCQUtyQixpQkFBaUI7O0lBeUMxQixzQkFBQztDQUFBLEFBcENELElBb0NDO1NBbkNZLGVBQWU7Ozs7OztJQUV4QixrQ0FBc0M7Ozs7O0lBQ3RDLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNsaW1Mb2FkaW5nQmFyU2VydmljZSB9IGZyb20gJ0BjaW1lL25neC1zbGltLWxvYWRpbmctYmFyJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5cblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2FkaW5nQmFyRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IFNsaW1Mb2FkaW5nQmFyU2VydmljZSxcbiAgICBwcml2YXRlIGFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMuY3JlYXRlU3RhcnRMb2FkaW5nQmFyRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVDb21wbGV0ZUxvYWRpbmdCYXJFcGljKClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21wbGV0ZUxvYWRpbmdCYXJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShMb2FkaW5nQmFyQWN0aW9ucy5DT1BNTEVURSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgIHRoaXMuc2VydmljZS5jb21wbGV0ZSgpXG4gICAgICAgICAgLy8gb2JzZXJ2ZXIubmV4dCh0aGlzLmFjdGlvbnMuc3RvcExvYWRpbmcoKSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTdGFydExvYWRpbmdCYXJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShMb2FkaW5nQmFyQWN0aW9ucy5TVEFSVCksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgIHRoaXMuc2VydmljZS5zdGFydCgpO1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cbiJdfQ==