/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/sys.epics.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUEwQix5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBa0IsMEJBQTBCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJdEU7SUFFRSxrQkFDVSxPQUFtQixFQUNuQixZQUFxQyxFQUNyQyxtQkFBOEMsRUFFOUMsWUFBd0M7UUFKeEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQjtRQUU5QyxpQkFBWSxHQUFaLFlBQVksQ0FBNEI7SUFDOUMsQ0FBQzs7OztJQUVFLDhCQUFXOzs7SUFBbEI7UUFBQSxpQkF3QkM7O1lBdkJPLCtCQUErQixHQUFHLElBQUksa0JBQWtCLENBQzNELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7WUFLckYsa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBSTdELE9BQU8sWUFBWTtRQUVqQiw0QkFBNEI7UUFDNUIsK0JBQStCLENBQUMsY0FBYzs7OztRQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxFQUEvQixDQUErQixHQUFFLEVBQUUsQ0FBQyxFQUMvRiwrQkFBK0IsQ0FBQyxnQkFBZ0I7Ozs7UUFBMkMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF4RCxDQUF3RCxFQUFDO1FBRTlKLHFGQUFxRjtRQUVyRixrQkFBa0IsQ0FBQyxjQUFjOzs7UUFDL0IsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUExRSxDQUEwRSxHQUNoRixFQUFFLENBQUMsQ0FDTixDQUFDO0lBQ0osQ0FBQzs7Z0JBbENGLFVBQVU7Ozs7Z0JBUkYsVUFBVTtnQkFEVix1QkFBdUI7Z0JBSkMseUJBQXlCO2dCQUNqQywwQkFBMEI7O0lBaURuRCxlQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FwQ1ksUUFBUTs7Ozs7O0lBRWpCLDJCQUEyQjs7Ozs7SUFDM0IsZ0NBQTZDOzs7OztJQUM3Qyx1Q0FBc0Q7Ozs7O0lBRXRELGdDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnVmFsdWUsIFN5c3RlbUNvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBTeXNBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9zeXMuYWN0aW9ucyc7XG5pbXBvcnQgeyBTeXNDb25maWdTbGljZSwgU3lzUmVsZXZhbnRDbGFzc1NsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL3N5cy5tb2RlbHMnO1xuaW1wb3J0IHsgc3lzUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9zeXMuY29uZmlnJztcbmltcG9ydCB7IE1vZGlmeUFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1lcGljcy1mYWN0b3J5JztcblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXNFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzeXNSZWxldmFudENsYXNzQXBpOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpLFxuICAgIC8vIHByaXZhdGUgc3lzQW5hbHlzaXNUeXBlQXBpOiBTeXNBbmFseXNpc1R5cGVBcGksXG4gICAgcHJpdmF0ZSBzeXNDb25maWdBcGk6IFN5c3RlbUNvbmZpZ3VyYXRpb25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcz5cbiAgICAgIChzeXNSb290LCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJywgdGhpcy5hY3Rpb25zLnN5c3RlbV9yZWxldmFudF9jbGFzcywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgLy8gY29uc3QgYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5ID0gbmV3IFN0YW5kYXJkRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzQW5hbHlzaXNUeXBlPlxuICAgIC8vICAgKHN5c1Jvb3QsICdhbmFseXNpc190eXBlJywgdGhpcy5hY3Rpb25zLmFuYWx5c2lzX3R5cGUsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbmZpZ0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8U3lzQ29uZmlnU2xpY2UsIFN5c0NvbmZpZ1ZhbHVlPlxuICAgICAgKHN5c1Jvb3QsICdjb25maWcnLCB0aGlzLmFjdGlvbnMuY29uZmlnLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcblxuICAgICAgLy8gU3lzdGVtUmVsZXZhbnRDbGFzcyBFcGljc1xuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoYWN0aW9uKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuZmluZCgpLCAnJyksXG4gICAgICBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oKG1ldGEpID0+IHRoaXMuc3lzUmVsZXZhbnRDbGFzc0FwaS5idWxrUmVwbGFjZU9yQ3JlYXRlKG1ldGEuaXRlbXMpKSxcblxuICAgICAgLy8gYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKCgpID0+IHRoaXMuc3lzQW5hbHlzaXNUeXBlQXBpLmZpbmQoKSwgJycpLFxuXG4gICAgICBjb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoXG4gICAgICAgICgpID0+IHRoaXMuc3lzQ29uZmlnQXBpLnN5c0NvbmZpZ0NvbnRyb2xsZXJHZXRTeXN0ZW1Db25maWcoKS5waXBlKG1hcCh4ID0+IFt4XSkpLFxuICAgICAgICAnJylcbiAgICApO1xuICB9XG5cblxufVxuIl19