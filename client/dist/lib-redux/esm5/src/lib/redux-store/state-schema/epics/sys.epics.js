/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/sys.epics.ts
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SysEpics.ctorParameters = function () { return [
        { type: SysActions },
        { type: NotificationsAPIActions },
        { type: SysSystemRelevantClassApi },
        { type: SystemConfigurationService }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUEwQix5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBa0IsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBb0Isa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHbkU7SUFFRSxrQkFDVSxPQUFtQixFQUNuQixZQUFxQyxFQUNyQyxtQkFBOEMsRUFFOUMsWUFBd0M7UUFKeEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQjtRQUU5QyxpQkFBWSxHQUFaLFlBQVksQ0FBNEI7SUFDOUMsQ0FBQzs7OztJQUVFLDhCQUFXOzs7SUFBbEI7UUFBQSxpQkF3QkM7O1lBdkJPLCtCQUErQixHQUFHLElBQUksa0JBQWtCLENBQzNELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7WUFLckYsa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBSTdELE9BQU8sWUFBWTtRQUVqQiw0QkFBNEI7UUFDNUIsK0JBQStCLENBQUMsY0FBYzs7OztRQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxFQUEvQixDQUErQixHQUFFLEVBQUUsQ0FBQyxFQUMvRiwrQkFBK0IsQ0FBQyxnQkFBZ0I7Ozs7UUFBMkMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF4RCxDQUF3RCxFQUFDO1FBRTlKLHFGQUFxRjtRQUVyRixrQkFBa0IsQ0FBQyxjQUFjOzs7UUFDL0IsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUExRSxDQUEwRSxHQUNoRixFQUFFLENBQUMsQ0FDTixDQUFDO0lBQ0osQ0FBQzs7Z0JBbENGLFVBQVU7Ozs7Z0JBUEYsVUFBVTtnQkFFVix1QkFBdUI7Z0JBTkMseUJBQXlCO2dCQUNqQywwQkFBMEI7O0lBK0NuRCxlQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FwQ1ksUUFBUTs7Ozs7O0lBRWpCLDJCQUEyQjs7Ozs7SUFDM0IsZ0NBQTZDOzs7OztJQUM3Qyx1Q0FBc0Q7Ozs7O0lBRXRELGdDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnVmFsdWUsIFN5c3RlbUNvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0L3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN5c0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFN5c0NvbmZpZ1NsaWNlLCBTeXNSZWxldmFudENsYXNzU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucyc7XG5pbXBvcnQgeyBzeXNSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzJztcbmltcG9ydCB7IE1vZGlmeUFjdGlvbk1ldGEsIFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IFN5c0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgc3lzUmVsZXZhbnRDbGFzc0FwaTogU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSxcbiAgICAvLyBwcml2YXRlIHN5c0FuYWx5c2lzVHlwZUFwaTogU3lzQW5hbHlzaXNUeXBlQXBpLFxuICAgIHByaXZhdGUgc3lzQ29uZmlnQXBpOiBTeXN0ZW1Db25maWd1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxTeXNSZWxldmFudENsYXNzU2xpY2UsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+XG4gICAgICAoc3lzUm9vdCwgJ3N5c3RlbV9yZWxldmFudF9jbGFzcycsIHRoaXMuYWN0aW9ucy5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIC8vIGNvbnN0IGFuYWx5c2lzVHlwZUVwaWNzRmFjdG9yeSA9IG5ldyBTdGFuZGFyZEVwaWNzRmFjdG9yeTxTeXNSZWxldmFudENsYXNzU2xpY2UsIFN5c0FuYWx5c2lzVHlwZT5cbiAgICAvLyAgIChzeXNSb290LCAnYW5hbHlzaXNfdHlwZScsIHRoaXMuYWN0aW9ucy5hbmFseXNpc190eXBlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb25maWdFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c0NvbmZpZ1NsaWNlLCBTeXNDb25maWdWYWx1ZT5cbiAgICAgIChzeXNSb290LCAnY29uZmlnJywgdGhpcy5hY3Rpb25zLmNvbmZpZywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG5cblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIFN5c3RlbVJlbGV2YW50Q2xhc3MgRXBpY3NcbiAgICAgIHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoKGFjdGlvbikgPT4gdGhpcy5zeXNSZWxldmFudENsYXNzQXBpLmZpbmQoKSwgJycpLFxuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KChtZXRhKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuYnVsa1JlcGxhY2VPckNyZWF0ZShtZXRhLml0ZW1zKSksXG5cbiAgICAgIC8vIGFuYWx5c2lzVHlwZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoKSA9PiB0aGlzLnN5c0FuYWx5c2lzVHlwZUFwaS5maW5kKCksICcnKSxcblxuICAgICAgY29uZmlnRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKFxuICAgICAgICAoKSA9PiB0aGlzLnN5c0NvbmZpZ0FwaS5zeXNDb25maWdDb250cm9sbGVyR2V0U3lzdGVtQ29uZmlnKCkucGlwZShtYXAoeCA9PiBbeF0pKSxcbiAgICAgICAgJycpXG4gICAgKTtcbiAgfVxuXG5cbn1cbiJdfQ==