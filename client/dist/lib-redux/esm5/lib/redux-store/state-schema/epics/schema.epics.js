/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/schema.epics.ts
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
import { createPaginateByKey } from '../_helpers/createPaginateByKey';
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
            /** @type {?} */
            var paginateBy = createPaginateByKey(meta.req.page);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc2NoZW1hLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0UsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQW1CLE1BQU0sNkJBQTZCLENBQUM7QUFDMUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBNEIsZUFBZSxFQUF3QixNQUFNLDJCQUEyQixDQUFDO0FBQzVHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7OztBQUV0RTtJQUlFLHFCQUNVLG1CQUFrQyxFQUNsQyxpQkFBb0MsRUFDcEMsbUJBQTRDLEVBQzdDLFVBQXNCLEVBQ3JCLEdBQXlDO1FBSnpDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBZTtRQUNsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7UUFDN0MsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUFzQztJQUUvQyxDQUFD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bUIsQ0FBQyxRQUFRLENBQUM7b0JBQ25ELElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7aUJBQzFCLENBQUMsQ0FBQyxDQUFBO1lBQ0wsQ0FBQyxFQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsRUExQjZDLENBMEI3QyxFQUFDLENBQ0osRUE3QitDLENBNkIvQyxFQUNGLENBQUE7SUFDSCxDQUFDOztnQkExRUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFMUSxhQUFhO2dCQUpiLGlCQUFpQjtnQkFDakIsdUJBQXVCO2dCQUN2QixVQUFVO2dCQVJWLG9DQUFvQzs7O3NCQUQ3QztDQXlGQyxBQTNFRCxJQTJFQztTQXhFWSxXQUFXOzs7Ozs7SUFFcEIsMENBQTBDOzs7OztJQUMxQyx3Q0FBNEM7Ozs7O0lBQzVDLDBDQUFvRDs7SUFDcEQsaUNBQTZCOzs7OztJQUM3QiwwQkFBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdpbmF0ZWRTdGF0ZW1lbnRzQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUsIFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24sIEd2U2NoZW1hQWN0aW9ucywgR3ZTY2hlbWFPYmplY3RBY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zL3NjaGVtYS5hY3Rpb25zJztcbmltcG9ydCB7IFNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVQYWdpbmF0ZUJ5S2V5IH0gZnJvbSAnLi4vX2hlbHBlcnMvY3JlYXRlUGFnaW5hdGVCeUtleSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVtYUVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RTZXJ2aWNlOiBTY2hlbWFTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uQWN0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwYWc6IFBhZ2luYXRlZFN0YXRlbWVudHNDb250cm9sbGVyU2VydmljZVxuXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8qKlxuICAgICAgICogRXBpYyBmb3IgbG9hZGluZyBHdlNjaGVtYU9iamVjdHNcbiAgICAgICAqIC0gaXQgc3Vic2NyaWJlcyB0byB0aGUgZ2l2ZW4gb2JzZXJ2YWJsZSAocGF5bG9hZCksIHdoaWNoIHVzdWFsbHkgdHJpZ2dlcnMgYSBSRVNUIEFQSSBjYWxsXG4gICAgICAgKiAtIG9uIHN1Y2Nlc3MgaXQgc3RvcmVzIHRoZSBHdlNjaGVtYU9iamVjdFxuICAgICAgICogLSBlbHNlIGl0IHRvYXN0cyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoR3ZTY2hlbWFBY3Rpb25zLkdWX1NDSEVNQV9PQkpFQ1RfTE9BRCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEd2U2NoZW1hT2JqZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChhY3Rpb25FbWl0dGVyKSA9PiB7XG4gICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuICAgICAgICAgIGFjdGlvbi5wYXlsb2FkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0R3YoZGF0YSwgMClcbiAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIEVwaWMgZm9yIGxvYWRpbmcgR3ZQYWdpbmF0aW9uT2JqZWN0c1xuICAgICAgKiAtIGl0IHN1YnNjcmliZXMgdG8gdGhlIGdpdmVuIG9ic2VydmFibGUgKHBheWxvYWQpLCB3aGljaCB1c3VhbGx5IHRyaWdnZXJzIGEgUkVTVCBBUEkgY2FsbFxuICAgICAgKiAtIG9uIHN1Y2Nlc3MgaXQgc3RvcmVzIHRoZSBHdlBhZ2luYXRpb25PYmplY3RcbiAgICAgICogLSBlbHNlIGl0IHRvYXN0cyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAqL1xuICAgICAgKGFjdGlvbiQsIHN0b3JlOiBTdGF0ZU9ic2VydmFibGU8SUFwcFN0YXRlPikgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoR3ZTY2hlbWFBY3Rpb25zLkdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGFjdGlvbkVtaXR0ZXIpID0+IHtcbiAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBzdG9yZS52YWx1ZS5hY3RpdmVQcm9qZWN0LnBrX3Byb2plY3Q7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IHBhZ2luYXRlQnkgPSBjcmVhdGVQYWdpbmF0ZUJ5S2V5KG1ldGEucmVxLnBhZ2UpO1xuXG4gICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc2V0IHBhZ2luYXRpb24gbG9hZGluZyBvbiB0cnVlXG4gICAgICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZShtZXRhLnJlcS5wYWdlLCBwa1Byb2plY3QpO1xuXG4gICAgICAgICAgdGhpcy5wYWcucGFnaW5hdGVkU3RhdGVtZW50c0NvbnRyb2xsZXJMb2FkU3ViZmllbGRQYWdlKGFjdGlvbi5tZXRhLnJlcSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcmVjb3Jkc1xuICAgICAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3RHdihkYXRhLnNjaGVtYXMsIHBrUHJvamVjdCk7XG4gICAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHBhZ2UgaW5mb3JtYXRpb25zXG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViZmllbGRQYWdlIG9mIGRhdGEuc3ViZmllbGRQYWdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2VTdWNjZWVkZWQoc3ViZmllbGRQYWdlLnBhZ2luYXRlZFN0YXRlbWVudHMsIHN1YmZpZWxkUGFnZS5jb3VudCwgc3ViZmllbGRQYWdlLnBhZ2UsIHBrUHJvamVjdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gY29tcGxldGUgbG9hZGluZyBiYXJcbiAgICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yIH1cbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICApXG4gIH1cbn1cblxuIl19