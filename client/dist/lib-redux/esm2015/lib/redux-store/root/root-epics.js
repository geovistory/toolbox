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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvcm9vdC9yb290LWVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXFCLFlBQVksRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlHLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFJL0QsTUFBTSxPQUFPLFNBQVM7Ozs7Ozs7Ozs7Ozs7SUFLcEIsWUFDVSxlQUFnQyxFQUNoQyxpQkFBd0MsRUFDeEMsa0JBQXNDLEVBQ3RDLFlBQTBCLEVBQzFCLFdBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLGNBQW1DO1FBVG5DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQVU7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFHM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEVBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxFQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUMzQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FDbEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVE7Ozs7OztRQUFHLENBQ2QsT0FBa0MsRUFDbEMsTUFBa0MsRUFDbEMsWUFBWSxHQUFHLFNBQVMsRUFDSixFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQzlCLFFBQVE7Ozs7WUFBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQUMsQ0FDOUQsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO0lBQ0gsQ0FBQzs7OztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQU1NLE9BQU8sQ0FBQyxJQUErQztRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUF0REYsVUFBVTs7OztZQUxnQyxlQUFlO1lBQUUscUJBQXFCO1lBQTFELGtCQUFrQjtZQUFoQyxZQUFZO1lBQzRCLFFBQVE7WUFBdEMsUUFBUTtZQUFFLFFBQVE7WUFBNUIsUUFBUTtZQUFzQixRQUFRO1lBQ3RDLG1CQUFtQjs7Ozs7OztJQU0xQixvQ0FBd0I7Ozs7O0lBQ3hCLDZCQUFpQjs7Ozs7SUFHZixvQ0FBd0M7Ozs7O0lBQ3hDLHNDQUFnRDs7Ozs7SUFDaEQsdUNBQThDOzs7OztJQUM5QyxpQ0FBa0M7Ozs7O0lBQ2xDLGdDQUE2Qjs7Ozs7SUFDN0IsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQixtQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSwgY29tYmluZUVwaWNzLCBFcGljLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjY291bnRFcGljcywgQWN0aXZlUHJvamVjdEVwaWNzLCBMb2FkaW5nQmFyRXBpY3MsIE5vdGlmaWNhdGlvbnNBUElFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcyc7XG5pbXBvcnQgeyBEYXRFcGljcywgRGZoRXBpY3MsIEluZkVwaWNzLCBQcm9FcGljcywgU3lzRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MnO1xuaW1wb3J0IHsgQWN0aW9uUmVzb2x2ZXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9faGVscGVycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuL21vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb290RXBpY3Mge1xuXG4gIHByaXZhdGUgcm9vdEVwaWNTdHJlYW0kO1xuICBwcml2YXRlIHJvb3RFcGljO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckVwaWNzOiBMb2FkaW5nQmFyRXBpY3MsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25FcGljczogTm90aWZpY2F0aW9uc0FQSUVwaWNzLFxuICAgIHByaXZhdGUgYWN0aXZlUHJvamVjdEVwaWNzOiBBY3RpdmVQcm9qZWN0RXBpY3MsXG4gICAgcHJpdmF0ZSBhY2NvdW50RXBpY3M6IEFjY291bnRFcGljcyxcbiAgICBwcml2YXRlIHN5c3RlbUVwaWNzOiBTeXNFcGljcyxcbiAgICBwcml2YXRlIGRmaEVwaWNzOiBEZmhFcGljcyxcbiAgICBwcml2YXRlIGluZkVwaWNzOiBJbmZFcGljcyxcbiAgICBwcml2YXRlIGRhdEVwaWNzOiBEYXRFcGljcyxcbiAgICBwcml2YXRlIHByb0VwaWNzOiBQcm9FcGljcyxcbiAgICBwcml2YXRlIGFjdGlvblJlc29sdmVyOiBBY3Rpb25SZXNvbHZlckVwaWNzXG4gICkge1xuXG4gICAgdGhpcy5yb290RXBpY1N0cmVhbSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMubG9hZGluZ0JhckVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbkVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLnN5c3RlbUVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmFjdGl2ZVByb2plY3RFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5hY2NvdW50RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuZGZoRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuaW5mRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuZGF0RXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMucHJvRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIC8vIGltcG9ydGFudDogdGhpcyBuZWVkcyB0byBiZSB0aGUgbGFzdCBlcGljIGluXG4gICAgICB0aGlzLmFjdGlvblJlc29sdmVyLmNyZWF0ZUVwaWNzKClcbiAgICApKTtcblxuICAgIHRoaXMucm9vdEVwaWMgPSAoXG4gICAgICBhY3Rpb24kOiBBY3Rpb25zT2JzZXJ2YWJsZTxBY3Rpb24+LFxuICAgICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGU8SUFwcFN0YXRlPixcbiAgICAgIGRlcGVuZGVuY2llcyA9IHVuZGVmaW5lZFxuICAgICk6IE9ic2VydmFibGU8QWN0aW9uPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5yb290RXBpY1N0cmVhbSQucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKGVwaWM6IEVwaWMpID0+IGVwaWMoYWN0aW9uJCwgc3RhdGUkLCBkZXBlbmRlbmNpZXMpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Um9vdEVwaWMoKTogRXBpYzxBY3Rpb248YW55PiwgQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJvb3RFcGljO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXBpYyB0byB0aGUgUm9vdEVwaWMgbWlkZGxld2FyZVxuICAgKiBAcGFyYW0gZXBpYyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIFJvb3RFcGljc1xuICAgKi9cbiAgcHVibGljIGFkZEVwaWMoZXBpYzogRXBpYzxBY3Rpb248YW55PiwgQWN0aW9uPGFueT4sIHZvaWQsIGFueT4pIHtcbiAgICB0aGlzLnJvb3RFcGljU3RyZWFtJC5uZXh0KGVwaWMpO1xuICB9XG59XG4iXX0=