/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/services/schema.service.ts
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
export class SchemaService {
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
        this.schemaObjectStored$ = new Subject();
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
            this.schemaObjectStored$.next(object);
        }
    }
}
SchemaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaService.ctorParameters = () => [
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
/** @nocollapse */ SchemaService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaService_Factory() { return new SchemaService(i0.ɵɵinject(i1.SchemaObjectApi), i0.ɵɵinject(i2.InfActions), i0.ɵɵinject(i3.ProActions), i0.ɵɵinject(i4.DatActions), i0.ɵɵinject(i5.WarActions), i0.ɵɵinject(i6.TabActions), i0.ɵɵinject(i7.DfhActions), i0.ɵɵinject(i8.SysActions), i0.ɵɵinject(i9.NotificationsAPIActions)); }, token: SchemaService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SchemaService.prototype.schemaObjectStored$;
    /** @type {?} */
    SchemaService.prototype.api;
    /** @type {?} */
    SchemaService.prototype.infActions;
    /** @type {?} */
    SchemaService.prototype.proActions;
    /** @type {?} */
    SchemaService.prototype.datActions;
    /** @type {?} */
    SchemaService.prototype.warActions;
    /** @type {?} */
    SchemaService.prototype.tabActions;
    /** @type {?} */
    SchemaService.prototype.dfhActions;
    /** @type {?} */
    SchemaService.prototype.sysActions;
    /** @type {?} */
    SchemaService.prototype.notifications;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9zZXJ2aWNlcy9zY2hlbWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7OztBQUtwRDs7R0FFRztBQUNILE1BQU0sT0FBTyxhQUFhOzs7Ozs7Ozs7Ozs7SUFJeEIsWUFDUyxHQUFvQixFQUNwQixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixhQUFzQztRQVJ0QyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIs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QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzVFLENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3RDO0lBQ0gsQ0FBQzs7O1lBNUhGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWZRLGVBQWU7WUFPZixVQUFVO1lBQ1YsVUFBVTtZQUhWLFVBQVU7WUFNVixVQUFVO1lBRFYsVUFBVTtZQUpWLFVBQVU7WUFHVixVQUFVO1lBTFYsdUJBQXVCOzs7OztJQWlCOUIsNENBQW1EOztJQUdqRCw0QkFBMkI7O0lBQzNCLG1DQUE2Qjs7SUFDN0IsbUNBQTZCOztJQUM3QixtQ0FBNkI7O0lBQzdCLG1DQUE2Qjs7SUFDN0IsbUNBQTZCOztJQUM3QixtQ0FBNkI7O0lBQzdCLG1DQUE2Qjs7SUFDN0Isc0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2U2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IERmaEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFRhYkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3RhYi5hY3Rpb25zJztcbmltcG9ydCB7IFdhckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3dhci5hY3Rpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIENsYXNzIHRvIHB1dCBzY2hlbWEgb2JqZWN0cyBpbnRvIHN0b3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2hlbWFTZXJ2aWNlIHtcblxuICBzY2hlbWFPYmplY3RTdG9yZWQkID0gbmV3IFN1YmplY3Q8R3ZTY2hlbWFPYmplY3Q+KClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYXBpOiBTY2hlbWFPYmplY3RBcGksXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIHdhckFjdGlvbnM6IFdhckFjdGlvbnMsXG4gICAgcHVibGljIHRhYkFjdGlvbnM6IFRhYkFjdGlvbnMsXG4gICAgcHVibGljIGRmaEFjdGlvbnM6IERmaEFjdGlvbnMsXG4gICAgcHVibGljIHN5c0FjdGlvbnM6IFN5c0FjdGlvbnMsXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICAqIHdhdGNoZXMgYW4gT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+XG4gICAqIG9uIHN1Y2Nlc3Mgc3RvcmVzIHRoZSBwYXJ0cyBvZiB0aGUgb2JqZWN0IGF0IHJpZ2h0IHBsYWNlIG9mIHN0b3JlXG4gICAqIG9uIGVycm9yIGVtaXRzIGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIGFwaUNhbGwkXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciAnb2ZSZXBvJywgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmUoYXBpQ2FsbCQ6IE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PiwgcGtQcm9qZWN0OiBudW1iZXIgfCAnb2ZSZXBvJyk6IE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PiB7XG5cblxuICAgIGNvbnN0IHMkID0gbmV3IFN1YmplY3Q8U2NoZW1hT2JqZWN0PigpXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZVNjaGVtYU9iamVjdChyZXN1bHQsIHBrUHJvamVjdCA9PT0gJ29mUmVwbycgPyBudWxsIDogcGtQcm9qZWN0KVxuICAgICAgICBzJC5uZXh0KHJlc3VsdClcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgfSlcbiAgICAgICAgcyQuZXJyb3IoZXJyb3IpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiBzJFxuICB9XG5cbiAgLyoqXG4gICAqIHdhdGNoZXMgYW4gT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+XG4gICAqIG9uIHN1Y2Nlc3Mgc3RvcmVzIHRoZSBwYXJ0cyBvZiB0aGUgb2JqZWN0IGF0IHJpZ2h0IHBsYWNlIG9mIHN0b3JlXG4gICAqIG9uIGVycm9yIGVtaXRzIGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIGFwaUNhbGwkXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciAnb2ZSZXBvJywgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVHdihhcGlDYWxsJDogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD4sIHBrUHJvamVjdDogbnVtYmVyIHwgJ29mUmVwbycpOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiB7XG5cbiAgICBjb25zdCBzJCA9IG5ldyBTdWJqZWN0PEd2U2NoZW1hT2JqZWN0PigpXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZVNjaGVtYU9iamVjdEd2KHJlc3VsdCwgcGtQcm9qZWN0ID09PSAnb2ZSZXBvJyA/IG51bGwgOiBwa1Byb2plY3QpXG4gICAgICAgIHMkLm5leHQocmVzdWx0KVxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICB9KVxuICAgICAgICBzJC5lcnJvcihlcnJvcilcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHMkXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgbnVsbCwgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVTY2hlbWFPYmplY3Qob2JqZWN0OiBTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmIChvYmplY3QgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkYXQnKSBhY3Rpb25zID0gdGhpcy5kYXRBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd3YXInKSBhY3Rpb25zID0gdGhpcy53YXJBY3Rpb25zO1xuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQob2JqZWN0W3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciBudWxsLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZVNjaGVtYU9iamVjdEd2KG9iamVjdDogR3ZTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmIChvYmplY3QgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkYXQnKSBhY3Rpb25zID0gdGhpcy5kYXRBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd3YXInKSBhY3Rpb25zID0gdGhpcy53YXJBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd0YWInKSBhY3Rpb25zID0gdGhpcy50YWJBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkZmgnKSBhY3Rpb25zID0gdGhpcy5kZmhBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdzeXMnKSBhY3Rpb25zID0gdGhpcy5zeXNBY3Rpb25zO1xuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQob2JqZWN0W3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5zY2hlbWFPYmplY3RTdG9yZWQkLm5leHQob2JqZWN0KVxuICAgIH1cbiAgfVxuXG59XG4iXX0=