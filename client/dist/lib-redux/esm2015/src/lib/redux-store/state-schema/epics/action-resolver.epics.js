/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/action-resolver.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class ActionResolverEpics {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    constructor() {
        this.createEpics = (/**
         * @return {?}
         */
        () => combineEpics(this.createResolveEpic()));
    }
    /**
     * @private
     * @return {?}
     */
    createResolveEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(filter((/**
         * @param {?} action
         * @return {?}
         */
        action => !!action && !!action.meta && !!action.meta.removePending)), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } }))))));
    }
}
ActionResolverEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActionResolverEpics.ctorParameters = () => [];
/** @nocollapse */ ActionResolverEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActionResolverEpics_Factory() { return new ActionResolverEpics(); }, token: ActionResolverEpics, providedIn: "root" });
if (false) {
    /** @type {?} */
    ActionResolverEpics.prototype.createEpics;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLXJlc29sdmVyLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2FjdGlvbi1yZXNvbHZlci5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRixPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBS25ELE1BQU0sT0FBTyxtQkFBbUI7O0lBSTlCO1FBRUEsZ0JBQVc7OztRQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFDO0lBRjNDLENBQUM7Ozs7O0lBR1QsaUJBQWlCO1FBQ3ZCOzs7OztRQUFPLENBQUMsT0FBK0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzdELE1BQU07Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFDLEVBRTFFLFNBQVM7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQ3BHLEVBQUE7SUFDSCxDQUFDOzs7WUFoQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7O0lBT0MsMENBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uc09ic2VydmFibGUsIGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvblJlc29sdmVyRXBpY3Mge1xuXG4gIC8vIHJlcXVlc3RNYXA6IHsgW3V1aWQ6IHN0cmluZ106IEFjdGlvblJlc3VsdE9ic2VydmFibGU8YW55PiB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBjcmVhdGVFcGljcyA9ICgpID0+IGNvbWJpbmVFcGljcyh0aGlzLmNyZWF0ZVJlc29sdmVFcGljKCkpO1xuICBwcml2YXRlIGNyZWF0ZVJlc29sdmVFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJDogQWN0aW9uc09ic2VydmFibGU8YW55Piwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIGZpbHRlcihhY3Rpb24gPT4gISFhY3Rpb24gJiYgISFhY3Rpb24ubWV0YSAmJiAhIWFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmcpLFxuXG4gICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IChvZih7IHR5cGU6ICdDTEVBTl9VUF9SRVNPTFZFRCcsIG1ldGE6IHsgdXVpZDogYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZyB9IH0pKSksXG4gICAgKVxuICB9XG5cblxuXG59XG4iXX0=