/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/war.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { warRoot } from '../reducer-configs/war.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
var WarActions = /** @class */ (function () {
    function WarActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
    }
    WarActions.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WarActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ WarActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WarActions_Factory() { return new WarActions(i0.ɵɵinject(i1.NgRedux)); }, token: WarActions, providedIn: "root" });
    return WarActions;
}());
export { WarActions };
if (false) {
    /** @type {?} */
    WarActions.prototype.entity_preview;
    /** @type {?} */
    WarActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy93YXIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7O0FBRTFFO0lBTUUsb0JBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBRjlDLG1CQUFjLEdBQUcsSUFBSSxvQkFBb0IsQ0FBMEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTNGLENBQUM7O2dCQU5wRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVZRLE9BQU87OztxQkFEaEI7Q0FnQkMsQUFQRCxJQU9DO1NBSlksVUFBVTs7O0lBQ3JCLG9DQUE2STs7SUFFakksNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvd2FyLm1vZGVscyc7XG5pbXBvcnQgeyB3YXJSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL3dhci5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgV2FyQWN0aW9ucyB7XG4gIGVudGl0eV9wcmV2aWV3ID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFdhckVudGl0eVByZXZpZXdTbGljZSwgV2FyRW50aXR5UHJldmlldz4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyh3YXJSb290LCAnZW50aXR5X3ByZXZpZXcnKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxufVxuIl19