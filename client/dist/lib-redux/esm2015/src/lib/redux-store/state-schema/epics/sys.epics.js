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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUEwQix5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBa0IsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBb0Isa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJbkUsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7SUFDbkIsWUFDVSxPQUFtQixFQUNuQixZQUFxQyxFQUNyQyxtQkFBOEMsRUFFOUMsWUFBd0M7UUFKeEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQjtRQUU5QyxpQkFBWSxHQUFaLFlBQVksQ0FBNEI7SUFDOUMsQ0FBQzs7OztJQUVFLFdBQVc7O2NBQ1YsK0JBQStCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7OztjQUtyRixrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFJN0QsT0FBTyxZQUFZO1FBRWpCLDRCQUE0QjtRQUM1QiwrQkFBK0IsQ0FBQyxjQUFjOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsR0FBRSxFQUFFLENBQUMsRUFDL0YsK0JBQStCLENBQUMsZ0JBQWdCOzs7O1FBQTJDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDO1FBRTlKLHFGQUFxRjtRQUVyRixrQkFBa0IsQ0FBQyxjQUFjOzs7UUFDL0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FDaEYsRUFBRSxDQUFDLENBQ04sQ0FBQztJQUNKLENBQUM7OztZQWxDRixVQUFVOzs7O1lBUEYsVUFBVTtZQUVWLHVCQUF1QjtZQU5DLHlCQUF5QjtZQUNqQywwQkFBMEI7Ozs7Ozs7SUFhL0MsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLHVDQUFzRDs7Ozs7SUFFdEQsZ0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcywgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSwgU3lzdGVtQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQvcHVibGljLWFwaSc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnU2xpY2UsIFN5c1JlbGV2YW50Q2xhc3NTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zJztcbmltcG9ydCB7IHN5c1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuaW1wb3J0IHsgTW9kaWZ5QWN0aW9uTWV0YSwgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXNFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzeXNSZWxldmFudENsYXNzQXBpOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpLFxuICAgIC8vIHByaXZhdGUgc3lzQW5hbHlzaXNUeXBlQXBpOiBTeXNBbmFseXNpc1R5cGVBcGksXG4gICAgcHJpdmF0ZSBzeXNDb25maWdBcGk6IFN5c3RlbUNvbmZpZ3VyYXRpb25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IHN5c3RlbVJlbGV2YW50Q2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcz5cbiAgICAgIChzeXNSb290LCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJywgdGhpcy5hY3Rpb25zLnN5c3RlbV9yZWxldmFudF9jbGFzcywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgLy8gY29uc3QgYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5ID0gbmV3IFN0YW5kYXJkRXBpY3NGYWN0b3J5PFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgU3lzQW5hbHlzaXNUeXBlPlxuICAgIC8vICAgKHN5c1Jvb3QsICdhbmFseXNpc190eXBlJywgdGhpcy5hY3Rpb25zLmFuYWx5c2lzX3R5cGUsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbmZpZ0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8U3lzQ29uZmlnU2xpY2UsIFN5c0NvbmZpZ1ZhbHVlPlxuICAgICAgKHN5c1Jvb3QsICdjb25maWcnLCB0aGlzLmFjdGlvbnMuY29uZmlnLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcblxuICAgICAgLy8gU3lzdGVtUmVsZXZhbnRDbGFzcyBFcGljc1xuICAgICAgc3lzdGVtUmVsZXZhbnRDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYygoYWN0aW9uKSA9PiB0aGlzLnN5c1JlbGV2YW50Q2xhc3NBcGkuZmluZCgpLCAnJyksXG4gICAgICBzeXN0ZW1SZWxldmFudENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oKG1ldGEpID0+IHRoaXMuc3lzUmVsZXZhbnRDbGFzc0FwaS5idWxrUmVwbGFjZU9yQ3JlYXRlKG1ldGEuaXRlbXMpKSxcblxuICAgICAgLy8gYW5hbHlzaXNUeXBlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljKCgpID0+IHRoaXMuc3lzQW5hbHlzaXNUeXBlQXBpLmZpbmQoKSwgJycpLFxuXG4gICAgICBjb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWMoXG4gICAgICAgICgpID0+IHRoaXMuc3lzQ29uZmlnQXBpLnN5c0NvbmZpZ0NvbnRyb2xsZXJHZXRTeXN0ZW1Db25maWcoKS5waXBlKG1hcCh4ID0+IFt4XSkpLFxuICAgICAgICAnJylcbiAgICApO1xuICB9XG5cblxufVxuIl19