/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/schema.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
/**
 * @record
 */
function GvPaginationObjectActionMeta() { }
if (false) {
    /** @type {?} */
    GvPaginationObjectActionMeta.prototype.req;
}
/**
 * Class for actions that handle the loading of schema objects,
 * negative schema objects ect.
 */
var GvSchemaActions = /** @class */ (function () {
    function GvSchemaActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * Action for loading GvSchemaObject into the store
     * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     */
    /**
     * Action for loading GvSchemaObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @return {?}
     */
    GvSchemaActions.prototype.loadGvSchemaObject = /**
     * Action for loading GvSchemaObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @return {?}
     */
    function (apiCall$) {
        /** @type {?} */
        var addPending = U.uuid();
        /** @type {?} */
        var action = {
            type: GvSchemaActions.GV_SCHEMA_OBJECT_LOAD,
            meta: { addPending: addPending },
            payload: apiCall$,
        };
        this.ngRedux.dispatch(action);
    };
    /**
   * Action for loading GvPaginationObject into the store
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
    /**
     * Action for loading GvPaginationObject into the store
     * @param {?} req
     * @return {?}
     */
    GvSchemaActions.prototype.loadGvPaginationObject = /**
     * Action for loading GvPaginationObject into the store
     * @param {?} req
     * @return {?}
     */
    function (req) {
        /** @type {?} */
        var addPending = U.uuid();
        /** @type {?} */
        var action = {
            type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
            meta: { addPending: addPending, req: req },
        };
        this.ngRedux.dispatch(action);
    };
    GvSchemaActions.GV_SCHEMA_OBJECT_LOAD = 'GV_SCHEMA_OBJECT::LOAD';
    GvSchemaActions.GV_PAGINATION_OBJECT_LOAD = 'GV_PAGINATION_OBJECT::LOAD';
    GvSchemaActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GvSchemaActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ GvSchemaActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function GvSchemaActions_Factory() { return new GvSchemaActions(i0.ɵɵinject(i1.NgRedux)); }, token: GvSchemaActions, providedIn: "root" });
    return GvSchemaActions;
}());
export { GvSchemaActions };
if (false) {
    /** @type {?} */
    GvSchemaActions.GV_SCHEMA_OBJECT_LOAD;
    /** @type {?} */
    GvSchemaActions.GV_PAGINATION_OBJECT_LOAD;
    /**
     * @type {?}
     * @private
     */
    GvSchemaActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3NjaGVtYS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFReEMsMkNBRUM7OztJQURDLDJDQUFtQjs7Ozs7O0FBU3JCO0lBT0UseUJBQW9CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQUksQ0FBQztJQUVwRDs7OztPQUlHOzs7Ozs7O0lBQ0gsNENBQWtCOzs7Ozs7SUFBbEIsVUFDRSxRQUFvQzs7WUFFOUIsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O1lBQ3JCLE1BQU0sR0FBeUI7WUFDbkMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxxQkFBcUI7WUFDM0MsSUFBSSxFQUFFLEVBQUUsVUFBVSxZQUFBLEVBQUU7WUFDcEIsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQ7Ozs7S0FJQzs7Ozs7O0lBQ0QsZ0RBQXNCOzs7OztJQUF0QixVQUNFLEdBQW1COztZQUViLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztZQUNyQixNQUFNLEdBQTZCO1lBQ3ZDLElBQUksRUFBRSxlQUFlLENBQUMseUJBQXlCO1lBQy9DLElBQUksRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFFO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQXBDZSxxQ0FBcUIsR0FBRyx3QkFBd0IsQ0FBQztJQUNqRCx5Q0FBeUIsR0FBRyw0QkFBNEIsQ0FBQzs7Z0JBTDFFLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBdkJRLE9BQU87OzswQkFBaEI7Q0E4REMsQUF6Q0QsSUF5Q0M7U0F0Q1ksZUFBZTs7O0lBQzFCLHNDQUFpRTs7SUFDakUsMENBQXlFOzs7OztJQUU3RCxrQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3ZGaWVsZFBhZ2VSZXEsIEd2U2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbmV4cG9ydCB0eXBlIEd2U2NoZW1hT2JqZWN0QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+LCBMb2FkQWN0aW9uTWV0YT47XG5cbmludGVyZmFjZSBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb25NZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICByZXE6IEd2RmllbGRQYWdlUmVxXG59XG5leHBvcnQgdHlwZSBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248bnVsbCwgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uTWV0YT47XG5cblxuLyoqXG4gKiBDbGFzcyBmb3IgYWN0aW9ucyB0aGF0IGhhbmRsZSB0aGUgbG9hZGluZyBvZiBzY2hlbWEgb2JqZWN0cyxcbiAqIG5lZ2F0aXZlIHNjaGVtYSBvYmplY3RzIGVjdC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3ZTY2hlbWFBY3Rpb25zIHtcbiAgc3RhdGljIHJlYWRvbmx5IEdWX1NDSEVNQV9PQkpFQ1RfTE9BRCA9ICdHVl9TQ0hFTUFfT0JKRUNUOjpMT0FEJztcbiAgc3RhdGljIHJlYWRvbmx5IEdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQgPSAnR1ZfUEFHSU5BVElPTl9PQkpFQ1Q6OkxPQUQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxuICAvKipcbiAgICogQWN0aW9uIGZvciBsb2FkaW5nIEd2U2NoZW1hT2JqZWN0IGludG8gdGhlIHN0b3JlXG4gICAqIEBwYXJhbSBhcGlDYWxsJCBQYXNzIGluIHRoZSBhcGkgY2FsbC4gRG9uJ3Qgc3Vic2NyaWJlIHRvIHRoZSBjYWxsLCBzaW5jZSBvdGhlcndpc2VcbiAgICogICAgICAgICAgICAgICAgd2UnbGwgZW5kIHVwIHdpdGggdHdvIHN1YnNjcmlwdGlvbnMgYW5kIHRodXMgdHdvIGFwaSBjYWxsc1xuICAgKi9cbiAgbG9hZEd2U2NoZW1hT2JqZWN0KFxuICAgIGFwaUNhbGwkOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PlxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICBjb25zdCBhY3Rpb246IEd2U2NoZW1hT2JqZWN0QWN0aW9uID0ge1xuICAgICAgdHlwZTogR3ZTY2hlbWFBY3Rpb25zLkdWX1NDSEVNQV9PQkpFQ1RfTE9BRCxcbiAgICAgIG1ldGE6IHsgYWRkUGVuZGluZyB9LFxuICAgICAgcGF5bG9hZDogYXBpQ2FsbCQsXG4gICAgfTtcbiAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICB9XG5cbiAgLyoqXG4gKiBBY3Rpb24gZm9yIGxvYWRpbmcgR3ZQYWdpbmF0aW9uT2JqZWN0IGludG8gdGhlIHN0b3JlXG4gKiBAcGFyYW0gYXBpQ2FsbCQgUGFzcyBpbiB0aGUgYXBpIGNhbGwuIERvbid0IHN1YnNjcmliZSB0byB0aGUgY2FsbCwgc2luY2Ugb3RoZXJ3aXNlXG4gKiAgICAgICAgICAgICAgICB3ZSdsbCBlbmQgdXAgd2l0aCB0d28gc3Vic2NyaXB0aW9ucyBhbmQgdGh1cyB0d28gYXBpIGNhbGxzXG4gKi9cbiAgbG9hZEd2UGFnaW5hdGlvbk9iamVjdChcbiAgICByZXE6IEd2RmllbGRQYWdlUmVxLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICBjb25zdCBhY3Rpb246IEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IEd2U2NoZW1hQWN0aW9ucy5HVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FELFxuICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCByZXEgfSxcbiAgICB9O1xuICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gIH1cbn1cbiJdfQ==