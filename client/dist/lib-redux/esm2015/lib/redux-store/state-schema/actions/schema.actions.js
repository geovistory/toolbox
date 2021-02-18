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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3NjaGVtYS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBa0J4QyxNQUFNLE9BQU8sZUFBZTs7OztJQUkxQixZQUFvQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFJLENBQUM7Ozs7Ozs7SUFPcEQsa0JBQWtCLENBQ2hCLFFBQW9DOztjQUU5QixVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7Y0FDckIsTUFBTSxHQUF5QjtZQUNuQyxJQUFJLEVBQUUsZUFBZSxDQUFDLHFCQUFxQjtZQUMzQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUU7WUFDcEIsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDOzs7Ozs7OztJQU9ELHNCQUFzQixDQUNwQixRQUF3QyxFQUN4QyxJQUF3RDs7Y0FFbEQsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2NBQ3JCLE1BQU0sR0FBNkI7WUFDdkMsSUFBSSxFQUFFLGVBQWUsQ0FBQyx5QkFBeUI7WUFDL0MsSUFBSSxrQkFBSSxVQUFVLElBQUssSUFBSSxDQUFFO1lBQzdCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0IsQ0FBQzs7QUF0Q2UscUNBQXFCLEdBQUcsd0JBQXdCLENBQUM7QUFDakQseUNBQXlCLEdBQUcsNEJBQTRCLENBQUM7O1lBTDFFLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXBCUSxPQUFPOzs7OztJQXNCZCxzQ0FBaUU7O0lBQ2pFLDBDQUF5RTs7Ozs7SUFFN0Qsa0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEd2UGFnaW5hdGlvbk9iamVjdCwgR3ZTY2hlbWFPYmplY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgTG9hZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YSB9IGZyb20gJy4vaW5mLmFjdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBHdlNjaGVtYU9iamVjdEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiwgTG9hZEFjdGlvbk1ldGE+O1xuZXhwb3J0IHR5cGUgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPE9ic2VydmFibGU8R3ZQYWdpbmF0aW9uT2JqZWN0PiwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPjtcblxuXG4vKipcbiAqIENsYXNzIGZvciBhY3Rpb25zIHRoYXQgaGFuZGxlIHRoZSBsb2FkaW5nIG9mIHNjaGVtYSBvYmplY3RzLFxuICogbmVnYXRpdmUgc2NoZW1hIG9iamVjdHMgZWN0LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHdlNjaGVtYUFjdGlvbnMge1xuICBzdGF0aWMgcmVhZG9ubHkgR1ZfU0NIRU1BX09CSkVDVF9MT0FEID0gJ0dWX1NDSEVNQV9PQkpFQ1Q6OkxPQUQnO1xuICBzdGF0aWMgcmVhZG9ubHkgR1ZfUEFHSU5BVElPTl9PQkpFQ1RfTE9BRCA9ICdHVl9QQUdJTkFUSU9OX09CSkVDVDo6TE9BRCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG4gIC8qKlxuICAgKiBBY3Rpb24gZm9yIGxvYWRpbmcgR3ZTY2hlbWFPYmplY3QgaW50byB0aGUgc3RvcmVcbiAgICogQHBhcmFtIGFwaUNhbGwkIFBhc3MgaW4gdGhlIGFwaSBjYWxsLiBEb24ndCBzdWJzY3JpYmUgdG8gdGhlIGNhbGwsIHNpbmNlIG90aGVyd2lzZVxuICAgKiAgICAgICAgICAgICAgICB3ZSdsbCBlbmQgdXAgd2l0aCB0d28gc3Vic2NyaXB0aW9ucyBhbmQgdGh1cyB0d28gYXBpIGNhbGxzXG4gICAqL1xuICBsb2FkR3ZTY2hlbWFPYmplY3QoXG4gICAgYXBpQ2FsbCQ6IE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgIGNvbnN0IGFjdGlvbjogR3ZTY2hlbWFPYmplY3RBY3Rpb24gPSB7XG4gICAgICB0eXBlOiBHdlNjaGVtYUFjdGlvbnMuR1ZfU0NIRU1BX09CSkVDVF9MT0FELFxuICAgICAgbWV0YTogeyBhZGRQZW5kaW5nIH0sXG4gICAgICBwYXlsb2FkOiBhcGlDYWxsJCxcbiAgICB9O1xuICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gIH1cblxuICAvKipcbiAqIEFjdGlvbiBmb3IgbG9hZGluZyBHdlBhZ2luYXRpb25PYmplY3QgaW50byB0aGUgc3RvcmVcbiAqIEBwYXJhbSBhcGlDYWxsJCBQYXNzIGluIHRoZSBhcGkgY2FsbC4gRG9uJ3Qgc3Vic2NyaWJlIHRvIHRoZSBjYWxsLCBzaW5jZSBvdGhlcndpc2VcbiAqICAgICAgICAgICAgICAgIHdlJ2xsIGVuZCB1cCB3aXRoIHR3byBzdWJzY3JpcHRpb25zIGFuZCB0aHVzIHR3byBhcGkgY2FsbHNcbiAqL1xuICBsb2FkR3ZQYWdpbmF0aW9uT2JqZWN0KFxuICAgIGFwaUNhbGwkOiBPYnNlcnZhYmxlPEd2UGFnaW5hdGlvbk9iamVjdD4sXG4gICAgbWV0YTogT21pdDxMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEsICdhZGRQZW5kaW5nJz4sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgIGNvbnN0IGFjdGlvbjogR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uID0ge1xuICAgICAgdHlwZTogR3ZTY2hlbWFBY3Rpb25zLkdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQsXG4gICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIC4uLm1ldGEgfSxcbiAgICAgIHBheWxvYWQ6IGFwaUNhbGwkLFxuICAgIH07XG4gICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgfVxufVxuIl19