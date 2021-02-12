/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/schema-object.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9iamVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3NjaGVtYS1vYmplY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUdoSDtJQU1FLDZCQUNTLEdBQW9CLEVBQ3BCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLGFBQXNDO1FBUnRDLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQXlCO0lBQzNDLENBQUM7SUFHTDs7Ozs7OztPQU9HOzs7Ozs7Ozs7O0lBQ0gsbUNBQUs7Ozs7Ozs7OztJQUFMLFVBQU0sUUFBa0MsRUFBRSxTQUE0QjtRQUF0RSxpQkFrQkM7O1lBZk8sRUFBRSxHQUFHLElBQUksT0FBTyxFQUFnQjtRQUN0QyxRQUFRLENBQUMsU0FBUzs7OztRQUNoQixVQUFBLE1BQU07WUFDSixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNqQixDQUFDOzs7O1FBQ0QsVUFBQSxLQUFLO1lBQ0gsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7Z0JBQzFCLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO2FBQ2xDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDakIsQ0FBQyxFQUNGLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7O0lBQ0gscUNBQU87Ozs7Ozs7OztJQUFQLFVBQVEsUUFBb0MsRUFBRSxTQUE0QjtRQUExRSxpQkFpQkM7O1lBZk8sRUFBRSxHQUFHLElBQUksT0FBTyxFQUFrQjtRQUN4QyxRQUFRLENBQUMsU0FBUzs7OztRQUNoQixVQUFBLE1BQU07WUFDSixLQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDM0UsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNqQixDQUFDOzs7O1FBQ0QsVUFBQSxLQUFLO1lBQ0gsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7Z0JBQzFCLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO2FBQ2xDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDakIsQ0FBQyxFQUNGLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsK0NBQWlCOzs7Ozs7SUFBakIsVUFBa0IsTUFBb0IsRUFBRSxTQUF3QjtRQUFoRSxpQkFlQztRQWRDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLE1BQU07O29CQUM1QixPQUFPO2dCQUNYLElBQUksTUFBTSxLQUFLLEtBQUs7b0JBQUUsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7cUJBQzNDLElBQUksTUFBTSxLQUFLLEtBQUs7b0JBQUUsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7cUJBQ2hELElBQUksTUFBTSxLQUFLLEtBQUs7b0JBQUUsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7cUJBQ2hELElBQUksTUFBTSxLQUFLLEtBQUs7b0JBQUUsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3JELElBQUksT0FBTyxFQUFFO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTzs7OztvQkFBQyxVQUFBLEtBQUs7d0JBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDNUUsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxpREFBbUI7Ozs7OztJQUFuQixVQUFvQixNQUFzQixFQUFFLFNBQXdCO1FBQXBFLGlCQW9CQztRQW5CQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxNQUFNOztvQkFDNUIsT0FBTztnQkFDWCxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3FCQUMzQyxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNoRCxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNoRCxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNoRCxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNoRCxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNoRCxJQUFJLE1BQU0sS0FBSyxLQUFLO29CQUFFLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNyRCxJQUFJLE9BQU8sRUFBRTtvQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87Ozs7b0JBQUMsVUFBQSxLQUFLO3dCQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzVFLENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxxREFBcUQ7WUFDckQsT0FBTyxDQUFDLElBQUksQ0FBQywwRUFBMEUsQ0FBQyxDQUFBO1NBQ3pGO0lBQ0gsQ0FBQzs7Z0JBekhGLFVBQVU7Ozs7Z0JBUkYsZUFBZTtnQkFLUyxVQUFVO2dCQUFFLFVBQVU7Z0JBQTlDLFVBQVU7Z0JBQThELFVBQVU7Z0JBQXRCLFVBQVU7Z0JBQTFELFVBQVU7Z0JBQTBCLFVBQVU7Z0JBRDFELHVCQUF1Qjs7SUE0SWhDLDBCQUFDO0NBQUEsQUF4SUQsSUF3SUM7U0FwSVksbUJBQW1COzs7SUFHNUIsa0NBQTJCOztJQUMzQix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3Qix5Q0FBNkI7O0lBQzdCLDRDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlNjaGVtYU9iamVjdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMsIERmaEFjdGlvbnMsIEluZkFjdGlvbnMsIFByb0FjdGlvbnMsIFN5c0FjdGlvbnMsIFRhYkFjdGlvbnMsIFdhckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcblxuXG5ASW5qZWN0YWJsZSgpXG4vKipcbiAqIENsYXNzIHRvIHB1dCBzY2hlbWEgb2JqZWN0cyBpbnRvIHN0b3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2hlbWFPYmplY3RTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYXBpOiBTY2hlbWFPYmplY3RBcGksXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIHdhckFjdGlvbnM6IFdhckFjdGlvbnMsXG4gICAgcHVibGljIHRhYkFjdGlvbnM6IFRhYkFjdGlvbnMsXG4gICAgcHVibGljIGRmaEFjdGlvbnM6IERmaEFjdGlvbnMsXG4gICAgcHVibGljIHN5c0FjdGlvbnM6IFN5c0FjdGlvbnMsXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICAqIHdhdGNoZXMgYW4gT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+XG4gICAqIG9uIHN1Y2Nlc3Mgc3RvcmVzIHRoZSBwYXJ0cyBvZiB0aGUgb2JqZWN0IGF0IHJpZ2h0IHBsYWNlIG9mIHN0b3JlXG4gICAqIG9uIGVycm9yIGVtaXRzIGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIGFwaUNhbGwkXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciAnb2ZSZXBvJywgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmUoYXBpQ2FsbCQ6IE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PiwgcGtQcm9qZWN0OiBudW1iZXIgfCAnb2ZSZXBvJyk6IE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PiB7XG5cblxuICAgIGNvbnN0IHMkID0gbmV3IFN1YmplY3Q8U2NoZW1hT2JqZWN0PigpXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZVNjaGVtYU9iamVjdChyZXN1bHQsIHBrUHJvamVjdCA9PT0gJ29mUmVwbycgPyBudWxsIDogcGtQcm9qZWN0KVxuICAgICAgICBzJC5uZXh0KHJlc3VsdClcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgfSlcbiAgICAgICAgcyQuZXJyb3IoZXJyb3IpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiBzJFxuICB9XG5cbiAgLyoqXG4gICAqIHdhdGNoZXMgYW4gT2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+XG4gICAqIG9uIHN1Y2Nlc3Mgc3RvcmVzIHRoZSBwYXJ0cyBvZiB0aGUgb2JqZWN0IGF0IHJpZ2h0IHBsYWNlIG9mIHN0b3JlXG4gICAqIG9uIGVycm9yIGVtaXRzIGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICogQHBhcmFtIGFwaUNhbGwkXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciAnb2ZSZXBvJywgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVHdihhcGlDYWxsJDogT2JzZXJ2YWJsZTxHdlNjaGVtYU9iamVjdD4sIHBrUHJvamVjdDogbnVtYmVyIHwgJ29mUmVwbycpOiBPYnNlcnZhYmxlPEd2U2NoZW1hT2JqZWN0PiB7XG5cbiAgICBjb25zdCBzJCA9IG5ldyBTdWJqZWN0PEd2U2NoZW1hT2JqZWN0PigpXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZVNjaGVtYU9iamVjdEd2KHJlc3VsdCwgcGtQcm9qZWN0ID09PSAnb2ZSZXBvJyA/IG51bGwgOiBwa1Byb2plY3QpXG4gICAgICAgIHMkLm5leHQocmVzdWx0KVxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICB9KVxuICAgICAgICBzJC5lcnJvcihlcnJvcilcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuIHMkXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IHByaW1hcnkga2V5IG9mIHByb2plY3Qgb3IgbnVsbCwgaWYgcmVwbyB2ZXJzaW9uc1xuICAgKi9cbiAgc3RvcmVTY2hlbWFPYmplY3Qob2JqZWN0OiBTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmIChvYmplY3QgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkYXQnKSBhY3Rpb25zID0gdGhpcy5kYXRBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd3YXInKSBhY3Rpb25zID0gdGhpcy53YXJBY3Rpb25zO1xuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQob2JqZWN0W3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBwa1Byb2plY3QgcHJpbWFyeSBrZXkgb2YgcHJvamVjdCBvciBudWxsLCBpZiByZXBvIHZlcnNpb25zXG4gICAqL1xuICBzdG9yZVNjaGVtYU9iamVjdEd2KG9iamVjdDogR3ZTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmIChvYmplY3QgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkYXQnKSBhY3Rpb25zID0gdGhpcy5kYXRBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd3YXInKSBhY3Rpb25zID0gdGhpcy53YXJBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICd0YWInKSBhY3Rpb25zID0gdGhpcy50YWJBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdkZmgnKSBhY3Rpb25zID0gdGhpcy5kZmhBY3Rpb25zO1xuICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdzeXMnKSBhY3Rpb25zID0gdGhpcy5zeXNBY3Rpb25zO1xuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQob2JqZWN0W3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gdGhpcy5leHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdCwgcGtQcm9qZWN0KTtcbiAgICAgIGNvbnNvbGUud2FybignISEhISEhISEgTmVlZCB0byBjYWxsIHRoaXMuZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3QsIHBrUHJvamVjdCk7JylcbiAgICB9XG4gIH1cblxuICAvLyAvKipcbiAgLy8gICogQWRkcyB0aGUgZW50aXR5IHByZXZpZXdzIHRvIHRoZSBzdHJlYW1lZCBlbnRpdHkgcHJldmlld3MgKGZvciB3cyBjb21tdW5pY2F0aW9uKVxuICAvLyAgKiBAcGFyYW0gb2JqZWN0XG4gIC8vICAqIEBwYXJhbSBwa1Byb2plY3RcbiAgLy8gICovXG4gIC8vIHByaXZhdGUgZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3Q6IEd2U2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlcikge1xuICAvLyAgIGlmIChvYmplY3QgJiYgb2JqZWN0LndhciAmJiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3ICYmIG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcubGVuZ3RoKSB7XG4gIC8vICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnZXh0ZW5kU3RyZWFtJywge1xuICAvLyAgICAgICBwa1Byb2plY3QsXG4gIC8vICAgICAgIHBrczogb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldy5tYXAocCA9PiBwLnBrX2VudGl0eSlcbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cbiAgLy8gfVxufVxuIl19