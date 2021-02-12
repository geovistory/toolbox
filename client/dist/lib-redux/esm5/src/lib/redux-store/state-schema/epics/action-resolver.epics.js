/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/action-resolver.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
var ActionResolverEpics = /** @class */ (function () {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    function ActionResolverEpics() {
        var _this = this;
        this.createEpics = (/**
         * @return {?}
         */
        function () { return combineEpics(_this.createResolveEpic()); });
    }
    /**
     * @private
     * @return {?}
     */
    ActionResolverEpics.prototype.createResolveEpic = /**
     * @private
     * @return {?}
     */
    function () {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(filter((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return !!action && !!action.meta && !!action.meta.removePending; })), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } })); }))); });
    };
    ActionResolverEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActionResolverEpics.ctorParameters = function () { return []; };
    /** @nocollapse */ ActionResolverEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActionResolverEpics_Factory() { return new ActionResolverEpics(); }, token: ActionResolverEpics, providedIn: "root" });
    return ActionResolverEpics;
}());
export { ActionResolverEpics };
if (false) {
    /** @type {?} */
    ActionResolverEpics.prototype.createEpics;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLXJlc29sdmVyLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2FjdGlvbi1yZXNvbHZlci5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRixPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRW5EO0lBS0Usb0VBQW9FO0lBRXBFO1FBQUEsaUJBQWlCO1FBRWpCLGdCQUFXOzs7UUFBRyxjQUFNLE9BQUEsWUFBWSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQXRDLENBQXNDLEVBQUM7SUFGM0MsQ0FBQzs7Ozs7SUFHVCwrQ0FBaUI7Ozs7SUFBekI7UUFDRTs7Ozs7UUFBTyxVQUFDLE9BQStCLEVBQUUsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FDN0QsTUFBTTs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQXhELENBQXdELEVBQUMsRUFFMUUsU0FBUzs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQTlFLENBQThFLEVBQUMsQ0FDcEcsRUFKa0QsQ0FJbEQsRUFBQTtJQUNILENBQUM7O2dCQWhCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozs4QkFQRDtDQXlCQyxBQXBCRCxJQW9CQztTQWpCWSxtQkFBbUI7OztJQU05QiwwQ0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSwgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uUmVzb2x2ZXJFcGljcyB7XG5cbiAgLy8gcmVxdWVzdE1hcDogeyBbdXVpZDogc3RyaW5nXTogQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxhbnk+IH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGNyZWF0ZUVwaWNzID0gKCkgPT4gY29tYmluZUVwaWNzKHRoaXMuY3JlYXRlUmVzb2x2ZUVwaWMoKSk7XG4gIHByaXZhdGUgY3JlYXRlUmVzb2x2ZUVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kOiBBY3Rpb25zT2JzZXJ2YWJsZTxhbnk+LCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgZmlsdGVyKGFjdGlvbiA9PiAhIWFjdGlvbiAmJiAhIWFjdGlvbi5tZXRhICYmICEhYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZyksXG5cbiAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4gKG9mKHsgdHlwZTogJ0NMRUFOX1VQX1JFU09MVkVEJywgbWV0YTogeyB1dWlkOiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nIH0gfSkpKSxcbiAgICApXG4gIH1cblxuXG5cbn1cbiJdfQ==