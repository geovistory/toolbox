/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/war.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { warRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
export class WarActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
    }
}
WarActions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WarActions.ctorParameters = () => [
    { type: NgRedux }
];
if (false) {
    /** @type {?} */
    WarActions.prototype.entity_preview;
    /** @type {?} */
    WarActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy93YXIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUcxRSxNQUFNLE9BQU8sVUFBVTs7OztJQUdyQixZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUY5QyxtQkFBYyxHQUFHLElBQUksb0JBQW9CLENBQTBDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUUzRixDQUFDOzs7WUFKcEQsVUFBVTs7OztZQVJGLE9BQU87Ozs7SUFVZCxvQ0FBNkk7O0lBRWpJLDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdhckVudGl0eVByZXZpZXcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlld1NsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IHdhclJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdhckFjdGlvbnMge1xuICBlbnRpdHlfcHJldmlldyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxXYXJFbnRpdHlQcmV2aWV3U2xpY2UsIFdhckVudGl0eVByZXZpZXc+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMod2FyUm9vdCwgJ2VudGl0eV9wcmV2aWV3JylcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cbn1cbiJdfQ==