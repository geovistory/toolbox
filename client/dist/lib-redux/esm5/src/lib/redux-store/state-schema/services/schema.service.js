/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/services/schema.service.ts
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
var SchemaService = /** @class */ (function () {
    function SchemaService(api, infActions, proActions, datActions, warActions, tabActions, dfhActions, sysActions, notifications) {
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
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    SchemaService.prototype.store = /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    function (apiCall$, pkProject) {
        var _this = this;
        /** @type {?} */
        var s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.storeSchemaObject(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    };
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    SchemaService.prototype.storeGv = /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param {?} apiCall$
     * @param {?} pkProject primary key of project or 'ofRepo', if repo versions
     * @return {?}
     */
    function (apiCall$, pkProject) {
        var _this = this;
        /** @type {?} */
        var s$ = new Subject();
        apiCall$.subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.storeSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        }));
        return s$;
    };
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    SchemaService.prototype.storeSchemaObject = /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    function (object, pkProject) {
        var _this = this;
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            function (schema) {
                /** @type {?} */
                var actions;
                if (schema === 'inf')
                    actions = _this.infActions;
                else if (schema === 'pro')
                    actions = _this.proActions;
                else if (schema === 'dat')
                    actions = _this.datActions;
                else if (schema === 'war')
                    actions = _this.warActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    function (model) {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
        }
    };
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    SchemaService.prototype.storeSchemaObjectGv = /**
     *
     * @param {?} object
     * @param {?} pkProject primary key of project or null, if repo versions
     * @return {?}
     */
    function (object, pkProject) {
        var _this = this;
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            function (schema) {
                /** @type {?} */
                var actions;
                if (schema === 'inf')
                    actions = _this.infActions;
                else if (schema === 'pro')
                    actions = _this.proActions;
                else if (schema === 'dat')
                    actions = _this.datActions;
                else if (schema === 'war')
                    actions = _this.warActions;
                else if (schema === 'tab')
                    actions = _this.tabActions;
                else if (schema === 'dfh')
                    actions = _this.dfhActions;
                else if (schema === 'sys')
                    actions = _this.sysActions;
                if (actions) {
                    Object.keys(object[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    function (model) {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    }));
                }
            }));
            this.schemaObjectStored$.next(object);
        }
    };
    SchemaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SchemaService.ctorParameters = function () { return [
        { type: SchemaObjectApi },
        { type: InfActions },
        { type: ProActions },
        { type: DatActions },
        { type: WarActions },
        { type: TabActions },
        { type: DfhActions },
        { type: SysActions },
        { type: NotificationsAPIActions }
    ]; };
    /** @nocollapse */ SchemaService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaService_Factory() { return new SchemaService(i0.ɵɵinject(i1.SchemaObjectApi), i0.ɵɵinject(i2.InfActions), i0.ɵɵinject(i3.ProActions), i0.ɵɵinject(i4.DatActions), i0.ɵɵinject(i5.WarActions), i0.ɵɵinject(i6.TabActions), i0.ɵɵinject(i7.DfhActions), i0.ɵɵinject(i8.SysActions), i0.ɵɵinject(i9.NotificationsAPIActions)); }, token: SchemaService, providedIn: "root" });
    return SchemaService;
}());
export { SchemaService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvc2VydmljZXMvc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFFcEQ7SUFVRSx1QkFDUyxHQUFvQixFQUNwQixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixhQUFzQztRQVJ0QyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdB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b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsS0FBSzt3QkFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM1RSxDQUFDLEVBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUN0QztJQUNILENBQUM7O2dCQTVIRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWZRLGVBQWU7Z0JBT2YsVUFBVTtnQkFDVixVQUFVO2dCQUhWLFVBQVU7Z0JBTVYsVUFBVTtnQkFEVixVQUFVO2dCQUpWLFVBQVU7Z0JBR1YsVUFBVTtnQkFMVix1QkFBdUI7Ozt3QkFMaEM7Q0E0SUMsQUE5SEQsSUE4SEM7U0F4SFksYUFBYTs7O0lBRXhCLDRDQUFtRDs7SUFHakQsNEJBQTJCOztJQUMzQixtQ0FBNkI7O0lBQzdCLG1DQUE2Qjs7SUFDN0IsbUNBQTZCOztJQUM3QixtQ0FBNkI7O0lBQzdCLG1DQUE2Qjs7SUFDN0IsbUNBQTZCOztJQUM3QixtQ0FBNkI7O0lBQzdCLHNDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlNjaGVtYU9iamVjdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBEZmhBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9kZmguYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBTeXNBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9zeXMuYWN0aW9ucyc7XG5pbXBvcnQgeyBUYWJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy90YWIuYWN0aW9ucyc7XG5pbXBvcnQgeyBXYXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy93YXIuYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBDbGFzcyB0byBwdXQgc2NoZW1hIG9iamVjdHMgaW50byBzdG9yZVxuICovXG5leHBvcnQgY2xhc3MgU2NoZW1hU2VydmljZSB7XG5cbiAgc2NoZW1hT2JqZWN0U3RvcmVkJCA9IG5ldyBTdWJqZWN0PEd2U2NoZW1hT2JqZWN0PigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFwaTogU2NoZW1hT2JqZWN0QXBpLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyB3YXJBY3Rpb25zOiBXYXJBY3Rpb25zLFxuICAgIHB1YmxpYyB0YWJBY3Rpb25zOiBUYWJBY3Rpb25zLFxuICAgIHB1YmxpYyBkZmhBY3Rpb25zOiBEZmhBY3Rpb25zLFxuICAgIHB1YmxpYyBzeXNBY3Rpb25zOiBTeXNBY3Rpb25zLFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAgKiB3YXRjaGVzIGFuIE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PlxuICAgKiBvbiBzdWNjZXNzIHN0b3JlcyB0aGUgcGFydHMgb2YgdGhlIG9iamVjdCBhdCByaWdodCBwbGFjZSBvZiBzdG9yZVxuICAgKiBvbiBlcnJvciBlbWl0cyBlcnJvciBtZXNzYWdlXG4gICAqXG4gICAqIEBwYXJhbSBhcGlDYWxsJFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgJ29mUmVwbycsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlKGFwaUNhbGwkOiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD4sIHBrUHJvamVjdDogbnVtYmVyIHwgJ29mUmVwbycpOiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD4ge1xuXG5cbiAgICBjb25zdCBzJCA9IG5ldyBTdWJqZWN0PFNjaGVtYU9iamVjdD4oKVxuICAgIGFwaUNhbGwkLnN1YnNjcmliZShcbiAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVTY2hlbWFPYmplY3QocmVzdWx0LCBwa1Byb2plY3QgPT09ICdvZlJlcG8nID8gbnVsbCA6IHBrUHJvamVjdClcbiAgICAgICAgcyQubmV4dChyZXN1bHQpXG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgIH0pXG4gICAgICAgIHMkLmVycm9yKGVycm9yKVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gcyRcbiAgfVxuXG4gIC8qKlxuICAgKiB3YXRjaGVzIGFuIE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PlxuICAgKiBvbiBzdWNjZXNzIHN0b3JlcyB0aGUgcGFydHMgb2YgdGhlIG9iamVjdCBhdCByaWdodCBwbGFjZSBvZiBzdG9yZVxuICAgKiBvbiBlcnJvciBlbWl0cyBlcnJvciBtZXNzYWdlXG4gICAqXG4gICAqIEBwYXJhbSBhcGlDYWxsJFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgJ29mUmVwbycsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlR3YoYXBpQ2FsbCQ6IE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+LCBwa1Byb2plY3Q6IG51bWJlciB8ICdvZlJlcG8nKTogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD4ge1xuXG4gICAgY29uc3QgcyQgPSBuZXcgU3ViamVjdDxHdlNjaGVtYU9iamVjdD4oKVxuICAgIGFwaUNhbGwkLnN1YnNjcmliZShcbiAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVTY2hlbWFPYmplY3RHdihyZXN1bHQsIHBrUHJvamVjdCA9PT0gJ29mUmVwbycgPyBudWxsIDogcGtQcm9qZWN0KVxuICAgICAgICBzJC5uZXh0KHJlc3VsdClcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgfSlcbiAgICAgICAgcyQuZXJyb3IoZXJyb3IpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiBzJFxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yIG51bGwsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlU2NoZW1hT2JqZWN0KG9iamVjdDogU2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAob2JqZWN0ICYmIE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID4gMCkge1xuICAgICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgIGxldCBhY3Rpb25zO1xuICAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnZGF0JykgYWN0aW9ucyA9IHRoaXMuZGF0QWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnd2FyJykgYWN0aW9ucyA9IHRoaXMud2FyQWN0aW9ucztcbiAgICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3Rbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICBhY3Rpb25zW21vZGVsXS5sb2FkU3VjY2VlZGVkKG9iamVjdFtzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwa1Byb2plY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgbnVsbCwgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVTY2hlbWFPYmplY3RHdihvYmplY3Q6IEd2U2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAob2JqZWN0ICYmIE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID4gMCkge1xuICAgICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgIGxldCBhY3Rpb25zO1xuICAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnZGF0JykgYWN0aW9ucyA9IHRoaXMuZGF0QWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnd2FyJykgYWN0aW9ucyA9IHRoaXMud2FyQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAndGFiJykgYWN0aW9ucyA9IHRoaXMudGFiQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnZGZoJykgYWN0aW9ucyA9IHRoaXMuZGZoQWN0aW9ucztcbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAnc3lzJykgYWN0aW9ucyA9IHRoaXMuc3lzQWN0aW9ucztcbiAgICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3Rbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICBhY3Rpb25zW21vZGVsXS5sb2FkU3VjY2VlZGVkKG9iamVjdFtzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwa1Byb2plY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U3RvcmVkJC5uZXh0KG9iamVjdClcbiAgICB9XG4gIH1cblxufVxuIl19