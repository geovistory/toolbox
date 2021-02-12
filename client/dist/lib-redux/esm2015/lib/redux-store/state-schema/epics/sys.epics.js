/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/sys.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SysSystemRelevantClassApi } from '@kleiolab/lib-sdk-lb3';
import { SystemConfigurationService } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineEpics } from 'redux-observable-es6-compat';
import { map } from 'rxjs/operators';
import { SysActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { sysRoot } from '../reducer-configs';
import { SchemaEpicsFactory } from '../_helpers';
export class SysEpics {
    /**
     * @param {?} actions
     * @param {?} notification
     * @param {?} sysRelevantClassApi
     * @param {?} sysConfigApi
     */
    constructor(actions, notification, sysRelevantClassApi, sysConfigApi) {
        this.actions = actions;
        this.notification = notification;
        this.sysRelevantClassApi = sysRelevantClassApi;
        this.sysConfigApi = sysConfigApi;
    }
    /**
     * @return {?}
     */
    createEpics() {
        /** @type {?} */
        const systemRelevantClassEpicsFactory = new SchemaEpicsFactory(sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);
        // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
        //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);
        /** @type {?} */
        const configEpicsFactory = new SchemaEpicsFactory(sysRoot, 'config', this.actions.config, this.notification);
        return combineEpics(
        // SystemRelevantClass Epics
        systemRelevantClassEpicsFactory.createLoadEpic((/**
         * @param {?} action
         * @return {?}
         */
        (action) => this.sysRelevantClassApi.find()), ''), systemRelevantClassEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items))), 
        // analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), ''),
        configEpicsFactory.createLoadEpic((/**
         * @return {?}
         */
        () => this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        x => [x])))), ''));
    }
}
SysEpics.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SysEpics.ctorParameters = () => [
    { type: SysActions },
    { type: NotificationsAPIActions },
    { type: SysSystemRelevantClassApi },
    { type: SystemConfigurationService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTBCLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUYsT0FBTyxFQUFrQiwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFvQixrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUluRSxNQUFNLE9BQU8sUUFBUTs7Ozs7OztJQUNuQixZQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLG1CQUE4QyxFQUU5QyxZQUF3QztRQUp4QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJCO1FBRTlDLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtJQUM5QyxDQUFDOzs7O0lBRUUsV0FBVzs7Y0FDViwrQkFBK0IsR0FBRyxJQUFJLGtCQUFrQixDQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOzs7O2NBS3JGLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUk3RCxPQUFPLFlBQVk7UUFFakIsNEJBQTRCO1FBQzVCLCtCQUErQixDQUFDLGNBQWM7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFFLEVBQUUsQ0FBQyxFQUMvRiwrQkFBK0IsQ0FBQyxnQkFBZ0I7Ozs7UUFBMkMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFFOUoscUZBQXFGO1FBRXJGLGtCQUFrQixDQUFDLGNBQWM7OztRQUMvQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUNoRixFQUFFLENBQUMsQ0FDTixDQUFDO0lBQ0osQ0FBQzs7O1lBbENGLFVBQVU7Ozs7WUFQRixVQUFVO1lBRVYsdUJBQXVCO1lBTkMseUJBQXlCO1lBQ2pDLDBCQUEwQjs7Ozs7OztJQWEvQywyQkFBMkI7Ozs7O0lBQzNCLGdDQUE2Qzs7Ozs7SUFDN0MsdUNBQXNEOzs7OztJQUV0RCxnQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFN5c0NvbmZpZ1ZhbHVlLCBTeXN0ZW1Db25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNC9wdWJsaWMtYXBpJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTeXNBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTeXNDb25maWdTbGljZSwgU3lzUmVsZXZhbnRDbGFzc1NsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgc3lzUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5pbXBvcnQgeyBNb2RpZnlBY3Rpb25NZXRhLCBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN5c0VwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBTeXNBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIHN5c1JlbGV2YW50Q2xhc3NBcGk6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGksXG4gICAgLy8gcHJpdmF0ZSBzeXNBbmFseXNpc1R5cGVBcGk6IFN5c0FuYWx5c2lzVHlwZUFwaSxcbiAgICBwcml2YXRlIHN5c0NvbmZpZ0FwaTogU3lzdGVtQ29uZmlndXJhdGlvblNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3Qgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8U3lzUmVsZXZhbnRDbGFzc1NsaWNlLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzPlxuICAgICAgKHN5c1Jvb3QsICdzeXN0ZW1fcmVsZXZhbnRfY2xhc3MnLCB0aGlzLmFjdGlvbnMuc3lzdGVtX3JlbGV2YW50X2NsYXNzLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICAvLyBjb25zdCBhbmFseXNpc1R5cGVFcGljc0ZhY3RvcnkgPSBuZXcgU3RhbmRhcmRFcGljc0ZhY3Rvcnk8U3lzUmVsZXZhbnRDbGFzc1NsaWNlLCBTeXNBbmFseXNpc1R5cGU+XG4gICAgLy8gICAoc3lzUm9vdCwgJ2FuYWx5c2lzX3R5cGUnLCB0aGlzLmFjdGlvbnMuYW5hbHlzaXNfdHlwZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY29uZmlnRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxTeXNDb25maWdTbGljZSwgU3lzQ29uZmlnVmFsdWU+XG4gICAgICAoc3lzUm9vdCwgJ2NvbmZpZycsIHRoaXMuYWN0aW9ucy5jb25maWcsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuXG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuXG4gICAgICAvLyBTeXN0ZW1SZWxldmFudENsYXNzIEVwaWNzXG4gICAgICBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKChhY3Rpb24pID0+IHRoaXMuc3lzUmVsZXZhbnRDbGFzc0FwaS5maW5kKCksICcnKSxcbiAgICAgIHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+PigobWV0YSkgPT4gdGhpcy5zeXNSZWxldmFudENsYXNzQXBpLmJ1bGtSZXBsYWNlT3JDcmVhdGUobWV0YS5pdGVtcykpLFxuXG4gICAgICAvLyBhbmFseXNpc1R5cGVFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoKCkgPT4gdGhpcy5zeXNBbmFseXNpc1R5cGVBcGkuZmluZCgpLCAnJyksXG5cbiAgICAgIGNvbmZpZ0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYyhcbiAgICAgICAgKCkgPT4gdGhpcy5zeXNDb25maWdBcGkuc3lzQ29uZmlnQ29udHJvbGxlckdldFN5c3RlbUNvbmZpZygpLnBpcGUobWFwKHggPT4gW3hdKSksXG4gICAgICAgICcnKVxuICAgICk7XG4gIH1cblxuXG59XG4iXX0=