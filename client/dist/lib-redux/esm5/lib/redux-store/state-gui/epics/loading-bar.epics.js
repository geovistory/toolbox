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
import * as i0 from "@angular/core";
import * as i1 from "@cime/ngx-slim-loading-bar/src/slim-loading-bar.service";
var LoadingBarEpics = /** @class */ (function () {
    function LoadingBarEpics(service) {
        this.service = service;
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LoadingBarEpics.ctorParameters = function () { return [
        { type: SlimLoadingBarService }
    ]; };
    /** @nocollapse */ LoadingBarEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadingBarEpics_Factory() { return new LoadingBarEpics(i0.ɵɵinject(i1.SlimLoadingBarService)); }, token: LoadingBarEpics, providedIn: "root" });
    return LoadingBarEpics;
}());
export { LoadingBarEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadingBarEpics.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkUsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0FBS2hGO0lBSUUseUJBQ1UsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7SUFDcEMsQ0FBQzs7OztJQUVFLHFDQUFXOzs7SUFBbEI7UUFDRSxPQUFPLFlBQVksQ0FDakIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEVBQ2hDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUNwQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTyxzREFBNEI7Ozs7SUFBcEM7UUFBQSxpQkFVQztRQVRDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFDbEMsU0FBUzs7O1FBQUM7WUFDUixPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUN2Qiw0Q0FBNEM7WUFDOUMsQ0FBQyxFQUFDLENBQUE7UUFDSixDQUFDLEVBQUMsQ0FDSCxFQVIwQixDQVExQixFQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxtREFBeUI7Ozs7SUFBakM7UUFBQSxpQkFTQztRQVJDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFDL0IsU0FBUzs7O1FBQUM7WUFDUixPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFBO1FBQ0osQ0FBQyxFQUFDLENBQ0gsRUFQMEIsQ0FPMUIsRUFBQTtJQUNILENBQUM7O2dCQXBDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVpRLHFCQUFxQjs7OzBCQUQ5QjtDQWdEQyxBQXJDRCxJQXFDQztTQWxDWSxlQUFlOzs7Ozs7SUFFeEIsa0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2xpbUxvYWRpbmdCYXJTZXJ2aWNlIH0gZnJvbSAnQGNpbWUvbmd4LXNsaW0tbG9hZGluZy1iYXInO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9hZGluZ0JhckFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0JhckVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBTbGltTG9hZGluZ0JhclNlcnZpY2UsXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5jcmVhdGVTdGFydExvYWRpbmdCYXJFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUNvbXBsZXRlTG9hZGluZ0JhckVwaWMoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbXBsZXRlTG9hZGluZ0JhckVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKExvYWRpbmdCYXJBY3Rpb25zLkNPUE1MRVRFKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLmNvbXBsZXRlKClcbiAgICAgICAgICAvLyBvYnNlcnZlci5uZXh0KHRoaXMuYWN0aW9ucy5zdG9wTG9hZGluZygpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN0YXJ0TG9hZGluZ0JhckVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKExvYWRpbmdCYXJBY3Rpb25zLlNUQVJUKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLnN0YXJ0KCk7XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19