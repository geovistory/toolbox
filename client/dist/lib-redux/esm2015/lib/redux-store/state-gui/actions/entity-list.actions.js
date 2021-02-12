/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/entity-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
export class InformationAPIActions {
    constructor() {
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        () => ({
            type: InformationAPIActions.DESTROY,
            meta: null,
            payload: null
        }));
    }
}
InformationAPIActions.DESTROY = 'Information::DESTROY';
InformationAPIActions.decorators = [
    { type: Injectable }
];
tslib_1.__decorate([
    dispatch(),
    tslib_1.__metadata("design:type", Object)
], InformationAPIActions.prototype, "destroy", void 0);
if (false) {
    /** @type {?} */
    InformationAPIActions.DESTROY;
    /**
     * ******************************************************************
     *  Method to distroy the slice of store
     * *******************************************************************
     * @type {?}
     */
    InformationAPIActions.prototype.destroy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2FjdGlvbnMvZW50aXR5LWxpc3QuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEzQyxNQUFNLE9BQU8scUJBQXFCO0lBRGxDOzs7Ozs7UUFXYyxZQUFPOzs7UUFBRyxHQUF5QixFQUFFLENBQUMsQ0FBQztZQUNqRCxJQUFJLEVBQUUscUJBQXFCLENBQUMsT0FBTztZQUNuQyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUFBO0lBQ0osQ0FBQzs7QUFYaUIsNkJBQU8sR0FBRyxzQkFBc0IsQ0FBQzs7WUFMbEQsVUFBVTs7QUFXRztJQUFYLFFBQVEsRUFBRTs7c0RBSVQ7OztJQVZGLDhCQUFpRDs7Ozs7OztJQU1qRCx3Q0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSW5mb3JtYXRpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xuXG50eXBlIFBheWxvYWQgPSBJbmZvcm1hdGlvbjtcbmV4cG9ydCB0eXBlIEluZm9ybWF0aW9uQVBJQWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHt9PjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uQVBJQWN0aW9ucyB7XG5cblxuXG4gIHN0YXRpYyByZWFkb25seSBERVNUUk9ZID0gJ0luZm9ybWF0aW9uOjpERVNUUk9ZJztcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiAgTWV0aG9kIHRvIGRpc3Ryb3kgdGhlIHNsaWNlIG9mIHN0b3JlXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgQGRpc3BhdGNoKCkgZGVzdHJveSA9ICgpOiBJbmZvcm1hdGlvbkFQSUFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IEluZm9ybWF0aW9uQVBJQWN0aW9ucy5ERVNUUk9ZLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbFxuICB9KVxufVxuIl19