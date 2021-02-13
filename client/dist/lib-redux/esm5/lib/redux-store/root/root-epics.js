/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LoadingBarEpics } from '../state-gui/epics/loading-bar.epics';
import { NotificationsAPIEpics } from '../state-gui/epics/notifications.epics';
import { ActiveProjectEpics } from '../state-gui/epics/active-project.epics';
import { AccountEpics } from '../state-gui/epics/account.epics';
import { SysEpics } from '../state-schema/epics/sys.epics';
import { DfhEpics } from '../state-schema/epics/dfh.epics';
import { InfEpics } from '../state-schema/epics/inf.epics';
import { DatEpics } from '../state-schema/epics/dat.epics';
import { ProEpics } from '../state-schema/epics/pro.epics';
import { ActionResolverEpics } from '../state-schema/epics/action-resolver.epics';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvcm9vdC9yb290LWVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXFCLFlBQVksRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFJbEY7SUFNRSxtQkFDVSxlQUFnQyxFQUNoQyxpQkFBd0MsRUFDeEMsa0JBQXNDLEVBQ3RDLFlBQTBCLEVBQzFCLFdBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLGNBQW1DO1FBVjdDLGlCQW9DQztRQW5DUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFVO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsWUFBWSxDQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxFQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQ2xDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFROzs7Ozs7UUFBRyxVQUNkLE9BQWtDLEVBQ2xDLE1BQWtDLEVBQ2xDLFlBQXdCO1lBQXhCLDZCQUFBLEVBQUEsd0JBQXdCO1lBRXhCLE9BQU8sS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzlCLFFBQVE7Ozs7WUFBQyxVQUFDLElBQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFuQyxDQUFtQyxFQUFDLENBQzlELENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQTtJQUNILENBQUM7Ozs7SUFFTSwrQkFBVzs7O0lBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNJLDJCQUFPOzs7OztJQUFkLFVBQWUsSUFBK0M7UUFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBdERGLFVBQVU7Ozs7Z0JBYkYsZUFBZTtnQkFDZixxQkFBcUI7Z0JBQ3JCLGtCQUFrQjtnQkFDbEIsWUFBWTtnQkFDWixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsbUJBQW1COztJQTJENUIsZ0JBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXREWSxTQUFTOzs7Ozs7SUFFcEIsb0NBQXdCOzs7OztJQUN4Qiw2QkFBaUI7Ozs7O0lBR2Ysb0NBQXdDOzs7OztJQUN4QyxzQ0FBZ0Q7Ozs7O0lBQ2hELHVDQUE4Qzs7Ozs7SUFDOUMsaUNBQWtDOzs7OztJQUNsQyxnQ0FBNkI7Ozs7O0lBQzdCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsbUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgQWN0aW9uc09ic2VydmFibGUsIGNvbWJpbmVFcGljcywgRXBpYywgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MvbG9hZGluZy1iYXIuZXBpY3MnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL25vdGlmaWNhdGlvbnMuZXBpY3MnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjdGl2ZS1wcm9qZWN0LmVwaWNzJztcbmltcG9ydCB7IEFjY291bnRFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9hY2NvdW50LmVwaWNzJztcbmltcG9ydCB7IFN5c0VwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcyc7XG5pbXBvcnQgeyBEZmhFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9kZmguZXBpY3MnO1xuaW1wb3J0IHsgSW5mRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvaW5mLmVwaWNzJztcbmltcG9ydCB7IERhdEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2RhdC5lcGljcyc7XG5pbXBvcnQgeyBQcm9FcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9wcm8uZXBpY3MnO1xuaW1wb3J0IHsgQWN0aW9uUmVzb2x2ZXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9hY3Rpb24tcmVzb2x2ZXIuZXBpY3MnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi9tb2RlbHMvbW9kZWwnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb290RXBpY3Mge1xuXG4gIHByaXZhdGUgcm9vdEVwaWNTdHJlYW0kO1xuICBwcml2YXRlIHJvb3RFcGljO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckVwaWNzOiBMb2FkaW5nQmFyRXBpY3MsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25FcGljczogTm90aWZpY2F0aW9uc0FQSUVwaWNzLFxuICAgIHByaXZhdGUgYWN0aXZlUHJvamVjdEVwaWNzOiBBY3RpdmVQcm9qZWN0RXBpY3MsXG4gICAgcHJpdmF0ZSBhY2NvdW50RXBpY3M6IEFjY291bnRFcGljcyxcbiAgICBwcml2YXRlIHN5c3RlbUVwaWNzOiBTeXNFcGljcyxcbiAgICBwcml2YXRlIGRmaEVwaWNzOiBEZmhFcGljcyxcbiAgICBwcml2YXRlIGluZkVwaWNzOiBJbmZFcGljcyxcbiAgICBwcml2YXRlIGRhdEVwaWNzOiBEYXRFcGljcyxcbiAgICBwcml2YXRlIHByb0VwaWNzOiBQcm9FcGljcyxcbiAgICBwcml2YXRlIGFjdGlvblJlc29sdmVyOiBBY3Rpb25SZXNvbHZlckVwaWNzXG4gICkge1xuXG4gICAgdGhpcy5yb290RXBpY1N0cmVhbSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMubG9hZGluZ0JhckVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbkVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnN5c3RlbUVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmFjdGl2ZVByb2plY3RFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5hY2NvdW50RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuZGZoRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuaW5mRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuZGF0RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMucHJvRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIC8vIGltcG9ydGFudDogdGhpcyBuZWVkcyB0byBiZSB0aGUgbGFzdCBlcGljIGluXG4gICAgICB0aGlzLmFjdGlvblJlc29sdmVyLmNyZWF0ZUVwaWNzKClcbiAgICApKTtcblxuICAgIHRoaXMucm9vdEVwaWMgPSAoXG4gICAgICBhY3Rpb24kOiBBY3Rpb25zT2JzZXJ2YWJsZTxBY3Rpb24+LFxuICAgICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGU8SUFwcFN0YXRlPixcbiAgICAgIGRlcGVuZGVuY2llcyA9IHVuZGVmaW5lZFxuICAgICk6IE9ic2VydmFibGU8QWN0aW9uPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5yb290RXBpY1N0cmVhbSQucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKGVwaWM6IEVwaWMpID0+IGVwaWMoYWN0aW9uJCwgc3RhdGUkLCBkZXBlbmRlbmNpZXMpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Um9vdEVwaWMoKTogRXBpYzxBY3Rpb248YW55PiwgQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJvb3RFcGljO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXBpYyB0byB0aGUgUm9vdEVwaWMgbWlkZGxld2FyZVxuICAgKiBAcGFyYW0gZXBpYyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIFJvb3RFcGljc1xuICAgKi9cbiAgcHVibGljIGFkZEVwaWMoZXBpYzogRXBpYzxBY3Rpb248YW55PiwgQWN0aW9uPGFueT4sIHZvaWQsIGFueT4pIHtcbiAgICB0aGlzLnJvb3RFcGljU3RyZWFtJC5uZXh0KGVwaWMpO1xuICB9XG59XG4iXX0=