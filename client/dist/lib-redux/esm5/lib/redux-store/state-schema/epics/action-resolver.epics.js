/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/action-resolver.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
var ActionResolverEpics = /** @class */ (function () {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    function ActionResolverEpics() {
        var _this = this;
        this.createEpics = (/**
         * @return {?}
         */
        function () { return combineEpics(_this.createResolveEpic()); });
    }
    /**
     * @private
     * @return {?}
     */
    ActionResolverEpics.prototype.createResolveEpic = /**
     * @private
     * @return {?}
     */
    function () {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(filter((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return !!action && !!action.meta && !!action.meta.removePending; })), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } })); }))); });
    };
    ActionResolverEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActionResolverEpics.ctorParameters = function () { return []; };
    /** @nocollapse */ ActionResolverEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActionResolverEpics_Factory() { return new ActionResolverEpics(); }, token: ActionResolverEpics, providedIn: "root" });
    return ActionResolverEpics;
}());
export { ActionResolverEpics };
if (false) {
    /** @type {?} */
    ActionResolverEpics.prototype.createEpics;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLXJlc29sdmVyLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvYWN0aW9uLXJlc29sdmVyLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXFCLFlBQVksRUFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFbkQ7SUFLRSxvRUFBb0U7SUFFcEU7UUFBQSxpQkFBaUI7UUFFakIsZ0JBQVc7OztRQUFHLGNBQU0sT0FBQSxZQUFZLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBdEMsQ0FBc0MsRUFBQztJQUYzQyxDQUFDOzs7OztJQUdULCtDQUFpQjs7OztJQUF6QjtRQUNFOzs7OztRQUFPLFVBQUMsT0FBK0IsRUFBRSxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUM3RCxNQUFNOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBeEQsQ0FBd0QsRUFBQyxFQUUxRSxTQUFTOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBOUUsQ0FBOEUsRUFBQyxDQUNwRyxFQUprRCxDQUlsRCxFQUFBO0lBQ0gsQ0FBQzs7Z0JBaEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzhCQVBEO0NBeUJDLEFBcEJELElBb0JDO1NBakJZLG1CQUFtQjs7O0lBTTlCLDBDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnNPYnNlcnZhYmxlLCBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY3Rpb25SZXNvbHZlckVwaWNzIHtcblxuICAvLyByZXF1ZXN0TWFwOiB7IFt1dWlkOiBzdHJpbmddOiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPGFueT4gfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgY3JlYXRlRXBpY3MgPSAoKSA9PiBjb21iaW5lRXBpY3ModGhpcy5jcmVhdGVSZXNvbHZlRXBpYygpKTtcbiAgcHJpdmF0ZSBjcmVhdGVSZXNvbHZlRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQ6IEFjdGlvbnNPYnNlcnZhYmxlPGFueT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBmaWx0ZXIoYWN0aW9uID0+ICEhYWN0aW9uICYmICEhYWN0aW9uLm1ldGEgJiYgISFhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nKSxcblxuICAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiAob2YoeyB0eXBlOiAnQ0xFQU5fVVBfUkVTT0xWRUQnLCBtZXRhOiB7IHV1aWQ6IGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmcgfSB9KSkpLFxuICAgIClcbiAgfVxuXG5cblxufVxuIl19