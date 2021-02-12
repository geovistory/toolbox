/**
 * @fileoverview added by tsickle
 * Generated from: root/root-epics.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1lcGljcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInJvb3Qvcm9vdC1lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFxQixZQUFZLEVBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFDckcsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRy9EO0lBTUUsbUJBQ1UsZUFBZ0MsRUFDaEMsaUJBQXdDLEVBQ3hDLGtCQUFzQyxFQUN0QyxZQUEwQixFQUMxQixXQUFxQixFQUNyQixRQUFrQixFQUNsQixRQUFrQixFQUNsQixRQUFrQixFQUNsQixRQUFrQixFQUNsQixjQUFtQztRQVY3QyxpQkFvQ0M7UUFuQ1Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG1CQUFjLEdBQWQsY0FBYyxDQUFxQjtRQUczQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLFlBQVksQ0FDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsRUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEVBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQzNCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUTs7Ozs7O1FBQUcsVUFDZCxPQUFrQyxFQUNsQyxNQUFrQyxFQUNsQyxZQUF3QjtZQUF4Qiw2QkFBQSxFQUFBLHdCQUF3QjtZQUV4QixPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUM5QixRQUFROzs7O1lBQUMsVUFBQyxJQUFVLElBQUssT0FBQSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBbkMsQ0FBbUMsRUFBQyxDQUM5RCxDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDOzs7O0lBRU0sK0JBQVc7OztJQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSSwyQkFBTzs7Ozs7SUFBZCxVQUFlLElBQStDO1FBQzVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7O2dCQXRERixVQUFVOzs7O2dCQUxnQyxlQUFlO2dCQUFFLHFCQUFxQjtnQkFBMUQsa0JBQWtCO2dCQUFoQyxZQUFZO2dCQUM0QixRQUFRO2dCQUF0QyxRQUFRO2dCQUFFLFFBQVE7Z0JBQTVCLFFBQVE7Z0JBQXNCLFFBQVE7Z0JBQ3RDLG1CQUFtQjs7SUEwRDVCLGdCQUFDO0NBQUEsQUF2REQsSUF1REM7U0F0RFksU0FBUzs7Ozs7O0lBRXBCLG9DQUF3Qjs7Ozs7SUFDeEIsNkJBQWlCOzs7OztJQUdmLG9DQUF3Qzs7Ozs7SUFDeEMsc0NBQWdEOzs7OztJQUNoRCx1Q0FBOEM7Ozs7O0lBQzlDLGlDQUFrQzs7Ozs7SUFDbEMsZ0NBQTZCOzs7OztJQUM3Qiw2QkFBMEI7Ozs7O0lBQzFCLDZCQUEwQjs7Ozs7SUFDMUIsNkJBQTBCOzs7OztJQUMxQiw2QkFBMEI7Ozs7O0lBQzFCLG1DQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEFjdGlvbnNPYnNlcnZhYmxlLCBjb21iaW5lRXBpY3MsIEVwaWMsIFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWNjb3VudEVwaWNzLCBBY3RpdmVQcm9qZWN0RXBpY3MsIExvYWRpbmdCYXJFcGljcywgTm90aWZpY2F0aW9uc0FQSUVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzJztcbmltcG9ydCB7IERhdEVwaWNzLCBEZmhFcGljcywgSW5mRXBpY3MsIFByb0VwaWNzLCBTeXNFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcyc7XG5pbXBvcnQgeyBBY3Rpb25SZXNvbHZlckVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL19oZWxwZXJzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4vbW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvb3RFcGljcyB7XG5cbiAgcHJpdmF0ZSByb290RXBpY1N0cmVhbSQ7XG4gIHByaXZhdGUgcm9vdEVwaWM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyRXBpY3M6IExvYWRpbmdCYXJFcGljcyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkVwaWNzOiBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG4gICAgcHJpdmF0ZSBhY3RpdmVQcm9qZWN0RXBpY3M6IEFjdGl2ZVByb2plY3RFcGljcyxcbiAgICBwcml2YXRlIGFjY291bnRFcGljczogQWNjb3VudEVwaWNzLFxuICAgIHByaXZhdGUgc3lzdGVtRXBpY3M6IFN5c0VwaWNzLFxuICAgIHByaXZhdGUgZGZoRXBpY3M6IERmaEVwaWNzLFxuICAgIHByaXZhdGUgaW5mRXBpY3M6IEluZkVwaWNzLFxuICAgIHByaXZhdGUgZGF0RXBpY3M6IERhdEVwaWNzLFxuICAgIHByaXZhdGUgcHJvRXBpY3M6IFByb0VwaWNzLFxuICAgIHByaXZhdGUgYWN0aW9uUmVzb2x2ZXI6IEFjdGlvblJlc29sdmVyRXBpY3NcbiAgKSB7XG5cbiAgICB0aGlzLnJvb3RFcGljU3RyZWFtJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5sb2FkaW5nQmFyRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuc3lzdGVtRXBpY3MuY3JlYXRlRXBpY3MoKSxcbiAgICAgIHRoaXMuYWN0aXZlUHJvamVjdEVwaWNzLmNyZWF0ZUVwaWNzKCksXG4gICAgICB0aGlzLmFjY291bnRFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5kZmhFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5pbmZFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5kYXRFcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgdGhpcy5wcm9FcGljcy5jcmVhdGVFcGljcygpLFxuICAgICAgLy8gaW1wb3J0YW50OiB0aGlzIG5lZWRzIHRvIGJlIHRoZSBsYXN0IGVwaWMgaW5cbiAgICAgIHRoaXMuYWN0aW9uUmVzb2x2ZXIuY3JlYXRlRXBpY3MoKVxuICAgICkpO1xuXG4gICAgdGhpcy5yb290RXBpYyA9IChcbiAgICAgIGFjdGlvbiQ6IEFjdGlvbnNPYnNlcnZhYmxlPEFjdGlvbj4sXG4gICAgICBzdGF0ZSQ6IFN0YXRlT2JzZXJ2YWJsZTxJQXBwU3RhdGU+LFxuICAgICAgZGVwZW5kZW5jaWVzID0gdW5kZWZpbmVkXG4gICAgKTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3RFcGljU3RyZWFtJC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoZXBpYzogRXBpYykgPT4gZXBpYyhhY3Rpb24kLCBzdGF0ZSQsIGRlcGVuZGVuY2llcykpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRSb290RXBpYygpOiBFcGljPEFjdGlvbjxhbnk+LCBBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVwaWM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlcGljIHRvIHRoZSBSb290RXBpYyBtaWRkbGV3YXJlXG4gICAqIEBwYXJhbSBlcGljIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgUm9vdEVwaWNzXG4gICAqL1xuICBwdWJsaWMgYWRkRXBpYyhlcGljOiBFcGljPEFjdGlvbjxhbnk+LCBBY3Rpb248YW55Piwgdm9pZCwgYW55Pikge1xuICAgIHRoaXMucm9vdEVwaWNTdHJlYW0kLm5leHQoZXBpYyk7XG4gIH1cbn1cbiJdfQ==