/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/notifications.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ToastyConfig, ToastyService } from '@cime/ngx-toasty';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
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
    { type: Injectable }
];
/** @nocollapse */
NotificationsAPIEpics.ctorParameters = () => [
    { type: ToastyService },
    { type: ToastyConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2VwaWNzL25vdGlmaWNhdGlvbnMuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHVCQUF1QixFQUEwQixNQUFNLCtDQUErQyxDQUFDO0FBR2hILE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBQ2hDLFlBQ1UsYUFBNEIsRUFDNUIsWUFBMEI7UUFEMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsMEZBQTBGO1FBQzFGLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVNLFdBQVc7UUFDaEIsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVPLGtCQUFrQjtRQUN4Qjs7Ozs7UUFBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN4QixPQUFPLE9BQU8sQ0FBQyxJQUFJO1lBQ2pCOztlQUVHO1lBQ0gsTUFBTTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUMsRUFDRixNQUFNLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLEVBQ3pDLFNBQVM7Ozs7WUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxVQUFVOzs7O1lBQTBCLENBQUMsUUFBUSxFQUFFLEVBQUU7Ozs7O3NCQUluRSxDQUFDLEdBQUcsbUJBQUEsTUFBTSxFQUEwQjtnQkFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyw2QkFBNkIsQ0FBQTtxQkFDeEQ7aUJBQ0Y7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEQsQ0FBQyxFQUFDLEVBQUMsQ0FDSixDQUFBO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7O1lBeENGLFVBQVU7Ozs7WUFQWSxhQUFhO1lBQTNCLFlBQVk7Ozs7Ozs7SUFVakIsOENBQW9DOzs7OztJQUNwQyw2Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2FzdHlDb25maWcsIFRvYXN0eVNlcnZpY2UgfSBmcm9tICdAY2ltZS9uZ3gtdG9hc3R5JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsIE5vdGlmaWNhdGlvbnNBUElBY3Rpb24gfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uc0FQSUVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b2FzdHlTZXJ2aWNlOiBUb2FzdHlTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9hc3R5Q29uZmlnOiBUb2FzdHlDb25maWdcbiAgKSB7XG4gICAgLy8gQXNzaWduIHRoZSBzZWxlY3RlZCB0aGVtZSBuYW1lIHRvIHRoZSBgdGhlbWVgIHByb3BlcnR5IG9mIHRoZSBpbnN0YW5jZSBvZiBUb2FzdHlDb25maWcuXG4gICAgLy8gUG9zc2libGUgdmFsdWVzOiBkZWZhdWx0LCBib290c3RyYXAsIG1hdGVyaWFsXG4gICAgdGhpcy50b2FzdHlDb25maWcudGhlbWUgPSAnYm9vdHN0cmFwJztcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKHRoaXMuY3JlYXRlQWRkVG9hc3RFcGljKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBZGRUb2FzdEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpbHRlciB0aGUgYWN0aW9ucyB0aGF0IHRyaWdnZXJzIHRoaXMgZXBpY1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyKChhKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0pLFxuICAgICAgICBvZlR5cGUoTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMuQUREX1RPQVNUKSxcbiAgICAgICAgc3dpdGNoTWFwKChhY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+Pigob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBZGQgVG9hc3RcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBhID0gYWN0aW9uIGFzIE5vdGlmaWNhdGlvbnNBUElBY3Rpb247XG4gICAgICAgICAgaWYgKCFhLnBheWxvYWQub3B0aW9ucy50aXRsZSAmJiAhYS5wYXlsb2FkLm9wdGlvbnMubXNnKSB7XG4gICAgICAgICAgICBpZiAoYS5wYXlsb2FkLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgYS5wYXlsb2FkLm9wdGlvbnMudGl0bGUgPSAnT29wcywgc29tZXRoaW5nIHdlbnQgd3JvbmchJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRvYXN0eVNlcnZpY2VbYS5wYXlsb2FkLnR5cGVdKGEucGF5bG9hZC5vcHRpb25zKTtcblxuICAgICAgICB9KSksXG4gICAgICApXG4gICAgfVxuICB9XG59XG4iXX0=