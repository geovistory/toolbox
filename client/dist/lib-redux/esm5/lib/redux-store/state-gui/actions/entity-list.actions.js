/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/entity-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
var InformationAPIActions = /** @class */ (function () {
    function InformationAPIActions() {
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        function () { return ({
            type: InformationAPIActions.DESTROY,
            meta: null,
            payload: null
        }); });
    }
    InformationAPIActions.DESTROY = 'Information::DESTROY';
    InformationAPIActions.decorators = [
        { type: Injectable }
    ];
    tslib_1.__decorate([
        dispatch(),
        tslib_1.__metadata("design:type", Object)
    ], InformationAPIActions.prototype, "destroy", void 0);
    return InformationAPIActions;
}());
export { InformationAPIActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2FjdGlvbnMvZW50aXR5LWxpc3QuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQztJQUFBOzs7Ozs7UUFXYyxZQUFPOzs7UUFBRyxjQUE0QixPQUFBLENBQUM7WUFDakQsSUFBSSxFQUFFLHFCQUFxQixDQUFDLE9BQU87WUFDbkMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFKZ0QsQ0FJaEQsRUFBQTtJQUNKLENBQUM7SUFYaUIsNkJBQU8sR0FBRyxzQkFBc0IsQ0FBQzs7Z0JBTGxELFVBQVU7O0lBV0c7UUFBWCxRQUFRLEVBQUU7OzBEQUlUO0lBQ0osNEJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWZZLHFCQUFxQjs7O0lBSWhDLDhCQUFpRDs7Ozs7OztJQU1qRCx3Q0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSW5mb3JtYXRpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xuXG50eXBlIFBheWxvYWQgPSBJbmZvcm1hdGlvbjtcbmV4cG9ydCB0eXBlIEluZm9ybWF0aW9uQVBJQWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHt9PjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uQVBJQWN0aW9ucyB7XG5cblxuXG4gIHN0YXRpYyByZWFkb25seSBERVNUUk9ZID0gJ0luZm9ybWF0aW9uOjpERVNUUk9ZJztcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiAgTWV0aG9kIHRvIGRpc3Ryb3kgdGhlIHNsaWNlIG9mIHN0b3JlXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgQGRpc3BhdGNoKCkgZGVzdHJveSA9ICgpOiBJbmZvcm1hdGlvbkFQSUFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IEluZm9ybWF0aW9uQVBJQWN0aW9ucy5ERVNUUk9ZLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbFxuICB9KVxufVxuIl19