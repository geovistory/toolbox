/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/dfh.epics.ts
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
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
    /** @nocollapse */ DfhEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DfhEpics_Factory() { return new DfhEpics(i0.ɵɵinject(i1.DfhActions), i0.ɵɵinject(i2.NotificationsAPIActions), i0.ɵɵinject(i3.DfhProfileApi), i0.ɵɵinject(i4.DfhClassControllerService), i0.ɵɵinject(i4.DfhPropertyControllerService), i0.ɵɵinject(i3.DfhLabelApi)); }, token: DfhEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYyxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQVkseUJBQXlCLEVBQWUsNEJBQTRCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2SCxPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JKLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7QUFHdEU7SUFJRSxrQkFDVSxPQUFtQixFQUNuQixZQUFxQyxFQUNyQyxVQUF5QixFQUN6QixRQUFtQyxFQUNuQyxXQUF5QyxFQUN6QyxRQUFxQjtRQUxyQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQTJCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQzNCLENBQUM7Ozs7SUFFRSw4QkFBVzs7O0lBQWxCO1FBQUEsaUJBeUJDOztZQXhCTyxzQkFBc0IsR0FBRyxJQUFJLGtCQUFrQixDQUE4QixLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O1lBQ3ZJLG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQTBCLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFDN0gsb0JBQW9CLEdBQUcsSUFBSSxrQkFBa0IsQ0FBMEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztZQUM3SCx1QkFBdUIsR0FBRyxJQUFJLGtCQUFrQixDQUFnQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFbEosT0FBTyxZQUFZO1FBQ2pCLGtCQUFrQjtRQUNsQixzQkFBc0IsQ0FBQyxjQUFjOzs7O1FBQWlCLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFsQyxDQUFrQyxHQUNoRyx1QkFBdUIsQ0FBQyxVQUFVLENBQ25DO1FBQ0QsbUJBQW1CO1FBQ25CLHVCQUF1QixDQUFDLGNBQWM7Ozs7UUFBaUIsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBeEQsQ0FBd0QsR0FDdkgsd0JBQXdCLENBQUMsVUFBVSxDQUNwQztRQUNELGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxjQUFjOzs7O1FBQWlCLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQWxELENBQWtELEdBQzlHLHFCQUFxQixDQUFDLFVBQVUsQ0FDakM7UUFDRCxnQkFBZ0I7UUFDaEIsb0JBQW9CLENBQUMsY0FBYzs7OztRQUFpQixVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBaEMsQ0FBZ0MsR0FDNUYscUJBQXFCLENBQUMsVUFBVSxDQUNqQyxDQUNGLENBQUE7SUFFSCxDQUFDOztnQkF0Q0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFSUSxVQUFVO2dCQURWLHVCQUF1QjtnQkFIWSxhQUFhO2dCQUN0Qyx5QkFBeUI7Z0JBQWUsNEJBQTRCO2dCQURwRSxXQUFXOzs7bUJBRDlCO0NBb0RDLEFBekNELElBeUNDO1NBdENZLFFBQVE7Ozs7OztJQUVqQiwyQkFBMkI7Ozs7O0lBQzNCLGdDQUE2Qzs7Ozs7SUFDN0MsOEJBQWlDOzs7OztJQUNqQyw0QkFBMkM7Ozs7O0lBQzNDLCtCQUFpRDs7Ozs7SUFDakQsNEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoTGFiZWwsIERmaExhYmVsQXBpLCBEZmhQcm9maWxlLCBEZmhQcm9maWxlQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaENsYXNzLCBEZmhDbGFzc0NvbnRyb2xsZXJTZXJ2aWNlLCBEZmhQcm9wZXJ0eSwgRGZoUHJvcGVydHlDb250cm9sbGVyU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucywgRGZoQ2xhc3NBY3Rpb25GYWN0b3J5LCBEZmhMYWJlbEFjdGlvbkZhY3RvcnksIERmaFByb2ZpbGVBY3Rpb25GYWN0b3J5LCBEZmhQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IERmaENsYXNzU2xpY2UsIERmaExhYmVsU2xpY2UsIERmaFByb2ZpbGVTbGljZSwgRGZoUHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9kZmgubW9kZWxzJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGZoRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IERmaEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvZmlsZUFwaTogRGZoUHJvZmlsZUFwaSxcbiAgICBwcml2YXRlIGNsYXNzQXBpOiBEZmhDbGFzc0NvbnRyb2xsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcHJvcGVydHlBcGk6IERmaFByb3BlcnR5Q29udHJvbGxlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYWJlbEFwaTogRGZoTGFiZWxBcGksXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IGRmaFByb2ZpbGVFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERmaFByb2ZpbGVTbGljZSwgRGZoUHJvZmlsZT4oJ2RmaCcsICdwcm9maWxlJywgdGhpcy5hY3Rpb25zLnByb2ZpbGUsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhDbGFzc0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoQ2xhc3NTbGljZSwgRGZoQ2xhc3M+KCdkZmgnLCAna2xhc3MnLCB0aGlzLmFjdGlvbnMua2xhc3MsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhMYWJlbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoTGFiZWxTbGljZSwgRGZoTGFiZWw+KCdkZmgnLCAnbGFiZWwnLCB0aGlzLmFjdGlvbnMubGFiZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBkZmhQcm9wZXJ0eUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGZoUHJvcGVydHlTbGljZSwgRGZoUHJvcGVydHk+KCdkZmgnLCAncHJvcGVydHknLCB0aGlzLmFjdGlvbnMucHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvLyBQcm9maWxlIExvYWRlcnNcbiAgICAgIGRmaFByb2ZpbGVFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb2ZpbGVBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhQcm9maWxlQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApLFxuICAgICAgLy8gUHJvcGVydHkgTG9hZGVyc1xuICAgICAgZGZoUHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb3BlcnR5QXBpLmRmaFByb3BlcnR5Q29udHJvbGxlck9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgRGZoUHJvcGVydHlBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1RcbiAgICAgICksXG4gICAgICAvLyBDbGFzcyBMb2FkZXJzXG4gICAgICBkZmhDbGFzc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMuY2xhc3NBcGkuZGZoQ2xhc3NDb250cm9sbGVyT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBEZmhDbGFzc0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVFxuICAgICAgKSxcbiAgICAgIC8vIExhYmVsIExvYWRlcnNcbiAgICAgIGRmaExhYmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5sYWJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIERmaExhYmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNUXG4gICAgICApXG4gICAgKVxuXG4gIH1cblxuXG59XG4iXX0=