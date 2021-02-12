/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/services/schema-object.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SchemaObjectApi } from '@kleiolab/lib-sdk-lb3';
import { Subject } from 'rxjs';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { DatActions, DfhActions, InfActions, ProActions, SysActions, TabActions, WarActions } from '../actions';
var SchemaObjectService = /** @class */ (function () {
    function SchemaObjectService(api, infActions, proActions, datActions, warActions, tabActions, dfhActions, sysActions, notifications) {
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
    SchemaObjectService.prototype.store = /**
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
    SchemaObjectService.prototype.storeGv = /**
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
    SchemaObjectService.prototype.storeSchemaObject = /**
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
    SchemaObjectService.prototype.storeSchemaObjectGv = /**
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
    SchemaObjectService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SchemaObjectService.ctorParameters = function () { return [
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
    return SchemaObjectService;
}());
export { SchemaObjectService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvc2VydmljZXMvc2NoZW1hLW9iamVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBR2hIO0lBTUUsNkJBQ1MsR0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsYUFBc0M7UUFSdEMsUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7SUFDM0MsQ0FBQztJQUdMOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7SUFDSCxtQ0FBSzs7Ozs7Ozs7O0lBQUwsVUFBTSxRQUFrQyxFQUFFLFNBQTRC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LHFEQUFxRDtZQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLDBFQUEwRSxDQUFDLENBQUE7U0FDekY7SUFDSCxDQUFDOztnQkF6SEYsVUFBVTs7OztnQkFSRixlQUFlO2dCQUtTLFVBQVU7Z0JBQUUsVUFBVTtnQkFBOUMsVUFBVTtnQkFBOEQsVUFBVTtnQkFBdEIsVUFBVTtnQkFBMUQsVUFBVTtnQkFBMEIsVUFBVTtnQkFEMUQsdUJBQXVCOztJQTRJaEMsMEJBQUM7Q0FBQSxBQXhJRCxJQXdJQztTQXBJWSxtQkFBbUI7OztJQUc1QixrQ0FBMkI7O0lBQzNCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IsNENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2U2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucywgRGZoQWN0aW9ucywgSW5mQWN0aW9ucywgUHJvQWN0aW9ucywgU3lzQWN0aW9ucywgVGFiQWN0aW9ucywgV2FyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbi8qKlxuICogQ2xhc3MgdG8gcHV0IHNjaGVtYSBvYmplY3RzIGludG8gc3RvcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFNjaGVtYU9iamVjdFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhcGk6IFNjaGVtYU9iamVjdEFwaSxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgd2FyQWN0aW9uczogV2FyQWN0aW9ucyxcbiAgICBwdWJsaWMgdGFiQWN0aW9uczogVGFiQWN0aW9ucyxcbiAgICBwdWJsaWMgZGZoQWN0aW9uczogRGZoQWN0aW9ucyxcbiAgICBwdWJsaWMgc3lzQWN0aW9uczogU3lzQWN0aW9ucyxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICkgeyB9XG5cblxuICAvKipcbiAgICogd2F0Y2hlcyBhbiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD5cbiAgICogb24gc3VjY2VzcyBzdG9yZXMgdGhlIHBhcnRzIG9mIHRoZSBvYmplY3QgYXQgcmlnaHQgcGxhY2Ugb2Ygc3RvcmVcbiAgICogb24gZXJyb3IgZW1pdHMgZXJyb3IgbWVzc2FnZVxuICAgKlxuICAgKiBAcGFyYW0gYXBpQ2FsbCRcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yICdvZlJlcG8nLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZShhcGlDYWxsJDogT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+LCBwa1Byb2plY3Q6IG51bWJlciB8ICdvZlJlcG8nKTogT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+IHtcblxuXG4gICAgY29uc3QgcyQgPSBuZXcgU3ViamVjdDxTY2hlbWFPYmplY3Q+KClcbiAgICBhcGlDYWxsJC5zdWJzY3JpYmUoXG4gICAgICByZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlU2NoZW1hT2JqZWN0KHJlc3VsdCwgcGtQcm9qZWN0ID09PSAnb2ZSZXBvJyA/IG51bGwgOiBwa1Byb2plY3QpXG4gICAgICAgIHMkLm5leHQocmVzdWx0KVxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICB9KVxuICAgICAgICBzJC5lcnJvcihlcnJvcilcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHMkXG4gIH1cblxuICAvKipcbiAgICogd2F0Y2hlcyBhbiBPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD5cbiAgICogb24gc3VjY2VzcyBzdG9yZXMgdGhlIHBhcnRzIG9mIHRoZSBvYmplY3QgYXQgcmlnaHQgcGxhY2Ugb2Ygc3RvcmVcbiAgICogb24gZXJyb3IgZW1pdHMgZXJyb3IgbWVzc2FnZVxuICAgKlxuICAgKiBAcGFyYW0gYXBpQ2FsbCRcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yICdvZlJlcG8nLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZUd2KGFwaUNhbGwkOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiwgcGtQcm9qZWN0OiBudW1iZXIgfCAnb2ZSZXBvJyk6IE9ic2VydmFibGU8R3ZTY2hlbWFPYmplY3Q+IHtcblxuICAgIGNvbnN0IHMkID0gbmV3IFN1YmplY3Q8R3ZTY2hlbWFPYmplY3Q+KClcbiAgICBhcGlDYWxsJC5zdWJzY3JpYmUoXG4gICAgICByZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlU2NoZW1hT2JqZWN0R3YocmVzdWx0LCBwa1Byb2plY3QgPT09ICdvZlJlcG8nID8gbnVsbCA6IHBrUHJvamVjdClcbiAgICAgICAgcyQubmV4dChyZXN1bHQpXG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgIH0pXG4gICAgICAgIHMkLmVycm9yKGVycm9yKVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gcyRcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciBudWxsLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZVNjaGVtYU9iamVjdChvYmplY3Q6IFNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKG9iamVjdCAmJiBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAgICAgICBsZXQgYWN0aW9ucztcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gJ2luZicpIGFjdGlvbnMgPSB0aGlzLmluZkFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ2RhdCcpIGFjdGlvbnMgPSB0aGlzLmRhdEFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3dhcicpIGFjdGlvbnMgPSB0aGlzLndhckFjdGlvbnM7XG4gICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChvYmplY3Rbc2NoZW1hXVttb2RlbF0sIHVuZGVmaW5lZCwgcGtQcm9qZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHBhcmFtIHBrUHJvamVjdCBwcmltYXJ5IGtleSBvZiBwcm9qZWN0IG9yIG51bGwsIGlmIHJlcG8gdmVyc2lvbnNcbiAgICovXG4gIHN0b3JlU2NoZW1hT2JqZWN0R3Yob2JqZWN0OiBHdlNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKG9iamVjdCAmJiBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAgICAgICBsZXQgYWN0aW9ucztcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gJ2luZicpIGFjdGlvbnMgPSB0aGlzLmluZkFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ2RhdCcpIGFjdGlvbnMgPSB0aGlzLmRhdEFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3dhcicpIGFjdGlvbnMgPSB0aGlzLndhckFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3RhYicpIGFjdGlvbnMgPSB0aGlzLnRhYkFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ2RmaCcpIGFjdGlvbnMgPSB0aGlzLmRmaEFjdGlvbnM7XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3N5cycpIGFjdGlvbnMgPSB0aGlzLnN5c0FjdGlvbnM7XG4gICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChvYmplY3Rbc2NoZW1hXVttb2RlbF0sIHVuZGVmaW5lZCwgcGtQcm9qZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyB0aGlzLmV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0LCBwa1Byb2plY3QpO1xuICAgICAgY29uc29sZS53YXJuKCchISEhISEhISBOZWVkIHRvIGNhbGwgdGhpcy5leHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdCwgcGtQcm9qZWN0KTsnKVxuICAgIH1cbiAgfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBZGRzIHRoZSBlbnRpdHkgcHJldmlld3MgdG8gdGhlIHN0cmVhbWVkIGVudGl0eSBwcmV2aWV3cyAoZm9yIHdzIGNvbW11bmljYXRpb24pXG4gIC8vICAqIEBwYXJhbSBvYmplY3RcbiAgLy8gICogQHBhcmFtIHBrUHJvamVjdFxuICAvLyAgKi9cbiAgLy8gcHJpdmF0ZSBleHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdDogR3ZTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyKSB7XG4gIC8vICAgaWYgKG9iamVjdCAmJiBvYmplY3Qud2FyICYmIG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcgJiYgb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldy5sZW5ndGgpIHtcbiAgLy8gICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdleHRlbmRTdHJlYW0nLCB7XG4gIC8vICAgICAgIHBrUHJvamVjdCxcbiAgLy8gICAgICAgcGtzOiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3Lm1hcChwID0+IHAucGtfZW50aXR5KVxuICAvLyAgICAgfSk7XG4gIC8vICAgfVxuICAvLyB9XG59XG4iXX0=