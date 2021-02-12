/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/sys.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { sysRoot } from '../reducer-configs';
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
    { type: Injectable }
];
/** @nocollapse */
SysActions.ctorParameters = () => [
    { type: NgRedux }
];
if (false) {
    /** @type {?} */
    SysActions.prototype.system_relevant_class;
    /** @type {?} */
    SysActions.prototype.config;
    /** @type {?} */
    SysActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zeXMuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUcxRSx1QkFFQzs7O0lBREMseUNBQWdEOztBQUNqRCxDQUFDO0FBSUYsTUFBTSxPQUFPLFVBQVU7Ozs7SUFZckIsWUFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFWOUMsMEJBQXFCLEdBQUcsSUFBSSxvQkFBb0IsQ0FDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDOzs7UUFNckUsV0FBTSxHQUFHLElBQUksb0JBQW9CLENBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFSixDQUFDOzs7WUFicEQsVUFBVTs7OztZQWhCRixPQUFPOzs7O0lBbUJkLDJDQUNxRTs7SUFNckUsNEJBQ3NEOztJQUUxQyw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBTeXMgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgc3lzUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG50eXBlIFBheWxvYWQgPSBTeXM7XG5pbnRlcmZhY2UgTWV0YURhdGEge1xuICBzeXN0ZW1SZWxldmFudENsYXNzZXM/OiBTeXNTeXN0ZW1SZWxldmFudENsYXNzW11cbn07XG5leHBvcnQgdHlwZSBTeXNBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YURhdGE+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzQWN0aW9ucyB7XG5cbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+XG4gICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ3N5c3RlbV9yZWxldmFudF9jbGFzcycpO1xuXG4gIC8vIGFuYWx5c2lzX3R5cGUgPSBuZXcgU3RhbmRhcmRBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNBbmFseXNpc1R5cGU+XG4gIC8vICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ2FuYWx5c2lzX3R5cGUnKTtcblxuXG4gIGNvbmZpZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNDb25maWdWYWx1ZT5cbiAgICAodGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhzeXNSb290LCAnY29uZmlnJyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==