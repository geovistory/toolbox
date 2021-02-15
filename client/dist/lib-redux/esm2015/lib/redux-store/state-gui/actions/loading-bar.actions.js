/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/loading-bar.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLM0MsdUJBQTJCOzs7SUFBTix3QkFBSTs7QUFBRSxDQUFDOzs7Ozs7Ozs7QUFlNUIsTUFBTSxPQUFPLGlCQUFpQjtJQUg5QjtRQU9jLGlCQUFZOzs7UUFBRyxHQUFxQixFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsS0FBSztZQUM3QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUFBO1FBRVUsZ0JBQVc7OztRQUFHLEdBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQzVCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBQUE7UUFFVSxvQkFBZTs7O1FBQUcsR0FBcUIsRUFBRSxDQUFDLENBQUM7WUFDckQsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFFBQVE7WUFDaEMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFBQTtLQUlIOztBQXZCaUIsdUJBQUssR0FBRyxtQkFBbUIsQ0FBQztBQUM1QixzQkFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQzFCLDBCQUFRLEdBQUcsc0JBQXNCLENBQUM7O1lBTm5ELFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O0FBS2E7SUFBWCxRQUFRLEVBQUU7O3VEQUlUO0FBRVU7SUFBWCxRQUFRLEVBQUU7O3NEQUlUO0FBRVU7SUFBWCxRQUFRLEVBQUU7OzBEQUlUOzs7SUFuQkYsd0JBQTRDOztJQUM1Qyx1QkFBMEM7O0lBQzFDLDJCQUFrRDs7SUFDbEQseUNBSUU7O0lBRUYsd0NBSUU7O0lBRUYsNENBSUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcblxuLy8gRmx1eC1zdGFuZGFyZC1hY3Rpb24gZ2l2ZXMgdXMgc3Ryb25nZXIgdHlwaW5nIG9mIG91ciBhY3Rpb25zLlxudHlwZSBQYXlsb2FkID0gYW55O1xuaW50ZXJmYWNlIE1ldGFEYXRhIHsgbnVsbCB9O1xuZXhwb3J0IHR5cGUgTG9hZGluZ0JhckFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB1bmRlZmluZWQ+O1xuXG5cbi8qKlxuKiBUaGlzIGFjdGlvbnMgc3RhcnQsIHN0b3AgYW5kIGNvbXBsZXRlIHRoZSBnbG9iYWwgbG9hZGluZyBiYXJcbiogdXNpbmcgYSBTbGltTG9hZGluZ0JhclNlcnZpY2UgaW5zdGFudGlhdGVkIHdpdGhpbiB0aGUgbG9hZGluZy1iYXJcbiogbW9kdWxlLlxuKlxuKiBJbiBvcmRlciB0byBzaG93IGEgbG9hZGluZyBiYXIgaW4gR1VJLCB1c2UgdGhlIExvYWRpbmdCYXJDb21wb25lbnRcbiogZXhwb3J0ZWQgYnkgdGhpcyBtb2R1bGUuXG4qL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0JhckFjdGlvbnMge1xuICBzdGF0aWMgcmVhZG9ubHkgU1RBUlQgPSAnTE9BRElOR19CQVJfU1RBUlQnO1xuICBzdGF0aWMgcmVhZG9ubHkgU1RPUCA9ICdMT0FESU5HX0JBUl9TVE9QJztcbiAgc3RhdGljIHJlYWRvbmx5IENPUE1MRVRFID0gJ0xPQURJTkdfQkFSX0NPUE1MRVRFJztcbiAgQGRpc3BhdGNoKCkgc3RhcnRMb2FkaW5nID0gKCk6IExvYWRpbmdCYXJBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBMb2FkaW5nQmFyQWN0aW9ucy5TVEFSVCxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH0pXG5cbiAgQGRpc3BhdGNoKCkgc3RvcExvYWRpbmcgPSAoKTogTG9hZGluZ0JhckFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IExvYWRpbmdCYXJBY3Rpb25zLlNUT1AsXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsXG4gIH0pXG5cbiAgQGRpc3BhdGNoKCkgY29tcGxldGVMb2FkaW5nID0gKCk6IExvYWRpbmdCYXJBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBMb2FkaW5nQmFyQWN0aW9ucy5DT1BNTEVURSxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH0pXG5cblxuXG59XG4iXX0=