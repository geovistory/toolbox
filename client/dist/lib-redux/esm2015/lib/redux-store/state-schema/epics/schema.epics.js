/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/schema.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class SchemaEpics {
    /**
     * @param {?} schemaObjectService
     * @param {?} loadingBarActions
     * @param {?} notificationActions
     * @param {?} infActions
     * @param {?} pag
     */
    constructor(schemaObjectService, loadingBarActions, notificationActions, infActions, pag) {
        this.schemaObjectService = schemaObjectService;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
        this.infActions = infActions;
        this.pag = pag;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics((/**
         * Epic for loading GvSchemaObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvSchemaObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(GvSchemaActions.GV_SCHEMA_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        (actionEmitter) => {
            actionEmitter.next(this.loadingBarActions.startLoading());
            action.payload.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this.schemaObjectService.storeSchemaObjectGv(data, 0);
                actionEmitter.next(this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                actionEmitter.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })))))), (/**
         * Epic for loading GvPaginationObjects
         * - it subscribes to the given observable (payload), which usually triggers a REST API call
         * - on success it stores the GvPaginationObject
         * - else it toasts an error message
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(GvSchemaActions.GV_PAGINATION_OBJECT_LOAD), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} actionEmitter
         * @return {?}
         */
        (actionEmitter) => {
            actionEmitter.next(this.loadingBarActions.startLoading());
            /** @type {?} */
            const pkProject = store.value.activeProject.pk_project;
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const paginateBy = createPaginateByKey(meta.req.page);
            // call action to set pagination loading on true
            this.infActions.statement.loadPage(meta.req.page, pkProject);
            this.pag.paginatedStatementsControllerLoadSubfieldPage(action.meta.req)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                // call action to store records
                this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
                // call action to store page informations
                for (const subfieldPage of data.subfieldPages) {
                    this.infActions.statement.loadPageSucceeded(subfieldPage.paginatedStatements, subfieldPage.count, subfieldPage.page, pkProject);
                }
                // call action to complete loading bar
                actionEmitter.next(this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                actionEmitter.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error }
                }));
            }));
        })))))));
    }
}
SchemaEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaEpics.ctorParameters = () => [
    { type: SchemaService },
    { type: LoadingBarActions },
    { type: NotificationsAPIActions },
    { type: InfActions },
    { type: PaginatedStatementsControllerService }
];
/** @nocollapse */ SchemaEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(i0.ɵɵinject(i1.SchemaService), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.NotificationsAPIActions), i0.ɵɵinject(i4.InfActions), i0.ɵɵinject(i5.PaginatedStatementsControllerService)); }, token: SchemaEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc2NoZW1hLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RSxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBbUIsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUE0QixlQUFlLEVBQXdCLE1BQU0sMkJBQTJCLENBQUM7QUFDNUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7O0FBS3RFLE1BQU0sT0FBTyxXQUFXOzs7Ozs7OztJQUN0QixZQUNVLG1CQUFrQyxFQUNsQyxpQkFBb0MsRUFDcEMsbUJBQTRDLEVBQzdDLFVBQXNCLEVBQ3JCLEdBQXlDO1FBSnpDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBZTtRQUNsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7UUFDN0MsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixRQUFHLEdBQUgs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LEVBQUUsT0FBTztvQkFDYixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2lCQUMxQixDQUFDLENBQUMsQ0FBQTtZQUNMLENBQUMsRUFBQyxDQUFBO1FBQ04sQ0FBQyxFQUFDLEVBQUMsQ0FDSixFQUNGLENBQUE7SUFDSCxDQUFDOzs7WUExRUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTFEsYUFBYTtZQUpiLGlCQUFpQjtZQUNqQix1QkFBdUI7WUFDdkIsVUFBVTtZQVJWLG9DQUFvQzs7Ozs7Ozs7SUFrQnpDLDBDQUEwQzs7Ozs7SUFDMUMsd0NBQTRDOzs7OztJQUM1QywwQ0FBb0Q7O0lBQ3BELGlDQUE2Qjs7Ozs7SUFDN0IsMEJBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGVkU3RhdGVtZW50c0NvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uLCBHdlNjaGVtYUFjdGlvbnMsIEd2U2NoZW1hT2JqZWN0QWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucy9zY2hlbWEuYWN0aW9ucyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlUGFnaW5hdGVCeUtleSB9IGZyb20gJy4uL19oZWxwZXJzL2NyZWF0ZVBhZ2luYXRlQnlLZXknO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHByaXZhdGUgcGFnOiBQYWdpbmF0ZWRTdGF0ZW1lbnRzQ29udHJvbGxlclNlcnZpY2VcblxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvKipcbiAgICAgICAqIEVwaWMgZm9yIGxvYWRpbmcgR3ZTY2hlbWFPYmplY3RzXG4gICAgICAgKiAtIGl0IHN1YnNjcmliZXMgdG8gdGhlIGdpdmVuIG9ic2VydmFibGUgKHBheWxvYWQpLCB3aGljaCB1c3VhbGx5IHRyaWdnZXJzIGEgUkVTVCBBUEkgY2FsbFxuICAgICAgICogLSBvbiBzdWNjZXNzIGl0IHN0b3JlcyB0aGUgR3ZTY2hlbWFPYmplY3RcbiAgICAgICAqIC0gZWxzZSBpdCB0b2FzdHMgYW4gZXJyb3IgbWVzc2FnZVxuICAgICAgICovXG4gICAgICAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEd2U2NoZW1hQWN0aW9ucy5HVl9TQ0hFTUFfT0JKRUNUX0xPQUQpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBHdlNjaGVtYU9iamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoYWN0aW9uRW1pdHRlcikgPT4ge1xuICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcbiAgICAgICAgICBhY3Rpb24ucGF5bG9hZC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdEd2KGRhdGEsIDApXG4gICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgKiBFcGljIGZvciBsb2FkaW5nIEd2UGFnaW5hdGlvbk9iamVjdHNcbiAgICAgICogLSBpdCBzdWJzY3JpYmVzIHRvIHRoZSBnaXZlbiBvYnNlcnZhYmxlIChwYXlsb2FkKSwgd2hpY2ggdXN1YWxseSB0cmlnZ2VycyBhIFJFU1QgQVBJIGNhbGxcbiAgICAgICogLSBvbiBzdWNjZXNzIGl0IHN0b3JlcyB0aGUgR3ZQYWdpbmF0aW9uT2JqZWN0XG4gICAgICAqIC0gZWxzZSBpdCB0b2FzdHMgYW4gZXJyb3IgbWVzc2FnZVxuICAgICAgKi9cbiAgICAgIChhY3Rpb24kLCBzdG9yZTogU3RhdGVPYnNlcnZhYmxlPElBcHBTdGF0ZT4pID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEd2U2NoZW1hQWN0aW9ucy5HVl9QQUdJTkFUSU9OX09CSkVDVF9MT0FEKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChhY3Rpb25FbWl0dGVyKSA9PiB7XG4gICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gc3RvcmUudmFsdWUuYWN0aXZlUHJvamVjdC5wa19wcm9qZWN0O1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICAgICAgICBjb25zdCBwYWdpbmF0ZUJ5ID0gY3JlYXRlUGFnaW5hdGVCeUtleShtZXRhLnJlcS5wYWdlKTtcblxuICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHNldCBwYWdpbmF0aW9uIGxvYWRpbmcgb24gdHJ1ZVxuICAgICAgICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2UobWV0YS5yZXEucGFnZSwgcGtQcm9qZWN0KTtcblxuICAgICAgICAgIHRoaXMucGFnLnBhZ2luYXRlZFN0YXRlbWVudHNDb250cm9sbGVyTG9hZFN1YmZpZWxkUGFnZShhY3Rpb24ubWV0YS5yZXEpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHJlY29yZHNcbiAgICAgICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0R3YoZGF0YS5zY2hlbWFzLCBwa1Byb2plY3QpO1xuICAgICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSBwYWdlIGluZm9ybWF0aW9uc1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YmZpZWxkUGFnZSBvZiBkYXRhLnN1YmZpZWxkUGFnZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlU3VjY2VlZGVkKHN1YmZpZWxkUGFnZS5wYWdpbmF0ZWRTdGF0ZW1lbnRzLCBzdWJmaWVsZFBhZ2UuY291bnQsIHN1YmZpZWxkUGFnZS5wYWdlLCBwa1Byb2plY3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGNvbXBsZXRlIGxvYWRpbmcgYmFyXG4gICAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvciB9XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgKVxuICB9XG59XG5cbiJdfQ==