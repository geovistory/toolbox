/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/schema.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActions } from '../actions/inf.actions';
import { GvSchemaActions } from '../actions/schema.actions';
import { SchemaService } from '../services/schema.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/schema.service";
import * as i2 from "../../state-gui/actions/loading-bar.actions";
import * as i3 from "../../state-gui/actions/notifications.actions";
import * as i4 from "../actions/inf.actions";
import * as i5 from "@kleiolab/lib-sdk-lb4";
var SchemaEpics = /** @class */ (function () {
    function SchemaEpics(schemaObjectService, loadingBarActions, notificationActions, infActions, pag) {
        this.schemaObjectService = schemaObjectService;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
        this.infActions = infActions;
        this.pag = pag;
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
            // call action to set pagination loading on true
            _this.infActions.statement.loadPage(meta.req.page, pkProject);
            _this.pag.paginatedStatementsControllerLoadSubfieldPage(action.meta.req)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                var e_1, _a;
                // call action to store records
                _this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
                try {
                    // call action to store page informations
                    for (var _b = tslib_1.__values(data.subfieldPages), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var subfieldPage = _c.value;
                        _this.infActions.statement.loadPageSucceeded(subfieldPage.paginatedStatements, subfieldPage.count, subfieldPage.page, pkProject);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
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
        { type: InfActions },
        { type: PaginatedStatementsControllerService }
    ]; };
    /** @nocollapse */ SchemaEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(i0.ɵɵinject(i1.SchemaService), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.NotificationsAPIActions), i0.ɵɵinject(i4.InfActions), i0.ɵɵinject(i5.PaginatedStatementsControllerService)); }, token: SchemaEpics, providedIn: "root" });
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
    /**
     * @type {?}
     * @private
     */
    SchemaEpics.prototype.pag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3NjaGVtYS5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFtQixNQUFNLDZCQUE2QixDQUFDO0FBQzFGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQTRCLGVBQWUsRUFBd0IsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUFFM0Q7SUFJRSxxQkFDVSxtQkFBa0MsRUFDbEMsaUJBQW9DLEVBQ3BDLG1CQUE0QyxFQUM3QyxVQUFzQixFQUNyQixHQUF5QztRQUp6Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWU7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXlCO1FBQzdDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBc0M7SUFFL0MsQ0FBQzs7OztJQUVFLGlDQUFXOzs7SUFBbEI7UUFBQSxpQkE0REM7UUExREMs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QTtZQUNMLENBQUMsRUFBQyxDQUFBO1FBQ04sQ0FBQyxFQUFDLEVBekI2QyxDQXlCN0MsRUFBQyxDQUNKLEVBNUIrQyxDQTRCL0MsRUFDRixDQUFBO0lBQ0gsQ0FBQzs7Z0JBekVGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsYUFBYTtnQkFKYixpQkFBaUI7Z0JBQ2pCLHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFSVixvQ0FBb0M7OztzQkFEN0M7Q0F1RkMsQUExRUQsSUEwRUM7U0F2RVksV0FBVzs7Ozs7O0lBRXBCLDBDQUEwQzs7Ozs7SUFDMUMsd0NBQTRDOzs7OztJQUM1QywwQ0FBb0Q7O0lBQ3BELGlDQUE2Qjs7Ozs7SUFDN0IsMEJBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGVkU3RhdGVtZW50c0NvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uLCBHdlNjaGVtYUFjdGlvbnMsIEd2U2NoZW1hT2JqZWN0QWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucy9zY2hlbWEuYWN0aW9ucyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHByaXZhdGUgcGFnOiBQYWdpbmF0ZWRTdGF0ZW1lbnRzQ29udHJvbGxlclNlcnZpY2VcblxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvKipcbiAgICAgICAqIEVwaWMgZm9yIGxvYWRpbmcgR3ZTY2hlbWFPYmplY3RzXG4gICAgICAgKiAtIGl0IHN1YnNjcmliZXMgdG8gdGhlIGdpdmVuIG9ic2VydmFibGUgKHBheWxvYWQpLCB3aGljaCB1c3VhbGx5IHRyaWdnZXJzIGEgUkVTVCBBUEkgY2FsbFxuICAgICAgICogLSBvbiBzdWNjZXNzIGl0IHN0b3JlcyB0aGUgR3ZTY2hlbWFPYmplY3RcbiAgICAgICAqIC0gZWxzZSBpdCB0b2FzdHMgYW4gZXJyb3IgbWVzc2FnZVxuICAgICAgICovXG4gICAgICAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEd2U2NoZW1hQWN0aW9ucy5HVl9TQ0hFTUFfT0JKRUNUX0xPQUQpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBHdlNjaGVtYU9iamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoYWN0aW9uRW1pdHRlcikgPT4ge1xuICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcbiAgICAgICAgICBhY3Rpb24ucGF5bG9hZC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdEd2KGRhdGEsIDApXG4gICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgKiBFcGljIGZvciBsb2FkaW5nIEd2UGFnaW5hdGlvbk9iamVjdHNcbiAgICAgICogLSBpdCBzdWJzY3JpYmVzIHRvIHRoZSBnaXZlbiBvYnNlcnZhYmxlIChwYXlsb2FkKSwgd2hpY2ggdXN1YWxseSB0cmlnZ2VycyBhIFJFU1QgQVBJIGNhbGxcbiAgICAgICogLSBvbiBzdWNjZXNzIGl0IHN0b3JlcyB0aGUgR3ZQYWdpbmF0aW9uT2JqZWN0XG4gICAgICAqIC0gZWxzZSBpdCB0b2FzdHMgYW4gZXJyb3IgbWVzc2FnZVxuICAgICAgKi9cbiAgICAgIChhY3Rpb24kLCBzdG9yZTogU3RhdGVPYnNlcnZhYmxlPElBcHBTdGF0ZT4pID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEd2U2NoZW1hQWN0aW9ucy5HVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FEKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChhY3Rpb25FbWl0dGVyKSA9PiB7XG4gICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gc3RvcmUudmFsdWUuYWN0aXZlUHJvamVjdC5wa19wcm9qZWN0O1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcblxuICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHNldCBwYWdpbmF0aW9uIGxvYWRpbmcgb24gdHJ1ZVxuICAgICAgICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2UobWV0YS5yZXEucGFnZSwgcGtQcm9qZWN0KTtcblxuICAgICAgICAgIHRoaXMucGFnLnBhZ2luYXRlZFN0YXRlbWVudHNDb250cm9sbGVyTG9hZFN1YmZpZWxkUGFnZShhY3Rpb24ubWV0YS5yZXEpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHJlY29yZHNcbiAgICAgICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0R3YoZGF0YS5zY2hlbWFzLCBwa1Byb2plY3QpO1xuICAgICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSBwYWdlIGluZm9ybWF0aW9uc1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YmZpZWxkUGFnZSBvZiBkYXRhLnN1YmZpZWxkUGFnZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlU3VjY2VlZGVkKHN1YmZpZWxkUGFnZS5wYWdpbmF0ZWRTdGF0ZW1lbnRzLCBzdWJmaWVsZFBhZ2UuY291bnQsIHN1YmZpZWxkUGFnZS5wYWdlLCBwa1Byb2plY3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGNvbXBsZXRlIGxvYWRpbmcgYmFyXG4gICAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvciB9XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgKVxuICB9XG59XG5cbiJdfQ==