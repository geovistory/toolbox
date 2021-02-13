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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTBCLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUYsT0FBTyxFQUFrQiwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUl0RTtJQUVFLGtCQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLG1CQUE4QyxFQUU5QyxZQUF3QztRQUp4QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJCO1FBRTlDLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtJQUM5QyxDQUFDOzs7O0lBRUUsOEJBQVc7OztJQUFsQjtRQUFBLGlCQXdCQzs7WUF2Qk8sK0JBQStCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7OztZQUtyRixrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFJN0QsT0FBTyxZQUFZO1FBRWpCLDRCQUE0QjtRQUM1QiwrQkFBK0IsQ0FBQyxjQUFjOzs7O1FBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEVBQS9CLENBQStCLEdBQUUsRUFBRSxDQUFDLEVBQy9GLCtCQUErQixDQUFDLGdCQUFnQjs7OztRQUEyQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXhELENBQXdELEVBQUM7UUFFOUoscUZBQXFGO1FBRXJGLGtCQUFrQixDQUFDLGNBQWM7OztRQUMvQixjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLEVBQTFFLENBQTBFLEdBQ2hGLEVBQUUsQ0FBQyxDQUNOLENBQUM7SUFDSixDQUFDOztnQkFsQ0YsVUFBVTs7OztnQkFSRixVQUFVO2dCQURWLHVCQUF1QjtnQkFKQyx5QkFBeUI7Z0JBQ2pDLDBCQUEwQjs7SUFpRG5ELGVBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXBDWSxRQUFROzs7Ozs7SUFFakIsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLHVDQUFzRDs7Ozs7SUFFdEQsZ0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcywgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSwgU3lzdGVtQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0NvbmZpZ1NsaWNlLCBTeXNSZWxldmFudENsYXNzU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvc3lzLm1vZGVscyc7XG5pbXBvcnQgeyBzeXNSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL3N5cy5jb25maWcnO1xuaW1wb3J0IHsgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN5c0VwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBTeXNBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIHN5c1JlbGV2YW50Q2xhc3NBcGk6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGksXG4gICAgLy8gcHJpdmF0ZSBzeXNBbmFseXNpc1R5cGVBcGk6IFN5c0FuYWx5c2lzVHlwZUFwaSxcbiAgICBwcml2YXRlIHN5c0NvbmZpZ0FwaTogU3lzdGVtQ29uZmlndXJhdGlvblNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3Qgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8U3lzUmVsZXZhbnRDbGFzc1NsaWNlLCBTeXNTeXN0ZW1SZWxldmFudENsYXNzPlxuICAgICAgKHN5c1Jvb3QsICdzeXN0ZW1fcmVsZXZhbnRfY2xhc3MnLCB0aGlzLmFjdGlvbnMuc3lzdGVtX3JlbGV2YW50X2NsYXNzLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICAvLyBjb25zdCBhbmFseXNpc1R5cGVFcGljc0ZhY3RvcnkgPSBuZXcgU3RhbmRhcmRFcGljc0ZhY3Rvcnk8U3lzUmVsZXZhbnRDbGFzc1NsaWNlLCBTeXNBbmFseXNpc1R5cGU+XG4gICAgLy8gICAoc3lzUm9vdCwgJ2FuYWx5c2lzX3R5cGUnLCB0aGlzLmFjdGlvbnMuYW5hbHlzaXNfdHlwZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY29uZmlnRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxTeXNDb25maWdTbGljZSwgU3lzQ29uZmlnVmFsdWU+XG4gICAgICAoc3lzUm9vdCwgJ2NvbmZpZycsIHRoaXMuYWN0aW9ucy5jb25maWcsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuXG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuXG4gICAgICAvLyBTeXN0ZW1SZWxldmFudENsYXNzIEVwaWNzXG4gICAgICBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKChhY3Rpb24pID0+IHRoaXMuc3lzUmVsZXZhbnRDbGFzc0FwaS5maW5kKCksICcnKSxcbiAgICAgIHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+PigobWV0YSkgPT4gdGhpcy5zeXNSZWxldmFudENsYXNzQXBpLmJ1bGtSZXBsYWNlT3JDcmVhdGUobWV0YS5pdGVtcykpLFxuXG4gICAgICAvLyBhbmFseXNpc1R5cGVFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoKCkgPT4gdGhpcy5zeXNBbmFseXNpc1R5cGVBcGkuZmluZCgpLCAnJyksXG5cbiAgICAgIGNvbmZpZ0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYyhcbiAgICAgICAgKCkgPT4gdGhpcy5zeXNDb25maWdBcGkuc3lzQ29uZmlnQ29udHJvbGxlckdldFN5c3RlbUNvbmZpZygpLnBpcGUobWFwKHggPT4gW3hdKSksXG4gICAgICAgICcnKVxuICAgICk7XG4gIH1cblxuXG59XG4iXX0=