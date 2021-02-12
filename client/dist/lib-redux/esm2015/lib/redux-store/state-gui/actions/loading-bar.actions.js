/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/loading-bar.actions.ts
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
export class LoadingBarActions {
    constructor() {
        this.startLoading = (/**
         * @return {?}
         */
        () => ({
            type: LoadingBarActions.START,
            meta: null,
            payload: null,
        }));
        this.stopLoading = (/**
         * @return {?}
         */
        () => ({
            type: LoadingBarActions.STOP,
            meta: null,
            payload: null
        }));
        this.completeLoading = (/**
         * @return {?}
         */
        () => ({
            type: LoadingBarActions.COPMLETE,
            meta: null,
            payload: null,
        }));
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUtoRCx1QkFBMkI7OztJQUFOLHdCQUFJOztBQUFFLENBQUM7Ozs7Ozs7OztBQWE1QixNQUFNLE9BQU8saUJBQWlCO0lBRDlCO1FBS2MsaUJBQVk7OztRQUFHLEdBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxLQUFLO1lBQzdCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBQUE7UUFFVSxnQkFBVzs7O1FBQUcsR0FBcUIsRUFBRSxDQUFDLENBQUM7WUFDakQsSUFBSSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDNUIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFBQTtRQUVVLG9CQUFlOzs7UUFBRyxHQUFxQixFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsUUFBUTtZQUNoQyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUFBO0lBSUosQ0FBQzs7QUF2QmlCLHVCQUFLLEdBQUcsbUJBQW1CLENBQUM7QUFDNUIsc0JBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUMxQiwwQkFBUSxHQUFHLHNCQUFzQixDQUFDOztZQUpuRCxVQUFVOztBQUtHO0lBQVgsUUFBUSxFQUFFOzt1REFJVDtBQUVVO0lBQVgsUUFBUSxFQUFFOztzREFJVDtBQUVVO0lBQVgsUUFBUSxFQUFFOzswREFJVDs7O0lBbkJGLHdCQUE0Qzs7SUFDNUMsdUJBQTBDOztJQUMxQywyQkFBa0Q7O0lBQ2xELHlDQUlFOztJQUVGLHdDQUlFOztJQUVGLDRDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5cbi8vIEZsdXgtc3RhbmRhcmQtYWN0aW9uIGdpdmVzIHVzIHN0cm9uZ2VyIHR5cGluZyBvZiBvdXIgYWN0aW9ucy5cbnR5cGUgUGF5bG9hZCA9IGFueTtcbmludGVyZmFjZSBNZXRhRGF0YSB7IG51bGwgfTtcbmV4cG9ydCB0eXBlIExvYWRpbmdCYXJBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgdW5kZWZpbmVkPjtcblxuXG4vKipcbiogVGhpcyBhY3Rpb25zIHN0YXJ0LCBzdG9wIGFuZCBjb21wbGV0ZSB0aGUgZ2xvYmFsIGxvYWRpbmcgYmFyXG4qIHVzaW5nIGEgU2xpbUxvYWRpbmdCYXJTZXJ2aWNlIGluc3RhbnRpYXRlZCB3aXRoaW4gdGhlIGxvYWRpbmctYmFyXG4qIG1vZHVsZS5cbipcbiogSW4gb3JkZXIgdG8gc2hvdyBhIGxvYWRpbmcgYmFyIGluIEdVSSwgdXNlIHRoZSBMb2FkaW5nQmFyQ29tcG9uZW50XG4qIGV4cG9ydGVkIGJ5IHRoaXMgbW9kdWxlLlxuKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2FkaW5nQmFyQWN0aW9ucyB7XG4gIHN0YXRpYyByZWFkb25seSBTVEFSVCA9ICdMT0FESU5HX0JBUl9TVEFSVCc7XG4gIHN0YXRpYyByZWFkb25seSBTVE9QID0gJ0xPQURJTkdfQkFSX1NUT1AnO1xuICBzdGF0aWMgcmVhZG9ubHkgQ09QTUxFVEUgPSAnTE9BRElOR19CQVJfQ09QTUxFVEUnO1xuICBAZGlzcGF0Y2goKSBzdGFydExvYWRpbmcgPSAoKTogTG9hZGluZ0JhckFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IExvYWRpbmdCYXJBY3Rpb25zLlNUQVJULFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfSlcblxuICBAZGlzcGF0Y2goKSBzdG9wTG9hZGluZyA9ICgpOiBMb2FkaW5nQmFyQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTG9hZGluZ0JhckFjdGlvbnMuU1RPUCxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGxcbiAgfSlcblxuICBAZGlzcGF0Y2goKSBjb21wbGV0ZUxvYWRpbmcgPSAoKTogTG9hZGluZ0JhckFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IExvYWRpbmdCYXJBY3Rpb25zLkNPUE1MRVRFLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfSlcblxuXG5cbn1cbiJdfQ==