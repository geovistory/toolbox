/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/war.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { warRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
var WarActions = /** @class */ (function () {
    function WarActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
    }
    WarActions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WarActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return WarActions;
}());
export { WarActions };
if (false) {
    /** @type {?} */
    WarActions.prototype.entity_preview;
    /** @type {?} */
    WarActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3dhci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFFO0lBSUUsb0JBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBRjlDLG1CQUFjLEdBQUcsSUFBSSxvQkFBb0IsQ0FBMEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTNGLENBQUM7O2dCQUpwRCxVQUFVOzs7O2dCQVJGLE9BQU87O0lBYWhCLGlCQUFDO0NBQUEsQUFMRCxJQUtDO1NBSlksVUFBVTs7O0lBQ3JCLG9DQUE2STs7SUFFakksNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgd2FyUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2FyQWN0aW9ucyB7XG4gIGVudGl0eV9wcmV2aWV3ID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFdhckVudGl0eVByZXZpZXdTbGljZSwgV2FyRW50aXR5UHJldmlldz4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyh3YXJSb290LCAnZW50aXR5X3ByZXZpZXcnKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxufVxuIl19