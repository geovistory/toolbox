/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DfhLabelApi, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics } from 'redux-observable-es6-compat';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from '../actions/dfh.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYyxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQVkseUJBQXlCLEVBQWUsNEJBQTRCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2SCxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJKLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBRXhGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3RFO0lBRUUsa0JBQ1UsT0FBbUIsRUFDbkIsWUFBcUMsRUFDckMsVUFBeUIsRUFDekIsUUFBbUMsRUFDbkMsV0FBeUMsRUFDekMsUUFBcUI7UUFMckIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUEyQjtRQUNuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtJQUMzQixDQUFDOzs7O0lBRUUsOEJBQVc7OztJQUFsQjtRQUFBLGlCQXlCQzs7WUF4Qk8sc0JBQXNCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBOEIsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztZQUN2SSxvQkFBb0IsR0FBRyxJQUFJLGtCQUFrQixDQUEwQixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O1lBQzdILG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQTBCLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFDN0gsdUJBQXVCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBZ0MsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRWxKLE9BQU8sWUFBWTtRQUNqQixrQkFBa0I7UUFDbEIsc0JBQXNCLENBQUMsY0FBYzs7OztRQUFpQixVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBbEMsQ0FBa0MsR0FDaEcsdUJBQXVCLENBQUMsVUFBVSxDQUNuQztRQUNELG1CQUFtQjtRQUNuQix1QkFBdUIsQ0FBQyxjQUFjOzs7O1FBQWlCLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXhELENBQXdELEdBQ3ZILHdCQUF3QixDQUFDLFVBQVUsQ0FDcEM7UUFDRCxnQkFBZ0I7UUFDaEIsb0JBQW9CLENBQUMsY0FBYzs7OztRQUFpQixVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFsRCxDQUFrRCxHQUM5RyxxQkFBcUIsQ0FBQyxVQUFVLENBQ2pDO1FBQ0QsZ0JBQWdCO1FBQ2hCLG9CQUFvQixDQUFDLGNBQWM7Ozs7UUFBaUIsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQWhDLENBQWdDLEdBQzVGLHFCQUFxQixDQUFDLFVBQVUsQ0FDakMsQ0FDRixDQUFBO0lBRUgsQ0FBQzs7Z0JBcENGLFVBQVU7Ozs7Z0JBUEYsVUFBVTtnQkFFVix1QkFBdUI7Z0JBTFksYUFBYTtnQkFDdEMseUJBQXlCO2dCQUFlLDRCQUE0QjtnQkFEcEUsV0FBVzs7SUFpRDlCLGVBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXRDWSxRQUFROzs7Ozs7SUFFakIsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLDhCQUFpQzs7Ozs7SUFDakMsNEJBQTJDOzs7OztJQUMzQywrQkFBaUQ7Ozs7O0lBQ2pELDRCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaExhYmVsLCBEZmhMYWJlbEFwaSwgRGZoUHJvZmlsZSwgRGZoUHJvZmlsZUFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEZmhDbGFzcywgRGZoQ2xhc3NDb250cm9sbGVyU2VydmljZSwgRGZoUHJvcGVydHksIERmaFByb3BlcnR5Q29udHJvbGxlclNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IERmaEFjdGlvbnMsIERmaENsYXNzQWN0aW9uRmFjdG9yeSwgRGZoTGFiZWxBY3Rpb25GYWN0b3J5LCBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeSwgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi4vYWN0aW9ucy9kZmguYWN0aW9ucyc7XG5pbXBvcnQgeyBEZmhDbGFzc1NsaWNlLCBEZmhMYWJlbFNsaWNlLCBEZmhQcm9maWxlU2xpY2UsIERmaFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGZoLm1vZGVscyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZmhFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogRGZoQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm9maWxlQXBpOiBEZmhQcm9maWxlQXBpLFxuICAgIHByaXZhdGUgY2xhc3NBcGk6IERmaENsYXNzQ29udHJvbGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwcm9wZXJ0eUFwaTogRGZoUHJvcGVydHlDb250cm9sbGVyU2VydmljZSxcbiAgICBwcml2YXRlIGxhYmVsQXBpOiBEZmhMYWJlbEFwaSxcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgZGZoUHJvZmlsZUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoUHJvZmlsZVNsaWNlLCBEZmhQcm9maWxlPignZGZoJywgJ3Byb2ZpbGUnLCB0aGlzLmFjdGlvbnMucHJvZmlsZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgIGNvbnN0IGRmaENsYXNzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhDbGFzc1NsaWNlLCBEZmhDbGFzcz4oJ2RmaCcsICdrbGFzcycsIHRoaXMuYWN0aW9ucy5rbGFzcywgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgIGNvbnN0IGRmaExhYmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhMYWJlbFNsaWNlLCBEZmhMYWJlbD4oJ2RmaCcsICdsYWJlbCcsIHRoaXMuYWN0aW9ucy5sYWJlbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgIGNvbnN0IGRmaFByb3BlcnR5RXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhQcm9wZXJ0eVNsaWNlLCBEZmhQcm9wZXJ0eT4oJ2RmaCcsICdwcm9wZXJ0eScsIHRoaXMuYWN0aW9ucy5wcm9wZXJ0eSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8vIFByb2ZpbGUgTG9hZGVyc1xuICAgICAgZGZoUHJvZmlsZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvZmlsZUFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBQcm9wZXJ0eSBMb2FkZXJzXG4gICAgICBkZmhQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvcGVydHlBcGkuZGZoUHJvcGVydHlDb250cm9sbGVyT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIENsYXNzIExvYWRlcnNcbiAgICAgIGRmaENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5jbGFzc0FwaS5kZmhDbGFzc0NvbnRyb2xsZXJPZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaENsYXNzQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gTGFiZWwgTG9hZGVyc1xuICAgICAgZGZoTGFiZWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLmxhYmVsQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoTGFiZWxBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgIClcbiAgICApXG5cbiAgfVxuXG5cbn1cbiJdfQ==