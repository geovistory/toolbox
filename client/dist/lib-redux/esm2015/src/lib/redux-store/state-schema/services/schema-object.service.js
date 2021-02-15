/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/services/schema-object.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SchemaObjectApi } from '@kleiolab/lib-sdk-lb3';
import { Subject } from 'rxjs';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { DfhActions } from '../actions/dfh.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SysActions } from '../actions/sys.actions';
import { TabActions } from '../actions/tab.actions';
import { WarActions } from '../actions/war.actions';
import * as i0 from "@angular/core";
import * as i1 from "@kleiolab/lib-sdk-lb3";
import * as i2 from "../actions/inf.actions";
import * as i3 from "../actions/pro.actions";
import * as i4 from "../actions/dat.actions";
import * as i5 from "../actions/war.actions";
import * as i6 from "../actions/tab.actions";
import * as i7 from "../actions/dfh.actions";
import * as i8 from "../actions/sys.actions";
import * as i9 from "../../state-gui/actions/notifications.actions";
/**
 * Class to put schema objects into store
 */
export class SchemaObjectService {
    /**
     * @param {?} api
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} datActions
     * @param {?} warActions
     * @param {?} tabActions
     * @param {?} dfhActions
     * @param {?} sysActions
     * @param {?} notifications
     */
    constructor(api, infActions, proActions, datActions, warActions, tabActions, dfhActions, sysActions, notifications) {
        this.api = api;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.warActions = warActions;
        this.tabActions = tabActions;
        this.dfhActions = dfhActions;
        this.sysActions = sysActions;
        this.notifications = notifications;
    }
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    store(apiCall$, pkProject) {
        /** @type {?} */
        const s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            this.storeSchemaObject(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    }
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    storeGv(apiCall$, pkProject) {
        /** @type {?} */
        const s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            this.storeSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    }
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    storeSchemaObject(object, pkProject) {
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            schema => {
                /** @type {?} */
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                else if (schema === 'dat')
                    actions = this.datActions;
                else if (schema === 'war')
                    actions = this.warActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    model => {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
        }
    }
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    storeSchemaObjectGv(object, pkProject) {
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            schema => {
                /** @type {?} */
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                else if (schema === 'dat')
                    actions = this.datActions;
                else if (schema === 'war')
                    actions = this.warActions;
                else if (schema === 'tab')
                    actions = this.tabActions;
                else if (schema === 'dfh')
                    actions = this.dfhActions;
                else if (schema === 'sys')
                    actions = this.sysActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    model => {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
            // this.extendEntityPreviewStream(object, pkProject);
            console.warn('!!!!!!!! Need to call this.extendEntityPreviewStream(object, pkProject);');
        }
    }
}
SchemaObjectService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaObjectService.ctorParameters = () => [
    { type: SchemaObjectApi },
    { type: InfActions },
    { type: ProActions },
    { type: DatActions },
    { type: WarActions },
    { type: TabActions },
    { type: DfhActions },
    { type: SysActions },
    { type: NotificationsAPIActions }
];
/** @nocollapse */ SchemaObjectService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaObjectService_Factory() { return new SchemaObjectService(i0.ɵɵinject(i1.SchemaObjectApi), i0.ɵɵinject(i2.InfActions), i0.ɵɵinject(i3.ProActions), i0.ɵɵinject(i4.DatActions), i0.ɵɵinject(i5.WarActions), i0.ɵɵinject(i6.TabActions), i0.ɵɵinject(i7.DfhActions), i0.ɵɵinject(i8.SysActions), i0.ɵɵinject(i9.NotificationsAPIActions)); }, token: SchemaObjectService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SchemaObjectService.prototype.api;
    /** @type {?} */
    SchemaObjectService.prototype.infActions;
    /** @type {?} */
    SchemaObjectService.prototype.proActions;
    /** @type {?} */
    SchemaObjectService.prototype.datActions;
    /** @type {?} */
    SchemaObjectService.prototype.warActions;
    /** @type {?} */
    SchemaObjectService.prototype.tabActions;
    /** @type {?} */
    SchemaObjectService.prototype.dfhActions;
    /** @type {?} */
    SchemaObjectService.prototype.sysActions;
    /** @type {?} */
    SchemaObjectService.prototype.notifications;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL3NlcnZpY2VzL3NjaGVtYS1vYmplY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7OztBQUtwRDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7Ozs7OztJQUU5QixZQUNTLEdBQW9CLEVBQ3BCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLGFBQXNDO1FBUnRDLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxH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QUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDNUUsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLEVBQUMsQ0FBQztZQUNILHFEQUFxRDtZQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLDBFQUEwRSxDQUFDLENBQUE7U0FDekY7SUFDSCxDQUFDOzs7WUEzSEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBZlEsZUFBZTtZQU9mLFVBQVU7WUFDVixVQUFVO1lBSFYsVUFBVTtZQU1WLFVBQVU7WUFEVixVQUFVO1lBSlYsVUFBVTtZQUdWLFVBQVU7WUFMVix1QkFBdUI7Ozs7O0lBa0I1QixrQ0FBMkI7O0lBQzNCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IsNENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2U2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IERmaEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFRhYkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3RhYi5hY3Rpb25zJztcbmltcG9ydCB7IFdhckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3dhci5hY3Rpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIENsYXNzIHRvIHB1dCBzY2hlbWEgb2JqZWN0cyBpbnRvIHN0b3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2hlbWFPYmplY3RTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYXBpOiBTY2hlbWFPYmplY3RBcGksXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIHdhckFjdGlvbnM6IFdhckFjdGlvbnMsXG4gICAgcHVibGljIHRhYkFjdGlvbnM6IFRhYkFjdGlvbnMsXG4gICAgcHVibGljIGRmaEFjdGlvbnM6IERmaEFjdGlvbnMsXG4gICAgcHVibGljIHN5c0FjdGlvbnM6IFN5c0FjdGlvbnMsXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICAqIHdhdGNoZXMgYW4gT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+XG4gICAqIG9uIHN1Y2Nlc3Mgc3RvcmVzIHRoZSBwYXJ0cyBvZiB0aGUgb2JqZWN0IGF0IHJpZ2h0IHBsYWNlIG9mIHN0b3JlXG4gICAqIG9uIGVycm9yIGVtaXRzIGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIGFwaUNhbGwkXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciAnb2ZSZXBvJywgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmUoYXBpQ2FsbCQ6IE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PiwgcGtQcm9qZWN0OiBudW1iZXIgfCAnb2ZSZXBvJyk6IE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PiB7XG5cblxuICAgIGNvbnN0IHMkID0gbmV3IFN1YmplY3Q8U2NoZW1hT2JqZWN0PigpXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZVNjaGVtYU9iamVjdChyZXN1bHQsIHBrUHJvamVjdCA9PT0gJ29mUmVwbycgPyBudWxsIDogcGtQcm9qZWN0KVxuICAgICAgICBzJC5uZXh0KHJlc3VsdClcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgfSlcbiAgICAgICAgcyQuZXJyb3IoZXJyb3IpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiBzJFxuICB9XG5cbiAgLyoqXG4gICAqIHdhdGNoZXMgYW4gT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+XG4gICAqIG9uIHN1Y2Nlc3Mgc3RvcmVzIHRoZSBwYXJ0cyBvZiB0aGUgb2JqZWN0IGF0IHJpZ2h0IHBsYWNlIG9mIHN0b3JlXG4gICAqIG9uIGVycm9yIGVtaXRzIGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIGFwaUNhbGwkXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciAnb2ZSZXBvJywgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVHdihhcGlDYWxsJDogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD4sIHBrUHJvamVjdDogbnVtYmVyIHwgJ29mUmVwbycpOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiB7XG5cbiAgICBjb25zdCBzJCA9IG5ldyBTdWJqZWN0PEd2U2NoZW1hT2JqZWN0PigpXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZVNjaGVtYU9iamVjdEd2KHJlc3VsdCwgcGtQcm9qZWN0ID09PSAnb2ZSZXBvJyA/IG51bGwgOiBwa1Byb2plY3QpXG4gICAgICAgIHMkLm5leHQocmVzdWx0KVxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICB9KVxuICAgICAgICBzJC5lcnJvcihlcnJvcilcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHMkXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgbnVsbCwgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVTY2hlbWFPYmplY3Qob2JqZWN0OiBTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmIChvYmplY3QgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkYXQnKSBhY3Rpb25zID0gdGhpcy5kYXRBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd3YXInKSBhY3Rpb25zID0gdGhpcy53YXJBY3Rpb25zO1xuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQob2JqZWN0W3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciBudWxsLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZVNjaGVtYU9iamVjdEd2KG9iamVjdDogR3ZTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmIChvYmplY3QgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkYXQnKSBhY3Rpb25zID0gdGhpcy5kYXRBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd3YXInKSBhY3Rpb25zID0gdGhpcy53YXJBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd0YWInKSBhY3Rpb25zID0gdGhpcy50YWJBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkZmgnKSBhY3Rpb25zID0gdGhpcy5kZmhBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdzeXMnKSBhY3Rpb25zID0gdGhpcy5zeXNBY3Rpb25zO1xuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQob2JqZWN0W3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gdGhpcy5leHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdCwgcGtQcm9qZWN0KTtcbiAgICAgIGNvbnNvbGUud2FybignISEhISEhISEgTmVlZCB0byBjYWxsIHRoaXMuZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3QsIHBrUHJvamVjdCk7JylcbiAgICB9XG4gIH1cblxuICAvLyAvKipcbiAgLy8gICogQWRkcyB0aGUgZW50aXR5IHByZXZpZXdzIHRvIHRoZSBzdHJlYW1lZCBlbnRpdHkgcHJldmlld3MgKGZvciB3cyBjb21tdW5pY2F0aW9uKVxuICAvLyAgKiBAcGFyYW0gb2JqZWN0XG4gIC8vICAqIEBwYXJhbSBwa1Byb2plY3RcbiAgLy8gICovXG4gIC8vIHByaXZhdGUgZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3Q6IEd2U2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlcikge1xuICAvLyAgIGlmIChvYmplY3QgJiYgb2JqZWN0LndhciAmJiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3ICYmIG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcubGVuZ3RoKSB7XG4gIC8vICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnZXh0ZW5kU3RyZWFtJywge1xuICAvLyAgICAgICBwa1Byb2plY3QsXG4gIC8vICAgICAgIHBrczogb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldy5tYXAocCA9PiBwLnBrX2VudGl0eSlcbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cbiAgLy8gfVxufVxuIl19