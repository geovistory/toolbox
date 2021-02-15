/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/tab.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { tabRoot } from '../reducer-configs/tab.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
export class TabActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.cell = new SchemaActionsFactory(this.ngRedux).createCrudActions(tabRoot, 'cell');
    }
}
TabActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TabActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ TabActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TabActions_Factory() { return new TabActions(i0.ɵɵinject(i1.NgRedux)); }, token: TabActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    TabActions.prototype.cell;
    /** @type {?} */
    TabActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy90YWIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7O0FBTTFFLE1BQU0sT0FBTyxVQUFVOzs7O0lBSXJCLFlBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBRjlDLFNBQUksR0FBRyxJQUFJLG9CQUFvQixDQUF3QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXJELENBQUM7OztZQVBwRCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFYUSxPQUFPOzs7OztJQWNkLDBCQUF1Rzs7SUFFM0YsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYkNlbGwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgVGFiQ2VsbFNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL3RhYi5tb2RlbHMnO1xuaW1wb3J0IHsgdGFiUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy90YWIuY29uZmlnJztcbmltcG9ydCB7IFNjaGVtYUFjdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGFiQWN0aW9ucyB7XG5cbiAgY2VsbCA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxUYWJDZWxsU2xpY2UsIFRhYkNlbGw+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnModGFiUm9vdCwgJ2NlbGwnKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=