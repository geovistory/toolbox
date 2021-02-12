/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DfhLabelApi, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineEpics } from 'redux-observable-es6-compat';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { SchemaEpicsFactory } from '../_helpers';
export class DfhEpics {
    /**
     * @param {?} actions
     * @param {?} notification
     * @param {?} profileApi
     * @param {?} classApi
     * @param {?} propertyApi
     * @param {?} labelApi
     */
    constructor(actions, notification, profileApi, classApi, propertyApi, labelApi) {
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
    createEpics() {
        /** @type {?} */
        const dfhProfileEpicsFactory = new SchemaEpicsFactory('dfh', 'profile', this.actions.profile, this.notification);
        /** @type {?} */
        const dfhClassEpicsFactory = new SchemaEpicsFactory('dfh', 'klass', this.actions.klass, this.notification);
        /** @type {?} */
        const dfhLabelEpicsFactory = new SchemaEpicsFactory('dfh', 'label', this.actions.label, this.notification);
        /** @type {?} */
        const dfhPropertyEpicsFactory = new SchemaEpicsFactory('dfh', 'property', this.actions.property, this.notification);
        return combineEpics(
        // Profile Loaders
        dfhProfileEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.profileApi.ofProject(meta.pk)), DfhProfileActionFactory.OF_PROJECT), 
        // Property Loaders
        dfhPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.propertyApi.dfhPropertyControllerOfProject(meta.pk)), DfhPropertyActionFactory.OF_PROJECT), 
        // Class Loaders
        dfhClassEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.classApi.dfhClassControllerOfProject(meta.pk)), DfhClassActionFactory.OF_PROJECT), 
        // Label Loaders
        dfhLabelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.labelApi.ofProject(meta.pk)), DfhLabelActionFactory.OF_PROJECT));
    }
}
DfhEpics.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfhEpics.ctorParameters = () => [
    { type: DfhActions },
    { type: NotificationsAPIActions },
    { type: DfhProfileApi },
    { type: DfhClassControllerService },
    { type: DfhPropertyControllerService },
    { type: DfhLabelApi }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGZoLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFjLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pGLE9BQU8sRUFBWSx5QkFBeUIsRUFBZSw0QkFBNEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xJLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXpJLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBa0Isa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJakUsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7OztJQUNuQixZQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLFVBQXlCLEVBQ3pCLFFBQW1DLEVBQ25DLFdBQXlDLEVBQ3pDLFFBQXFCO1FBTHJCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBMkI7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ3pDLGFBQVEsR0FBUixRQUFRLENBQWE7SUFDM0IsQ0FBQzs7OztJQUVFLFdBQVc7O2NBQ1Ysc0JBQXNCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBOEIsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztjQUN2SSxvQkFBb0IsR0FBRyxJQUFJLGtCQUFrQixDQUEwQixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O2NBQzdILG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQTBCLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Y0FDN0gsdUJBQXVCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBZ0MsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRWxKLE9BQU8sWUFBWTtRQUNqQixrQkFBa0I7UUFDbEIsc0JBQXNCLENBQUMsY0FBYzs7OztRQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUNoRyx1QkFBdUIsQ0FBQyxVQUFVLENBQ25DO1FBQ0QsbUJBQW1CO1FBQ25CLHVCQUF1QixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUN2SCx3QkFBd0IsQ0FBQyxVQUFVLENBQ3BDO1FBQ0QsZ0JBQWdCO1FBQ2hCLG9CQUFvQixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUM5RyxxQkFBcUIsQ0FBQyxVQUFVLENBQ2pDO1FBQ0QsZ0JBQWdCO1FBQ2hCLG9CQUFvQixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDNUYscUJBQXFCLENBQUMsVUFBVSxDQUNqQyxDQUNGLENBQUE7SUFFSCxDQUFDOzs7WUFwQ0YsVUFBVTs7OztZQU5GLFVBQVU7WUFFVix1QkFBdUI7WUFMWSxhQUFhO1lBQ3RDLHlCQUF5QjtZQUFlLDRCQUE0QjtZQURwRSxXQUFXOzs7Ozs7O0lBWTFCLDJCQUEyQjs7Ozs7SUFDM0IsZ0NBQTZDOzs7OztJQUM3Qyw4QkFBaUM7Ozs7O0lBQ2pDLDRCQUEyQzs7Ozs7SUFDM0MsK0JBQWlEOzs7OztJQUNqRCw0QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhMYWJlbCwgRGZoTGFiZWxBcGksIERmaFByb2ZpbGUsIERmaFByb2ZpbGVBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGZoQ2xhc3MsIERmaENsYXNzQ29udHJvbGxlclNlcnZpY2UsIERmaFByb3BlcnR5LCBEZmhQcm9wZXJ0eUNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0L3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IERmaEFjdGlvbnMsIERmaENsYXNzQWN0aW9uRmFjdG9yeSwgRGZoTGFiZWxBY3Rpb25GYWN0b3J5LCBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeSwgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBEZmhDbGFzc1NsaWNlLCBEZmhMYWJlbFNsaWNlLCBEZmhQcm9maWxlU2xpY2UsIERmaFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucyc7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSwgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZmhFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogRGZoQWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm9maWxlQXBpOiBEZmhQcm9maWxlQXBpLFxuICAgIHByaXZhdGUgY2xhc3NBcGk6IERmaENsYXNzQ29udHJvbGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwcm9wZXJ0eUFwaTogRGZoUHJvcGVydHlDb250cm9sbGVyU2VydmljZSxcbiAgICBwcml2YXRlIGxhYmVsQXBpOiBEZmhMYWJlbEFwaSxcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgZGZoUHJvZmlsZUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoUHJvZmlsZVNsaWNlLCBEZmhQcm9maWxlPignZGZoJywgJ3Byb2ZpbGUnLCB0aGlzLmFjdGlvbnMucHJvZmlsZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgIGNvbnN0IGRmaENsYXNzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhDbGFzc1NsaWNlLCBEZmhDbGFzcz4oJ2RmaCcsICdrbGFzcycsIHRoaXMuYWN0aW9ucy5rbGFzcywgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgIGNvbnN0IGRmaExhYmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhMYWJlbFNsaWNlLCBEZmhMYWJlbD4oJ2RmaCcsICdsYWJlbCcsIHRoaXMuYWN0aW9ucy5sYWJlbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgIGNvbnN0IGRmaFByb3BlcnR5RXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhQcm9wZXJ0eVNsaWNlLCBEZmhQcm9wZXJ0eT4oJ2RmaCcsICdwcm9wZXJ0eScsIHRoaXMuYWN0aW9ucy5wcm9wZXJ0eSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8vIFByb2ZpbGUgTG9hZGVyc1xuICAgICAgZGZoUHJvZmlsZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvZmlsZUFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBQcm9wZXJ0eSBMb2FkZXJzXG4gICAgICBkZmhQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvcGVydHlBcGkuZGZoUHJvcGVydHlDb250cm9sbGVyT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIENsYXNzIExvYWRlcnNcbiAgICAgIGRmaENsYXNzRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5jbGFzc0FwaS5kZmhDbGFzc0NvbnRyb2xsZXJPZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaENsYXNzQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gTGFiZWwgTG9hZGVyc1xuICAgICAgZGZoTGFiZWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLmxhYmVsQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoTGFiZWxBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgIClcbiAgICApXG5cbiAgfVxuXG5cbn1cbiJdfQ==