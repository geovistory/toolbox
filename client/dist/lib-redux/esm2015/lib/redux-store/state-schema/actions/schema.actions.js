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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3NjaGVtYS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFReEMsMkNBRUM7OztJQURDLDJDQUEwQjs7Ozs7O0FBWTVCLE1BQU0sT0FBTyxlQUFlOzs7O0lBSTFCLFlBQW9CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQUksQ0FBQzs7Ozs7OztJQU9wRCxrQkFBa0IsQ0FDaEIsUUFBb0M7O2NBRTlCLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztjQUNyQixNQUFNLEdBQXlCO1lBQ25DLElBQUksRUFBRSxlQUFlLENBQUMscUJBQXFCO1lBQzNDLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRTtZQUNwQixPQUFPLEVBQUUsUUFBUTtTQUNsQjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLENBQUM7Ozs7OztJQU9ELHNCQUFzQixDQUNwQixHQUEwQjs7Y0FFcEIsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2NBQ3JCLE1BQU0sR0FBNkI7WUFDdkMsSUFBSSxFQUFFLGVBQWUsQ0FBQyx5QkFBeUI7WUFDL0MsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtTQUMxQjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLENBQUM7O0FBcENlLHFDQUFxQixHQUFHLHdCQUF3QixDQUFDO0FBQ2pELHlDQUF5QixHQUFHLDRCQUE0QixDQUFDOztZQUwxRSxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUF2QlEsT0FBTzs7Ozs7SUF5QmQsc0NBQWlFOztJQUNqRSwwQ0FBeUU7Ozs7O0lBRTdELGtDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHdkxvYWRTdWJmaWVsZFBhZ2VSZXEsIEd2U2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbmV4cG9ydCB0eXBlIEd2U2NoZW1hT2JqZWN0QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+LCBMb2FkQWN0aW9uTWV0YT47XG5cbmludGVyZmFjZSBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb25NZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICByZXE6IEd2TG9hZFN1YmZpZWxkUGFnZVJlcVxufVxuZXhwb3J0IHR5cGUgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPG51bGwsIEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbk1ldGE+O1xuXG5cbi8qKlxuICogQ2xhc3MgZm9yIGFjdGlvbnMgdGhhdCBoYW5kbGUgdGhlIGxvYWRpbmcgb2Ygc2NoZW1hIG9iamVjdHMsXG4gKiBuZWdhdGl2ZSBzY2hlbWEgb2JqZWN0cyBlY3QuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEd2U2NoZW1hQWN0aW9ucyB7XG4gIHN0YXRpYyByZWFkb25seSBHVl9TQ0hFTUFfT0JKRUNUX0xPQUQgPSAnR1ZfU0NIRU1BX09CSkVDVDo6TE9BRCc7XG4gIHN0YXRpYyByZWFkb25seSBHVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FEID0gJ0dWX1BBR0lOQVRJT05fT0JKRUNUOjpMT0FEJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbiAgLyoqXG4gICAqIEFjdGlvbiBmb3IgbG9hZGluZyBHdlNjaGVtYU9iamVjdCBpbnRvIHRoZSBzdG9yZVxuICAgKiBAcGFyYW0gYXBpQ2FsbCQgUGFzcyBpbiB0aGUgYXBpIGNhbGwuIERvbid0IHN1YnNjcmliZSB0byB0aGUgY2FsbCwgc2luY2Ugb3RoZXJ3aXNlXG4gICAqICAgICAgICAgICAgICAgIHdlJ2xsIGVuZCB1cCB3aXRoIHR3byBzdWJzY3JpcHRpb25zIGFuZCB0aHVzIHR3byBhcGkgY2FsbHNcbiAgICovXG4gIGxvYWRHdlNjaGVtYU9iamVjdChcbiAgICBhcGlDYWxsJDogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgY29uc3QgYWN0aW9uOiBHdlNjaGVtYU9iamVjdEFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IEd2U2NoZW1hQWN0aW9ucy5HVl9TQ0hFTUFfT0JKRUNUX0xPQUQsXG4gICAgICBtZXRhOiB7IGFkZFBlbmRpbmcgfSxcbiAgICAgIHBheWxvYWQ6IGFwaUNhbGwkLFxuICAgIH07XG4gICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgfVxuXG4gIC8qKlxuICogQWN0aW9uIGZvciBsb2FkaW5nIEd2UGFnaW5hdGlvbk9iamVjdCBpbnRvIHRoZSBzdG9yZVxuICogQHBhcmFtIGFwaUNhbGwkIFBhc3MgaW4gdGhlIGFwaSBjYWxsLiBEb24ndCBzdWJzY3JpYmUgdG8gdGhlIGNhbGwsIHNpbmNlIG90aGVyd2lzZVxuICogICAgICAgICAgICAgICAgd2UnbGwgZW5kIHVwIHdpdGggdHdvIHN1YnNjcmlwdGlvbnMgYW5kIHRodXMgdHdvIGFwaSBjYWxsc1xuICovXG4gIGxvYWRHdlBhZ2luYXRpb25PYmplY3QoXG4gICAgcmVxOiBHdkxvYWRTdWJmaWVsZFBhZ2VSZXEsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgIGNvbnN0IGFjdGlvbjogR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uID0ge1xuICAgICAgdHlwZTogR3ZTY2hlbWFBY3Rpb25zLkdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQsXG4gICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHJlcSB9LFxuICAgIH07XG4gICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgfVxufVxuIl19