/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dfh.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DfhLabelApi, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DfhActions, DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from '../actions/dfh.actions';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import * as i0 from "@angular/core";
import * as i1 from "../actions/dfh.actions";
import * as i2 from "../../state-gui/actions/notifications.actions";
import * as i3 from "@kleiolab/lib-sdk-lb3";
import * as i4 from "@kleiolab/lib-sdk-lb4";
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
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
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
/** @nocollapse */ DfhEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DfhEpics_Factory() { return new DfhEpics(i0.ɵɵinject(i1.DfhActions), i0.ɵɵinject(i2.NotificationsAPIActions), i0.ɵɵinject(i3.DfhProfileApi), i0.ɵɵinject(i4.DfhClassControllerService), i0.ɵɵinject(i4.DfhPropertyControllerService), i0.ɵɵinject(i3.DfhLabelApi)); }, token: DfhEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGZoLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFjLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pGLE9BQU8sRUFBWSx5QkFBeUIsRUFBZSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHckosT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7OztBQU10RSxNQUFNLE9BQU8sUUFBUTs7Ozs7Ozs7O0lBQ25CLFlBQ1UsT0FBbUIsRUFDbkIsWUFBcUMsRUFDckMsVUFBeUIsRUFDekIsUUFBbUMsRUFDbkMsV0FBeUMsRUFDekMsUUFBcUI7UUFMckIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUEyQjtRQUNuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtJQUMzQixDQUFDOzs7O0lBRUUsV0FBVzs7Y0FDVixzQkFBc0IsR0FBRyxJQUFJLGtCQUFrQixDQUE4QixLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O2NBQ3ZJLG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQTBCLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Y0FDN0gsb0JBQW9CLEdBQUcsSUFBSSxrQkFBa0IsQ0FBMEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztjQUM3SCx1QkFBdUIsR0FBRyxJQUFJLGtCQUFrQixDQUFnQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFbEosT0FBTyxZQUFZO1FBQ2pCLGtCQUFrQjtRQUNsQixzQkFBc0IsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQ2hHLHVCQUF1QixDQUFDLFVBQVUsQ0FDbkM7UUFDRCxtQkFBbUI7UUFDbkIsdUJBQXVCLENBQUMsY0FBYzs7OztRQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQ3ZILHdCQUF3QixDQUFDLFVBQVUsQ0FDcEM7UUFDRCxnQkFBZ0I7UUFDaEIsb0JBQW9CLENBQUMsY0FBYzs7OztRQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQzlHLHFCQUFxQixDQUFDLFVBQVUsQ0FDakM7UUFDRCxnQkFBZ0I7UUFDaEIsb0JBQW9CLENBQUMsY0FBYzs7OztRQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUM1RixxQkFBcUIsQ0FBQyxVQUFVLENBQ2pDLENBQ0YsQ0FBQTtJQUVILENBQUM7OztZQXRDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFSUSxVQUFVO1lBRFYsdUJBQXVCO1lBSFksYUFBYTtZQUN0Qyx5QkFBeUI7WUFBZSw0QkFBNEI7WUFEcEUsV0FBVzs7Ozs7Ozs7SUFlMUIsMkJBQTJCOzs7OztJQUMzQixnQ0FBNkM7Ozs7O0lBQzdDLDhCQUFpQzs7Ozs7SUFDakMsNEJBQTJDOzs7OztJQUMzQywrQkFBaUQ7Ozs7O0lBQ2pELDRCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaExhYmVsLCBEZmhMYWJlbEFwaSwgRGZoUHJvZmlsZSwgRGZoUHJvZmlsZUFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEZmhDbGFzcywgRGZoQ2xhc3NDb250cm9sbGVyU2VydmljZSwgRGZoUHJvcGVydHksIERmaFByb3BlcnR5Q29udHJvbGxlclNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERmaEFjdGlvbnMsIERmaENsYXNzQWN0aW9uRmFjdG9yeSwgRGZoTGFiZWxBY3Rpb25GYWN0b3J5LCBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeSwgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi4vYWN0aW9ucy9kZmguYWN0aW9ucyc7XG5pbXBvcnQgeyBEZmhDbGFzc1NsaWNlLCBEZmhMYWJlbFNsaWNlLCBEZmhQcm9maWxlU2xpY2UsIERmaFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGZoLm1vZGVscyc7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERmaEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBEZmhBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIHByb2ZpbGVBcGk6IERmaFByb2ZpbGVBcGksXG4gICAgcHJpdmF0ZSBjbGFzc0FwaTogRGZoQ2xhc3NDb250cm9sbGVyU2VydmljZSxcbiAgICBwcml2YXRlIHByb3BlcnR5QXBpOiBEZmhQcm9wZXJ0eUNvbnRyb2xsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbGFiZWxBcGk6IERmaExhYmVsQXBpLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkZmhQcm9maWxlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhQcm9maWxlU2xpY2UsIERmaFByb2ZpbGU+KCdkZmgnLCAncHJvZmlsZScsIHRoaXMuYWN0aW9ucy5wcm9maWxlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoQ2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaENsYXNzU2xpY2UsIERmaENsYXNzPignZGZoJywgJ2tsYXNzJywgdGhpcy5hY3Rpb25zLmtsYXNzLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoTGFiZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaExhYmVsU2xpY2UsIERmaExhYmVsPignZGZoJywgJ2xhYmVsJywgdGhpcy5hY3Rpb25zLmxhYmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoUHJvcGVydHlFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaFByb3BlcnR5U2xpY2UsIERmaFByb3BlcnR5PignZGZoJywgJ3Byb3BlcnR5JywgdGhpcy5hY3Rpb25zLnByb3BlcnR5LCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLy8gUHJvZmlsZSBMb2FkZXJzXG4gICAgICBkZmhQcm9maWxlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9maWxlQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoUHJvZmlsZUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIFByb3BlcnR5IExvYWRlcnNcbiAgICAgIGRmaFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9wZXJ0eUFwaS5kZmhQcm9wZXJ0eUNvbnRyb2xsZXJPZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaFByb3BlcnR5QWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gQ2xhc3MgTG9hZGVyc1xuICAgICAgZGZoQ2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLmNsYXNzQXBpLmRmaENsYXNzQ29udHJvbGxlck9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBMYWJlbCBMb2FkZXJzXG4gICAgICBkZmhMYWJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMubGFiZWxBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhMYWJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKVxuICAgIClcblxuICB9XG5cblxufVxuIl19