/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DfhLabelApi, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics } from 'redux-observable-es6-compat';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from '../actions/dfh.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGZoLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFjLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pGLE9BQU8sRUFBWSx5QkFBeUIsRUFBZSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckosT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFFeEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJdEUsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7OztJQUNuQixZQUNVLE9BQW1CLEVBQ25CLFlBQXFDLEVBQ3JDLFVBQXlCLEVBQ3pCLFFBQW1DLEVBQ25DLFdBQXlDLEVBQ3pDLFFBQXFCO1FBTHJCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBMkI7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ3pDLGFBQVEsR0FBUixRQUFRLENBQWE7SUFDM0IsQ0FBQzs7OztJQUVFLFdBQVc7O2NBQ1Ysc0JBQXNCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBOEIsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztjQUN2SSxvQkFBb0IsR0FBRyxJQUFJLGtCQUFrQixDQUEwQixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O2NBQzdILG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQTBCLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Y0FDN0gsdUJBQXVCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBZ0MsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRWxKLE9BQU8sWUFBWTtRQUNqQixrQkFBa0I7UUFDbEIsc0JBQXNCLENBQUMsY0FBYzs7OztRQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUNoRyx1QkFBdUIsQ0FBQyxVQUFVLENBQ25DO1FBQ0QsbUJBQW1CO1FBQ25CLHVCQUF1QixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUN2SCx3QkFBd0IsQ0FBQyxVQUFVLENBQ3BDO1FBQ0QsZ0JBQWdCO1FBQ2hCLG9CQUFvQixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUM5RyxxQkFBcUIsQ0FBQyxVQUFVLENBQ2pDO1FBQ0QsZ0JBQWdCO1FBQ2hCLG9CQUFvQixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDNUYscUJBQXFCLENBQUMsVUFBVSxDQUNqQyxDQUNGLENBQUE7SUFFSCxDQUFDOzs7WUFwQ0YsVUFBVTs7OztZQVBGLFVBQVU7WUFFVix1QkFBdUI7WUFMWSxhQUFhO1lBQ3RDLHlCQUF5QjtZQUFlLDRCQUE0QjtZQURwRSxXQUFXOzs7Ozs7O0lBYTFCLDJCQUEyQjs7Ozs7SUFDM0IsZ0NBQTZDOzs7OztJQUM3Qyw4QkFBaUM7Ozs7O0lBQ2pDLDRCQUEyQzs7Ozs7SUFDM0MsK0JBQWlEOzs7OztJQUNqRCw0QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhMYWJlbCwgRGZoTGFiZWxBcGksIERmaFByb2ZpbGUsIERmaFByb2ZpbGVBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGZoQ2xhc3MsIERmaENsYXNzQ29udHJvbGxlclNlcnZpY2UsIERmaFByb3BlcnR5LCBEZmhQcm9wZXJ0eUNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBEZmhBY3Rpb25zLCBEZmhDbGFzc0FjdGlvbkZhY3RvcnksIERmaExhYmVsQWN0aW9uRmFjdG9yeSwgRGZoUHJvZmlsZUFjdGlvbkZhY3RvcnksIERmaFByb3BlcnR5QWN0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2FjdGlvbnMvZGZoLmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQ2xhc3NTbGljZSwgRGZoTGFiZWxTbGljZSwgRGZoUHJvZmlsZVNsaWNlLCBEZmhQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2RmaC5tb2RlbHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgTG9hZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1lcGljcy1mYWN0b3J5JztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZoRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IERmaEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvZmlsZUFwaTogRGZoUHJvZmlsZUFwaSxcbiAgICBwcml2YXRlIGNsYXNzQXBpOiBEZmhDbGFzc0NvbnRyb2xsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcHJvcGVydHlBcGk6IERmaFByb3BlcnR5Q29udHJvbGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYWJlbEFwaTogRGZoTGFiZWxBcGksXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IGRmaFByb2ZpbGVFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaFByb2ZpbGVTbGljZSwgRGZoUHJvZmlsZT4oJ2RmaCcsICdwcm9maWxlJywgdGhpcy5hY3Rpb25zLnByb2ZpbGUsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhDbGFzc0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoQ2xhc3NTbGljZSwgRGZoQ2xhc3M+KCdkZmgnLCAna2xhc3MnLCB0aGlzLmFjdGlvbnMua2xhc3MsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhMYWJlbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoTGFiZWxTbGljZSwgRGZoTGFiZWw+KCdkZmgnLCAnbGFiZWwnLCB0aGlzLmFjdGlvbnMubGFiZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhQcm9wZXJ0eUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoUHJvcGVydHlTbGljZSwgRGZoUHJvcGVydHk+KCdkZmgnLCAncHJvcGVydHknLCB0aGlzLmFjdGlvbnMucHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvLyBQcm9maWxlIExvYWRlcnNcbiAgICAgIGRmaFByb2ZpbGVFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb2ZpbGVBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gUHJvcGVydHkgTG9hZGVyc1xuICAgICAgZGZoUHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb3BlcnR5QXBpLmRmaFByb3BlcnR5Q29udHJvbGxlck9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBDbGFzcyBMb2FkZXJzXG4gICAgICBkZmhDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMuY2xhc3NBcGkuZGZoQ2xhc3NDb250cm9sbGVyT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhDbGFzc0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIExhYmVsIExvYWRlcnNcbiAgICAgIGRmaExhYmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5sYWJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaExhYmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApXG4gICAgKVxuXG4gIH1cblxuXG59XG4iXX0=