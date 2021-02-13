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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTBCLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUYsT0FBTyxFQUFrQiwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUt0RSxNQUFNLE9BQU8sUUFBUTs7Ozs7OztJQUNuQixZQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLG1CQUE4QyxFQUU5QyxZQUF3QztRQUp4QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJCO1FBRTlDLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtJQUM5QyxDQUFDOzs7O0lBRUUsV0FBVzs7Y0FDViwrQkFBK0IsR0FBRyxJQUFJLGtCQUFrQixDQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOzs7O2NBS3JGLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUk3RCxPQUFPLFlBQVk7UUFFakIsNEJBQTRCO1FBQzVCLCtCQUErQixDQUFDLGNBQWM7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFFLEVBQUUsQ0FBQyxFQUMvRiwrQkFBK0IsQ0FBQyxnQkFBZ0I7Ozs7UUFBMkMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFFOUoscUZBQXFGO1FBRXJGLGtCQUFrQixDQUFDLGNBQWM7OztRQUMvQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUNoRixFQUFFLENBQUMsQ0FDTixDQUFDO0lBQ0osQ0FBQzs7O1lBbENGLFVBQVU7Ozs7WUFSRixVQUFVO1lBRFYsdUJBQXVCO1lBSkMseUJBQXlCO1lBQ2pDLDBCQUEwQjs7Ozs7OztJQWUvQywyQkFBMkI7Ozs7O0lBQzNCLGdDQUE2Qzs7Ozs7SUFDN0MsdUNBQXNEOzs7OztJQUV0RCxnQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFN5c0NvbmZpZ1ZhbHVlLCBTeXN0ZW1Db25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvc3lzLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnU2xpY2UsIFN5c1JlbGV2YW50Q2xhc3NTbGljZSB9IGZyb20gJy4uL21vZGVscy9zeXMubW9kZWxzJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZyc7XG5pbXBvcnQgeyBNb2RpZnlBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IFN5c0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgc3lzUmVsZXZhbnRDbGFzc0FwaTogU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSxcbiAgICAvLyBwcml2YXRlIHN5c0FuYWx5c2lzVHlwZUFwaTogU3lzQW5hbHlzaXNUeXBlQXBpLFxuICAgIHByaXZhdGUgc3lzQ29uZmlnQXBpOiBTeXN0ZW1Db25maWd1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxTeXNSZWxldmFudENsYXNzU2xpY2UsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+XG4gICAgICAoc3lzUm9vdCwgJ3N5c3RlbV9yZWxldmFudF9jbGFzcycsIHRoaXMuYWN0aW9ucy5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIC8vIGNvbnN0IGFuYWx5c2lzVHlwZUVwaWNzRmFjdG9yeSA9IG5ldyBTdGFuZGFyZEVwaWNzRmFjdG9yeTxTeXNSZWxldmFudENsYXNzU2xpY2UsIFN5c0FuYWx5c2lzVHlwZT5cbiAgICAvLyAgIChzeXNSb290LCAnYW5hbHlzaXNfdHlwZScsIHRoaXMuYWN0aW9ucy5hbmFseXNpc190eXBlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb25maWdFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c0NvbmZpZ1NsaWNlLCBTeXNDb25maWdWYWx1ZT5cbiAgICAgIChzeXNSb290LCAnY29uZmlnJywgdGhpcy5hY3Rpb25zLmNvbmZpZywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG5cblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIFN5c3RlbVJlbGV2YW50Q2xhc3MgRXBpY3NcbiAgICAgIHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoKGFjdGlvbikgPT4gdGhpcy5zeXNSZWxldmFudENsYXNzQXBpLmZpbmQoKSwgJycpLFxuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KChtZXRhKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuYnVsa1JlcGxhY2VPckNyZWF0ZShtZXRhLml0ZW1zKSksXG5cbiAgICAgIC8vIGFuYWx5c2lzVHlwZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoKSA9PiB0aGlzLnN5c0FuYWx5c2lzVHlwZUFwaS5maW5kKCksICcnKSxcblxuICAgICAgY29uZmlnRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKFxuICAgICAgICAoKSA9PiB0aGlzLnN5c0NvbmZpZ0FwaS5zeXNDb25maWdDb250cm9sbGVyR2V0U3lzdGVtQ29uZmlnKCkucGlwZShtYXAoeCA9PiBbeF0pKSxcbiAgICAgICAgJycpXG4gICAgKTtcbiAgfVxuXG5cbn1cbiJdfQ==