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
import { SchemaEpics } from '../state-schema/epics/schema.epics';
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
import * as i10 from "../state-schema/epics/schema.epics";
import * as i11 from "../state-schema/epics/action-resolver.epics";
export class RootEpics {
    /**
     * @param {?} loadingBarEpics
     * @param {?} notificationEpics
     * @param {?} activeProjectEpics
     * @param {?} accountEpics
     * @param {?} sysEpics
     * @param {?} dfhEpics
     * @param {?} infEpics
     * @param {?} datEpics
     * @param {?} proEpics
     * @param {?} schemaObjectEpics
     * @param {?} actionResolver
     */
    constructor(loadingBarEpics, notificationEpics, activeProjectEpics, accountEpics, sysEpics, dfhEpics, infEpics, datEpics, proEpics, schemaObjectEpics, actionResolver) {
        this.loadingBarEpics = loadingBarEpics;
        this.notificationEpics = notificationEpics;
        this.activeProjectEpics = activeProjectEpics;
        this.accountEpics = accountEpics;
        this.sysEpics = sysEpics;
        this.dfhEpics = dfhEpics;
        this.infEpics = infEpics;
        this.datEpics = datEpics;
        this.proEpics = proEpics;
        this.schemaObjectEpics = schemaObjectEpics;
        this.actionResolver = actionResolver;
        this.rootEpicStream$ = new BehaviorSubject(combineEpics(this.loadingBarEpics.createEpics(), this.notificationEpics.createEpics(), this.activeProjectEpics.createEpics(), this.accountEpics.createEpics(), this.sysEpics.createEpics(), this.dfhEpics.createEpics(), this.infEpics.createEpics(), this.datEpics.createEpics(), this.proEpics.createEpics(), this.schemaObjectEpics.createEpics(), 
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
    { type: SchemaEpics },
    { type: ActionResolverEpics }
];
/** @nocollapse */ RootEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RootEpics_Factory() { return new RootEpics(i0.ɵɵinject(i1.LoadingBarEpics), i0.ɵɵinject(i2.NotificationsAPIEpics), i0.ɵɵinject(i3.ActiveProjectEpics), i0.ɵɵinject(i4.AccountEpics), i0.ɵɵinject(i5.SysEpics), i0.ɵɵinject(i6.DfhEpics), i0.ɵɵinject(i7.InfEpics), i0.ɵɵinject(i8.DatEpics), i0.ɵɵinject(i9.ProEpics), i0.ɵɵinject(i10.SchemaEpics), i0.ɵɵinject(i11.ActionResolverEpics)); }, token: RootEpics, providedIn: "root" });
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
    RootEpics.prototype.sysEpics;
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
    RootEpics.prototype.schemaObjectEpics;
    /**
     * @type {?}
     * @private
     */
    RootEpics.prototype.actionResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvcm9vdC9yb290LWVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXFCLFlBQVksRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBTzNELE1BQU0sT0FBTyxTQUFTOzs7Ozs7Ozs7Ozs7OztJQUtwQixZQUNVLGVBQWdDLEVBQ2hDLGlCQUF3QyxFQUN4QyxrQkFBc0MsRUFDdEMsWUFBMEIsRUFDMUIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsaUJBQThCLEVBQzlCLGNBQW1DO1FBVm5DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBYTtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFHM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEVBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxFQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFO1FBQ3BDLCtDQUErQztRQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUTs7Ozs7O1FBQUcsQ0FDZCxPQUFrQyxFQUNsQyxNQUFrQyxFQUNsQyxZQUFZLEdBQUcsU0FBUyxFQUNKLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDOUIsUUFBUTs7OztZQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBQyxDQUM5RCxDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDOzs7O0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBTU0sT0FBTyxDQUFDLElBQStDO1FBQzVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OztZQTFERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFkUSxlQUFlO1lBQ2YscUJBQXFCO1lBRnJCLGtCQUFrQjtZQURsQixZQUFZO1lBVVosUUFBUTtZQUpSLFFBQVE7WUFDUixRQUFRO1lBRlIsUUFBUTtZQUdSLFFBQVE7WUFDUixXQUFXO1lBTFgsbUJBQW1COzs7Ozs7OztJQWUxQixvQ0FBd0I7Ozs7O0lBQ3hCLDZCQUFpQjs7Ozs7SUFHZixvQ0FBd0M7Ozs7O0lBQ3hDLHNDQUFnRDs7Ozs7SUFDaEQsdUNBQThDOzs7OztJQUM5QyxpQ0FBa0M7Ozs7O0lBQ2xDLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQixzQ0FBc0M7Ozs7O0lBQ3RDLG1DQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEFjdGlvbnNPYnNlcnZhYmxlLCBjb21iaW5lRXBpY3MsIEVwaWMsIFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWNjb3VudEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjdGl2ZS1wcm9qZWN0LmVwaWNzJztcbmltcG9ydCB7IExvYWRpbmdCYXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3Mvbm90aWZpY2F0aW9ucy5lcGljcyc7XG5pbXBvcnQgeyBBY3Rpb25SZXNvbHZlckVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2FjdGlvbi1yZXNvbHZlci5lcGljcyc7XG5pbXBvcnQgeyBEYXRFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9kYXQuZXBpY3MnO1xuaW1wb3J0IHsgRGZoRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGZoLmVwaWNzJztcbmltcG9ydCB7IEluZkVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcyc7XG5pbXBvcnQgeyBQcm9FcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9wcm8uZXBpY3MnO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3Mvc2NoZW1hLmVwaWNzJztcbmltcG9ydCB7IFN5c0VwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuL21vZGVscy9tb2RlbCc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm9vdEVwaWNzIHtcblxuICBwcml2YXRlIHJvb3RFcGljU3RyZWFtJDtcbiAgcHJpdmF0ZSByb290RXBpYztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJFcGljczogTG9hZGluZ0JhckVwaWNzLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uRXBpY3M6IE5vdGlmaWNhdGlvbnNBUElFcGljcyxcbiAgICBwcml2YXRlIGFjdGl2ZVByb2plY3RFcGljczogQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIHByaXZhdGUgYWNjb3VudEVwaWNzOiBBY2NvdW50RXBpY3MsXG4gICAgcHJpdmF0ZSBzeXNFcGljczogU3lzRXBpY3MsXG4gICAgcHJpdmF0ZSBkZmhFcGljczogRGZoRXBpY3MsXG4gICAgcHJpdmF0ZSBpbmZFcGljczogSW5mRXBpY3MsXG4gICAgcHJpdmF0ZSBkYXRFcGljczogRGF0RXBpY3MsXG4gICAgcHJpdmF0ZSBwcm9FcGljczogUHJvRXBpY3MsXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RFcGljczogU2NoZW1hRXBpY3MsXG4gICAgcHJpdmF0ZSBhY3Rpb25SZXNvbHZlcjogQWN0aW9uUmVzb2x2ZXJFcGljc1xuICApIHtcblxuICAgIHRoaXMucm9vdEVwaWNTdHJlYW0kID0gbmV3IEJlaGF2aW9yU3ViamVjdChjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmxvYWRpbmdCYXJFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5ub3RpZmljYXRpb25FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5hY3RpdmVQcm9qZWN0RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuYWNjb3VudEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnN5c0VwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmRmaEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmluZkVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmRhdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnByb0VwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnNjaGVtYU9iamVjdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICAvLyBpbXBvcnRhbnQ6IHRoaXMgbmVlZHMgdG8gYmUgdGhlIGxhc3QgZXBpYyBpblxuICAgICAgdGhpcy5hY3Rpb25SZXNvbHZlci5jcmVhdGVFcGljcygpXG4gICAgKSk7XG5cbiAgICB0aGlzLnJvb3RFcGljID0gKFxuICAgICAgYWN0aW9uJDogQWN0aW9uc09ic2VydmFibGU8QWN0aW9uPixcbiAgICAgIHN0YXRlJDogU3RhdGVPYnNlcnZhYmxlPElBcHBTdGF0ZT4sXG4gICAgICBkZXBlbmRlbmNpZXMgPSB1bmRlZmluZWRcbiAgICApOiBPYnNlcnZhYmxlPEFjdGlvbj4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdEVwaWNTdHJlYW0kLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChlcGljOiBFcGljKSA9PiBlcGljKGFjdGlvbiQsIHN0YXRlJCwgZGVwZW5kZW5jaWVzKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFJvb3RFcGljKCk6IEVwaWM8QWN0aW9uPGFueT4sIEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yb290RXBpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVwaWMgdG8gdGhlIFJvb3RFcGljIG1pZGRsZXdhcmVcbiAgICogQHBhcmFtIGVwaWMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBSb290RXBpY3NcbiAgICovXG4gIHB1YmxpYyBhZGRFcGljKGVwaWM6IEVwaWM8QWN0aW9uPGFueT4sIEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+KSB7XG4gICAgdGhpcy5yb290RXBpY1N0cmVhbSQubmV4dChlcGljKTtcbiAgfVxufVxuIl19