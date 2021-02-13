/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/sys.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { sysRoot } from '../reducer-configs/sys.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
/**
 * @record
 */
function MetaData() { }
if (false) {
    /** @type {?|undefined} */
    MetaData.prototype.systemRelevantClasses;
}
;
var SysActions = /** @class */ (function () {
    function SysActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.system_relevant_class = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');
        // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
        //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');
        this.config = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'config');
    }
    SysActions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SysActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return SysActions;
}());
export { SysActions };
if (false) {
    /** @type {?} */
    SysActions.prototype.system_relevant_class;
    /** @type {?} */
    SysActions.prototype.config;
    /** @type {?} */
    SysActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7O0FBRzFFLHVCQUVDOzs7SUFEQyx5Q0FBZ0Q7O0FBQ2pELENBQUM7QUFHRjtJQWFFLG9CQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVY5QywwQkFBcUIsR0FBRyxJQUFJLG9CQUFvQixDQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7OztRQU1yRSxXQUFNLEdBQUcsSUFBSSxvQkFBb0IsQ0FDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVKLENBQUM7O2dCQWJwRCxVQUFVOzs7O2dCQWhCRixPQUFPOztJQStCaEIsaUJBQUM7Q0FBQSxBQWZELElBZUM7U0FkWSxVQUFVOzs7SUFFckIsMkNBQ3FFOztJQU1yRSw0QkFDc0Q7O0lBRTFDLDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IFN5cyB9IGZyb20gJy4uL21vZGVscy9zeXMubW9kZWxzJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG50eXBlIFBheWxvYWQgPSBTeXM7XG5pbnRlcmZhY2UgTWV0YURhdGEge1xuICBzeXN0ZW1SZWxldmFudENsYXNzZXM/OiBTeXNTeXN0ZW1SZWxldmFudENsYXNzW11cbn07XG5leHBvcnQgdHlwZSBTeXNBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YURhdGE+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzQWN0aW9ucyB7XG5cbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+XG4gICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ3N5c3RlbV9yZWxldmFudF9jbGFzcycpO1xuXG4gIC8vIGFuYWx5c2lzX3R5cGUgPSBuZXcgU3RhbmRhcmRBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNBbmFseXNpc1R5cGU+XG4gIC8vICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ2FuYWx5c2lzX3R5cGUnKTtcblxuXG4gIGNvbmZpZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNDb25maWdWYWx1ZT5cbiAgICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnY29uZmlnJyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==