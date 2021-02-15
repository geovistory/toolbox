/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-epics.ts
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
export class RootEpics {
    /**
     * @param {?} loadingBarEpics
     * @param {?} notificationEpics
     * @param {?} activeProjectEpics
     * @param {?} accountEpics
     * @param {?} systemEpics
     * @param {?} dfhEpics
     * @param {?} infEpics
     * @param {?} datEpics
     * @param {?} proEpics
     * @param {?} actionResolver
     */
    constructor(loadingBarEpics, notificationEpics, activeProjectEpics, accountEpics, systemEpics, dfhEpics, infEpics, datEpics, proEpics, actionResolver) {
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
        (action$, state$, dependencies = undefined) => {
            return this.rootEpicStream$.pipe(mergeMap((/**
             * @param {?} epic
             * @return {?}
             */
            (epic) => epic(action$, state$, dependencies))));
        });
    }
    /**
     * @return {?}
     */
    getRootEpic() {
        return this.rootEpic;
    }
    /**
     * Adds an epic to the RootEpic middleware
     * @param {?} epic that will be added to the RootEpics
     * @return {?}
     */
    addEpic(epic) {
        this.rootEpicStream$.next(epic);
    }
}
RootEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RootEpics.ctorParameters = () => [
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
];
/** @nocollapse */ RootEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RootEpics_Factory() { return new RootEpics(i0.ɵɵinject(i1.LoadingBarEpics), i0.ɵɵinject(i2.NotificationsAPIEpics), i0.ɵɵinject(i3.ActiveProjectEpics), i0.ɵɵinject(i4.AccountEpics), i0.ɵɵinject(i5.SysEpics), i0.ɵɵinject(i6.DfhEpics), i0.ɵɵinject(i7.InfEpics), i0.ɵɵinject(i8.DatEpics), i0.ɵɵinject(i9.ProEpics), i0.ɵɵinject(i10.ActionResolverEpics)); }, token: RootEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvcm9vdC9yb290LWVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXFCLFlBQVksRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7OztBQU8zRCxNQUFNLE9BQU8sU0FBUzs7Ozs7Ozs7Ozs7OztJQUtwQixZQUNVLGVBQWdDLEVBQ2hDLGlCQUF3QyxFQUN4QyxrQkFBc0MsRUFDdEMsWUFBMEIsRUFDMUIsV0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsY0FBbUM7UUFUbkMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG1CQUFjLEdBQWQsY0FBYyxDQUFxQjtRQUczQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLFlBQVksQ0FDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsRUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEVBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQzNCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUTs7Ozs7O1FBQUcsQ0FDZCxPQUFrQyxFQUNsQyxNQUFrQyxFQUNsQyxZQUFZLEdBQUcsU0FBUyxFQUNKLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDOUIsUUFBUTs7OztZQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBQyxDQUM5RCxDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDOzs7O0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBTU0sT0FBTyxDQUFDLElBQStDO1FBQzVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OztZQXhERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFiUSxlQUFlO1lBQ2YscUJBQXFCO1lBRnJCLGtCQUFrQjtZQURsQixZQUFZO1lBU1osUUFBUTtZQUhSLFFBQVE7WUFDUixRQUFRO1lBRlIsUUFBUTtZQUdSLFFBQVE7WUFKUixtQkFBbUI7Ozs7Ozs7O0lBYzFCLG9DQUF3Qjs7Ozs7SUFDeEIsNkJBQWlCOzs7OztJQUdmLG9DQUF3Qzs7Ozs7SUFDeEMsc0NBQWdEOzs7OztJQUNoRCx1Q0FBOEM7Ozs7O0lBQzlDLGlDQUFrQzs7Ozs7SUFDbEMsZ0NBQTZCOzs7OztJQUM3Qiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLG1DQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEFjdGlvbnNPYnNlcnZhYmxlLCBjb21iaW5lRXBpY3MsIEVwaWMsIFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWNjb3VudEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjdGl2ZS1wcm9qZWN0LmVwaWNzJztcbmltcG9ydCB7IExvYWRpbmdCYXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3Mvbm90aWZpY2F0aW9ucy5lcGljcyc7XG5pbXBvcnQgeyBBY3Rpb25SZXNvbHZlckVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2FjdGlvbi1yZXNvbHZlci5lcGljcyc7XG5pbXBvcnQgeyBEYXRFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9kYXQuZXBpY3MnO1xuaW1wb3J0IHsgRGZoRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGZoLmVwaWNzJztcbmltcG9ydCB7IEluZkVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcyc7XG5pbXBvcnQgeyBQcm9FcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9wcm8uZXBpY3MnO1xuaW1wb3J0IHsgU3lzRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4vbW9kZWxzL21vZGVsJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSb290RXBpY3Mge1xuXG4gIHByaXZhdGUgcm9vdEVwaWNTdHJlYW0kO1xuICBwcml2YXRlIHJvb3RFcGljO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckVwaWNzOiBMb2FkaW5nQmFyRXBpY3MsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25FcGljczogTm90aWZpY2F0aW9uc0FQSUVwaWNzLFxuICAgIHByaXZhdGUgYWN0aXZlUHJvamVjdEVwaWNzOiBBY3RpdmVQcm9qZWN0RXBpY3MsXG4gICAgcHJpdmF0ZSBhY2NvdW50RXBpY3M6IEFjY291bnRFcGljcyxcbiAgICBwcml2YXRlIHN5c3RlbUVwaWNzOiBTeXNFcGljcyxcbiAgICBwcml2YXRlIGRmaEVwaWNzOiBEZmhFcGljcyxcbiAgICBwcml2YXRlIGluZkVwaWNzOiBJbmZFcGljcyxcbiAgICBwcml2YXRlIGRhdEVwaWNzOiBEYXRFcGljcyxcbiAgICBwcml2YXRlIHByb0VwaWNzOiBQcm9FcGljcyxcbiAgICBwcml2YXRlIGFjdGlvblJlc29sdmVyOiBBY3Rpb25SZXNvbHZlckVwaWNzXG4gICkge1xuXG4gICAgdGhpcy5yb290RXBpY1N0cmVhbSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMubG9hZGluZ0JhckVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbkVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnN5c3RlbUVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmFjdGl2ZVByb2plY3RFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5hY2NvdW50RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuZGZoRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuaW5mRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuZGF0RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMucHJvRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIC8vIGltcG9ydGFudDogdGhpcyBuZWVkcyB0byBiZSB0aGUgbGFzdCBlcGljIGluXG4gICAgICB0aGlzLmFjdGlvblJlc29sdmVyLmNyZWF0ZUVwaWNzKClcbiAgICApKTtcblxuICAgIHRoaXMucm9vdEVwaWMgPSAoXG4gICAgICBhY3Rpb24kOiBBY3Rpb25zT2JzZXJ2YWJsZTxBY3Rpb24+LFxuICAgICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGU8SUFwcFN0YXRlPixcbiAgICAgIGRlcGVuZGVuY2llcyA9IHVuZGVmaW5lZFxuICAgICk6IE9ic2VydmFibGU8QWN0aW9uPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5yb290RXBpY1N0cmVhbSQucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKGVwaWM6IEVwaWMpID0+IGVwaWMoYWN0aW9uJCwgc3RhdGUkLCBkZXBlbmRlbmNpZXMpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Um9vdEVwaWMoKTogRXBpYzxBY3Rpb248YW55PiwgQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJvb3RFcGljO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXBpYyB0byB0aGUgUm9vdEVwaWMgbWlkZGxld2FyZVxuICAgKiBAcGFyYW0gZXBpYyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIFJvb3RFcGljc1xuICAgKi9cbiAgcHVibGljIGFkZEVwaWMoZXBpYzogRXBpYzxBY3Rpb248YW55PiwgQWN0aW9uPGFueT4sIHZvaWQsIGFueT4pIHtcbiAgICB0aGlzLnJvb3RFcGljU3RyZWFtJC5uZXh0KGVwaWMpO1xuICB9XG59XG4iXX0=