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
var RootEpics = /** @class */ (function () {
    function RootEpics(loadingBarEpics, notificationEpics, activeProjectEpics, accountEpics, sysEpics, dfhEpics, infEpics, datEpics, proEpics, schemaObjectEpics, actionResolver) {
        var _this = this;
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
        { type: SchemaEpics },
        { type: ActionResolverEpics }
    ]; };
    /** @nocollapse */ RootEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RootEpics_Factory() { return new RootEpics(i0.ɵɵinject(i1.LoadingBarEpics), i0.ɵɵinject(i2.NotificationsAPIEpics), i0.ɵɵinject(i3.ActiveProjectEpics), i0.ɵɵinject(i4.AccountEpics), i0.ɵɵinject(i5.SysEpics), i0.ɵɵinject(i6.DfhEpics), i0.ɵɵinject(i7.InfEpics), i0.ɵɵinject(i8.DatEpics), i0.ɵɵinject(i9.ProEpics), i0.ɵɵinject(i10.SchemaEpics), i0.ɵɵinject(i11.ActionResolverEpics)); }, token: RootEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInJvb3Qvcm9vdC1lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFxQixZQUFZLEVBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFDckcsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUkzRDtJQVFFLG1CQUNVLGVBQWdDLEVBQ2hDLGlCQUF3QyxFQUN4QyxrQkFBc0MsRUFDdEMsWUFBMEIsRUFDMUIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsaUJBQThCLEVBQzlCLGNBQW1DO1FBWDdDLGlCQXNDQztRQXJDUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWE7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBRzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsWUFBWSxDQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxFQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtRQUNwQywrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FDbEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVE7Ozs7OztRQUFHLFVBQ2QsT0FBa0MsRUFDbEMsTUFBa0MsRUFDbEMsWUFBd0I7WUFBeEIsNkJBQUEsRUFBQSx3QkFBd0I7WUFFeEIsT0FBTyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDOUIsUUFBUTs7OztZQUFDLFVBQUMsSUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQW5DLENBQW1DLEVBQUMsQ0FDOUQsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO0lBQ0gsQ0FBQzs7OztJQUVNLCtCQUFXOzs7SUFBbEI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0ksMkJBQU87Ozs7O0lBQWQsVUFBZSxJQUErQztRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOztnQkExREYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFkUSxlQUFlO2dCQUNmLHFCQUFxQjtnQkFGckIsa0JBQWtCO2dCQURsQixZQUFZO2dCQVVaLFFBQVE7Z0JBSlIsUUFBUTtnQkFDUixRQUFRO2dCQUZSLFFBQVE7Z0JBR1IsUUFBUTtnQkFDUixXQUFXO2dCQUxYLG1CQUFtQjs7O29CQVQ1QjtDQThFQyxBQTNERCxJQTJEQztTQXhEWSxTQUFTOzs7Ozs7SUFFcEIsb0NBQXdCOzs7OztJQUN4Qiw2QkFBaUI7Ozs7O0lBR2Ysb0NBQXdDOzs7OztJQUN4QyxzQ0FBZ0Q7Ozs7O0lBQ2hELHVDQUE4Qzs7Ozs7SUFDOUMsaUNBQWtDOzs7OztJQUNsQyw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsc0NBQXNDOzs7OztJQUN0QyxtQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSwgY29tYmluZUVwaWNzLCBFcGljLCBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjY291bnRFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9hY2NvdW50LmVwaWNzJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9hY3RpdmUtcHJvamVjdC5lcGljcyc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MvbG9hZGluZy1iYXIuZXBpY3MnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL25vdGlmaWNhdGlvbnMuZXBpY3MnO1xuaW1wb3J0IHsgQWN0aW9uUmVzb2x2ZXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9hY3Rpb24tcmVzb2x2ZXIuZXBpY3MnO1xuaW1wb3J0IHsgRGF0RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzJztcbmltcG9ydCB7IERmaEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcyc7XG5pbXBvcnQgeyBJbmZFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9pbmYuZXBpY3MnO1xuaW1wb3J0IHsgUHJvRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvcHJvLmVwaWNzJztcbmltcG9ydCB7IFNjaGVtYUVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3NjaGVtYS5lcGljcyc7XG5pbXBvcnQgeyBTeXNFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9zeXMuZXBpY3MnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi9tb2RlbHMvbW9kZWwnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvb3RFcGljcyB7XG5cbiAgcHJpdmF0ZSByb290RXBpY1N0cmVhbSQ7XG4gIHByaXZhdGUgcm9vdEVwaWM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyRXBpY3M6IExvYWRpbmdCYXJFcGljcyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkVwaWNzOiBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG4gICAgcHJpdmF0ZSBhY3RpdmVQcm9qZWN0RXBpY3M6IEFjdGl2ZVByb2plY3RFcGljcyxcbiAgICBwcml2YXRlIGFjY291bnRFcGljczogQWNjb3VudEVwaWNzLFxuICAgIHByaXZhdGUgc3lzRXBpY3M6IFN5c0VwaWNzLFxuICAgIHByaXZhdGUgZGZoRXBpY3M6IERmaEVwaWNzLFxuICAgIHByaXZhdGUgaW5mRXBpY3M6IEluZkVwaWNzLFxuICAgIHByaXZhdGUgZGF0RXBpY3M6IERhdEVwaWNzLFxuICAgIHByaXZhdGUgcHJvRXBpY3M6IFByb0VwaWNzLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0RXBpY3M6IFNjaGVtYUVwaWNzLFxuICAgIHByaXZhdGUgYWN0aW9uUmVzb2x2ZXI6IEFjdGlvblJlc29sdmVyRXBpY3NcbiAgKSB7XG5cbiAgICB0aGlzLnJvb3RFcGljU3RyZWFtJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5sb2FkaW5nQmFyRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuYWN0aXZlUHJvamVjdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmFjY291bnRFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5zeXNFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5kZmhFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5pbmZFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5kYXRFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5wcm9FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5zY2hlbWFPYmplY3RFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgLy8gaW1wb3J0YW50OiB0aGlzIG5lZWRzIHRvIGJlIHRoZSBsYXN0IGVwaWMgaW5cbiAgICAgIHRoaXMuYWN0aW9uUmVzb2x2ZXIuY3JlYXRlRXBpY3MoKVxuICAgICkpO1xuXG4gICAgdGhpcy5yb290RXBpYyA9IChcbiAgICAgIGFjdGlvbiQ6IEFjdGlvbnNPYnNlcnZhYmxlPEFjdGlvbj4sXG4gICAgICBzdGF0ZSQ6IFN0YXRlT2JzZXJ2YWJsZTxJQXBwU3RhdGU+LFxuICAgICAgZGVwZW5kZW5jaWVzID0gdW5kZWZpbmVkXG4gICAgKTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3RFcGljU3RyZWFtJC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoZXBpYzogRXBpYykgPT4gZXBpYyhhY3Rpb24kLCBzdGF0ZSQsIGRlcGVuZGVuY2llcykpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRSb290RXBpYygpOiBFcGljPEFjdGlvbjxhbnk+LCBBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVwaWM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlcGljIHRvIHRoZSBSb290RXBpYyBtaWRkbGV3YXJlXG4gICAqIEBwYXJhbSBlcGljIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgUm9vdEVwaWNzXG4gICAqL1xuICBwdWJsaWMgYWRkRXBpYyhlcGljOiBFcGljPEFjdGlvbjxhbnk+LCBBY3Rpb248YW55Piwgdm9pZCwgYW55Pikge1xuICAgIHRoaXMucm9vdEVwaWNTdHJlYW0kLm5leHQoZXBpYyk7XG4gIH1cbn1cbiJdfQ==