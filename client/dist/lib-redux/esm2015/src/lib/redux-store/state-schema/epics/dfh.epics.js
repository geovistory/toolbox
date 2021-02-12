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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYyxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQVkseUJBQXlCLEVBQWUsNEJBQTRCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsSSxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV6SSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQWtCLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWpFLE1BQU0sT0FBTyxRQUFROzs7Ozs7Ozs7SUFDbkIsWUFDVSxPQUFtQixFQUNuQixZQUFxQyxFQUNyQyxVQUF5QixFQUN6QixRQUFtQyxFQUNuQyxXQUF5QyxFQUN6QyxRQUFxQjtRQUxyQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQTJCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQzNCLENBQUM7Ozs7SUFFRSxXQUFXOztjQUNWLHNCQUFzQixHQUFHLElBQUksa0JBQWtCLENBQThCLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Y0FDdkksb0JBQW9CLEdBQUcsSUFBSSxrQkFBa0IsQ0FBMEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztjQUM3SCxvQkFBb0IsR0FBRyxJQUFJLGtCQUFrQixDQUEwQixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O2NBQzdILHVCQUF1QixHQUFHLElBQUksa0JBQWtCLENBQWdDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUVsSixPQUFPLFlBQVk7UUFDakIsa0JBQWtCO1FBQ2xCLHNCQUFzQixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDaEcsdUJBQXVCLENBQUMsVUFBVSxDQUNuQztRQUNELG1CQUFtQjtRQUNuQix1QkFBdUIsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDdkgsd0JBQXdCLENBQUMsVUFBVSxDQUNwQztRQUNELGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDOUcscUJBQXFCLENBQUMsVUFBVSxDQUNqQztRQUNELGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQzVGLHFCQUFxQixDQUFDLFVBQVUsQ0FDakMsQ0FDRixDQUFBO0lBRUgsQ0FBQzs7O1lBcENGLFVBQVU7Ozs7WUFORixVQUFVO1lBRVYsdUJBQXVCO1lBTFksYUFBYTtZQUN0Qyx5QkFBeUI7WUFBZSw0QkFBNEI7WUFEcEUsV0FBVzs7Ozs7OztJQVkxQiwyQkFBMkI7Ozs7O0lBQzNCLGdDQUE2Qzs7Ozs7SUFDN0MsOEJBQWlDOzs7OztJQUNqQyw0QkFBMkM7Ozs7O0lBQzNDLCtCQUFpRDs7Ozs7SUFDakQsNEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoTGFiZWwsIERmaExhYmVsQXBpLCBEZmhQcm9maWxlLCBEZmhQcm9maWxlQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaENsYXNzLCBEZmhDbGFzc0NvbnRyb2xsZXJTZXJ2aWNlLCBEZmhQcm9wZXJ0eSwgRGZoUHJvcGVydHlDb250cm9sbGVyU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNC9wdWJsaWMtYXBpJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBEZmhBY3Rpb25zLCBEZmhDbGFzc0FjdGlvbkZhY3RvcnksIERmaExhYmVsQWN0aW9uRmFjdG9yeSwgRGZoUHJvZmlsZUFjdGlvbkZhY3RvcnksIERmaFByb3BlcnR5QWN0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQ2xhc3NTbGljZSwgRGZoTGFiZWxTbGljZSwgRGZoUHJvZmlsZVNsaWNlLCBEZmhQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgTG9hZEFjdGlvbk1ldGEsIFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZoRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IERmaEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvZmlsZUFwaTogRGZoUHJvZmlsZUFwaSxcbiAgICBwcml2YXRlIGNsYXNzQXBpOiBEZmhDbGFzc0NvbnRyb2xsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcHJvcGVydHlBcGk6IERmaFByb3BlcnR5Q29udHJvbGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYWJlbEFwaTogRGZoTGFiZWxBcGksXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IGRmaFByb2ZpbGVFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaFByb2ZpbGVTbGljZSwgRGZoUHJvZmlsZT4oJ2RmaCcsICdwcm9maWxlJywgdGhpcy5hY3Rpb25zLnByb2ZpbGUsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhDbGFzc0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoQ2xhc3NTbGljZSwgRGZoQ2xhc3M+KCdkZmgnLCAna2xhc3MnLCB0aGlzLmFjdGlvbnMua2xhc3MsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhMYWJlbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoTGFiZWxTbGljZSwgRGZoTGFiZWw+KCdkZmgnLCAnbGFiZWwnLCB0aGlzLmFjdGlvbnMubGFiZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhQcm9wZXJ0eUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoUHJvcGVydHlTbGljZSwgRGZoUHJvcGVydHk+KCdkZmgnLCAncHJvcGVydHknLCB0aGlzLmFjdGlvbnMucHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvLyBQcm9maWxlIExvYWRlcnNcbiAgICAgIGRmaFByb2ZpbGVFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb2ZpbGVBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gUHJvcGVydHkgTG9hZGVyc1xuICAgICAgZGZoUHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb3BlcnR5QXBpLmRmaFByb3BlcnR5Q29udHJvbGxlck9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBDbGFzcyBMb2FkZXJzXG4gICAgICBkZmhDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMuY2xhc3NBcGkuZGZoQ2xhc3NDb250cm9sbGVyT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhDbGFzc0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIExhYmVsIExvYWRlcnNcbiAgICAgIGRmaExhYmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5sYWJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaExhYmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApXG4gICAgKVxuXG4gIH1cblxuXG59XG4iXX0=