/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/schema.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActions } from '../actions/inf.actions';
import { GvSchemaActions } from '../actions/schema.actions';
import { SchemaService } from '../services/schema.service';
import { createPaginateByKey } from '../_helpers/createPaginateByKey';
import * as i0 from "@angular/core";
import * as i1 from "../services/schema.service";
import * as i2 from "../../state-gui/actions/loading-bar.actions";
import * as i3 from "../../state-gui/actions/notifications.actions";
import * as i4 from "../actions/inf.actions";
var SchemaEpics = /** @class */ (function () {
    function SchemaEpics(schemaObjectService, loadingBarActions, notificationActions, infActions) {
        this.schemaObjectService = schemaObjectService;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
        this.infActions = infActions;
    }
    /**
     * @return {?}
     */
    SchemaEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return combineEpics((
        /**
         * Epic for loading GvSchemaObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvSchemaObject
         * - else it toasts an error message
         */
        /**
         * Epic for loading GvSchemaObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvSchemaObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(GvSchemaActions.GV_SCHEMA_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        function (actionEmitter) {
            actionEmitter.next(_this.loadingBarActions.startLoading());
            action.payload.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.schemaObjectService.storeSchemaObjectGv(data, 0);
                actionEmitter.next(_this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                actionEmitter.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })); }))); }), (
        /**
        * Epic for loading GvPaginationObjects
        * - it subscribes to the given observable (payload), which usually triggers a REST API call
        * - on success it stores the GvPaginationObject
        * - else it toasts an error message
        */
        /**
         * Epic for loading GvPaginationObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvPaginationObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        function (actionEmitter) {
            actionEmitter.next(_this.loadingBarActions.startLoading());
            /** @type {?} */
            var pkProject = store.value.activeProject.pk_project;
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var paginateBy = createPaginateByKey(meta);
            // call action to set pagination loading on true
            _this.infActions.statement.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
            action.payload.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                // call action to store records
                _this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
                // call action to store pagination
                _this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, paginateBy, meta.limit, meta.offset, pkProject);
                // call action to complete loading bar
                actionEmitter.next(_this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                actionEmitter.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })); }))); }));
    };
    SchemaEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SchemaEpics.ctorParameters = function () { return [
        { type: SchemaService },
        { type: LoadingBarActions },
        { type: NotificationsAPIActions },
        { type: InfActions }
    ]; };
    /** @nocollapse */ SchemaEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(i0.ɵɵinject(i1.SchemaService), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.NotificationsAPIActions), i0.ɵɵinject(i4.InfActions)); }, token: SchemaEpics, providedIn: "root" });
    return SchemaEpics;
}());
export { SchemaEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.schemaObjectService;
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.loadingBarActions;
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.notificationActions;
    /** @type {?} */
    SchemaEpics.prototype.infActions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc2NoZW1hLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBbUIsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUE0QixlQUFlLEVBQXdCLE1BQU0sMkJBQTJCLENBQUM7QUFDNUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7QUFFdEU7SUFJRSxxQkFDVSxtQkFBa0MsRUFDbEMsaUJBQW9DLEVBQ3BDLG1CQUE0QyxFQUM3QyxVQUFzQjtRQUhyQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWU7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXlCO1FBQzdDLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFM0IsQ0FBQzs7OztJQUVFLGlDQUFXOzs7SUFBbEI7UUFBQSxpQkEyREM7UUF6REMsT0FBTyxZQUFZO1FBQ2pCOzs7OztXQUtHOzs7Ozs7Ozs7O1FBQ0gsVUFBQyxP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LFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTFEsYUFBYTtnQkFKYixpQkFBaUI7Z0JBQ2pCLHVCQUF1QjtnQkFDdkIsVUFBVTs7O3NCQVJuQjtDQXFGQyxBQXhFRCxJQXdFQztTQXJFWSxXQUFXOzs7Ozs7SUFFcEIsMENBQTBDOzs7OztJQUMxQyx3Q0FBNEM7Ozs7O0lBQzVDLDBDQUFvRDs7SUFDcEQsaUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUsIFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24sIEd2U2NoZW1hQWN0aW9ucywgR3ZTY2hlbWFPYmplY3RBY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zL3NjaGVtYS5hY3Rpb25zJztcbmltcG9ydCB7IFNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVQYWdpbmF0ZUJ5S2V5IH0gZnJvbSAnLi4vX2hlbHBlcnMvY3JlYXRlUGFnaW5hdGVCeUtleSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVtYUVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RTZXJ2aWNlOiBTY2hlbWFTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uQWN0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG5cbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLyoqXG4gICAgICAgKiBFcGljIGZvciBsb2FkaW5nIEd2U2NoZW1hT2JqZWN0c1xuICAgICAgICogLSBpdCBzdWJzY3JpYmVzIHRvIHRoZSBnaXZlbiBvYnNlcnZhYmxlIChwYXlsb2FkKSwgd2hpY2ggdXN1YWxseSB0cmlnZ2VycyBhIFJFU1QgQVBJIGNhbGxcbiAgICAgICAqIC0gb24gc3VjY2VzcyBpdCBzdG9yZXMgdGhlIEd2U2NoZW1hT2JqZWN0XG4gICAgICAgKiAtIGVsc2UgaXQgdG9hc3RzIGFuIGVycm9yIG1lc3NhZ2VcbiAgICAgICAqL1xuICAgICAgKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShHdlNjaGVtYUFjdGlvbnMuR1ZfU0NIRU1BX09CSkVDVF9MT0FEKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogR3ZTY2hlbWFPYmplY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGFjdGlvbkVtaXR0ZXIpID0+IHtcbiAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG4gICAgICAgICAgYWN0aW9uLnBheWxvYWQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3RHdihkYXRhLCAwKVxuICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvciB9XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICogRXBpYyBmb3IgbG9hZGluZyBHdlBhZ2luYXRpb25PYmplY3RzXG4gICAgICAqIC0gaXQgc3Vic2NyaWJlcyB0byB0aGUgZ2l2ZW4gb2JzZXJ2YWJsZSAocGF5bG9hZCksIHdoaWNoIHVzdWFsbHkgdHJpZ2dlcnMgYSBSRVNUIEFQSSBjYWxsXG4gICAgICAqIC0gb24gc3VjY2VzcyBpdCBzdG9yZXMgdGhlIEd2UGFnaW5hdGlvbk9iamVjdFxuICAgICAgKiAtIGVsc2UgaXQgdG9hc3RzIGFuIGVycm9yIG1lc3NhZ2VcbiAgICAgICovXG4gICAgICAoYWN0aW9uJCwgc3RvcmU6IFN0YXRlT2JzZXJ2YWJsZTxJQXBwU3RhdGU+KSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShHdlNjaGVtYUFjdGlvbnMuR1ZfUEFHSU5BVElPTl9PQkpFQ1RfTE9BRCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoYWN0aW9uRW1pdHRlcikgPT4ge1xuICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IHN0b3JlLnZhbHVlLmFjdGl2ZVByb2plY3QucGtfcHJvamVjdDtcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgICAgICAgY29uc3QgcGFnaW5hdGVCeSA9IGNyZWF0ZVBhZ2luYXRlQnlLZXkobWV0YSk7XG5cbiAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzZXQgcGFnaW5hdGlvbiBsb2FkaW5nIG9uIHRydWVcbiAgICAgICAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlKHBhZ2luYXRlQnksIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0LCBwa1Byb2plY3QpO1xuXG5cbiAgICAgICAgICBhY3Rpb24ucGF5bG9hZC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHJlY29yZHNcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdEd2KGRhdGEuc2NoZW1hcywgcGtQcm9qZWN0KTtcbiAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHBhZ2luYXRpb25cbiAgICAgICAgICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2VTdWNjZWVkZWQoZGF0YS5wYWdpbmF0ZWRTdGF0ZW1lbnRzLCBkYXRhLmNvdW50LCBwYWdpbmF0ZUJ5LCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCwgcGtQcm9qZWN0KTtcbiAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGNvbXBsZXRlIGxvYWRpbmcgYmFyXG4gICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG4iXX0=