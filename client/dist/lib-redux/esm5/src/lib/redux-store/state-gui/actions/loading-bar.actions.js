/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/loading-bar.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
function MetaData() { }
if (false) {
    /** @type {?} */
    MetaData.prototype.null;
}
;
/**
 * This actions start, stop and complete the global loading bar
 * using a SlimLoadingBarService instantiated within the loading-bar
 * module.
 *
 * In order to show a loading bar in GUI, use the LoadingBarComponent
 * exported by this module.
 */
var LoadingBarActions = /** @class */ (function () {
    function LoadingBarActions() {
        this.startLoading = (/**
         * @return {?}
         */
        function () { return ({
            type: LoadingBarActions.START,
            meta: null,
            payload: null,
        }); });
        this.stopLoading = (/**
         * @return {?}
         */
        function () { return ({
            type: LoadingBarActions.STOP,
            meta: null,
            payload: null
        }); });
        this.completeLoading = (/**
         * @return {?}
         */
        function () { return ({
            type: LoadingBarActions.COPMLETE,
            meta: null,
            payload: null,
        }); });
    }
    LoadingBarActions.START = 'LOADING_BAR_START';
    LoadingBarActions.STOP = 'LOADING_BAR_STOP';
    LoadingBarActions.COPMLETE = 'LOADING_BAR_COPMLETE';
    LoadingBarActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ LoadingBarActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadingBarActions_Factory() { return new LoadingBarActions(); }, token: LoadingBarActions, providedIn: "root" });
    tslib_1.__decorate([
        dispatch(),
        tslib_1.__metadata("design:type", Object)
    ], LoadingBarActions.prototype, "startLoading", void 0);
    tslib_1.__decorate([
        dispatch(),
        tslib_1.__metadata("design:type", Object)
    ], LoadingBarActions.prototype, "stopLoading", void 0);
    tslib_1.__decorate([
        dispatch(),
        tslib_1.__metadata("design:type", Object)
    ], LoadingBarActions.prototype, "completeLoading", void 0);
    return LoadingBarActions;
}());
export { LoadingBarActions };
if (false) {
    /** @type {?} */
    LoadingBarActions.START;
    /** @type {?} */
    LoadingBarActions.STOP;
    /** @type {?} */
    LoadingBarActions.COPMLETE;
    /** @type {?} */
    LoadingBarActions.prototype.startLoading;
    /** @type {?} */
    LoadingBarActions.prototype.stopLoading;
    /** @type {?} */
    LoadingBarActions.prototype.completeLoading;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSzNDLHVCQUEyQjs7O0lBQU4sd0JBQUk7O0FBQUUsQ0FBQzs7Ozs7Ozs7O0FBWTVCO0lBQUE7UUFPYyxpQkFBWTs7O1FBQUcsY0FBd0IsT0FBQSxDQUFDO1lBQ2xELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxLQUFLO1lBQzdCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBSmlELENBSWpELEVBQUE7UUFFVSxnQkFBVzs7O1FBQUcsY0FBd0IsT0FBQSxDQUFDO1lBQ2pELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQzVCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBSmdELENBSWhELEVBQUE7UUFFVSxvQkFBZTs7O1FBQUcsY0FBd0IsT0FBQSxDQUFDO1lBQ3JELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxRQUFRO1lBQ2hDLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBSm9ELENBSXBELEVBQUE7S0FJSDtJQXZCaUIsdUJBQUssR0FBRyxtQkFBbUIsQ0FBQztJQUM1QixzQkFBSSxHQUFHLGtCQUFrQixDQUFDO0lBQzFCLDBCQUFRLEdBQUcsc0JBQXNCLENBQUM7O2dCQU5uRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7SUFLYTtRQUFYLFFBQVEsRUFBRTs7MkRBSVQ7SUFFVTtRQUFYLFFBQVEsRUFBRTs7MERBSVQ7SUFFVTtRQUFYLFFBQVEsRUFBRTs7OERBSVQ7NEJBekNKO0NBNkNDLEFBM0JELElBMkJDO1NBeEJZLGlCQUFpQjs7O0lBQzVCLHdCQUE0Qzs7SUFDNUMsdUJBQTBDOztJQUMxQywyQkFBa0Q7O0lBQ2xELHlDQUlFOztJQUVGLHdDQUlFOztJQUVGLDRDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5cbi8vIEZsdXgtc3RhbmRhcmQtYWN0aW9uIGdpdmVzIHVzIHN0cm9uZ2VyIHR5cGluZyBvZiBvdXIgYWN0aW9ucy5cbnR5cGUgUGF5bG9hZCA9IGFueTtcbmludGVyZmFjZSBNZXRhRGF0YSB7IG51bGwgfTtcbmV4cG9ydCB0eXBlIExvYWRpbmdCYXJBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgdW5kZWZpbmVkPjtcblxuXG4vKipcbiogVGhpcyBhY3Rpb25zIHN0YXJ0LCBzdG9wIGFuZCBjb21wbGV0ZSB0aGUgZ2xvYmFsIGxvYWRpbmcgYmFyXG4qIHVzaW5nIGEgU2xpbUxvYWRpbmdCYXJTZXJ2aWNlIGluc3RhbnRpYXRlZCB3aXRoaW4gdGhlIGxvYWRpbmctYmFyXG4qIG1vZHVsZS5cbipcbiogSW4gb3JkZXIgdG8gc2hvdyBhIGxvYWRpbmcgYmFyIGluIEdVSSwgdXNlIHRoZSBMb2FkaW5nQmFyQ29tcG9uZW50XG4qIGV4cG9ydGVkIGJ5IHRoaXMgbW9kdWxlLlxuKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdCYXJBY3Rpb25zIHtcbiAgc3RhdGljIHJlYWRvbmx5IFNUQVJUID0gJ0xPQURJTkdfQkFSX1NUQVJUJztcbiAgc3RhdGljIHJlYWRvbmx5IFNUT1AgPSAnTE9BRElOR19CQVJfU1RPUCc7XG4gIHN0YXRpYyByZWFkb25seSBDT1BNTEVURSA9ICdMT0FESU5HX0JBUl9DT1BNTEVURSc7XG4gIEBkaXNwYXRjaCgpIHN0YXJ0TG9hZGluZyA9ICgpOiBMb2FkaW5nQmFyQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTG9hZGluZ0JhckFjdGlvbnMuU1RBUlQsXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9KVxuXG4gIEBkaXNwYXRjaCgpIHN0b3BMb2FkaW5nID0gKCk6IExvYWRpbmdCYXJBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBMb2FkaW5nQmFyQWN0aW9ucy5TVE9QLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbFxuICB9KVxuXG4gIEBkaXNwYXRjaCgpIGNvbXBsZXRlTG9hZGluZyA9ICgpOiBMb2FkaW5nQmFyQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTG9hZGluZ0JhckFjdGlvbnMuQ09QTUxFVEUsXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9KVxuXG5cblxufVxuIl19