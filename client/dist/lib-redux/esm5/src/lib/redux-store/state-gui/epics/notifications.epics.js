/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/notifications.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ToastyConfig, ToastyService } from '@cime/ngx-toasty';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import * as i0 from "@angular/core";
import * as i1 from "@cime/ngx-toasty/src/toasty.service";
var NotificationsAPIEpics = /** @class */ (function () {
    function NotificationsAPIEpics(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
    }
    /**
     * @return {?}
     */
    NotificationsAPIEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.createAddToastEpic());
    };
    /**
     * @private
     * @return {?}
     */
    NotificationsAPIEpics.prototype.createAddToastEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            filter((/**
             * @param {?} a
             * @return {?}
             */
            function (a) {
                return a;
            })), ofType(NotificationsAPIActions.ADD_TOAST), switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /**
                 * Add Toast
                 * @type {?}
                 */
                var a = (/** @type {?} */ (action));
                if (!a.payload.options.title && !a.payload.options.msg) {
                    if (a.payload.type === 'error') {
                        a.payload.options.title = 'Oops, something went wrong!';
                    }
                }
                _this.toastyService[a.payload.type](a.payload.options);
            })); })));
        });
    };
    NotificationsAPIEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NotificationsAPIEpics.ctorParameters = function () { return [
        { type: ToastyService },
        { type: ToastyConfig }
    ]; };
    /** @nocollapse */ NotificationsAPIEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NotificationsAPIEpics_Factory() { return new NotificationsAPIEpics(i0.ɵɵinject(i1.ToastyService), i0.ɵɵinject(i1.ToastyConfig)); }, token: NotificationsAPIEpics, providedIn: "root" });
    return NotificationsAPIEpics;
}());
export { NotificationsAPIEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NotificationsAPIEpics.prototype.toastyService;
    /**
     * @type {?}
     * @private
     */
    NotificationsAPIEpics.prototype.toastyConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9lcGljcy9ub3RpZmljYXRpb25zLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBMEIsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7O0FBRWhIO0lBSUUsK0JBQ1UsYUFBNEIsRUFDNUIsWUFBMEI7UUFEMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsMEZBQTBGO1FBQzFGLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVNLDJDQUFXOzs7SUFBbEI7UUFDRSxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRU8sa0RBQWtCOzs7O0lBQTFCO1FBQUEsaUJBeUJDO1FBeEJDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDcEIsT0FBTyxPQUFPLENBQUMsSUFBSTtZQUNqQjs7ZUFFRztZQUNILE1BQU07Ozs7WUFBQyxVQUFDLENBQUM7Z0JBQ1AsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUMsRUFDRixNQUFNLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLEVBQ3pDLFNBQVM7Ozs7WUFBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLElBQUksVUFBVTs7OztZQUEwQixVQUFDLFFBQVE7Ozs7O29CQUkvRCxDQUFDLEdBQUcsbUJBQUEsTUFBTSxFQUEwQjtnQkFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyw2QkFBNkIsQ0FBQTtxQkFDeEQ7aUJBQ0Y7Z0JBQ0QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEQsQ0FBQyxFQUFDLEVBWm9CLENBWXBCLEVBQUMsQ0FDSixDQUFBO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7Z0JBMUNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBVHNCLGFBQWE7Z0JBQTNCLFlBQVk7OztnQ0FEckI7Q0FtREMsQUEzQ0QsSUEyQ0M7U0F4Q1kscUJBQXFCOzs7Ozs7SUFFOUIsOENBQW9DOzs7OztJQUNwQyw2Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2FzdHlDb25maWcsIFRvYXN0eVNlcnZpY2UgfSBmcm9tICdAY2ltZS9uZ3gtdG9hc3R5JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbiwgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25zQVBJRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRvYXN0eVNlcnZpY2U6IFRvYXN0eVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdHlDb25maWc6IFRvYXN0eUNvbmZpZ1xuICApIHtcbiAgICAvLyBBc3NpZ24gdGhlIHNlbGVjdGVkIHRoZW1lIG5hbWUgdG8gdGhlIGB0aGVtZWAgcHJvcGVydHkgb2YgdGhlIGluc3RhbmNlIG9mIFRvYXN0eUNvbmZpZy5cbiAgICAvLyBQb3NzaWJsZSB2YWx1ZXM6IGRlZmF1bHQsIGJvb3RzdHJhcCwgbWF0ZXJpYWxcbiAgICB0aGlzLnRvYXN0eUNvbmZpZy50aGVtZSA9ICdib290c3RyYXAnO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3ModGhpcy5jcmVhdGVBZGRUb2FzdEVwaWMoKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUFkZFRvYXN0RXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICAvKipcbiAgICAgICAgICogRmlsdGVyIHRoZSBhY3Rpb25zIHRoYXQgdHJpZ2dlcnMgdGhpcyBlcGljXG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXIoKGEpID0+IHtcbiAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSksXG4gICAgICAgIG9mVHlwZShOb3RpZmljYXRpb25zQVBJQWN0aW9ucy5BRERfVE9BU1QpLFxuICAgICAgICBzd2l0Y2hNYXAoKGFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4+KChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEFkZCBUb2FzdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGEgPSBhY3Rpb24gYXMgTm90aWZpY2F0aW9uc0FQSUFjdGlvbjtcbiAgICAgICAgICBpZiAoIWEucGF5bG9hZC5vcHRpb25zLnRpdGxlICYmICFhLnBheWxvYWQub3B0aW9ucy5tc2cpIHtcbiAgICAgICAgICAgIGlmIChhLnBheWxvYWQudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICBhLnBheWxvYWQub3B0aW9ucy50aXRsZSA9ICdPb3BzLCBzb21ldGhpbmcgd2VudCB3cm9uZyEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudG9hc3R5U2VydmljZVthLnBheWxvYWQudHlwZV0oYS5wYXlsb2FkLm9wdGlvbnMpO1xuXG4gICAgICAgIH0pKSxcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cbiJdfQ==