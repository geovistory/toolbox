/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/notifications.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
function MetaData() { }
if (false) {
    /** @type {?|undefined} */
    MetaData.prototype.itemsArray;
}
;
var NotificationsAPIActions = /** @class */ (function () {
    function NotificationsAPIActions() {
        this.addToast = (/**
         * @param {?} payload
         * @return {?}
         */
        function (payload) { return ({
            type: NotificationsAPIActions.ADD_TOAST,
            meta: null,
            payload: payload
        }); });
    }
    NotificationsAPIActions.ADD_TOAST = 'Notifications::ADD_TOAST';
    NotificationsAPIActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ NotificationsAPIActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NotificationsAPIActions_Factory() { return new NotificationsAPIActions(); }, token: NotificationsAPIActions, providedIn: "root" });
    return NotificationsAPIActions;
}());
export { NotificationsAPIActions };
if (false) {
    /** @type {?} */
    NotificationsAPIActions.ADD_TOAST;
    /** @type {?} */
    NotificationsAPIActions.prototype.addToast;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLM0MsdUJBRUM7OztJQURDLDhCQUFrQjs7QUFDbkIsQ0FBQztBQUdGO0lBQUE7UUFNRSxhQUFROzs7O1FBQUcsVUFBQyxPQUFnQixJQUE2QixPQUFBLENBQUM7WUFDeEQsSUFBSSxFQUFFLHVCQUF1QixDQUFDLFNBQVM7WUFDdkMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLFNBQUE7U0FDUixDQUFDLEVBSnVELENBSXZELEVBQUM7S0FFSjtJQVJpQixpQ0FBUyxHQUFHLDBCQUEwQixDQUFDOztnQkFKeEQsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2tDQVpEO0NBc0JDLEFBWkQsSUFZQztTQVRZLHVCQUF1Qjs7O0lBQ2xDLGtDQUF1RDs7SUFFdkQsMkNBSUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zSSB9IGZyb20gJy4uL21vZGVscy9ub3RpZmljYXRpb25zLm1vZGVscyc7XG5cbnR5cGUgUGF5bG9hZCA9IE5vdGlmaWNhdGlvbnNJO1xuaW50ZXJmYWNlIE1ldGFEYXRhIHtcbiAgaXRlbXNBcnJheT86IGFueVtdXG59O1xuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uc0FQSUFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhRGF0YT47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIHtcbiAgc3RhdGljIHJlYWRvbmx5IEFERF9UT0FTVCA9ICdOb3RpZmljYXRpb25zOjpBRERfVE9BU1QnO1xuXG4gIGFkZFRvYXN0ID0gKHBheWxvYWQ6IFBheWxvYWQpOiBOb3RpZmljYXRpb25zQVBJQWN0aW9uID0+ICh7XG4gICAgdHlwZTogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMuQUREX1RPQVNULFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZFxuICB9KTtcblxufVxuIl19