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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFLaEQsdUJBQTJCOzs7SUFBTix3QkFBSTs7QUFBRSxDQUFDOzs7Ozs7Ozs7QUFhNUIsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5QjtRQUtjLGlCQUFZOzs7UUFBRyxHQUFxQixFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsS0FBSztZQUM3QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUFBO1FBRVUsZ0JBQVc7OztRQUFHLEdBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQzVCLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBQUE7UUFFVSxvQkFBZTs7O1FBQUcsR0FBcUIsRUFBRSxDQUFDLENBQUM7WUFDckQsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFFBQVE7WUFDaEMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFBQTtJQUlKLENBQUM7O0FBdkJpQix1QkFBSyxHQUFHLG1CQUFtQixDQUFDO0FBQzVCLHNCQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFDMUIsMEJBQVEsR0FBRyxzQkFBc0IsQ0FBQzs7WUFKbkQsVUFBVTs7QUFLRztJQUFYLFFBQVEsRUFBRTs7dURBSVQ7QUFFVTtJQUFYLFFBQVEsRUFBRTs7c0RBSVQ7QUFFVTtJQUFYLFFBQVEsRUFBRTs7MERBSVQ7OztJQW5CRix3QkFBNEM7O0lBQzVDLHVCQUEwQzs7SUFDMUMsMkJBQWtEOztJQUNsRCx5Q0FJRTs7SUFFRix3Q0FJRTs7SUFFRiw0Q0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuXG4vLyBGbHV4LXN0YW5kYXJkLWFjdGlvbiBnaXZlcyB1cyBzdHJvbmdlciB0eXBpbmcgb2Ygb3VyIGFjdGlvbnMuXG50eXBlIFBheWxvYWQgPSBhbnk7XG5pbnRlcmZhY2UgTWV0YURhdGEgeyBudWxsIH07XG5leHBvcnQgdHlwZSBMb2FkaW5nQmFyQWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHVuZGVmaW5lZD47XG5cblxuLyoqXG4qIFRoaXMgYWN0aW9ucyBzdGFydCwgc3RvcCBhbmQgY29tcGxldGUgdGhlIGdsb2JhbCBsb2FkaW5nIGJhclxuKiB1c2luZyBhIFNsaW1Mb2FkaW5nQmFyU2VydmljZSBpbnN0YW50aWF0ZWQgd2l0aGluIHRoZSBsb2FkaW5nLWJhclxuKiBtb2R1bGUuXG4qXG4qIEluIG9yZGVyIHRvIHNob3cgYSBsb2FkaW5nIGJhciBpbiBHVUksIHVzZSB0aGUgTG9hZGluZ0JhckNvbXBvbmVudFxuKiBleHBvcnRlZCBieSB0aGlzIG1vZHVsZS5cbiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGluZ0JhckFjdGlvbnMge1xuICBzdGF0aWMgcmVhZG9ubHkgU1RBUlQgPSAnTE9BRElOR19CQVJfU1RBUlQnO1xuICBzdGF0aWMgcmVhZG9ubHkgU1RPUCA9ICdMT0FESU5HX0JBUl9TVE9QJztcbiAgc3RhdGljIHJlYWRvbmx5IENPUE1MRVRFID0gJ0xPQURJTkdfQkFSX0NPUE1MRVRFJztcbiAgQGRpc3BhdGNoKCkgc3RhcnRMb2FkaW5nID0gKCk6IExvYWRpbmdCYXJBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBMb2FkaW5nQmFyQWN0aW9ucy5TVEFSVCxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH0pXG5cbiAgQGRpc3BhdGNoKCkgc3RvcExvYWRpbmcgPSAoKTogTG9hZGluZ0JhckFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IExvYWRpbmdCYXJBY3Rpb25zLlNUT1AsXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsXG4gIH0pXG5cbiAgQGRpc3BhdGNoKCkgY29tcGxldGVMb2FkaW5nID0gKCk6IExvYWRpbmdCYXJBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBMb2FkaW5nQmFyQWN0aW9ucy5DT1BNTEVURSxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH0pXG5cblxuXG59XG4iXX0=