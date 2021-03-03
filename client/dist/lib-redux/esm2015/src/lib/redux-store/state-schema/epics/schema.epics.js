/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/schema.epics.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3NjaGVtYS5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0UsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQW1CLE1BQU0sNkJBQTZCLENBQUM7QUFDMUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBNEIsZUFBZSxFQUF3QixNQUFNLDJCQUEyQixDQUFDO0FBQzVHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQUszRCxNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7SUFDdEIsWUFDVSxtQkFBa0MsRUFDbEMsaUJBQW9DLEVBQ3BDLG1CQUE0QyxFQUM3QyxVQUFzQixFQUNyQixHQUF5QztRQUp6Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWU7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXlCO1FBQzdDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBc0M7SUFFL0MsQ0FBQzs7OztJQUVFLFdBQVc7UUFFaEIs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QUMsRUFBQyxFQUFDLENBQ0osRUFDRixDQUFBO0lBQ0gsQ0FBQzs7O1lBekVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLGFBQWE7WUFKYixpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFSVixvQ0FBb0M7Ozs7Ozs7O0lBaUJ6QywwQ0FBMEM7Ozs7O0lBQzFDLHdDQUE0Qzs7Ozs7SUFDNUMsMENBQW9EOztJQUNwRCxpQ0FBNkI7Ozs7O0lBQzdCLDBCQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRlZFN0YXRlbWVudHNDb250cm9sbGVyU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSwgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgTG9hZGluZ0JhckFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbiwgR3ZTY2hlbWFBY3Rpb25zLCBHdlNjaGVtYU9iamVjdEFjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvc2NoZW1hLmFjdGlvbnMnO1xuaW1wb3J0IHsgU2NoZW1hU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NjaGVtYS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2NoZW1hRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyQWN0aW9uczogTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25BY3Rpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwcml2YXRlIHBhZzogUGFnaW5hdGVkU3RhdGVtZW50c0NvbnRyb2xsZXJTZXJ2aWNlXG5cbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLyoqXG4gICAgICAgKiBFcGljIGZvciBsb2FkaW5nIEd2U2NoZW1hT2JqZWN0c1xuICAgICAgICogLSBpdCBzdWJzY3JpYmVzIHRvIHRoZSBnaXZlbiBvYnNlcnZhYmxlIChwYXlsb2FkKSwgd2hpY2ggdXN1YWxseSB0cmlnZ2VycyBhIFJFU1QgQVBJIGNhbGxcbiAgICAgICAqIC0gb24gc3VjY2VzcyBpdCBzdG9yZXMgdGhlIEd2U2NoZW1hT2JqZWN0XG4gICAgICAgKiAtIGVsc2UgaXQgdG9hc3RzIGFuIGVycm9yIG1lc3NhZ2VcbiAgICAgICAqL1xuICAgICAgKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShHdlNjaGVtYUFjdGlvbnMuR1ZfU0NIRU1BX09CSkVDVF9MT0FEKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogR3ZTY2hlbWFPYmplY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGFjdGlvbkVtaXR0ZXIpID0+IHtcbiAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG4gICAgICAgICAgYWN0aW9uLnBheWxvYWQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3RHdihkYXRhLCAwKVxuICAgICAgICAgICAgYWN0aW9uRW1pdHRlci5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvciB9XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICogRXBpYyBmb3IgbG9hZGluZyBHdlBhZ2luYXRpb25PYmplY3RzXG4gICAgICAqIC0gaXQgc3Vic2NyaWJlcyB0byB0aGUgZ2l2ZW4gb2JzZXJ2YWJsZSAocGF5bG9hZCksIHdoaWNoIHVzdWFsbHkgdHJpZ2dlcnMgYSBSRVNUIEFQSSBjYWxsXG4gICAgICAqIC0gb24gc3VjY2VzcyBpdCBzdG9yZXMgdGhlIEd2UGFnaW5hdGlvbk9iamVjdFxuICAgICAgKiAtIGVsc2UgaXQgdG9hc3RzIGFuIGVycm9yIG1lc3NhZ2VcbiAgICAgICovXG4gICAgICAoYWN0aW9uJCwgc3RvcmU6IFN0YXRlT2JzZXJ2YWJsZTxJQXBwU3RhdGU+KSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShHdlNjaGVtYUFjdGlvbnMuR1ZfUEFHSU5BVElPTl9PQkpFQ1RfTE9BRCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEd2UGFnaW5hdGlvbk9iamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoYWN0aW9uRW1pdHRlcikgPT4ge1xuICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IHN0b3JlLnZhbHVlLmFjdGl2ZVByb2plY3QucGtfcHJvamVjdDtcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGE7XG5cbiAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzZXQgcGFnaW5hdGlvbiBsb2FkaW5nIG9uIHRydWVcbiAgICAgICAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlKG1ldGEucmVxLnBhZ2UsIHBrUHJvamVjdCk7XG5cbiAgICAgICAgICB0aGlzLnBhZy5wYWdpbmF0ZWRTdGF0ZW1lbnRzQ29udHJvbGxlckxvYWRTdWJmaWVsZFBhZ2UoYWN0aW9uLm1ldGEucmVxKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdEd2KGRhdGEuc2NoZW1hcywgcGtQcm9qZWN0KTtcbiAgICAgICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcGFnZSBpbmZvcm1hdGlvbnNcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJmaWVsZFBhZ2Ugb2YgZGF0YS5zdWJmaWVsZFBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZVN1Y2NlZWRlZChzdWJmaWVsZFBhZ2UucGFnaW5hdGVkU3RhdGVtZW50cywgc3ViZmllbGRQYWdlLmNvdW50LCBzdWJmaWVsZFBhZ2UucGFnZSwgcGtQcm9qZWN0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBjb21wbGV0ZSBsb2FkaW5nIGJhclxuICAgICAgICAgICAgICBhY3Rpb25FbWl0dGVyLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGFjdGlvbkVtaXR0ZXIubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IgfVxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIClcbiAgfVxufVxuXG4iXX0=