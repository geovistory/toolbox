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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2VwaWNzL25vdGlmaWNhdGlvbnMuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUEwQix1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDOzs7QUFFaEg7SUFJRSwrQkFDVSxhQUE0QixFQUM1QixZQUEwQjtRQUQxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUVsQywwRkFBMEY7UUFDMUYsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRU0sMkNBQVc7OztJQUFsQjtRQUNFLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFFTyxrREFBa0I7Ozs7SUFBMUI7UUFBQSxpQkF5QkM7UUF4QkM7Ozs7O1FBQU8sVUFBQyxPQUFPLEVBQUUsS0FBSztZQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJO1lBQ2pCOztlQUVHO1lBQ0gsTUFBTTs7OztZQUFDLFVBQUMsQ0FBQztnQkFDUCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBQyxFQUNGLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsRUFDekMsU0FBUzs7OztZQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsSUFBSSxVQUFVOzs7O1lBQTBCLFVBQUMsUUFBUTs7Ozs7b0JBSS9ELENBQUMsR0FBRyxtQkFBQSxNQUFNLEVBQTBCO2dCQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO29CQUN0RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTt3QkFDOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLDZCQUE2QixDQUFBO3FCQUN4RDtpQkFDRjtnQkFDRCxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV4RCxDQUFDLEVBQUMsRUFab0IsQ0FZcEIsRUFBQyxDQUNKLENBQUE7UUFDSCxDQUFDLEVBQUE7SUFDSCxDQUFDOztnQkExQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUc0IsYUFBYTtnQkFBM0IsWUFBWTs7O2dDQURyQjtDQW1EQyxBQTNDRCxJQTJDQztTQXhDWSxxQkFBcUI7Ozs7OztJQUU5Qiw4Q0FBb0M7Ozs7O0lBQ3BDLDZDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvYXN0eUNvbmZpZywgVG9hc3R5U2VydmljZSB9IGZyb20gJ0BjaW1lL25neC10b2FzdHknO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9uLCBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbnNBUElFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9hc3R5U2VydmljZTogVG9hc3R5U2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0eUNvbmZpZzogVG9hc3R5Q29uZmlnXG4gICkge1xuICAgIC8vIEFzc2lnbiB0aGUgc2VsZWN0ZWQgdGhlbWUgbmFtZSB0byB0aGUgYHRoZW1lYCBwcm9wZXJ0eSBvZiB0aGUgaW5zdGFuY2Ugb2YgVG9hc3R5Q29uZmlnLlxuICAgIC8vIFBvc3NpYmxlIHZhbHVlczogZGVmYXVsdCwgYm9vdHN0cmFwLCBtYXRlcmlhbFxuICAgIHRoaXMudG9hc3R5Q29uZmlnLnRoZW1lID0gJ2Jvb3RzdHJhcCc7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyh0aGlzLmNyZWF0ZUFkZFRvYXN0RXBpYygpKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQWRkVG9hc3RFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWx0ZXIgdGhlIGFjdGlvbnMgdGhhdCB0cmlnZ2VycyB0aGlzIGVwaWNcbiAgICAgICAgICovXG4gICAgICAgIGZpbHRlcigoYSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9KSxcbiAgICAgICAgb2ZUeXBlKE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLkFERF9UT0FTVCksXG4gICAgICAgIHN3aXRjaE1hcCgoYWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxGbHV4U3RhbmRhcmRBY3Rpb248YW55Pj4oKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQWRkIFRvYXN0XG4gICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgYSA9IGFjdGlvbiBhcyBOb3RpZmljYXRpb25zQVBJQWN0aW9uO1xuICAgICAgICAgIGlmICghYS5wYXlsb2FkLm9wdGlvbnMudGl0bGUgJiYgIWEucGF5bG9hZC5vcHRpb25zLm1zZykge1xuICAgICAgICAgICAgaWYgKGEucGF5bG9hZC50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIGEucGF5bG9hZC5vcHRpb25zLnRpdGxlID0gJ09vcHMsIHNvbWV0aGluZyB3ZW50IHdyb25nISdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50b2FzdHlTZXJ2aWNlW2EucGF5bG9hZC50eXBlXShhLnBheWxvYWQub3B0aW9ucyk7XG5cbiAgICAgICAgfSkpLFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuIl19