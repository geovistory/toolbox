/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountEpics, ActiveProjectEpics, LoadingBarEpics, NotificationsAPIEpics } from '../state-gui/epics';
import { DatEpics, DfhEpics, InfEpics, ProEpics, SysEpics } from '../state-schema/epics';
import { ActionResolverEpics } from '../state-schema/_helpers';
var RootEpics = /** @class */ (function () {
    function RootEpics(loadingBarEpics, notificationEpics, activeProjectEpics, accountEpics, systemEpics, dfhEpics, infEpics, datEpics, proEpics, actionResolver) {
        var _this = this;
        this.loadingBarEpics = loadingBarEpics;
        this.notificationEpics = notificationEpics;
        this.activeProjectEpics = activeProjectEpics;
        this.accountEpics = accountEpics;
        this.systemEpics = systemEpics;
        this.dfhEpics = dfhEpics;
        this.infEpics = infEpics;
        this.datEpics = datEpics;
        this.proEpics = proEpics;
        this.actionResolver = actionResolver;
        this.rootEpicStream$ = new BehaviorSubject(combineEpics(this.loadingBarEpics.createEpics(), this.notificationEpics.createEpics(), this.systemEpics.createEpics(), this.activeProjectEpics.createEpics(), this.accountEpics.createEpics(), this.dfhEpics.createEpics(), this.infEpics.createEpics(), this.datEpics.createEpics(), this.proEpics.createEpics(), 
        // important: this needs to be the last epic in
        this.actionResolver.createEpics()));
        this.rootEpic = (/**
         * @param {?} action$
         * @param {?} state$
         * @param {?=} dependencies
         * @return {?}
         */
        function (action$, state$, dependencies) {
            if (dependencies === void 0) { dependencies = undefined; }
            return _this.rootEpicStream$.pipe(mergeMap((/**
             * @param {?} epic
             * @return {?}
             */
            function (epic) { return epic(action$, state$, dependencies); })));
        });
    }
    /**
     * @return {?}
     */
    RootEpics.prototype.getRootEpic = /**
     * @return {?}
     */
    function () {
        return this.rootEpic;
    };
    /**
     * Adds an epic to the RootEpic middleware
     * @param epic that will be added to the RootEpics
     */
    /**
     * Adds an epic to the RootEpic middleware
     * @param {?} epic that will be added to the RootEpics
     * @return {?}
     */
    RootEpics.prototype.addEpic = /**
     * Adds an epic to the RootEpic middleware
     * @param {?} epic that will be added to the RootEpics
     * @return {?}
     */
    function (epic) {
        this.rootEpicStream$.next(epic);
    };
    RootEpics.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RootEpics.ctorParameters = function () { return [
        { type: LoadingBarEpics },
        { type: NotificationsAPIEpics },
        { type: ActiveProjectEpics },
        { type: AccountEpics },
        { type: SysEpics },
        { type: DfhEpics },
        { type: InfEpics },
        { type: DatEpics },
        { type: ProEpics },
        { type: ActionResolverEpics }
    ]; };
    return RootEpics;
}());
export { RootEpics };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.rootEpicStream$;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.rootEpic;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.loadingBarEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.notificationEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.activeProjectEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.accountEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.systemEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.dfhEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.infEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.datEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.proEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.actionResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvcm9vdC9yb290LWVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXFCLFlBQVksRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlHLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHL0Q7SUFNRSxtQkFDVSxlQUFnQyxFQUNoQyxpQkFBd0MsRUFDeEMsa0JBQXNDLEVBQ3RDLFlBQTBCLEVBQzFCLFdBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLGNBQW1DO1FBVjdDLGlCQW9DQztRQW5DUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFVO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsWUFBWSxDQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxFQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQ2xDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFROzs7Ozs7UUFBRyxVQUNkLE9BQWtDLEVBQ2xDLE1BQWtDLEVBQ2xDLFlBQXdCO1lBQXhCLDZCQUFBLEVBQUEsd0JBQXdCO1lBRXhCLE9BQU8sS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzlCLFFBQVE7Ozs7WUFBQyxVQUFDLElBQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFuQyxDQUFtQyxFQUFDLENBQzlELENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQTtJQUNILENBQUM7Ozs7SUFFTSwrQkFBVzs7O0lBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNJLDJCQUFPOzs7OztJQUFkLFVBQWUsSUFBK0M7UUFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBdERGLFVBQVU7Ozs7Z0JBTGdDLGVBQWU7Z0JBQUUscUJBQXFCO2dCQUExRCxrQkFBa0I7Z0JBQWhDLFlBQVk7Z0JBQzRCLFFBQVE7Z0JBQXRDLFFBQVE7Z0JBQUUsUUFBUTtnQkFBNUIsUUFBUTtnQkFBc0IsUUFBUTtnQkFDdEMsbUJBQW1COztJQTBENUIsZ0JBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXREWSxTQUFTOzs7Ozs7SUFFcEIsb0NBQXdCOzs7OztJQUN4Qiw2QkFBaUI7Ozs7O0lBR2Ysb0NBQXdDOzs7OztJQUN4QyxzQ0FBZ0Q7Ozs7O0lBQ2hELHVDQUE4Qzs7Ozs7SUFDOUMsaUNBQWtDOzs7OztJQUNsQyxnQ0FBNkI7Ozs7O0lBQzdCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsbUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgQWN0aW9uc09ic2VydmFibGUsIGNvbWJpbmVFcGljcywgRXBpYywgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBY2NvdW50RXBpY3MsIEFjdGl2ZVByb2plY3RFcGljcywgTG9hZGluZ0JhckVwaWNzLCBOb3RpZmljYXRpb25zQVBJRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MnO1xuaW1wb3J0IHsgRGF0RXBpY3MsIERmaEVwaWNzLCBJbmZFcGljcywgUHJvRXBpY3MsIFN5c0VwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzJztcbmltcG9ydCB7IEFjdGlvblJlc29sdmVyRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm9vdEVwaWNzIHtcblxuICBwcml2YXRlIHJvb3RFcGljU3RyZWFtJDtcbiAgcHJpdmF0ZSByb290RXBpYztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJFcGljczogTG9hZGluZ0JhckVwaWNzLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uRXBpY3M6IE5vdGlmaWNhdGlvbnNBUElFcGljcyxcbiAgICBwcml2YXRlIGFjdGl2ZVByb2plY3RFcGljczogQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIHByaXZhdGUgYWNjb3VudEVwaWNzOiBBY2NvdW50RXBpY3MsXG4gICAgcHJpdmF0ZSBzeXN0ZW1FcGljczogU3lzRXBpY3MsXG4gICAgcHJpdmF0ZSBkZmhFcGljczogRGZoRXBpY3MsXG4gICAgcHJpdmF0ZSBpbmZFcGljczogSW5mRXBpY3MsXG4gICAgcHJpdmF0ZSBkYXRFcGljczogRGF0RXBpY3MsXG4gICAgcHJpdmF0ZSBwcm9FcGljczogUHJvRXBpY3MsXG4gICAgcHJpdmF0ZSBhY3Rpb25SZXNvbHZlcjogQWN0aW9uUmVzb2x2ZXJFcGljc1xuICApIHtcblxuICAgIHRoaXMucm9vdEVwaWNTdHJlYW0kID0gbmV3IEJlaGF2aW9yU3ViamVjdChjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmxvYWRpbmdCYXJFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5ub3RpZmljYXRpb25FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5zeXN0ZW1FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5hY3RpdmVQcm9qZWN0RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuYWNjb3VudEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmRmaEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmluZkVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmRhdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnByb0VwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICAvLyBpbXBvcnRhbnQ6IHRoaXMgbmVlZHMgdG8gYmUgdGhlIGxhc3QgZXBpYyBpblxuICAgICAgdGhpcy5hY3Rpb25SZXNvbHZlci5jcmVhdGVFcGljcygpXG4gICAgKSk7XG5cbiAgICB0aGlzLnJvb3RFcGljID0gKFxuICAgICAgYWN0aW9uJDogQWN0aW9uc09ic2VydmFibGU8QWN0aW9uPixcbiAgICAgIHN0YXRlJDogU3RhdGVPYnNlcnZhYmxlPElBcHBTdGF0ZT4sXG4gICAgICBkZXBlbmRlbmNpZXMgPSB1bmRlZmluZWRcbiAgICApOiBPYnNlcnZhYmxlPEFjdGlvbj4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdEVwaWNTdHJlYW0kLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChlcGljOiBFcGljKSA9PiBlcGljKGFjdGlvbiQsIHN0YXRlJCwgZGVwZW5kZW5jaWVzKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFJvb3RFcGljKCk6IEVwaWM8QWN0aW9uPGFueT4sIEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yb290RXBpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVwaWMgdG8gdGhlIFJvb3RFcGljIG1pZGRsZXdhcmVcbiAgICogQHBhcmFtIGVwaWMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBSb290RXBpY3NcbiAgICovXG4gIHB1YmxpYyBhZGRFcGljKGVwaWM6IEVwaWM8QWN0aW9uPGFueT4sIEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+KSB7XG4gICAgdGhpcy5yb290RXBpY1N0cmVhbSQubmV4dChlcGljKTtcbiAgfVxufVxuIl19