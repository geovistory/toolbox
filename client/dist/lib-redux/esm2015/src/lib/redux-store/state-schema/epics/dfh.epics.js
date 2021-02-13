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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYyxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQVkseUJBQXlCLEVBQWUsNEJBQTRCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2SCxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJKLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBRXhGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBSXRFLE1BQU0sT0FBTyxRQUFROzs7Ozs7Ozs7SUFDbkIsWUFDVSxPQUFtQixFQUNuQixZQUFxQyxFQUNyQyxVQUF5QixFQUN6QixRQUFtQyxFQUNuQyxXQUF5QyxFQUN6QyxRQUFxQjtRQUxyQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQTJCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQzNCLENBQUM7Ozs7SUFFRSxXQUFXOztjQUNWLHNCQUFzQixHQUFHLElBQUksa0JBQWtCLENBQThCLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Y0FDdkksb0JBQW9CLEdBQUcsSUFBSSxrQkFBa0IsQ0FBMEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztjQUM3SCxvQkFBb0IsR0FBRyxJQUFJLGtCQUFrQixDQUEwQixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O2NBQzdILHVCQUF1QixHQUFHLElBQUksa0JBQWtCLENBQWdDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUVsSixPQUFPLFlBQVk7UUFDakIsa0JBQWtCO1FBQ2xCLHNCQUFzQixDQUFDLGNBQWM7Ozs7UUFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDaEcsdUJBQXVCLENBQUMsVUFBVSxDQUNuQztRQUNELG1CQUFtQjtRQUNuQix1QkFBdUIsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDdkgsd0JBQXdCLENBQUMsVUFBVSxDQUNwQztRQUNELGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FDOUcscUJBQXFCLENBQUMsVUFBVSxDQUNqQztRQUNELGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxjQUFjOzs7O1FBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQzVGLHFCQUFxQixDQUFDLFVBQVUsQ0FDakMsQ0FDRixDQUFBO0lBRUgsQ0FBQzs7O1lBcENGLFVBQVU7Ozs7WUFQRixVQUFVO1lBRVYsdUJBQXVCO1lBTFksYUFBYTtZQUN0Qyx5QkFBeUI7WUFBZSw0QkFBNEI7WUFEcEUsV0FBVzs7Ozs7OztJQWExQiwyQkFBMkI7Ozs7O0lBQzNCLGdDQUE2Qzs7Ozs7SUFDN0MsOEJBQWlDOzs7OztJQUNqQyw0QkFBMkM7Ozs7O0lBQzNDLCtCQUFpRDs7Ozs7SUFDakQsNEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoTGFiZWwsIERmaExhYmVsQXBpLCBEZmhQcm9maWxlLCBEZmhQcm9maWxlQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaENsYXNzLCBEZmhDbGFzc0NvbnRyb2xsZXJTZXJ2aWNlLCBEZmhQcm9wZXJ0eSwgRGZoUHJvcGVydHlDb250cm9sbGVyU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucywgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5LCBEZmhMYWJlbEFjdGlvbkZhY3RvcnksIERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5LCBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IERmaENsYXNzU2xpY2UsIERmaExhYmVsU2xpY2UsIERmaFByb2ZpbGVTbGljZSwgRGZoUHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9kZmgubW9kZWxzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmaEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBEZmhBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIHByb2ZpbGVBcGk6IERmaFByb2ZpbGVBcGksXG4gICAgcHJpdmF0ZSBjbGFzc0FwaTogRGZoQ2xhc3NDb250cm9sbGVyU2VydmljZSxcbiAgICBwcml2YXRlIHByb3BlcnR5QXBpOiBEZmhQcm9wZXJ0eUNvbnRyb2xsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbGFiZWxBcGk6IERmaExhYmVsQXBpLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkZmhQcm9maWxlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEZmhQcm9maWxlU2xpY2UsIERmaFByb2ZpbGU+KCdkZmgnLCAncHJvZmlsZScsIHRoaXMuYWN0aW9ucy5wcm9maWxlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoQ2xhc3NFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaENsYXNzU2xpY2UsIERmaENsYXNzPignZGZoJywgJ2tsYXNzJywgdGhpcy5hY3Rpb25zLmtsYXNzLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoTGFiZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaExhYmVsU2xpY2UsIERmaExhYmVsPignZGZoJywgJ2xhYmVsJywgdGhpcy5hY3Rpb25zLmxhYmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgZGZoUHJvcGVydHlFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaFByb3BlcnR5U2xpY2UsIERmaFByb3BlcnR5PignZGZoJywgJ3Byb3BlcnR5JywgdGhpcy5hY3Rpb25zLnByb3BlcnR5LCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLy8gUHJvZmlsZSBMb2FkZXJzXG4gICAgICBkZmhQcm9maWxlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9maWxlQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoUHJvZmlsZUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIFByb3BlcnR5IExvYWRlcnNcbiAgICAgIGRmaFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9wZXJ0eUFwaS5kZmhQcm9wZXJ0eUNvbnRyb2xsZXJPZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaFByb3BlcnR5QWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gQ2xhc3MgTG9hZGVyc1xuICAgICAgZGZoQ2xhc3NFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLmNsYXNzQXBpLmRmaENsYXNzQ29udHJvbGxlck9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBMYWJlbCBMb2FkZXJzXG4gICAgICBkZmhMYWJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMubGFiZWxBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhMYWJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKVxuICAgIClcblxuICB9XG5cblxufVxuIl19