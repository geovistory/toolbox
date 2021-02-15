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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUEwQix5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBa0IsMEJBQTBCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7OztBQUl0RTtJQUlFLGtCQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLG1CQUE4QyxFQUU5QyxZQUF3QztRQUp4QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJCO1FBRTlDLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtJQUM5QyxDQUFDOzs7O0lBRUUsOEJBQVc7OztJQUFsQjtRQUFBLGlCQXdCQzs7WUF2Qk8sK0JBQStCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7OztZQUtyRixrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFJN0QsT0FBTyxZQUFZO1FBRWpCLDRCQUE0QjtRQUM1QiwrQkFBK0IsQ0FBQyxjQUFjOzs7O1FBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEVBQS9CLENBQStCLEdBQUUsRUFBRSxDQUFDLEVBQy9GLCtCQUErQixDQUFDLGdCQUFnQjs7OztRQUEyQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXhELENBQXdELEVBQUM7UUFFOUoscUZBQXFGO1FBRXJGLGtCQUFrQixDQUFDLGNBQWM7OztRQUMvQixjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLEVBQTFFLENBQTBFLEdBQ2hGLEVBQUUsQ0FBQyxDQUNOLENBQUM7SUFDSixDQUFDOztnQkFwQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFWUSxVQUFVO2dCQURWLHVCQUF1QjtnQkFKQyx5QkFBeUI7Z0JBQ2pDLDBCQUEwQjs7O21CQUZuRDtDQXFEQyxBQXZDRCxJQXVDQztTQXBDWSxRQUFROzs7Ozs7SUFFakIsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLHVDQUFzRDs7Ozs7SUFFdEQsZ0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcywgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSwgU3lzdGVtQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0NvbmZpZ1NsaWNlLCBTeXNSZWxldmFudENsYXNzU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvc3lzLm1vZGVscyc7XG5pbXBvcnQgeyBzeXNSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL3N5cy5jb25maWcnO1xuaW1wb3J0IHsgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3lzRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IFN5c0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgc3lzUmVsZXZhbnRDbGFzc0FwaTogU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSxcbiAgICAvLyBwcml2YXRlIHN5c0FuYWx5c2lzVHlwZUFwaTogU3lzQW5hbHlzaXNUeXBlQXBpLFxuICAgIHByaXZhdGUgc3lzQ29uZmlnQXBpOiBTeXN0ZW1Db25maWd1cmF0aW9uU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxTeXNSZWxldmFudENsYXNzU2xpY2UsIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+XG4gICAgICAoc3lzUm9vdCwgJ3N5c3RlbV9yZWxldmFudF9jbGFzcycsIHRoaXMuYWN0aW9ucy5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIC8vIGNvbnN0IGFuYWx5c2lzVHlwZUVwaWNzRmFjdG9yeSA9IG5ldyBTdGFuZGFyZEVwaWNzRmFjdG9yeTxTeXNSZWxldmFudENsYXNzU2xpY2UsIFN5c0FuYWx5c2lzVHlwZT5cbiAgICAvLyAgIChzeXNSb290LCAnYW5hbHlzaXNfdHlwZScsIHRoaXMuYWN0aW9ucy5hbmFseXNpc190eXBlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb25maWdFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c0NvbmZpZ1NsaWNlLCBTeXNDb25maWdWYWx1ZT5cbiAgICAgIChzeXNSb290LCAnY29uZmlnJywgdGhpcy5hY3Rpb25zLmNvbmZpZywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG5cblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIFN5c3RlbVJlbGV2YW50Q2xhc3MgRXBpY3NcbiAgICAgIHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoKGFjdGlvbikgPT4gdGhpcy5zeXNSZWxldmFudENsYXNzQXBpLmZpbmQoKSwgJycpLFxuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KChtZXRhKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuYnVsa1JlcGxhY2VPckNyZWF0ZShtZXRhLml0ZW1zKSksXG5cbiAgICAgIC8vIGFuYWx5c2lzVHlwZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoKSA9PiB0aGlzLnN5c0FuYWx5c2lzVHlwZUFwaS5maW5kKCksICcnKSxcblxuICAgICAgY29uZmlnRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKFxuICAgICAgICAoKSA9PiB0aGlzLnN5c0NvbmZpZ0FwaS5zeXNDb25maWdDb250cm9sbGVyR2V0U3lzdGVtQ29uZmlnKCkucGlwZShtYXAoeCA9PiBbeF0pKSxcbiAgICAgICAgJycpXG4gICAgKTtcbiAgfVxuXG5cbn1cbiJdfQ==