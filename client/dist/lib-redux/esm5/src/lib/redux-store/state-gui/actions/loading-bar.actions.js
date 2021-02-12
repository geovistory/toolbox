/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/loading-bar.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
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
        { type: Injectable }
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFLaEQsdUJBQTJCOzs7SUFBTix3QkFBSTs7QUFBRSxDQUFDOzs7Ozs7Ozs7QUFZNUI7SUFBQTtRQUtjLGlCQUFZOzs7UUFBRyxjQUF3QixPQUFBLENBQUM7WUFDbEQsSUFBSSxFQUFFLGlCQUFpQixDQUFDLEtBQUs7WUFDN0IsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFKaUQsQ0FJakQsRUFBQTtRQUVVLGdCQUFXOzs7UUFBRyxjQUF3QixPQUFBLENBQUM7WUFDakQsSUFBSSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDNUIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFKZ0QsQ0FJaEQsRUFBQTtRQUVVLG9CQUFlOzs7UUFBRyxjQUF3QixPQUFBLENBQUM7WUFDckQsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFFBQVE7WUFDaEMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFKb0QsQ0FJcEQsRUFBQTtJQUlKLENBQUM7SUF2QmlCLHVCQUFLLEdBQUcsbUJBQW1CLENBQUM7SUFDNUIsc0JBQUksR0FBRyxrQkFBa0IsQ0FBQztJQUMxQiwwQkFBUSxHQUFHLHNCQUFzQixDQUFDOztnQkFKbkQsVUFBVTs7SUFLRztRQUFYLFFBQVEsRUFBRTs7MkRBSVQ7SUFFVTtRQUFYLFFBQVEsRUFBRTs7MERBSVQ7SUFFVTtRQUFYLFFBQVEsRUFBRTs7OERBSVQ7SUFJSix3QkFBQztDQUFBLEFBekJELElBeUJDO1NBeEJZLGlCQUFpQjs7O0lBQzVCLHdCQUE0Qzs7SUFDNUMsdUJBQTBDOztJQUMxQywyQkFBa0Q7O0lBQ2xELHlDQUlFOztJQUVGLHdDQUlFOztJQUVGLDRDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5cbi8vIEZsdXgtc3RhbmRhcmQtYWN0aW9uIGdpdmVzIHVzIHN0cm9uZ2VyIHR5cGluZyBvZiBvdXIgYWN0aW9ucy5cbnR5cGUgUGF5bG9hZCA9IGFueTtcbmludGVyZmFjZSBNZXRhRGF0YSB7IG51bGwgfTtcbmV4cG9ydCB0eXBlIExvYWRpbmdCYXJBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgdW5kZWZpbmVkPjtcblxuXG4vKipcbiogVGhpcyBhY3Rpb25zIHN0YXJ0LCBzdG9wIGFuZCBjb21wbGV0ZSB0aGUgZ2xvYmFsIGxvYWRpbmcgYmFyXG4qIHVzaW5nIGEgU2xpbUxvYWRpbmdCYXJTZXJ2aWNlIGluc3RhbnRpYXRlZCB3aXRoaW4gdGhlIGxvYWRpbmctYmFyXG4qIG1vZHVsZS5cbipcbiogSW4gb3JkZXIgdG8gc2hvdyBhIGxvYWRpbmcgYmFyIGluIEdVSSwgdXNlIHRoZSBMb2FkaW5nQmFyQ29tcG9uZW50XG4qIGV4cG9ydGVkIGJ5IHRoaXMgbW9kdWxlLlxuKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2FkaW5nQmFyQWN0aW9ucyB7XG4gIHN0YXRpYyByZWFkb25seSBTVEFSVCA9ICdMT0FESU5HX0JBUl9TVEFSVCc7XG4gIHN0YXRpYyByZWFkb25seSBTVE9QID0gJ0xPQURJTkdfQkFSX1NUT1AnO1xuICBzdGF0aWMgcmVhZG9ubHkgQ09QTUxFVEUgPSAnTE9BRElOR19CQVJfQ09QTUxFVEUnO1xuICBAZGlzcGF0Y2goKSBzdGFydExvYWRpbmcgPSAoKTogTG9hZGluZ0JhckFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IExvYWRpbmdCYXJBY3Rpb25zLlNUQVJULFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfSlcblxuICBAZGlzcGF0Y2goKSBzdG9wTG9hZGluZyA9ICgpOiBMb2FkaW5nQmFyQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTG9hZGluZ0JhckFjdGlvbnMuU1RPUCxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGxcbiAgfSlcblxuICBAZGlzcGF0Y2goKSBjb21wbGV0ZUxvYWRpbmcgPSAoKTogTG9hZGluZ0JhckFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IExvYWRpbmdCYXJBY3Rpb25zLkNPUE1MRVRFLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfSlcblxuXG5cbn1cbiJdfQ==