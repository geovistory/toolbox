/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/schema.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
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
            // call action to set pagination loading on true
            this.infActions.statement.loadPage(meta.req.page, pkProject);
            this.pag.subfieldPageControllerLoadSubfieldPage(action.meta.req)
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
    { type: SubfieldPageControllerService }
];
/** @nocollapse */ SchemaEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaEpics_Factory() { return new SchemaEpics(i0.ɵɵinject(i1.SchemaService), i0.ɵɵinject(i2.LoadingBarActions), i0.ɵɵinject(i3.NotificationsAPIActions), i0.ɵɵinject(i4.InfActions), i0.ɵɵinject(i5.SubfieldPageControllerService)); }, token: SchemaEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3NjaGVtYS5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQW1CLE1BQU0sNkJBQTZCLENBQUM7QUFDMUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBNEIsZUFBZSxFQUF3QixNQUFNLDJCQUEyQixDQUFDO0FBQzVHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQUszRCxNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7SUFDdEIsWUFDVSxtQkFBa0MsRUFDbEMsaUJBQW9DLEVBQ3BDLG1CQUE0QyxFQUM3QyxVQUFzQixFQUNyQixHQUFrQztRQUpsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWU7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXlCO1FBQzdDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBK0I7SUFFeEMsQ0FBQzs7OztJQUVFLFdBQVc7UUFFaEIs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QUMsRUFBQyxFQUFDLENBQ0osRUFDRixDQUFBO0lBQ0gsQ0FBQzs7O1lBekVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLGFBQWE7WUFKYixpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFSViw2QkFBNkI7Ozs7Ozs7O0lBaUJsQywwQ0FBMEM7Ozs7O0lBQzFDLHdDQUE0Qzs7Ozs7SUFDNUMsMENBQW9EOztJQUNwRCxpQ0FBNkI7Ozs7O0lBQzdCLDBCQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmZpZWxkUGFnZUNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgR3ZQYWdpbmF0aW9uT2JqZWN0QWN0aW9uLCBHdlNjaGVtYUFjdGlvbnMsIEd2U2NoZW1hT2JqZWN0QWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucy9zY2hlbWEuYWN0aW9ucyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHByaXZhdGUgcGFnOiBTdWJmaWVsZFBhZ2VDb250cm9sbGVyU2VydmljZVxuXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8qKlxuICAgICAgICogRXBpYyBmb3IgbG9hZGluZyBHdlNjaGVtYU9iamVjdHNcbiAgICAgICAqIC0gaXQgc3Vic2NyaWJlcyB0byB0aGUgZ2l2ZW4gb2JzZXJ2YWJsZSAocGF5bG9hZCksIHdoaWNoIHVzdWFsbHkgdHJpZ2dlcnMgYSBSRVNUIEFQSSBjYWxsXG4gICAgICAgKiAtIG9uIHN1Y2Nlc3MgaXQgc3RvcmVzIHRoZSBHdlNjaGVtYU9iamVjdFxuICAgICAgICogLSBlbHNlIGl0IHRvYXN0cyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoR3ZTY2hlbWFBY3Rpb25zLkdWX1NDSEVNQV9PQkpFQ1RfTE9BRCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEd2U2NoZW1hT2JqZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChhY3Rpb25FbWl0dGVyKSA9PiB7XG4gICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuICAgICAgICAgIGFjdGlvbi5wYXlsb2FkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0R3YoZGF0YSwgMClcbiAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIEVwaWMgZm9yIGxvYWRpbmcgR3ZQYWdpbmF0aW9uT2JqZWN0c1xuICAgICAgKiAtIGl0IHN1YnNjcmliZXMgdG8gdGhlIGdpdmVuIG9ic2VydmFibGUgKHBheWxvYWQpLCB3aGljaCB1c3VhbGx5IHRyaWdnZXJzIGEgUkVTVCBBUEkgY2FsbFxuICAgICAgKiAtIG9uIHN1Y2Nlc3MgaXQgc3RvcmVzIHRoZSBHdlBhZ2luYXRpb25PYmplY3RcbiAgICAgICogLSBlbHNlIGl0IHRvYXN0cyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAqL1xuICAgICAgKGFjdGlvbiQsIHN0b3JlOiBTdGF0ZU9ic2VydmFibGU8SUFwcFN0YXRlPikgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoR3ZTY2hlbWFBY3Rpb25zLkdWX1BBR0lOQVRJT05fT0JKRUNUX0xPQUQpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBHdlBhZ2luYXRpb25PYmplY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGFjdGlvbkVtaXR0ZXIpID0+IHtcbiAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBzdG9yZS52YWx1ZS5hY3RpdmVQcm9qZWN0LnBrX3Byb2plY3Q7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuXG4gICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc2V0IHBhZ2luYXRpb24gbG9hZGluZyBvbiB0cnVlXG4gICAgICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZShtZXRhLnJlcS5wYWdlLCBwa1Byb2plY3QpO1xuXG4gICAgICAgICAgdGhpcy5wYWcuc3ViZmllbGRQYWdlQ29udHJvbGxlckxvYWRTdWJmaWVsZFBhZ2UoYWN0aW9uLm1ldGEucmVxKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdEd2KGRhdGEuc2NoZW1hcywgcGtQcm9qZWN0KTtcbiAgICAgICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcGFnZSBpbmZvcm1hdGlvbnNcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJmaWVsZFBhZ2Ugb2YgZGF0YS5zdWJmaWVsZFBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZVN1Y2NlZWRlZChzdWJmaWVsZFBhZ2UucGFnaW5hdGVkU3RhdGVtZW50cywgc3ViZmllbGRQYWdlLmNvdW50LCBzdWJmaWVsZFBhZ2UucGFnZSwgcGtQcm9qZWN0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBjb21wbGV0ZSBsb2FkaW5nIGJhclxuICAgICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG4iXX0=