/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/schema.epics.ts
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
export class SchemaEpics {
    /**
     * @param {?} schemaObjectService
     * @param {?} loadingBarActions
     * @param {?} notificationActions
     * @param {?} infActions
     */
    constructor(schemaObjectService, loadingBarActions, notificationActions, infActions) {
        this.schemaObjectService = schemaObjectService;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
        this.infActions = infActions;
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
            const paginateBy = createPaginateByKey(meta);
            // call action to set pagination loading on true
            this.infActions.statement.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
            action.payload.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                // call action to store records
                this.schemaObjectService.storeSchemaObjectGv(data.schemas, pkProject);
                // call action to store pagination
                this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, paginateBy, meta.limit, meta.offset, pkProject);
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
    { type: InfActions }
];
/** @nocollapse */ SchemaEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(i0.ɵɵinject(i1.SchemaService), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.NotificationsAPIActions), i0.ɵɵinject(i4.InfActions)); }, token: SchemaEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3NjaGVtYS5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQW1CLE1BQU0sNkJBQTZCLENBQUM7QUFDMUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBNEIsZUFBZSxFQUF3QixNQUFNLDJCQUEyQixDQUFDO0FBQzVHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7O0FBS3RFLE1BQU0sT0FBTyxXQUFXOzs7Ozs7O0lBQ3RCLFlBQ1UsbUJBQWtDLEVBQ2xDLGlCQUFvQyxFQUNwQyxtQkFBNEMsRUFDN0MsVUFBc0I7UUFIckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFlO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF5QjtRQUM3QyxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBRTNCLENBQUM7Ozs7SUFFRSxXQUFXO1FBRWhCLE9BQU8sWUFBWTs7Ozs7Ozs7O1FBT2pCLENBQUMsT0FBTyxFQUFFLEtB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QUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFMUSxhQUFhO1lBSmIsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2QixVQUFVOzs7Ozs7OztJQVVmLDBDQUEwQzs7Ozs7SUFDMUMsd0NBQTRDOzs7OztJQUM1QywwQ0FBb0Q7O0lBQ3BELGlDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uLCBHdlNjaGVtYUFjdGlvbnMsIEd2U2NoZW1hT2JqZWN0QWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucy9zY2hlbWEuYWN0aW9ucyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlUGFnaW5hdGVCeUtleSB9IGZyb20gJy4uL19oZWxwZXJzL2NyZWF0ZVBhZ2luYXRlQnlLZXknO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8qKlxuICAgICAgICogRXBpYyBmb3IgbG9hZGluZyBHdlNjaGVtYU9iamVjdHNcbiAgICAgICAqIC0gaXQgc3Vic2NyaWJlcyB0byB0aGUgZ2l2ZW4gb2JzZXJ2YWJsZSAocGF5bG9hZCksIHdoaWNoIHVzdWFsbHkgdHJpZ2dlcnMgYSBSRVNUIEFQSSBjYWxsXG4gICAgICAgKiAtIG9uIHN1Y2Nlc3MgaXQgc3RvcmVzIHRoZSBHdlNjaGVtYU9iamVjdFxuICAgICAgICogLSBlbHNlIGl0IHRvYXN0cyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoR3ZTY2hlbWFBY3Rpb25zLkdWX1NDSEVNQV9PQkpFQ1RfTE9BRCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEd2U2NoZW1hT2JqZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChhY3Rpb25FbWl0dGVyKSA9PiB7XG4gICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuICAgICAgICAgIGFjdGlvbi5wYXlsb2FkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0R3YoZGF0YSwgMClcbiAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIEVwaWMgZm9yIGxvYWRpbmcgR3ZQYWdpbmF0aW9uT2JqZWN0c1xuICAgICAgKiAtIGl0IHN1YnNjcmliZXMgdG8gdGhlIGdpdmVuIG9ic2VydmFibGUgKHBheWxvYWQpLCB3aGljaCB1c3VhbGx5IHRyaWdnZXJzIGEgUkVTVCBBUEkgY2FsbFxuICAgICAgKiAtIG9uIHN1Y2Nlc3MgaXQgc3RvcmVzIHRoZSBHdlBhZ2luYXRpb25PYmplY3RcbiAgICAgICogLSBlbHNlIGl0IHRvYXN0cyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAqL1xuICAgICAgKGFjdGlvbiQsIHN0b3JlOiBTdGF0ZU9ic2VydmFibGU8SUFwcFN0YXRlPikgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoR3ZTY2hlbWFBY3Rpb25zLkdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGFjdGlvbkVtaXR0ZXIpID0+IHtcbiAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBzdG9yZS52YWx1ZS5hY3RpdmVQcm9qZWN0LnBrX3Byb2plY3Q7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IHBhZ2luYXRlQnkgPSBjcmVhdGVQYWdpbmF0ZUJ5S2V5KG1ldGEpO1xuXG4gICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc2V0IHBhZ2luYXRpb24gbG9hZGluZyBvbiB0cnVlXG4gICAgICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZShwYWdpbmF0ZUJ5LCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCwgcGtQcm9qZWN0KTtcblxuXG4gICAgICAgICAgYWN0aW9uLnBheWxvYWQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3RHdihkYXRhLnNjaGVtYXMsIHBrUHJvamVjdCk7XG4gICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSBwYWdpbmF0aW9uXG4gICAgICAgICAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlU3VjY2VlZGVkKGRhdGEucGFnaW5hdGVkU3RhdGVtZW50cywgZGF0YS5jb3VudCwgcGFnaW5hdGVCeSwgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBjb21wbGV0ZSBsb2FkaW5nIGJhclxuICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvciB9XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICApXG4gIH1cbn1cblxuIl19