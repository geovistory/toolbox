/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/sys.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9zeXMuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUcxRSx1QkFFQzs7O0lBREMseUNBQWdEOztBQUNqRCxDQUFDO0FBR0Y7SUFhRSxvQkFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFWOUMsMEJBQXFCLEdBQUcsSUFBSSxvQkFBb0IsQ0FDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDOzs7UUFNckUsV0FBTSxHQUFHLElBQUksb0JBQW9CLENBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFSixDQUFDOztnQkFicEQsVUFBVTs7OztnQkFoQkYsT0FBTzs7SUErQmhCLGlCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZFksVUFBVTs7O0lBRXJCLDJDQUNxRTs7SUFNckUsNEJBQ3NEOztJQUUxQyw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBTeXMgfSBmcm9tICcuLi9tb2RlbHMvc3lzLm1vZGVscyc7XG5pbXBvcnQgeyBzeXNSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL3N5cy5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxudHlwZSBQYXlsb2FkID0gU3lzO1xuaW50ZXJmYWNlIE1ldGFEYXRhIHtcbiAgc3lzdGVtUmVsZXZhbnRDbGFzc2VzPzogU3lzU3lzdGVtUmVsZXZhbnRDbGFzc1tdXG59O1xuZXhwb3J0IHR5cGUgU3lzQWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGFEYXRhPjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN5c0FjdGlvbnMge1xuXG4gIHN5c3RlbV9yZWxldmFudF9jbGFzcyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzPlxuICAgICh0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHN5c1Jvb3QsICdzeXN0ZW1fcmVsZXZhbnRfY2xhc3MnKTtcblxuICAvLyBhbmFseXNpc190eXBlID0gbmV3IFN0YW5kYXJkQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgU3lzQW5hbHlzaXNUeXBlPlxuICAvLyAgICh0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHN5c1Jvb3QsICdhbmFseXNpc190eXBlJyk7XG5cblxuICBjb25maWcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgU3lzQ29uZmlnVmFsdWU+XG4gICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ2NvbmZpZycpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=