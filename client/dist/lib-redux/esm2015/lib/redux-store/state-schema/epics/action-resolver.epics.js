/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/action-resolver.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class ActionResolverEpics {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    constructor() {
        this.createEpics = (/**
         * @return {?}
         */
        () => combineEpics(this.createResolveEpic()));
    }
    /**
     * @private
     * @return {?}
     */
    createResolveEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(filter((/**
         * @param {?} action
         * @return {?}
         */
        action => !!action && !!action.meta && !!action.meta.removePending)), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } }))))));
    }
}
ActionResolverEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActionResolverEpics.ctorParameters = () => [];
/** @nocollapse */ ActionResolverEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActionResolverEpics_Factory() { return new ActionResolverEpics(); }, token: ActionResolverEpics, providedIn: "root" });
if (false) {
    /** @type {?} */
    ActionResolverEpics.prototype.createEpics;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLXJlc29sdmVyLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvYWN0aW9uLXJlc29sdmVyLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXFCLFlBQVksRUFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLbkQsTUFBTSxPQUFPLG1CQUFtQjs7SUFJOUI7UUFFQSxnQkFBVzs7O1FBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUM7SUFGM0MsQ0FBQzs7Ozs7SUFHVCxpQkFBaUI7UUFDdkI7Ozs7O1FBQU8sQ0FBQyxPQUErQixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDN0QsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsRUFFMUUsU0FBUzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FDcEcsRUFBQTtJQUNILENBQUM7OztZQWhCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7SUFPQywwQ0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSwgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uUmVzb2x2ZXJFcGljcyB7XG5cbiAgLy8gcmVxdWVzdE1hcDogeyBbdXVpZDogc3RyaW5nXTogQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxhbnk+IH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGNyZWF0ZUVwaWNzID0gKCkgPT4gY29tYmluZUVwaWNzKHRoaXMuY3JlYXRlUmVzb2x2ZUVwaWMoKSk7XG4gIHByaXZhdGUgY3JlYXRlUmVzb2x2ZUVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kOiBBY3Rpb25zT2JzZXJ2YWJsZTxhbnk+LCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgZmlsdGVyKGFjdGlvbiA9PiAhIWFjdGlvbiAmJiAhIWFjdGlvbi5tZXRhICYmICEhYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZyksXG5cbiAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4gKG9mKHsgdHlwZTogJ0NMRUFOX1VQX1JFU09MVkVEJywgbWV0YTogeyB1dWlkOiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nIH0gfSkpKSxcbiAgICApXG4gIH1cblxuXG5cbn1cbiJdfQ==