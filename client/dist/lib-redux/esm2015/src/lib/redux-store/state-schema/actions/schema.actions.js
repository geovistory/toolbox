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
     * @param {?} req
     * @return {?}
     */
    loadGvPaginationObject(req) {
        /** @type {?} */
        const addPending = U.uuid();
        /** @type {?} */
        const action = {
            type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
            meta: { addPending, req },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zY2hlbWEuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBUXhDLDJDQUVDOzs7SUFEQywyQ0FBMEI7Ozs7OztBQVk1QixNQUFNLE9BQU8sZUFBZTs7OztJQUkxQixZQUFvQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFJLENBQUM7Ozs7Ozs7SUFPcEQsa0JBQWtCLENBQ2hCLFFBQW9DOztjQUU5QixVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7Y0FDckIsTUFBTSxHQUF5QjtZQUNuQyxJQUFJLEVBQUUsZUFBZSxDQUFDLHFCQUFxQjtZQUMzQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUU7WUFDcEIsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDOzs7Ozs7SUFPRCxzQkFBc0IsQ0FDcEIsR0FBMEI7O2NBRXBCLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztjQUNyQixNQUFNLEdBQTZCO1lBQ3ZDLElBQUksRUFBRSxlQUFlLENBQUMseUJBQXlCO1lBQy9DLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7U0FDMUI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDOztBQXBDZSxxQ0FBcUIsR0FBRyx3QkFBd0IsQ0FBQztBQUNqRCx5Q0FBeUIsR0FBRyw0QkFBNEIsQ0FBQzs7WUFMMUUsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBdkJRLE9BQU87Ozs7O0lBeUJkLHNDQUFpRTs7SUFDakUsMENBQXlFOzs7OztJQUU3RCxrQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3ZMb2FkU3ViZmllbGRQYWdlUmVxLCBHdlNjaGVtYU9iamVjdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5leHBvcnQgdHlwZSBHdlNjaGVtYU9iamVjdEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiwgTG9hZEFjdGlvbk1ldGE+O1xuXG5pbnRlcmZhY2UgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uTWV0YSBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHtcbiAgcmVxOiBHdkxvYWRTdWJmaWVsZFBhZ2VSZXFcbn1cbmV4cG9ydCB0eXBlIEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxudWxsLCBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb25NZXRhPjtcblxuXG4vKipcbiAqIENsYXNzIGZvciBhY3Rpb25zIHRoYXQgaGFuZGxlIHRoZSBsb2FkaW5nIG9mIHNjaGVtYSBvYmplY3RzLFxuICogbmVnYXRpdmUgc2NoZW1hIG9iamVjdHMgZWN0LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHdlNjaGVtYUFjdGlvbnMge1xuICBzdGF0aWMgcmVhZG9ubHkgR1ZfU0NIRU1BX09CSkVDVF9MT0FEID0gJ0dWX1NDSEVNQV9PQkpFQ1Q6OkxPQUQnO1xuICBzdGF0aWMgcmVhZG9ubHkgR1ZfUEFHSU5BVElPTl9PQkpFQ1RfTE9BRCA9ICdHVl9QQUdJTkFUSU9OX09CSkVDVDo6TE9BRCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG4gIC8qKlxuICAgKiBBY3Rpb24gZm9yIGxvYWRpbmcgR3ZTY2hlbWFPYmplY3QgaW50byB0aGUgc3RvcmVcbiAgICogQHBhcmFtIGFwaUNhbGwkIFBhc3MgaW4gdGhlIGFwaSBjYWxsLiBEb24ndCBzdWJzY3JpYmUgdG8gdGhlIGNhbGwsIHNpbmNlIG90aGVyd2lzZVxuICAgKiAgICAgICAgICAgICAgICB3ZSdsbCBlbmQgdXAgd2l0aCB0d28gc3Vic2NyaXB0aW9ucyBhbmQgdGh1cyB0d28gYXBpIGNhbGxzXG4gICAqL1xuICBsb2FkR3ZTY2hlbWFPYmplY3QoXG4gICAgYXBpQ2FsbCQ6IE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgIGNvbnN0IGFjdGlvbjogR3ZTY2hlbWFPYmplY3RBY3Rpb24gPSB7XG4gICAgICB0eXBlOiBHdlNjaGVtYUFjdGlvbnMuR1ZfU0NIRU1BX09CSkVDVF9MT0FELFxuICAgICAgbWV0YTogeyBhZGRQZW5kaW5nIH0sXG4gICAgICBwYXlsb2FkOiBhcGlDYWxsJCxcbiAgICB9O1xuICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gIH1cblxuICAvKipcbiAqIEFjdGlvbiBmb3IgbG9hZGluZyBHdlBhZ2luYXRpb25PYmplY3QgaW50byB0aGUgc3RvcmVcbiAqIEBwYXJhbSBhcGlDYWxsJCBQYXNzIGluIHRoZSBhcGkgY2FsbC4gRG9uJ3Qgc3Vic2NyaWJlIHRvIHRoZSBjYWxsLCBzaW5jZSBvdGhlcndpc2VcbiAqICAgICAgICAgICAgICAgIHdlJ2xsIGVuZCB1cCB3aXRoIHR3byBzdWJzY3JpcHRpb25zIGFuZCB0aHVzIHR3byBhcGkgY2FsbHNcbiAqL1xuICBsb2FkR3ZQYWdpbmF0aW9uT2JqZWN0KFxuICAgIHJlcTogR3ZMb2FkU3ViZmllbGRQYWdlUmVxLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICBjb25zdCBhY3Rpb246IEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IEd2U2NoZW1hQWN0aW9ucy5HVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FELFxuICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCByZXEgfSxcbiAgICB9O1xuICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gIH1cbn1cbiJdfQ==