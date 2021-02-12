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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUtoRCx1QkFBMkI7OztJQUFOLHdCQUFJOztBQUFFLENBQUM7Ozs7Ozs7OztBQVk1QjtJQUFBO1FBS2MsaUJBQVk7OztRQUFHLGNBQXdCLE9BQUEsQ0FBQztZQUNsRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsS0FBSztZQUM3QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUppRCxDQUlqRCxFQUFBO1FBRVUsZ0JBQVc7OztRQUFHLGNBQXdCLE9BQUEsQ0FBQztZQUNqRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUM1QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUpnRCxDQUloRCxFQUFBO1FBRVUsb0JBQWU7OztRQUFHLGNBQXdCLE9BQUEsQ0FBQztZQUNyRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsUUFBUTtZQUNoQyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUpvRCxDQUlwRCxFQUFBO0lBSUosQ0FBQztJQXZCaUIsdUJBQUssR0FBRyxtQkFBbUIsQ0FBQztJQUM1QixzQkFBSSxHQUFHLGtCQUFrQixDQUFDO0lBQzFCLDBCQUFRLEdBQUcsc0JBQXNCLENBQUM7O2dCQUpuRCxVQUFVOztJQUtHO1FBQVgsUUFBUSxFQUFFOzsyREFJVDtJQUVVO1FBQVgsUUFBUSxFQUFFOzswREFJVDtJQUVVO1FBQVgsUUFBUSxFQUFFOzs4REFJVDtJQUlKLHdCQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0F4QlksaUJBQWlCOzs7SUFDNUIsd0JBQTRDOztJQUM1Qyx1QkFBMEM7O0lBQzFDLDJCQUFrRDs7SUFDbEQseUNBSUU7O0lBRUYsd0NBSUU7O0lBRUYsNENBSUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcblxuLy8gRmx1eC1zdGFuZGFyZC1hY3Rpb24gZ2l2ZXMgdXMgc3Ryb25nZXIgdHlwaW5nIG9mIG91ciBhY3Rpb25zLlxudHlwZSBQYXlsb2FkID0gYW55O1xuaW50ZXJmYWNlIE1ldGFEYXRhIHsgbnVsbCB9O1xuZXhwb3J0IHR5cGUgTG9hZGluZ0JhckFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB1bmRlZmluZWQ+O1xuXG5cbi8qKlxuKiBUaGlzIGFjdGlvbnMgc3RhcnQsIHN0b3AgYW5kIGNvbXBsZXRlIHRoZSBnbG9iYWwgbG9hZGluZyBiYXJcbiogdXNpbmcgYSBTbGltTG9hZGluZ0JhclNlcnZpY2UgaW5zdGFudGlhdGVkIHdpdGhpbiB0aGUgbG9hZGluZy1iYXJcbiogbW9kdWxlLlxuKlxuKiBJbiBvcmRlciB0byBzaG93IGEgbG9hZGluZyBiYXIgaW4gR1VJLCB1c2UgdGhlIExvYWRpbmdCYXJDb21wb25lbnRcbiogZXhwb3J0ZWQgYnkgdGhpcyBtb2R1bGUuXG4qL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRpbmdCYXJBY3Rpb25zIHtcbiAgc3RhdGljIHJlYWRvbmx5IFNUQVJUID0gJ0xPQURJTkdfQkFSX1NUQVJUJztcbiAgc3RhdGljIHJlYWRvbmx5IFNUT1AgPSAnTE9BRElOR19CQVJfU1RPUCc7XG4gIHN0YXRpYyByZWFkb25seSBDT1BNTEVURSA9ICdMT0FESU5HX0JBUl9DT1BNTEVURSc7XG4gIEBkaXNwYXRjaCgpIHN0YXJ0TG9hZGluZyA9ICgpOiBMb2FkaW5nQmFyQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTG9hZGluZ0JhckFjdGlvbnMuU1RBUlQsXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9KVxuXG4gIEBkaXNwYXRjaCgpIHN0b3BMb2FkaW5nID0gKCk6IExvYWRpbmdCYXJBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBMb2FkaW5nQmFyQWN0aW9ucy5TVE9QLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbFxuICB9KVxuXG4gIEBkaXNwYXRjaCgpIGNvbXBsZXRlTG9hZGluZyA9ICgpOiBMb2FkaW5nQmFyQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTG9hZGluZ0JhckFjdGlvbnMuQ09QTUxFVEUsXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9KVxuXG5cblxufVxuIl19