/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/schema.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
/**
 * Class for actions that handle the loading of schema objects,
 * negative schema objects ect.
 */
export class GvSchemaActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * Action for loading GvSchemaObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @return {?}
     */
    loadGvSchemaObject(apiCall$) {
        /** @type {?} */
        const addPending = U.uuid();
        /** @type {?} */
        const action = {
            type: GvSchemaActions.GV_SCHEMA_OBJECT_LOAD,
            meta: { addPending },
            payload: apiCall$,
        };
        this.ngRedux.dispatch(action);
    }
    /**
     * Action for loading GvPaginationObject into the store
     * @param {?} apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     * @param {?} meta
     * @return {?}
     */
    loadGvPaginationObject(apiCall$, meta) {
        /** @type {?} */
        const addPending = U.uuid();
        /** @type {?} */
        const action = {
            type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
            meta: Object.assign({ addPending }, meta),
            payload: apiCall$,
        };
        this.ngRedux.dispatch(action);
    }
}
GvSchemaActions.GV_SCHEMA_OBJECT_LOAD = 'GV_SCHEMA_OBJECT::LOAD';
GvSchemaActions.GV_PAGINATION_OBJECT_LOAD = 'GV_PAGINATION_OBJECT::LOAD';
GvSchemaActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
GvSchemaActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ GvSchemaActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function GvSchemaActions_Factory() { return new GvSchemaActions(i0.ɵɵinject(i1.NgRedux)); }, token: GvSchemaActions, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zY2hlbWEuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7OztBQWtCeEMsTUFBTSxPQUFPLGVBQWU7Ozs7SUFJMUIsWUFBb0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBSSxDQUFDOzs7Ozs7O0lBT3BELGtCQUFrQixDQUNoQixRQUFvQzs7Y0FFOUIsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2NBQ3JCLE1BQU0sR0FBeUI7WUFDbkMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxxQkFBcUI7WUFDM0MsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0IsQ0FBQzs7Ozs7Ozs7SUFPRCxzQkFBc0IsQ0FDcEIsUUFBd0MsRUFDeEMsSUFBd0Q7O2NBRWxELFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztjQUNyQixNQUFNLEdBQTZCO1lBQ3ZDLElBQUksRUFBRSxlQUFlLENBQUMseUJBQXlCO1lBQy9DLElBQUksa0JBQUksVUFBVSxJQUFLLElBQUksQ0FBRTtZQUM3QixPQUFPLEVBQUUsUUFBUTtTQUNsQjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLENBQUM7O0FBdENlLHFDQUFxQixHQUFHLHdCQUF3QixDQUFDO0FBQ2pELHlDQUF5QixHQUFHLDRCQUE0QixDQUFDOztZQUwxRSxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFwQlEsT0FBTzs7Ozs7SUFzQmQsc0NBQWlFOztJQUNqRSwwQ0FBeUU7Ozs7O0lBRTdELGtDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHdlBhZ2luYXRpb25PYmplY3QsIEd2U2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEgfSBmcm9tICcuL2luZi5hY3Rpb25zJztcblxuZXhwb3J0IHR5cGUgR3ZTY2hlbWFPYmplY3RBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248T2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD4sIExvYWRBY3Rpb25NZXRhPjtcbmV4cG9ydCB0eXBlIEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxPYnNlcnZhYmxlPEd2UGFnaW5hdGlvbk9iamVjdD4sIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT47XG5cblxuLyoqXG4gKiBDbGFzcyBmb3IgYWN0aW9ucyB0aGF0IGhhbmRsZSB0aGUgbG9hZGluZyBvZiBzY2hlbWEgb2JqZWN0cyxcbiAqIG5lZ2F0aXZlIHNjaGVtYSBvYmplY3RzIGVjdC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3ZTY2hlbWFBY3Rpb25zIHtcbiAgc3RhdGljIHJlYWRvbmx5IEdWX1NDSEVNQV9PQkpFQ1RfTE9BRCA9ICdHVl9TQ0hFTUFfT0JKRUNUOjpMT0FEJztcbiAgc3RhdGljIHJlYWRvbmx5IEdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQgPSAnR1ZfUEFHSU5BVElPTl9PQkpFQ1Q6OkxPQUQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxuICAvKipcbiAgICogQWN0aW9uIGZvciBsb2FkaW5nIEd2U2NoZW1hT2JqZWN0IGludG8gdGhlIHN0b3JlXG4gICAqIEBwYXJhbSBhcGlDYWxsJCBQYXNzIGluIHRoZSBhcGkgY2FsbC4gRG9uJ3Qgc3Vic2NyaWJlIHRvIHRoZSBjYWxsLCBzaW5jZSBvdGhlcndpc2VcbiAgICogICAgICAgICAgICAgICAgd2UnbGwgZW5kIHVwIHdpdGggdHdvIHN1YnNjcmlwdGlvbnMgYW5kIHRodXMgdHdvIGFwaSBjYWxsc1xuICAgKi9cbiAgbG9hZEd2U2NoZW1hT2JqZWN0KFxuICAgIGFwaUNhbGwkOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PlxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICBjb25zdCBhY3Rpb246IEd2U2NoZW1hT2JqZWN0QWN0aW9uID0ge1xuICAgICAgdHlwZTogR3ZTY2hlbWFBY3Rpb25zLkdWX1NDSEVNQV9PQkpFQ1RfTE9BRCxcbiAgICAgIG1ldGE6IHsgYWRkUGVuZGluZyB9LFxuICAgICAgcGF5bG9hZDogYXBpQ2FsbCQsXG4gICAgfTtcbiAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICB9XG5cbiAgLyoqXG4gKiBBY3Rpb24gZm9yIGxvYWRpbmcgR3ZQYWdpbmF0aW9uT2JqZWN0IGludG8gdGhlIHN0b3JlXG4gKiBAcGFyYW0gYXBpQ2FsbCQgUGFzcyBpbiB0aGUgYXBpIGNhbGwuIERvbid0IHN1YnNjcmliZSB0byB0aGUgY2FsbCwgc2luY2Ugb3RoZXJ3aXNlXG4gKiAgICAgICAgICAgICAgICB3ZSdsbCBlbmQgdXAgd2l0aCB0d28gc3Vic2NyaXB0aW9ucyBhbmQgdGh1cyB0d28gYXBpIGNhbGxzXG4gKi9cbiAgbG9hZEd2UGFnaW5hdGlvbk9iamVjdChcbiAgICBhcGlDYWxsJDogT2JzZXJ2YWJsZTxHdlBhZ2luYXRpb25PYmplY3Q+LFxuICAgIG1ldGE6IE9taXQ8TG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhLCAnYWRkUGVuZGluZyc+LFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICBjb25zdCBhY3Rpb246IEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IEd2U2NoZW1hQWN0aW9ucy5HVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FELFxuICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCAuLi5tZXRhIH0sXG4gICAgICBwYXlsb2FkOiBhcGlDYWxsJCxcbiAgICB9O1xuICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gIH1cbn1cbiJdfQ==