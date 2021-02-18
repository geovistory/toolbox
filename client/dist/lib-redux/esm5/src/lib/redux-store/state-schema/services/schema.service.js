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
            // this.extendEntityPreviewStream(object, pkProject);
            console.warn('!!!!!!!! Need to call this.extendEntityPreviewStream(object, pkProject);');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvc2VydmljZXMvc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFFcEQ7SUFRRSx1QkFDUyxHQUFvQixFQUNwQixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixhQUFzQztRQVJ0QyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdB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TSxDQUFDLENBQUMsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsS0FBSzt3QkFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM1RSxDQUFDLEVBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsRUFBQyxDQUFDO1lBQ0gscURBQXFEO1lBQ3JELE9BQU8sQ0FBQyxJQUFJLENBQUMsMEVBQTBFLENBQUMsQ0FBQTtTQUN6RjtJQUNILENBQUM7O2dCQTNIRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWZRLGVBQWU7Z0JBT2YsVUFBVTtnQkFDVixVQUFVO2dCQUhWLFVBQVU7Z0JBTVYsVUFBVTtnQkFEVixVQUFVO2dCQUpWLFVBQVU7Z0JBR1YsVUFBVTtnQkFMVix1QkFBdUI7Ozt3QkFMaEM7Q0F5SkMsQUEzSUQsSUEySUM7U0FySVksYUFBYTs7O0lBR3RCLDRCQUEyQjs7SUFDM0IsbUNBQTZCOztJQUM3QixtQ0FBNkI7O0lBQzdCLG1DQUE2Qjs7SUFDN0IsbUNBQTZCOztJQUM3QixtQ0FBNkI7O0lBQzdCLG1DQUE2Qjs7SUFDN0IsbUNBQTZCOztJQUM3QixzQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3RBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTY2hlbWFPYmplY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvZGZoLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvc3lzLmFjdGlvbnMnO1xuaW1wb3J0IHsgVGFiQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvdGFiLmFjdGlvbnMnO1xuaW1wb3J0IHsgV2FyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvd2FyLmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogQ2xhc3MgdG8gcHV0IHNjaGVtYSBvYmplY3RzIGludG8gc3RvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFNjaGVtYVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhcGk6IFNjaGVtYU9iamVjdEFwaSxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgd2FyQWN0aW9uczogV2FyQWN0aW9ucyxcbiAgICBwdWJsaWMgdGFiQWN0aW9uczogVGFiQWN0aW9ucyxcbiAgICBwdWJsaWMgZGZoQWN0aW9uczogRGZoQWN0aW9ucyxcbiAgICBwdWJsaWMgc3lzQWN0aW9uczogU3lzQWN0aW9ucyxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICkgeyB9XG5cblxuICAvKipcbiAgICogd2F0Y2hlcyBhbiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD5cbiAgICogb24gc3VjY2VzcyBzdG9yZXMgdGhlIHBhcnRzIG9mIHRoZSBvYmplY3QgYXQgcmlnaHQgcGxhY2Ugb2Ygc3RvcmVcbiAgICogb24gZXJyb3IgZW1pdHMgZXJyb3IgbWVzc2FnZVxuICAgKlxuICAgKiBAcGFyYW0gYXBpQ2FsbCRcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yICdvZlJlcG8nLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZShhcGlDYWxsJDogT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+LCBwa1Byb2plY3Q6IG51bWJlciB8ICdvZlJlcG8nKTogT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+IHtcblxuXG4gICAgY29uc3QgcyQgPSBuZXcgU3ViamVjdDxTY2hlbWFPYmplY3Q+KClcbiAgICBhcGlDYWxsJC5zdWJzY3JpYmUoXG4gICAgICByZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlU2NoZW1hT2JqZWN0KHJlc3VsdCwgcGtQcm9qZWN0ID09PSAnb2ZSZXBvJyA/IG51bGwgOiBwa1Byb2plY3QpXG4gICAgICAgIHMkLm5leHQocmVzdWx0KVxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICB9KVxuICAgICAgICBzJC5lcnJvcihlcnJvcilcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHMkXG4gIH1cblxuICAvKipcbiAgICogd2F0Y2hlcyBhbiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD5cbiAgICogb24gc3VjY2VzcyBzdG9yZXMgdGhlIHBhcnRzIG9mIHRoZSBvYmplY3QgYXQgcmlnaHQgcGxhY2Ugb2Ygc3RvcmVcbiAgICogb24gZXJyb3IgZW1pdHMgZXJyb3IgbWVzc2FnZVxuICAgKlxuICAgKiBAcGFyYW0gYXBpQ2FsbCRcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yICdvZlJlcG8nLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZUd2KGFwaUNhbGwkOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiwgcGtQcm9qZWN0OiBudW1iZXIgfCAnb2ZSZXBvJyk6IE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+IHtcblxuICAgIGNvbnN0IHMkID0gbmV3IFN1YmplY3Q8R3ZTY2hlbWFPYmplY3Q+KClcbiAgICBhcGlDYWxsJC5zdWJzY3JpYmUoXG4gICAgICByZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlU2NoZW1hT2JqZWN0R3YocmVzdWx0LCBwa1Byb2plY3QgPT09ICdvZlJlcG8nID8gbnVsbCA6IHBrUHJvamVjdClcbiAgICAgICAgcyQubmV4dChyZXN1bHQpXG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgIH0pXG4gICAgICAgIHMkLmVycm9yKGVycm9yKVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gcyRcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciBudWxsLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZVNjaGVtYU9iamVjdChvYmplY3Q6IFNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKG9iamVjdCAmJiBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAgICAgICBsZXQgYWN0aW9ucztcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gJ2luZicpIGFjdGlvbnMgPSB0aGlzLmluZkFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ2RhdCcpIGFjdGlvbnMgPSB0aGlzLmRhdEFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3dhcicpIGFjdGlvbnMgPSB0aGlzLndhckFjdGlvbnM7XG4gICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChvYmplY3Rbc2NoZW1hXVttb2RlbF0sIHVuZGVmaW5lZCwgcGtQcm9qZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yIG51bGwsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlU2NoZW1hT2JqZWN0R3Yob2JqZWN0OiBHdlNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKG9iamVjdCAmJiBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAgICAgICBsZXQgYWN0aW9ucztcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gJ2luZicpIGFjdGlvbnMgPSB0aGlzLmluZkFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ2RhdCcpIGFjdGlvbnMgPSB0aGlzLmRhdEFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3dhcicpIGFjdGlvbnMgPSB0aGlzLndhckFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3RhYicpIGFjdGlvbnMgPSB0aGlzLnRhYkFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ2RmaCcpIGFjdGlvbnMgPSB0aGlzLmRmaEFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3N5cycpIGFjdGlvbnMgPSB0aGlzLnN5c0FjdGlvbnM7XG4gICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChvYmplY3Rbc2NoZW1hXVttb2RlbF0sIHVuZGVmaW5lZCwgcGtQcm9qZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyB0aGlzLmV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0LCBwa1Byb2plY3QpO1xuICAgICAgY29uc29sZS53YXJuKCchISEhISEhISBOZWVkIHRvIGNhbGwgdGhpcy5leHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdCwgcGtQcm9qZWN0KTsnKVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIEFkZHMgdGhlIGVudGl0eSBwcmV2aWV3cyB0byB0aGUgc3RyZWFtZWQgZW50aXR5IHByZXZpZXdzIChmb3Igd3MgY29tbXVuaWNhdGlvbilcbiAgLy8gICogQHBhcmFtIG9iamVjdFxuICAvLyAgKiBAcGFyYW0gcGtQcm9qZWN0XG4gIC8vICAqL1xuICAvLyBwcml2YXRlIGV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0OiBHdlNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIpIHtcbiAgLy8gICBpZiAob2JqZWN0ICYmIG9iamVjdC53YXIgJiYgb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldyAmJiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3Lmxlbmd0aCkge1xuICAvLyAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2V4dGVuZFN0cmVhbScsIHtcbiAgLy8gICAgICAgcGtQcm9qZWN0LFxuICAvLyAgICAgICBwa3M6IG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcubWFwKHAgPT4gcC5wa19lbnRpdHkpXG4gIC8vICAgICB9KTtcbiAgLy8gICB9XG4gIC8vIH1cbn1cbiJdfQ==