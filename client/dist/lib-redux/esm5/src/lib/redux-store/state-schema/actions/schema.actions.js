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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zY2hlbWEuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBUXhDLDJDQUVDOzs7SUFEQywyQ0FBbUI7Ozs7OztBQVNyQjtJQU9FLHlCQUFvQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFJLENBQUM7SUFFcEQ7Ozs7T0FJRzs7Ozs7OztJQUNILDRDQUFrQjs7Ozs7O0lBQWxCLFVBQ0UsUUFBb0M7O1lBRTlCLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztZQUNyQixNQUFNLEdBQXlCO1lBQ25DLElBQUksRUFBRSxlQUFlLENBQUMscUJBQXFCO1lBQzNDLElBQUksRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUVEOzs7O0tBSUM7Ozs7OztJQUNELGdEQUFzQjs7Ozs7SUFBdEIsVUFDRSxHQUFtQjs7WUFFYixVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7WUFDckIsTUFBTSxHQUE2QjtZQUN2QyxJQUFJLEVBQUUsZUFBZSxDQUFDLHlCQUF5QjtZQUMvQyxJQUFJLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRTtTQUMxQjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFwQ2UscUNBQXFCLEdBQUcsd0JBQXdCLENBQUM7SUFDakQseUNBQXlCLEdBQUcsNEJBQTRCLENBQUM7O2dCQUwxRSxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXZCUSxPQUFPOzs7MEJBQWhCO0NBOERDLEFBekNELElBeUNDO1NBdENZLGVBQWU7OztJQUMxQixzQ0FBaUU7O0lBQ2pFLDBDQUF5RTs7Ozs7SUFFN0Qsa0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEd2RmllbGRQYWdlUmVxLCBHdlNjaGVtYU9iamVjdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5leHBvcnQgdHlwZSBHdlNjaGVtYU9iamVjdEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiwgTG9hZEFjdGlvbk1ldGE+O1xuXG5pbnRlcmZhY2UgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uTWV0YSBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHtcbiAgcmVxOiBHdkZpZWxkUGFnZVJlcVxufVxuZXhwb3J0IHR5cGUgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPG51bGwsIEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbk1ldGE+O1xuXG5cbi8qKlxuICogQ2xhc3MgZm9yIGFjdGlvbnMgdGhhdCBoYW5kbGUgdGhlIGxvYWRpbmcgb2Ygc2NoZW1hIG9iamVjdHMsXG4gKiBuZWdhdGl2ZSBzY2hlbWEgb2JqZWN0cyBlY3QuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEd2U2NoZW1hQWN0aW9ucyB7XG4gIHN0YXRpYyByZWFkb25seSBHVl9TQ0hFTUFfT0JKRUNUX0xPQUQgPSAnR1ZfU0NIRU1BX09CSkVDVDo6TE9BRCc7XG4gIHN0YXRpYyByZWFkb25seSBHVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FEID0gJ0dWX1BBR0lOQVRJT05fT0JKRUNUOjpMT0FEJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbiAgLyoqXG4gICAqIEFjdGlvbiBmb3IgbG9hZGluZyBHdlNjaGVtYU9iamVjdCBpbnRvIHRoZSBzdG9yZVxuICAgKiBAcGFyYW0gYXBpQ2FsbCQgUGFzcyBpbiB0aGUgYXBpIGNhbGwuIERvbid0IHN1YnNjcmliZSB0byB0aGUgY2FsbCwgc2luY2Ugb3RoZXJ3aXNlXG4gICAqICAgICAgICAgICAgICAgIHdlJ2xsIGVuZCB1cCB3aXRoIHR3byBzdWJzY3JpcHRpb25zIGFuZCB0aHVzIHR3byBhcGkgY2FsbHNcbiAgICovXG4gIGxvYWRHdlNjaGVtYU9iamVjdChcbiAgICBhcGlDYWxsJDogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgY29uc3QgYWN0aW9uOiBHdlNjaGVtYU9iamVjdEFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IEd2U2NoZW1hQWN0aW9ucy5HVl9TQ0hFTUFfT0JKRUNUX0xPQUQsXG4gICAgICBtZXRhOiB7IGFkZFBlbmRpbmcgfSxcbiAgICAgIHBheWxvYWQ6IGFwaUNhbGwkLFxuICAgIH07XG4gICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgfVxuXG4gIC8qKlxuICogQWN0aW9uIGZvciBsb2FkaW5nIEd2UGFnaW5hdGlvbk9iamVjdCBpbnRvIHRoZSBzdG9yZVxuICogQHBhcmFtIGFwaUNhbGwkIFBhc3MgaW4gdGhlIGFwaSBjYWxsLiBEb24ndCBzdWJzY3JpYmUgdG8gdGhlIGNhbGwsIHNpbmNlIG90aGVyd2lzZVxuICogICAgICAgICAgICAgICAgd2UnbGwgZW5kIHVwIHdpdGggdHdvIHN1YnNjcmlwdGlvbnMgYW5kIHRodXMgdHdvIGFwaSBjYWxsc1xuICovXG4gIGxvYWRHdlBhZ2luYXRpb25PYmplY3QoXG4gICAgcmVxOiBHdkZpZWxkUGFnZVJlcSxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgY29uc3QgYWN0aW9uOiBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24gPSB7XG4gICAgICB0eXBlOiBHdlNjaGVtYUFjdGlvbnMuR1ZfUEFHSU5BVElPTl9PQkpFQ1RfTE9BRCxcbiAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcmVxIH0sXG4gICAgfTtcbiAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICB9XG59XG4iXX0=