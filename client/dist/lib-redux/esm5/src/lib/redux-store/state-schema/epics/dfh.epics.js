/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DfhLabelApi, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineEpics } from 'redux-observable-es6-compat';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { SchemaEpicsFactory } from '../_helpers';
var DfhEpics = /** @class */ (function () {
    function DfhEpics(actions, notification, profileApi, classApi, propertyApi, labelApi) {
        this.actions = actions;
        this.notification = notification;
        this.profileApi = profileApi;
        this.classApi = classApi;
        this.propertyApi = propertyApi;
        this.labelApi = labelApi;
    }
    /**
     * @return {?}
     */
    DfhEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var dfhProfileEpicsFactory = new SchemaEpicsFactory('dfh', 'profile', this.actions.profile, this.notification);
        /** @type {?} */
        var dfhClassEpicsFactory = new SchemaEpicsFactory('dfh', 'klass', this.actions.klass, this.notification);
        /** @type {?} */
        var dfhLabelEpicsFactory = new SchemaEpicsFactory('dfh', 'label', this.actions.label, this.notification);
        /** @type {?} */
        var dfhPropertyEpicsFactory = new SchemaEpicsFactory('dfh', 'property', this.actions.property, this.notification);
        return combineEpics(
        // Profile Loaders
        dfhProfileEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.profileApi.ofProject(meta.pk); }), DfhProfileActionFactory.OF_PROJECT), 
        // Property Loaders
        dfhPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.propertyApi.dfhPropertyControllerOfProject(meta.pk); }), DfhPropertyActionFactory.OF_PROJECT), 
        // Class Loaders
        dfhClassEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classApi.dfhClassControllerOfProject(meta.pk); }), DfhClassActionFactory.OF_PROJECT), 
        // Label Loaders
        dfhLabelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.labelApi.ofProject(meta.pk); }), DfhLabelActionFactory.OF_PROJECT));
    };
    DfhEpics.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DfhEpics.ctorParameters = function () { return [
        { type: DfhActions },
        { type: NotificationsAPIActions },
        { type: DfhProfileApi },
        { type: DfhClassControllerService },
        { type: DfhPropertyControllerService },
        { type: DfhLabelApi }
    ]; };
    return DfhEpics;
}());
export { DfhEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.profileApi;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.classApi;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.propertyApi;
    /**
     * @type {?}
     * @private
     */
    DfhEpics.prototype.labelApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYyxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQVkseUJBQXlCLEVBQWUsNEJBQTRCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsSSxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV6SSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQWtCLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR2pFO0lBRUUsa0JBQ1UsT0FBbUIsRUFDbkIsWUFBcUMsRUFDckMsVUFBeUIsRUFDekIsUUFBbUMsRUFDbkMsV0FBeUMsRUFDekMsUUFBcUI7UUFMckIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUEyQjtRQUNuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtJQUMzQixDQUFDOzs7O0lBRUUsOEJBQVc7OztJQUFsQjtRQUFBLGlCQXlCQzs7WUF4Qk8sc0JBQXNCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBOEIsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztZQUN2SSxvQkFBb0IsR0FBRyxJQUFJLGtCQUFrQixDQUEwQixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O1lBQzdILG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQTBCLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFDN0gsdUJBQXVCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBZ0MsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRWxKLE9BQU8sWUFBWTtRQUNqQixrQkFBa0I7UUFDbEIsc0JBQXNCLENBQUMsY0FBYzs7OztRQUFpQixVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBbEMsQ0FBa0MsR0FDaEcsdUJBQXVCLENBQUMsVUFBVSxDQUNuQztRQUNELG1CQUFtQjtRQUNuQix1QkFBdUIsQ0FBQyxjQUFjOzs7O1FBQWlCLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXhELENBQXdELEdBQ3ZILHdCQUF3QixDQUFDLFVBQVUsQ0FDcEM7UUFDRCxnQkFBZ0I7UUFDaEIsb0JBQW9CLENBQUMsY0FBYzs7OztRQUFpQixVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFsRCxDQUFrRCxHQUM5RyxxQkFBcUIsQ0FBQyxVQUFVLENBQ2pDO1FBQ0QsZ0JBQWdCO1FBQ2hCLG9CQUFvQixDQUFDLGNBQWM7Ozs7UUFBaUIsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQWhDLENBQWdDLEdBQzVGLHFCQUFxQixDQUFDLFVBQVUsQ0FDakMsQ0FDRixDQUFBO0lBRUgsQ0FBQzs7Z0JBcENGLFVBQVU7Ozs7Z0JBTkYsVUFBVTtnQkFFVix1QkFBdUI7Z0JBTFksYUFBYTtnQkFDdEMseUJBQXlCO2dCQUFlLDRCQUE0QjtnQkFEcEUsV0FBVzs7SUFnRDlCLGVBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXRDWSxRQUFROzs7Ozs7SUFFakIsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLDhCQUFpQzs7Ozs7SUFDakMsNEJBQTJDOzs7OztJQUMzQywrQkFBaUQ7Ozs7O0lBQ2pELDRCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaExhYmVsLCBEZmhMYWJlbEFwaSwgRGZoUHJvZmlsZSwgRGZoUHJvZmlsZUFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEZmhDbGFzcywgRGZoQ2xhc3NDb250cm9sbGVyU2VydmljZSwgRGZoUHJvcGVydHksIERmaFByb3BlcnR5Q29udHJvbGxlclNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQvcHVibGljLWFwaSc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucywgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5LCBEZmhMYWJlbEFjdGlvbkZhY3RvcnksIERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5LCBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IERmaENsYXNzU2xpY2UsIERmaExhYmVsU2xpY2UsIERmaFByb2ZpbGVTbGljZSwgRGZoUHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhLCBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmaEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBEZmhBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIHByb2ZpbGVBcGk6IERmaFByb2ZpbGVBcGksXG4gICAgcHJpdmF0ZSBjbGFzc0FwaTogRGZoQ2xhc3NDb250cm9sbGVyU2VydmljZSxcbiAgICBwcml2YXRlIHByb3BlcnR5QXBpOiBEZmhQcm9wZXJ0eUNvbnRyb2xsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbGFiZWxBcGk6IERmaExhYmVsQXBpLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkZmhQcm9maWxlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhQcm9maWxlU2xpY2UsIERmaFByb2ZpbGU+KCdkZmgnLCAncHJvZmlsZScsIHRoaXMuYWN0aW9ucy5wcm9maWxlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoQ2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaENsYXNzU2xpY2UsIERmaENsYXNzPignZGZoJywgJ2tsYXNzJywgdGhpcy5hY3Rpb25zLmtsYXNzLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoTGFiZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaExhYmVsU2xpY2UsIERmaExhYmVsPignZGZoJywgJ2xhYmVsJywgdGhpcy5hY3Rpb25zLmxhYmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoUHJvcGVydHlFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaFByb3BlcnR5U2xpY2UsIERmaFByb3BlcnR5PignZGZoJywgJ3Byb3BlcnR5JywgdGhpcy5hY3Rpb25zLnByb3BlcnR5LCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLy8gUHJvZmlsZSBMb2FkZXJzXG4gICAgICBkZmhQcm9maWxlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9maWxlQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoUHJvZmlsZUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIFByb3BlcnR5IExvYWRlcnNcbiAgICAgIGRmaFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9wZXJ0eUFwaS5kZmhQcm9wZXJ0eUNvbnRyb2xsZXJPZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaFByb3BlcnR5QWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gQ2xhc3MgTG9hZGVyc1xuICAgICAgZGZoQ2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLmNsYXNzQXBpLmRmaENsYXNzQ29udHJvbGxlck9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBMYWJlbCBMb2FkZXJzXG4gICAgICBkZmhMYWJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMubGFiZWxBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhMYWJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKVxuICAgIClcblxuICB9XG5cblxufVxuIl19