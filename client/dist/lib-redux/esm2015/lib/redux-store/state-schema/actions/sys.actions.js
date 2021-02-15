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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7QUFHMUUsdUJBRUM7OztJQURDLHlDQUFnRDs7QUFDakQsQ0FBQztBQU1GLE1BQU0sT0FBTyxVQUFVOzs7O0lBWXJCLFlBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBVjlDLDBCQUFxQixHQUFHLElBQUksb0JBQW9CLENBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzs7O1FBTXJFLFdBQU0sR0FBRyxJQUFJLG9CQUFvQixDQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRUosQ0FBQzs7O1lBZnBELFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWxCUSxPQUFPOzs7OztJQXFCZCwyQ0FDcUU7O0lBTXJFLDRCQUNzRDs7SUFFMUMsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgU3lzIH0gZnJvbSAnLi4vbW9kZWxzL3N5cy5tb2RlbHMnO1xuaW1wb3J0IHsgc3lzUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9zeXMuY29uZmlnJztcbmltcG9ydCB7IFNjaGVtYUFjdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbnR5cGUgUGF5bG9hZCA9IFN5cztcbmludGVyZmFjZSBNZXRhRGF0YSB7XG4gIHN5c3RlbVJlbGV2YW50Q2xhc3Nlcz86IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NbXVxufTtcbmV4cG9ydCB0eXBlIFN5c0FjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhRGF0YT47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN5c0FjdGlvbnMge1xuXG4gIHN5c3RlbV9yZWxldmFudF9jbGFzcyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzPlxuICAgICh0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHN5c1Jvb3QsICdzeXN0ZW1fcmVsZXZhbnRfY2xhc3MnKTtcblxuICAvLyBhbmFseXNpc190eXBlID0gbmV3IFN0YW5kYXJkQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgU3lzQW5hbHlzaXNUeXBlPlxuICAvLyAgICh0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHN5c1Jvb3QsICdhbmFseXNpc190eXBlJyk7XG5cblxuICBjb25maWcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgU3lzQ29uZmlnVmFsdWU+XG4gICAgKHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoc3lzUm9vdCwgJ2NvbmZpZycpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=