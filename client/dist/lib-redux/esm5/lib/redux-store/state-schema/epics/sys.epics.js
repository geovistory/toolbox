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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTBCLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUYsT0FBTyxFQUFrQiwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFvQixrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUduRTtJQUVFLGtCQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLG1CQUE4QyxFQUU5QyxZQUF3QztRQUp4QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJCO1FBRTlDLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtJQUM5QyxDQUFDOzs7O0lBRUUsOEJBQVc7OztJQUFsQjtRQUFBLGlCQXdCQzs7WUF2Qk8sK0JBQStCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7OztZQUtyRixrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFJN0QsT0FBTyxZQUFZO1FBRWpCLDRCQUE0QjtRQUM1QiwrQkFBK0IsQ0FBQyxjQUFjOzs7O1FBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEVBQS9CLENBQStCLEdBQUUsRUFBRSxDQUFDLEVBQy9GLCtCQUErQixDQUFDLGdCQUFnQjs7OztRQUEyQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXhELENBQXdELEVBQUM7UUFFOUoscUZBQXFGO1FBRXJGLGtCQUFrQixDQUFDLGNBQWM7OztRQUMvQixjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLEVBQTFFLENBQTBFLEdBQ2hGLEVBQUUsQ0FBQyxDQUNOLENBQUM7SUFDSixDQUFDOztnQkFsQ0YsVUFBVTs7OztnQkFQRixVQUFVO2dCQUVWLHVCQUF1QjtnQkFOQyx5QkFBeUI7Z0JBQ2pDLDBCQUEwQjs7SUErQ25ELGVBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXBDWSxRQUFROzs7Ozs7SUFFakIsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLHVDQUFzRDs7Ozs7SUFFdEQsZ0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcywgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSwgU3lzdGVtQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQvcHVibGljLWFwaSc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnU2xpY2UsIFN5c1JlbGV2YW50Q2xhc3NTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuaW1wb3J0IHsgTW9kaWZ5QWN0aW9uTWV0YSwgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXNFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzeXNSZWxldmFudENsYXNzQXBpOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpLFxuICAgIC8vIHByaXZhdGUgc3lzQW5hbHlzaXNUeXBlQXBpOiBTeXNBbmFseXNpc1R5cGVBcGksXG4gICAgcHJpdmF0ZSBzeXNDb25maWdBcGk6IFN5c3RlbUNvbmZpZ3VyYXRpb25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcz5cbiAgICAgIChzeXNSb290LCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJywgdGhpcy5hY3Rpb25zLnN5c3RlbV9yZWxldmFudF9jbGFzcywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgLy8gY29uc3QgYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5ID0gbmV3IFN0YW5kYXJkRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzQW5hbHlzaXNUeXBlPlxuICAgIC8vICAgKHN5c1Jvb3QsICdhbmFseXNpc190eXBlJywgdGhpcy5hY3Rpb25zLmFuYWx5c2lzX3R5cGUsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbmZpZ0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8U3lzQ29uZmlnU2xpY2UsIFN5c0NvbmZpZ1ZhbHVlPlxuICAgICAgKHN5c1Jvb3QsICdjb25maWcnLCB0aGlzLmFjdGlvbnMuY29uZmlnLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcblxuICAgICAgLy8gU3lzdGVtUmVsZXZhbnRDbGFzcyBFcGljc1xuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoYWN0aW9uKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuZmluZCgpLCAnJyksXG4gICAgICBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oKG1ldGEpID0+IHRoaXMuc3lzUmVsZXZhbnRDbGFzc0FwaS5idWxrUmVwbGFjZU9yQ3JlYXRlKG1ldGEuaXRlbXMpKSxcblxuICAgICAgLy8gYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKCgpID0+IHRoaXMuc3lzQW5hbHlzaXNUeXBlQXBpLmZpbmQoKSwgJycpLFxuXG4gICAgICBjb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoXG4gICAgICAgICgpID0+IHRoaXMuc3lzQ29uZmlnQXBpLnN5c0NvbmZpZ0NvbnRyb2xsZXJHZXRTeXN0ZW1Db25maWcoKS5waXBlKG1hcCh4ID0+IFt4XSkpLFxuICAgICAgICAnJylcbiAgICApO1xuICB9XG5cblxufVxuIl19