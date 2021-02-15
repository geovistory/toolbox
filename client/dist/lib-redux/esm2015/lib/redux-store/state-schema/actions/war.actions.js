/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/war.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { warRoot } from '../reducer-configs/war.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
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
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WarActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ WarActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WarActions_Factory() { return new WarActions(i0.ɵɵinject(i1.NgRedux)); }, token: WarActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    WarActions.prototype.entity_preview;
    /** @type {?} */
    WarActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3dhci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFLMUUsTUFBTSxPQUFPLFVBQVU7Ozs7SUFHckIsWUFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFGOUMsbUJBQWMsR0FBRyxJQUFJLG9CQUFvQixDQUEwQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFFM0YsQ0FBQzs7O1lBTnBELFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVZRLE9BQU87Ozs7O0lBWWQsb0NBQTZJOztJQUVqSSw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IFdhckVudGl0eVByZXZpZXdTbGljZSB9IGZyb20gJy4uL21vZGVscy93YXIubW9kZWxzJztcbmltcG9ydCB7IHdhclJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3Mvd2FyLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBXYXJBY3Rpb25zIHtcbiAgZW50aXR5X3ByZXZpZXcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8V2FyRW50aXR5UHJldmlld1NsaWNlLCBXYXJFbnRpdHlQcmV2aWV3Pih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKHdhclJvb3QsICdlbnRpdHlfcHJldmlldycpXG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG59XG4iXX0=