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
    { type: Injectable }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvcm9vdC9yb290LWVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXFCLFlBQVksRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFLbEYsTUFBTSxPQUFPLFNBQVM7Ozs7Ozs7Ozs7Ozs7SUFLcEIsWUFDVSxlQUFnQyxFQUNoQyxpQkFBd0MsRUFDeEMsa0JBQXNDLEVBQ3RDLFlBQTBCLEVBQzFCLFdBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLGNBQW1DO1FBVG5DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQVU7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFHM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEVBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxFQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUMzQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FDbEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVE7Ozs7OztRQUFHLENBQ2QsT0FBa0MsRUFDbEMsTUFBa0MsRUFDbEMsWUFBWSxHQUFHLFNBQVMsRUFDSixFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzlCLFFBQVE7Ozs7WUFBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQUMsQ0FDOUQsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO0lBQ0gsQ0FBQzs7OztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQU1NLE9BQU8sQ0FBQyxJQUErQztRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUF0REYsVUFBVTs7OztZQWJGLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsa0JBQWtCO1lBQ2xCLFlBQVk7WUFDWixRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLG1CQUFtQjs7Ozs7OztJQU8xQixvQ0FBd0I7Ozs7O0lBQ3hCLDZCQUFpQjs7Ozs7SUFHZixvQ0FBd0M7Ozs7O0lBQ3hDLHNDQUFnRDs7Ozs7SUFDaEQsdUNBQThDOzs7OztJQUM5QyxpQ0FBa0M7Ozs7O0lBQ2xDLGdDQUE2Qjs7Ozs7SUFDN0IsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQixtQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSwgY29tYmluZUVwaWNzLCBFcGljLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvYWRpbmdCYXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3Mvbm90aWZpY2F0aW9ucy5lcGljcyc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MvYWN0aXZlLXByb2plY3QuZXBpY3MnO1xuaW1wb3J0IHsgQWNjb3VudEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MnO1xuaW1wb3J0IHsgU3lzRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzJztcbmltcG9ydCB7IERmaEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcyc7XG5pbXBvcnQgeyBJbmZFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9pbmYuZXBpY3MnO1xuaW1wb3J0IHsgRGF0RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzJztcbmltcG9ydCB7IFByb0VwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3Byby5lcGljcyc7XG5pbXBvcnQgeyBBY3Rpb25SZXNvbHZlckVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2FjdGlvbi1yZXNvbHZlci5lcGljcyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuL21vZGVscy9tb2RlbCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvb3RFcGljcyB7XG5cbiAgcHJpdmF0ZSByb290RXBpY1N0cmVhbSQ7XG4gIHByaXZhdGUgcm9vdEVwaWM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyRXBpY3M6IExvYWRpbmdCYXJFcGljcyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkVwaWNzOiBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG4gICAgcHJpdmF0ZSBhY3RpdmVQcm9qZWN0RXBpY3M6IEFjdGl2ZVByb2plY3RFcGljcyxcbiAgICBwcml2YXRlIGFjY291bnRFcGljczogQWNjb3VudEVwaWNzLFxuICAgIHByaXZhdGUgc3lzdGVtRXBpY3M6IFN5c0VwaWNzLFxuICAgIHByaXZhdGUgZGZoRXBpY3M6IERmaEVwaWNzLFxuICAgIHByaXZhdGUgaW5mRXBpY3M6IEluZkVwaWNzLFxuICAgIHByaXZhdGUgZGF0RXBpY3M6IERhdEVwaWNzLFxuICAgIHByaXZhdGUgcHJvRXBpY3M6IFByb0VwaWNzLFxuICAgIHByaXZhdGUgYWN0aW9uUmVzb2x2ZXI6IEFjdGlvblJlc29sdmVyRXBpY3NcbiAgKSB7XG5cbiAgICB0aGlzLnJvb3RFcGljU3RyZWFtJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5sb2FkaW5nQmFyRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuc3lzdGVtRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuYWN0aXZlUHJvamVjdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmFjY291bnRFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5kZmhFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5pbmZFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5kYXRFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5wcm9FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgLy8gaW1wb3J0YW50OiB0aGlzIG5lZWRzIHRvIGJlIHRoZSBsYXN0IGVwaWMgaW5cbiAgICAgIHRoaXMuYWN0aW9uUmVzb2x2ZXIuY3JlYXRlRXBpY3MoKVxuICAgICkpO1xuXG4gICAgdGhpcy5yb290RXBpYyA9IChcbiAgICAgIGFjdGlvbiQ6IEFjdGlvbnNPYnNlcnZhYmxlPEFjdGlvbj4sXG4gICAgICBzdGF0ZSQ6IFN0YXRlT2JzZXJ2YWJsZTxJQXBwU3RhdGU+LFxuICAgICAgZGVwZW5kZW5jaWVzID0gdW5kZWZpbmVkXG4gICAgKTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3RFcGljU3RyZWFtJC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoZXBpYzogRXBpYykgPT4gZXBpYyhhY3Rpb24kLCBzdGF0ZSQsIGRlcGVuZGVuY2llcykpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRSb290RXBpYygpOiBFcGljPEFjdGlvbjxhbnk+LCBBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVwaWM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlcGljIHRvIHRoZSBSb290RXBpYyBtaWRkbGV3YXJlXG4gICAqIEBwYXJhbSBlcGljIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgUm9vdEVwaWNzXG4gICAqL1xuICBwdWJsaWMgYWRkRXBpYyhlcGljOiBFcGljPEFjdGlvbjxhbnk+LCBBY3Rpb248YW55Piwgdm9pZCwgYW55Pikge1xuICAgIHRoaXMucm9vdEVwaWNTdHJlYW0kLm5leHQoZXBpYyk7XG4gIH1cbn1cbiJdfQ==