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
export class NotificationsAPIEpics {
    /**
     * @param {?} toastyService
     * @param {?} toastyConfig
     */
    constructor(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.createAddToastEpic());
    }
    /**
     * @private
     * @return {?}
     */
    createAddToastEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            filter((/**
             * @param {?} a
             * @return {?}
             */
            (a) => {
                return a;
            })), ofType(NotificationsAPIActions.ADD_TOAST), switchMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                /**
                 * Add Toast
                 * @type {?}
                 */
                const a = (/** @type {?} */ (action));
                if (!a.payload.options.title && !a.payload.options.msg) {
                    if (a.payload.type === 'error') {
                        a.payload.options.title = 'Oops, something went wrong!';
                    }
                }
                this.toastyService[a.payload.type](a.payload.options);
            })))));
        });
    }
}
NotificationsAPIEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NotificationsAPIEpics.ctorParameters = () => [
    { type: ToastyService },
    { type: ToastyConfig }
];
/** @nocollapse */ NotificationsAPIEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NotificationsAPIEpics_Factory() { return new NotificationsAPIEpics(i0.ɵɵinject(i1.ToastyService), i0.ɵɵinject(i1.ToastyConfig)); }, token: NotificationsAPIEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9lcGljcy9ub3RpZmljYXRpb25zLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBMEIsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7O0FBS2hILE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBQ2hDLFlBQ1UsYUFBNEIsRUFDNUIsWUFBMEI7UUFEMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsMEZBQTBGO1FBQzFGLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVNLFdBQVc7UUFDaEIsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVPLGtCQUFrQjtRQUN4Qjs7Ozs7UUFBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN4QixPQUFPLE9BQU8sQ0FBQyxJQUFJO1lBQ2pCOztlQUVHO1lBQ0gsTUFBTTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUMsRUFDRixNQUFNLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLEVBQ3pDLFNBQVM7Ozs7WUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxVQUFVOzs7O1lBQTBCLENBQUMsUUFBUSxFQUFFLEVBQUU7Ozs7O3NCQUluRSxDQUFDLEdBQUcsbUJBQUEsTUFBTSxFQUEwQjtnQkFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyw2QkFBNkIsQ0FBQTtxQkFDeEQ7aUJBQ0Y7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEQsQ0FBQyxFQUFDLEVBQUMsQ0FDSixDQUFBO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7O1lBMUNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVRzQixhQUFhO1lBQTNCLFlBQVk7Ozs7Ozs7O0lBWWpCLDhDQUFvQzs7Ozs7SUFDcEMsNkNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9hc3R5Q29uZmlnLCBUb2FzdHlTZXJ2aWNlIH0gZnJvbSAnQGNpbWUvbmd4LXRvYXN0eSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb24sIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uc0FQSUVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b2FzdHlTZXJ2aWNlOiBUb2FzdHlTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9hc3R5Q29uZmlnOiBUb2FzdHlDb25maWdcbiAgKSB7XG4gICAgLy8gQXNzaWduIHRoZSBzZWxlY3RlZCB0aGVtZSBuYW1lIHRvIHRoZSBgdGhlbWVgIHByb3BlcnR5IG9mIHRoZSBpbnN0YW5jZSBvZiBUb2FzdHlDb25maWcuXG4gICAgLy8gUG9zc2libGUgdmFsdWVzOiBkZWZhdWx0LCBib290c3RyYXAsIG1hdGVyaWFsXG4gICAgdGhpcy50b2FzdHlDb25maWcudGhlbWUgPSAnYm9vdHN0cmFwJztcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKHRoaXMuY3JlYXRlQWRkVG9hc3RFcGljKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBZGRUb2FzdEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpbHRlciB0aGUgYWN0aW9ucyB0aGF0IHRyaWdnZXJzIHRoaXMgZXBpY1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyKChhKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0pLFxuICAgICAgICBvZlR5cGUoTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMuQUREX1RPQVNUKSxcbiAgICAgICAgc3dpdGNoTWFwKChhY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+Pigob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBZGQgVG9hc3RcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBhID0gYWN0aW9uIGFzIE5vdGlmaWNhdGlvbnNBUElBY3Rpb247XG4gICAgICAgICAgaWYgKCFhLnBheWxvYWQub3B0aW9ucy50aXRsZSAmJiAhYS5wYXlsb2FkLm9wdGlvbnMubXNnKSB7XG4gICAgICAgICAgICBpZiAoYS5wYXlsb2FkLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgYS5wYXlsb2FkLm9wdGlvbnMudGl0bGUgPSAnT29wcywgc29tZXRoaW5nIHdlbnQgd3JvbmchJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRvYXN0eVNlcnZpY2VbYS5wYXlsb2FkLnR5cGVdKGEucGF5bG9hZC5vcHRpb25zKTtcblxuICAgICAgICB9KSksXG4gICAgICApXG4gICAgfVxuICB9XG59XG4iXX0=