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
import { NotificationsAPIActions } from '../actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9lcGljcy9ub3RpZmljYXRpb25zLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBMEIsdUJBQXVCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHN0UsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFDaEMsWUFDVSxhQUE0QixFQUM1QixZQUEwQjtRQUQxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUVsQywwRkFBMEY7UUFDMUYsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRU0sV0FBVztRQUNoQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3hCOzs7OztRQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3hCLE9BQU8sT0FBTyxDQUFDLElBQUk7WUFDakI7O2VBRUc7WUFDSCxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBQyxFQUNGLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsRUFDekMsU0FBUzs7OztZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLFVBQVU7Ozs7WUFBMEIsQ0FBQyxRQUFRLEVBQUUsRUFBRTs7Ozs7c0JBSW5FLENBQUMsR0FBRyxtQkFBQSxNQUFNLEVBQTBCO2dCQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO29CQUN0RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTt3QkFDOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLDZCQUE2QixDQUFBO3FCQUN4RDtpQkFDRjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV4RCxDQUFDLEVBQUMsRUFBQyxDQUNKLENBQUE7UUFDSCxDQUFDLEVBQUE7SUFDSCxDQUFDOzs7WUF4Q0YsVUFBVTs7OztZQVBZLGFBQWE7WUFBM0IsWUFBWTs7Ozs7OztJQVVqQiw4Q0FBb0M7Ozs7O0lBQ3BDLDZDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvYXN0eUNvbmZpZywgVG9hc3R5U2VydmljZSB9IGZyb20gJ0BjaW1lL25neC10b2FzdHknO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb24sIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25zQVBJRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRvYXN0eVNlcnZpY2U6IFRvYXN0eVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdHlDb25maWc6IFRvYXN0eUNvbmZpZ1xuICApIHtcbiAgICAvLyBBc3NpZ24gdGhlIHNlbGVjdGVkIHRoZW1lIG5hbWUgdG8gdGhlIGB0aGVtZWAgcHJvcGVydHkgb2YgdGhlIGluc3RhbmNlIG9mIFRvYXN0eUNvbmZpZy5cbiAgICAvLyBQb3NzaWJsZSB2YWx1ZXM6IGRlZmF1bHQsIGJvb3RzdHJhcCwgbWF0ZXJpYWxcbiAgICB0aGlzLnRvYXN0eUNvbmZpZy50aGVtZSA9ICdib290c3RyYXAnO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3ModGhpcy5jcmVhdGVBZGRUb2FzdEVwaWMoKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUFkZFRvYXN0RXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICAvKipcbiAgICAgICAgICogRmlsdGVyIHRoZSBhY3Rpb25zIHRoYXQgdHJpZ2dlcnMgdGhpcyBlcGljXG4gICAgICAgICAqL1xuICAgICAgICBmaWx0ZXIoKGEpID0+IHtcbiAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSksXG4gICAgICAgIG9mVHlwZShOb3RpZmljYXRpb25zQVBJQWN0aW9ucy5BRERfVE9BU1QpLFxuICAgICAgICBzd2l0Y2hNYXAoKGFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4+KChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEFkZCBUb2FzdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGEgPSBhY3Rpb24gYXMgTm90aWZpY2F0aW9uc0FQSUFjdGlvbjtcbiAgICAgICAgICBpZiAoIWEucGF5bG9hZC5vcHRpb25zLnRpdGxlICYmICFhLnBheWxvYWQub3B0aW9ucy5tc2cpIHtcbiAgICAgICAgICAgIGlmIChhLnBheWxvYWQudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICBhLnBheWxvYWQub3B0aW9ucy50aXRsZSA9ICdPb3BzLCBzb21ldGhpbmcgd2VudCB3cm9uZyEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudG9hc3R5U2VydmljZVthLnBheWxvYWQudHlwZV0oYS5wYXlsb2FkLm9wdGlvbnMpO1xuXG4gICAgICAgIH0pKSxcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cbiJdfQ==