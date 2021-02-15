/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/sys.actions.ts
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
export class SysActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.system_relevant_class = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');
        // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
        //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');
        this.config = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'config');
    }
}
SysActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SysActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ SysActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SysActions_Factory() { return new SysActions(i0.ɵɵinject(i1.NgRedux)); }, token: SysActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    SysActions.prototype.system_relevant_class;
    /** @type {?} */
    SysActions.prototype.config;
    /** @type {?} */
    SysActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zeXMuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7O0FBRzFFLHVCQUVDOzs7SUFEQyx5Q0FBZ0Q7O0FBQ2pELENBQUM7QUFNRixNQUFNLE9BQU8sVUFBVTs7OztJQVlyQixZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVY5QywwQkFBcUIsR0FBRyxJQUFJLG9CQUFvQixDQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7OztRQU1yRSxXQUFNLEdBQUcsSUFBSSxvQkFBb0IsQ0FDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVKLENBQUM7OztZQWZwRCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFsQlEsT0FBTzs7Ozs7SUFxQmQsMkNBQ3FFOztJQU1yRSw0QkFDc0Q7O0lBRTFDLDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IFN5cyB9IGZyb20gJy4uL21vZGVscy9zeXMubW9kZWxzJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG50eXBlIFBheWxvYWQgPSBTeXM7XG5pbnRlcmZhY2UgTWV0YURhdGEge1xuICBzeXN0ZW1SZWxldmFudENsYXNzZXM/OiBTeXNTeXN0ZW1SZWxldmFudENsYXNzW11cbn07XG5leHBvcnQgdHlwZSBTeXNBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YURhdGE+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTeXNBY3Rpb25zIHtcblxuICBzeXN0ZW1fcmVsZXZhbnRfY2xhc3MgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcz5cbiAgICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJyk7XG5cbiAgLy8gYW5hbHlzaXNfdHlwZSA9IG5ldyBTdGFuZGFyZEFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c0FuYWx5c2lzVHlwZT5cbiAgLy8gICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnYW5hbHlzaXNfdHlwZScpO1xuXG5cbiAgY29uZmlnID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c0NvbmZpZ1ZhbHVlPlxuICAgICh0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHN5c1Jvb3QsICdjb25maWcnKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19