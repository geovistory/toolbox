/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/services/schema-object.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SchemaObjectApi } from '@kleiolab/lib-sdk-lb3';
import { Subject } from 'rxjs';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { DatActions, DfhActions, InfActions, ProActions, SysActions, TabActions, WarActions } from '../actions';
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
    { type: Injectable }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL3NlcnZpY2VzL3NjaGVtYS1vYmplY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUloSDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7Ozs7OztJQUU5QixZQUNTLEdBQW9CLEVBQ3BCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLGFBQXNDO1FBUnRDLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQXlCO0lBQzNDLENBQUM7Ozs7Ozs7Ozs7SUFXTCxLQUFLLENBQUMsUUFB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VUFBVTs7OztZQVJGLGVBQWU7WUFLUyxVQUFVO1lBQUUsVUFBVTtZQUE5QyxVQUFVO1lBQThELFVBQVU7WUFBdEIsVUFBVTtZQUExRCxVQUFVO1lBQTBCLFVBQVU7WUFEMUQsdUJBQXVCOzs7O0lBVzVCLGtDQUEyQjs7SUFDM0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qiw0Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3RBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTY2hlbWFPYmplY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zLCBEZmhBY3Rpb25zLCBJbmZBY3Rpb25zLCBQcm9BY3Rpb25zLCBTeXNBY3Rpb25zLCBUYWJBY3Rpb25zLCBXYXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cblxuQEluamVjdGFibGUoKVxuLyoqXG4gKiBDbGFzcyB0byBwdXQgc2NoZW1hIG9iamVjdHMgaW50byBzdG9yZVxuICovXG5leHBvcnQgY2xhc3MgU2NoZW1hT2JqZWN0U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFwaTogU2NoZW1hT2JqZWN0QXBpLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyB3YXJBY3Rpb25zOiBXYXJBY3Rpb25zLFxuICAgIHB1YmxpYyB0YWJBY3Rpb25zOiBUYWJBY3Rpb25zLFxuICAgIHB1YmxpYyBkZmhBY3Rpb25zOiBEZmhBY3Rpb25zLFxuICAgIHB1YmxpYyBzeXNBY3Rpb25zOiBTeXNBY3Rpb25zLFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAgKiB3YXRjaGVzIGFuIE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PlxuICAgKiBvbiBzdWNjZXNzIHN0b3JlcyB0aGUgcGFydHMgb2YgdGhlIG9iamVjdCBhdCByaWdodCBwbGFjZSBvZiBzdG9yZVxuICAgKiBvbiBlcnJvciBlbWl0cyBlcnJvciBtZXNzYWdlXG4gICAqXG4gICAqIEBwYXJhbSBhcGlDYWxsJFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgJ29mUmVwbycsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlKGFwaUNhbGwkOiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD4sIHBrUHJvamVjdDogbnVtYmVyIHwgJ29mUmVwbycpOiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD4ge1xuXG5cbiAgICBjb25zdCBzJCA9IG5ldyBTdWJqZWN0PFNjaGVtYU9iamVjdD4oKVxuICAgIGFwaUNhbGwkLnN1YnNjcmliZShcbiAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVTY2hlbWFPYmplY3QocmVzdWx0LCBwa1Byb2plY3QgPT09ICdvZlJlcG8nID8gbnVsbCA6IHBrUHJvamVjdClcbiAgICAgICAgcyQubmV4dChyZXN1bHQpXG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgIH0pXG4gICAgICAgIHMkLmVycm9yKGVycm9yKVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gcyRcbiAgfVxuXG4gIC8qKlxuICAgKiB3YXRjaGVzIGFuIE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PlxuICAgKiBvbiBzdWNjZXNzIHN0b3JlcyB0aGUgcGFydHMgb2YgdGhlIG9iamVjdCBhdCByaWdodCBwbGFjZSBvZiBzdG9yZVxuICAgKiBvbiBlcnJvciBlbWl0cyBlcnJvciBtZXNzYWdlXG4gICAqXG4gICAqIEBwYXJhbSBhcGlDYWxsJFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgJ29mUmVwbycsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlR3YoYXBpQ2FsbCQ6IE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+LCBwa1Byb2plY3Q6IG51bWJlciB8ICdvZlJlcG8nKTogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD4ge1xuXG4gICAgY29uc3QgcyQgPSBuZXcgU3ViamVjdDxHdlNjaGVtYU9iamVjdD4oKVxuICAgIGFwaUNhbGwkLnN1YnNjcmliZShcbiAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVTY2hlbWFPYmplY3RHdihyZXN1bHQsIHBrUHJvamVjdCA9PT0gJ29mUmVwbycgPyBudWxsIDogcGtQcm9qZWN0KVxuICAgICAgICBzJC5uZXh0KHJlc3VsdClcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgfSlcbiAgICAgICAgcyQuZXJyb3IoZXJyb3IpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiBzJFxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yIG51bGwsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlU2NoZW1hT2JqZWN0KG9iamVjdDogU2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAob2JqZWN0ICYmIE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID4gMCkge1xuICAgICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgIGxldCBhY3Rpb25zO1xuICAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnZGF0JykgYWN0aW9ucyA9IHRoaXMuZGF0QWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnd2FyJykgYWN0aW9ucyA9IHRoaXMud2FyQWN0aW9ucztcbiAgICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3Rbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICBhY3Rpb25zW21vZGVsXS5sb2FkU3VjY2VlZGVkKG9iamVjdFtzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwa1Byb2plY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgbnVsbCwgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVTY2hlbWFPYmplY3RHdihvYmplY3Q6IEd2U2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAob2JqZWN0ICYmIE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID4gMCkge1xuICAgICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgIGxldCBhY3Rpb25zO1xuICAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnZGF0JykgYWN0aW9ucyA9IHRoaXMuZGF0QWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnd2FyJykgYWN0aW9ucyA9IHRoaXMud2FyQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAndGFiJykgYWN0aW9ucyA9IHRoaXMudGFiQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnZGZoJykgYWN0aW9ucyA9IHRoaXMuZGZoQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnc3lzJykgYWN0aW9ucyA9IHRoaXMuc3lzQWN0aW9ucztcbiAgICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3Rbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICBhY3Rpb25zW21vZGVsXS5sb2FkU3VjY2VlZGVkKG9iamVjdFtzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwa1Byb2plY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIHRoaXMuZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3QsIHBrUHJvamVjdCk7XG4gICAgICBjb25zb2xlLndhcm4oJyEhISEhISEhIE5lZWQgdG8gY2FsbCB0aGlzLmV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0LCBwa1Byb2plY3QpOycpXG4gICAgfVxuICB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEFkZHMgdGhlIGVudGl0eSBwcmV2aWV3cyB0byB0aGUgc3RyZWFtZWQgZW50aXR5IHByZXZpZXdzIChmb3Igd3MgY29tbXVuaWNhdGlvbilcbiAgLy8gICogQHBhcmFtIG9iamVjdFxuICAvLyAgKiBAcGFyYW0gcGtQcm9qZWN0XG4gIC8vICAqL1xuICAvLyBwcml2YXRlIGV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0OiBHdlNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIpIHtcbiAgLy8gICBpZiAob2JqZWN0ICYmIG9iamVjdC53YXIgJiYgb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldyAmJiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3Lmxlbmd0aCkge1xuICAvLyAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2V4dGVuZFN0cmVhbScsIHtcbiAgLy8gICAgICAgcGtQcm9qZWN0LFxuICAvLyAgICAgICBwa3M6IG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcubWFwKHAgPT4gcC5wa19lbnRpdHkpXG4gIC8vICAgICB9KTtcbiAgLy8gICB9XG4gIC8vIH1cbn1cbiJdfQ==