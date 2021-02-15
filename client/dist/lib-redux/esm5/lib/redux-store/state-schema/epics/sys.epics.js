/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/sys.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SysSystemRelevantClassApi } from '@kleiolab/lib-sdk-lb3';
import { SystemConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics } from 'redux-observable-es6-compat';
import { map } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SysActions } from '../actions/sys.actions';
import { sysRoot } from '../reducer-configs/sys.config';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import * as i0 from "@angular/core";
import * as i1 from "../actions/sys.actions";
import * as i2 from "../../state-gui/actions/notifications.actions";
import * as i3 from "@kleiolab/lib-sdk-lb3";
import * as i4 from "@kleiolab/lib-sdk-lb4";
var SysEpics = /** @class */ (function () {
    function SysEpics(actions, notification, sysRelevantClassApi, sysConfigApi) {
        this.actions = actions;
        this.notification = notification;
        this.sysRelevantClassApi = sysRelevantClassApi;
        this.sysConfigApi = sysConfigApi;
    }
    /**
     * @return {?}
     */
    SysEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var systemRelevantClassEpicsFactory = new SchemaEpicsFactory(sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);
        // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
        //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);
        /** @type {?} */
        var configEpicsFactory = new SchemaEpicsFactory(sysRoot, 'config', this.actions.config, this.notification);
        return combineEpics(
        // SystemRelevantClass Epics
        systemRelevantClassEpicsFactory.createLoadEpic((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this.sysRelevantClassApi.find(); }), ''), systemRelevantClassEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items); })), 
        // analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), ''),
        configEpicsFactory.createLoadEpic((/**
         * @return {?}
         */
        function () { return _this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return [x]; }))); }), ''));
    };
    SysEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SysEpics.ctorParameters = function () { return [
        { type: SysActions },
        { type: NotificationsAPIActions },
        { type: SysSystemRelevantClassApi },
        { type: SystemConfigurationService }
    ]; };
    /** @nocollapse */ SysEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SysEpics_Factory() { return new SysEpics(i0.ɵɵinject(i1.SysActions), i0.ɵɵinject(i2.NotificationsAPIActions), i0.ɵɵinject(i3.SysSystemRelevantClassApi), i0.ɵɵinject(i4.SystemConfigurationService)); }, token: SysEpics, providedIn: "root" });
    return SysEpics;
}());
export { SysEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.sysRelevantClassApi;
    /**
     * @type {?}
     * @private
     */
    SysEpics.prototype.sysConfigApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTBCLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUYsT0FBTyxFQUFrQiwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7O0FBSXRFO0lBSUUsa0JBQ1UsT0FBbUIsRUFDbkIsWUFBcUMsRUFDckMsbUJBQThDLEVBRTlDLFlBQXdDO1FBSnhDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQ3JDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBMkI7UUFFOUMsaUJBQVksR0FBWixZQUFZLENBQTRCO0lBQzlDLENBQUM7Ozs7SUFFRSw4QkFBVzs7O0lBQWxCO1FBQUEsaUJBd0JDOztZQXZCTywrQkFBK0IsR0FBRyxJQUFJLGtCQUFrQixDQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOzs7O1lBS3JGLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUk3RCxPQUFPLFlBQVk7UUFFakIsNEJBQTRCO1FBQzVCLCtCQUErQixDQUFDLGNBQWM7Ozs7UUFBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsRUFBL0IsQ0FBK0IsR0FBRSxFQUFFLENBQUMsRUFDL0YsK0JBQStCLENBQUMsZ0JBQWdCOzs7O1FBQTJDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBeEQsQ0FBd0QsRUFBQztRQUU5SixxRkFBcUY7UUFFckYsa0JBQWtCLENBQUMsY0FBYzs7O1FBQy9CLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FBRyxFQUFDLENBQUMsRUFBMUUsQ0FBMEUsR0FDaEYsRUFBRSxDQUFDLENBQ04sQ0FBQztJQUNKLENBQUM7O2dCQXBDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVZRLFVBQVU7Z0JBRFYsdUJBQXVCO2dCQUpDLHlCQUF5QjtnQkFDakMsMEJBQTBCOzs7bUJBRm5EO0NBcURDLEFBdkNELElBdUNDO1NBcENZLFFBQVE7Ozs7OztJQUVqQiwyQkFBMkI7Ozs7O0lBQzNCLGdDQUE2Qzs7Ozs7SUFDN0MsdUNBQXNEOzs7OztJQUV0RCxnQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFN5c0NvbmZpZ1ZhbHVlLCBTeXN0ZW1Db25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvc3lzLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnU2xpY2UsIFN5c1JlbGV2YW50Q2xhc3NTbGljZSB9IGZyb20gJy4uL21vZGVscy9zeXMubW9kZWxzJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZyc7XG5pbXBvcnQgeyBNb2RpZnlBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTeXNFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzeXNSZWxldmFudENsYXNzQXBpOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpLFxuICAgIC8vIHByaXZhdGUgc3lzQW5hbHlzaXNUeXBlQXBpOiBTeXNBbmFseXNpc1R5cGVBcGksXG4gICAgcHJpdmF0ZSBzeXNDb25maWdBcGk6IFN5c3RlbUNvbmZpZ3VyYXRpb25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcz5cbiAgICAgIChzeXNSb290LCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJywgdGhpcy5hY3Rpb25zLnN5c3RlbV9yZWxldmFudF9jbGFzcywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgLy8gY29uc3QgYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5ID0gbmV3IFN0YW5kYXJkRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzQW5hbHlzaXNUeXBlPlxuICAgIC8vICAgKHN5c1Jvb3QsICdhbmFseXNpc190eXBlJywgdGhpcy5hY3Rpb25zLmFuYWx5c2lzX3R5cGUsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbmZpZ0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8U3lzQ29uZmlnU2xpY2UsIFN5c0NvbmZpZ1ZhbHVlPlxuICAgICAgKHN5c1Jvb3QsICdjb25maWcnLCB0aGlzLmFjdGlvbnMuY29uZmlnLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcblxuICAgICAgLy8gU3lzdGVtUmVsZXZhbnRDbGFzcyBFcGljc1xuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoYWN0aW9uKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuZmluZCgpLCAnJyksXG4gICAgICBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oKG1ldGEpID0+IHRoaXMuc3lzUmVsZXZhbnRDbGFzc0FwaS5idWxrUmVwbGFjZU9yQ3JlYXRlKG1ldGEuaXRlbXMpKSxcblxuICAgICAgLy8gYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKCgpID0+IHRoaXMuc3lzQW5hbHlzaXNUeXBlQXBpLmZpbmQoKSwgJycpLFxuXG4gICAgICBjb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoXG4gICAgICAgICgpID0+IHRoaXMuc3lzQ29uZmlnQXBpLnN5c0NvbmZpZ0NvbnRyb2xsZXJHZXRTeXN0ZW1Db25maWcoKS5waXBlKG1hcCh4ID0+IFt4XSkpLFxuICAgICAgICAnJylcbiAgICApO1xuICB9XG5cblxufVxuIl19