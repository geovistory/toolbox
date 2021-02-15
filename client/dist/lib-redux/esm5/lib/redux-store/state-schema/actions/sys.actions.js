/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/sys.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { sysRoot } from '../reducer-configs/sys.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SysActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ SysActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SysActions_Factory() { return new SysActions(i0.ɵɵinject(i1.NgRedux)); }, token: SysActions, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7QUFHMUUsdUJBRUM7OztJQURDLHlDQUFnRDs7QUFDakQsQ0FBQztBQUdGO0lBZUUsb0JBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBVjlDLDBCQUFxQixHQUFHLElBQUksb0JBQW9CLENBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzs7O1FBTXJFLFdBQU0sR0FBRyxJQUFJLG9CQUFvQixDQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRUosQ0FBQzs7Z0JBZnBELFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBbEJRLE9BQU87OztxQkFBaEI7Q0FpQ0MsQUFqQkQsSUFpQkM7U0FkWSxVQUFVOzs7SUFFckIsMkNBQ3FFOztJQU1yRSw0QkFDc0Q7O0lBRTFDLDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IFN5cyB9IGZyb20gJy4uL21vZGVscy9zeXMubW9kZWxzJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG50eXBlIFBheWxvYWQgPSBTeXM7XG5pbnRlcmZhY2UgTWV0YURhdGEge1xuICBzeXN0ZW1SZWxldmFudENsYXNzZXM/OiBTeXNTeXN0ZW1SZWxldmFudENsYXNzW11cbn07XG5leHBvcnQgdHlwZSBTeXNBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YURhdGE+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTeXNBY3Rpb25zIHtcblxuICBzeXN0ZW1fcmVsZXZhbnRfY2xhc3MgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcz5cbiAgICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJyk7XG5cbiAgLy8gYW5hbHlzaXNfdHlwZSA9IG5ldyBTdGFuZGFyZEFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c0FuYWx5c2lzVHlwZT5cbiAgLy8gICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnYW5hbHlzaXNfdHlwZScpO1xuXG5cbiAgY29uZmlnID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c0NvbmZpZ1ZhbHVlPlxuICAgICh0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHN5c1Jvb3QsICdjb25maWcnKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19