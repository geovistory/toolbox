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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zeXMuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7O0FBRzFFLHVCQUVDOzs7SUFEQyx5Q0FBZ0Q7O0FBQ2pELENBQUM7QUFHRjtJQWVFLG9CQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVY5QywwQkFBcUIsR0FBRyxJQUFJLG9CQUFvQixDQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7OztRQU1yRSxXQUFNLEdBQUcsSUFBSSxvQkFBb0IsQ0FDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVKLENBQUM7O2dCQWZwRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWxCUSxPQUFPOzs7cUJBQWhCO0NBaUNDLEFBakJELElBaUJDO1NBZFksVUFBVTs7O0lBRXJCLDJDQUNxRTs7SUFNckUsNEJBQ3NEOztJQUUxQyw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBTeXMgfSBmcm9tICcuLi9tb2RlbHMvc3lzLm1vZGVscyc7XG5pbXBvcnQgeyBzeXNSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL3N5cy5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxudHlwZSBQYXlsb2FkID0gU3lzO1xuaW50ZXJmYWNlIE1ldGFEYXRhIHtcbiAgc3lzdGVtUmVsZXZhbnRDbGFzc2VzPzogU3lzU3lzdGVtUmVsZXZhbnRDbGFzc1tdXG59O1xuZXhwb3J0IHR5cGUgU3lzQWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGFEYXRhPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3lzQWN0aW9ucyB7XG5cbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+XG4gICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ3N5c3RlbV9yZWxldmFudF9jbGFzcycpO1xuXG4gIC8vIGFuYWx5c2lzX3R5cGUgPSBuZXcgU3RhbmRhcmRBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNBbmFseXNpc1R5cGU+XG4gIC8vICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ2FuYWx5c2lzX3R5cGUnKTtcblxuXG4gIGNvbmZpZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNDb25maWdWYWx1ZT5cbiAgICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnY29uZmlnJyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==