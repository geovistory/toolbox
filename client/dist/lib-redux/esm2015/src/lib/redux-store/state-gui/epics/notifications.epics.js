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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9lcGljcy9ub3RpZmljYXRpb25zLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx1QkFBdUIsRUFBMEIsTUFBTSwrQ0FBK0MsQ0FBQztBQUdoSCxNQUFNLE9BQU8scUJBQXFCOzs7OztJQUNoQyxZQUNVLGFBQTRCLEVBQzVCLFlBQTBCO1FBRDFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRWxDLDBGQUEwRjtRQUMxRixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFFTyxrQkFBa0I7UUFDeEI7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUMsSUFBSTtZQUNqQjs7ZUFFRztZQUNILE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxFQUFDLEVBQ0YsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxFQUN6QyxTQUFTOzs7O1lBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVTs7OztZQUEwQixDQUFDLFFBQVEsRUFBRSxFQUFFOzs7OztzQkFJbkUsQ0FBQyxHQUFHLG1CQUFBLE1BQU0sRUFBMEI7Z0JBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO3dCQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsNkJBQTZCLENBQUE7cUJBQ3hEO2lCQUNGO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhELENBQUMsRUFBQyxFQUFDLENBQ0osQ0FBQTtRQUNILENBQUMsRUFBQTtJQUNILENBQUM7OztZQXhDRixVQUFVOzs7O1lBUFksYUFBYTtZQUEzQixZQUFZOzs7Ozs7O0lBVWpCLDhDQUFvQzs7Ozs7SUFDcEMsNkNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9hc3R5Q29uZmlnLCBUb2FzdHlTZXJ2aWNlIH0gZnJvbSAnQGNpbWUvbmd4LXRvYXN0eSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLCBOb3RpZmljYXRpb25zQVBJQWN0aW9uIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbnNBUElFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9hc3R5U2VydmljZTogVG9hc3R5U2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0eUNvbmZpZzogVG9hc3R5Q29uZmlnXG4gICkge1xuICAgIC8vIEFzc2lnbiB0aGUgc2VsZWN0ZWQgdGhlbWUgbmFtZSB0byB0aGUgYHRoZW1lYCBwcm9wZXJ0eSBvZiB0aGUgaW5zdGFuY2Ugb2YgVG9hc3R5Q29uZmlnLlxuICAgIC8vIFBvc3NpYmxlIHZhbHVlczogZGVmYXVsdCwgYm9vdHN0cmFwLCBtYXRlcmlhbFxuICAgIHRoaXMudG9hc3R5Q29uZmlnLnRoZW1lID0gJ2Jvb3RzdHJhcCc7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyh0aGlzLmNyZWF0ZUFkZFRvYXN0RXBpYygpKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQWRkVG9hc3RFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWx0ZXIgdGhlIGFjdGlvbnMgdGhhdCB0cmlnZ2VycyB0aGlzIGVwaWNcbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlcigoYSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9KSxcbiAgICAgICAgb2ZUeXBlKE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLkFERF9UT0FTVCksXG4gICAgICAgIHN3aXRjaE1hcCgoYWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxGbHV4U3RhbmRhcmRBY3Rpb248YW55Pj4oKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQWRkIFRvYXN0XG4gICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgYSA9IGFjdGlvbiBhcyBOb3RpZmljYXRpb25zQVBJQWN0aW9uO1xuICAgICAgICAgIGlmICghYS5wYXlsb2FkLm9wdGlvbnMudGl0bGUgJiYgIWEucGF5bG9hZC5vcHRpb25zLm1zZykge1xuICAgICAgICAgICAgaWYgKGEucGF5bG9hZC50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIGEucGF5bG9hZC5vcHRpb25zLnRpdGxlID0gJ09vcHMsIHNvbWV0aGluZyB3ZW50IHdyb25nISdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50b2FzdHlTZXJ2aWNlW2EucGF5bG9hZC50eXBlXShhLnBheWxvYWQub3B0aW9ucyk7XG5cbiAgICAgICAgfSkpLFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuIl19