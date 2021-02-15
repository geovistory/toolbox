/**
 * @fileoverview added by tsickle
 * Generated from: root/root-epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountEpics } from '../state-gui/epics/account.epics';
import { ActiveProjectEpics } from '../state-gui/epics/active-project.epics';
import { LoadingBarEpics } from '../state-gui/epics/loading-bar.epics';
import { NotificationsAPIEpics } from '../state-gui/epics/notifications.epics';
import { ActionResolverEpics } from '../state-schema/epics/action-resolver.epics';
import { DatEpics } from '../state-schema/epics/dat.epics';
import { DfhEpics } from '../state-schema/epics/dfh.epics';
import { InfEpics } from '../state-schema/epics/inf.epics';
import { ProEpics } from '../state-schema/epics/pro.epics';
import { SysEpics } from '../state-schema/epics/sys.epics';
import * as i0 from "@angular/core";
import * as i1 from "../state-gui/epics/loading-bar.epics";
import * as i2 from "../state-gui/epics/notifications.epics";
import * as i3 from "../state-gui/epics/active-project.epics";
import * as i4 from "../state-gui/epics/account.epics";
import * as i5 from "../state-schema/epics/sys.epics";
import * as i6 from "../state-schema/epics/dfh.epics";
import * as i7 from "../state-schema/epics/inf.epics";
import * as i8 from "../state-schema/epics/dat.epics";
import * as i9 from "../state-schema/epics/pro.epics";
import * as i10 from "../state-schema/epics/action-resolver.epics";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
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
    /** @nocollapse */ RootEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RootEpics_Factory() { return new RootEpics(i0.ɵɵinject(i1.LoadingBarEpics), i0.ɵɵinject(i2.NotificationsAPIEpics), i0.ɵɵinject(i3.ActiveProjectEpics), i0.ɵɵinject(i4.AccountEpics), i0.ɵɵinject(i5.SysEpics), i0.ɵɵinject(i6.DfhEpics), i0.ɵɵinject(i7.InfEpics), i0.ɵɵinject(i8.DatEpics), i0.ɵɵinject(i9.ProEpics), i0.ɵɵinject(i10.ActionResolverEpics)); }, token: RootEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInJvb3Qvcm9vdC1lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFxQixZQUFZLEVBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFDckcsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7QUFJM0Q7SUFRRSxtQkFDVSxlQUFnQyxFQUNoQyxpQkFBd0MsRUFDeEMsa0JBQXNDLEVBQ3RDLFlBQTBCLEVBQzFCLFdBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLGNBQW1DO1FBVjdDLGlCQW9DQztRQW5DUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFVO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsWUFBWSxDQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxFQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQ2xDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFROzs7Ozs7UUFBRyxVQUNkLE9BQWtDLEVBQ2xDLE1BQWtDLEVBQ2xDLFlBQXdCO1lBQXhCLDZCQUFBLEVBQUEsd0JBQXdCO1lBRXhCLE9BQU8sS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzlCLFFBQVE7Ozs7WUFBQyxVQUFDLElBQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFuQyxDQUFtQyxFQUFDLENBQzlELENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQTtJQUNILENBQUM7Ozs7SUFFTSwrQkFBVzs7O0lBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNJLDJCQUFPOzs7OztJQUFkLFVBQWUsSUFBK0M7UUFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBeERGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBYlEsZUFBZTtnQkFDZixxQkFBcUI7Z0JBRnJCLGtCQUFrQjtnQkFEbEIsWUFBWTtnQkFTWixRQUFRO2dCQUhSLFFBQVE7Z0JBQ1IsUUFBUTtnQkFGUixRQUFRO2dCQUdSLFFBQVE7Z0JBSlIsbUJBQW1COzs7b0JBVDVCO0NBMkVDLEFBekRELElBeURDO1NBdERZLFNBQVM7Ozs7OztJQUVwQixvQ0FBd0I7Ozs7O0lBQ3hCLDZCQUFpQjs7Ozs7SUFHZixvQ0FBd0M7Ozs7O0lBQ3hDLHNDQUFnRDs7Ozs7SUFDaEQsdUNBQThDOzs7OztJQUM5QyxpQ0FBa0M7Ozs7O0lBQ2xDLGdDQUE2Qjs7Ozs7SUFDN0IsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQixtQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSwgY29tYmluZUVwaWNzLCBFcGljLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjY291bnRFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9hY2NvdW50LmVwaWNzJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9hY3RpdmUtcHJvamVjdC5lcGljcyc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MvbG9hZGluZy1iYXIuZXBpY3MnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL25vdGlmaWNhdGlvbnMuZXBpY3MnO1xuaW1wb3J0IHsgQWN0aW9uUmVzb2x2ZXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9hY3Rpb24tcmVzb2x2ZXIuZXBpY3MnO1xuaW1wb3J0IHsgRGF0RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzJztcbmltcG9ydCB7IERmaEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcyc7XG5pbXBvcnQgeyBJbmZFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9pbmYuZXBpY3MnO1xuaW1wb3J0IHsgUHJvRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvcHJvLmVwaWNzJztcbmltcG9ydCB7IFN5c0VwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuL21vZGVscy9tb2RlbCc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm9vdEVwaWNzIHtcblxuICBwcml2YXRlIHJvb3RFcGljU3RyZWFtJDtcbiAgcHJpdmF0ZSByb290RXBpYztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJFcGljczogTG9hZGluZ0JhckVwaWNzLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uRXBpY3M6IE5vdGlmaWNhdGlvbnNBUElFcGljcyxcbiAgICBwcml2YXRlIGFjdGl2ZVByb2plY3RFcGljczogQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIHByaXZhdGUgYWNjb3VudEVwaWNzOiBBY2NvdW50RXBpY3MsXG4gICAgcHJpdmF0ZSBzeXN0ZW1FcGljczogU3lzRXBpY3MsXG4gICAgcHJpdmF0ZSBkZmhFcGljczogRGZoRXBpY3MsXG4gICAgcHJpdmF0ZSBpbmZFcGljczogSW5mRXBpY3MsXG4gICAgcHJpdmF0ZSBkYXRFcGljczogRGF0RXBpY3MsXG4gICAgcHJpdmF0ZSBwcm9FcGljczogUHJvRXBpY3MsXG4gICAgcHJpdmF0ZSBhY3Rpb25SZXNvbHZlcjogQWN0aW9uUmVzb2x2ZXJFcGljc1xuICApIHtcblxuICAgIHRoaXMucm9vdEVwaWNTdHJlYW0kID0gbmV3IEJlaGF2aW9yU3ViamVjdChjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmxvYWRpbmdCYXJFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5ub3RpZmljYXRpb25FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5zeXN0ZW1FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5hY3RpdmVQcm9qZWN0RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuYWNjb3VudEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmRmaEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmluZkVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmRhdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnByb0VwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICAvLyBpbXBvcnRhbnQ6IHRoaXMgbmVlZHMgdG8gYmUgdGhlIGxhc3QgZXBpYyBpblxuICAgICAgdGhpcy5hY3Rpb25SZXNvbHZlci5jcmVhdGVFcGljcygpXG4gICAgKSk7XG5cbiAgICB0aGlzLnJvb3RFcGljID0gKFxuICAgICAgYWN0aW9uJDogQWN0aW9uc09ic2VydmFibGU8QWN0aW9uPixcbiAgICAgIHN0YXRlJDogU3RhdGVPYnNlcnZhYmxlPElBcHBTdGF0ZT4sXG4gICAgICBkZXBlbmRlbmNpZXMgPSB1bmRlZmluZWRcbiAgICApOiBPYnNlcnZhYmxlPEFjdGlvbj4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdEVwaWNTdHJlYW0kLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChlcGljOiBFcGljKSA9PiBlcGljKGFjdGlvbiQsIHN0YXRlJCwgZGVwZW5kZW5jaWVzKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFJvb3RFcGljKCk6IEVwaWM8QWN0aW9uPGFueT4sIEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yb290RXBpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVwaWMgdG8gdGhlIFJvb3RFcGljIG1pZGRsZXdhcmVcbiAgICogQHBhcmFtIGVwaWMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBSb290RXBpY3NcbiAgICovXG4gIHB1YmxpYyBhZGRFcGljKGVwaWM6IEVwaWM8QWN0aW9uPGFueT4sIEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+KSB7XG4gICAgdGhpcy5yb290RXBpY1N0cmVhbSQubmV4dChlcGljKTtcbiAgfVxufVxuIl19