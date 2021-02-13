/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/schema-selectors.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { InfSelector } from '../selectors/inf.service';
import { DatSelector } from '../selectors/dat.service';
import { TabSelector } from '../selectors/tab.service';
import { ProSelector } from '../selectors/pro.service';
import { DfhSelector } from '../selectors/dfh.service';
import { SysSelector } from '../selectors/sys.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
import * as i2 from "../selectors/dat.service";
import * as i3 from "../selectors/tab.service";
import * as i4 from "../selectors/pro.service";
import * as i5 from "../selectors/dfh.service";
import * as i6 from "../selectors/sys.service";
/**
 * This class provides access to the part of the redux store
 * that mirrors the geovistory schema (inf, dat, sys, etc.)
 *
 * The selecors of inf are wrapped into helpers that select
 * the items that are in the current project (redux.activeProject)
 * using pro.info_proj_rel
 *
 * All other selectors (dat, sys, tab, pro, dfh) are directly
 * accessing the store.
 */
export class SchemaSelectorsService {
    /**
     * @param {?} ngRedux
     * @param {?} dat$
     * @param {?} tab$
     * @param {?} pro$
     * @param {?} dfh$
     * @param {?} sys$
     */
    constructor(ngRedux, dat$, tab$, pro$, dfh$, sys$) {
        this.dat$ = dat$;
        this.tab$ = tab$;
        this.pro$ = pro$;
        this.dfh$ = dfh$;
        this.sys$ = sys$;
        /** @type {?} */
        const pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        p => p !== undefined)), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        (x, y) => {
            return x === y;
        })));
        this.inf$ = new InfSelector(ngRedux, pkProject$);
    }
}
SchemaSelectorsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaSelectorsService.ctorParameters = () => [
    { type: NgRedux },
    { type: DatSelector },
    { type: TabSelector },
    { type: ProSelector },
    { type: DfhSelector },
    { type: SysSelector }
];
/** @nocollapse */ SchemaSelectorsService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SchemaSelectorsService_Factory() { return new SchemaSelectorsService(i0.ɵɵinject(i1.NgRedux), i0.ɵɵinject(i2.DatSelector), i0.ɵɵinject(i3.TabSelector), i0.ɵɵinject(i4.ProSelector), i0.ɵɵinject(i5.DfhSelector), i0.ɵɵinject(i6.SysSelector)); }, token: SchemaSelectorsService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SchemaSelectorsService.prototype.inf$;
    /** @type {?} */
    SchemaSelectorsService.prototype.dat$;
    /** @type {?} */
    SchemaSelectorsService.prototype.tab$;
    /** @type {?} */
    SchemaSelectorsService.prototype.pro$;
    /** @type {?} */
    SchemaSelectorsService.prototype.dfh$;
    /** @type {?} */
    SchemaSelectorsService.prototype.sys$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvc2VydmljZXMvc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0J2RCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7Ozs7SUFHakMsWUFDRSxPQUEyQixFQUNwQixJQUFpQixFQUNqQixJQUFpQixFQUNqQixJQUFpQixFQUNqQixJQUFpQixFQUNqQixJQUFpQjtRQUpqQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQWE7O2NBRWxCLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFTLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM3RSxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFDLEVBQzVCLG9CQUFvQjs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEIsQ0FBQyxFQUFDLENBQ0g7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7WUFyQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBeEJRLE9BQU87WUFLUCxXQUFXO1lBQ1gsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsV0FBVzs7Ozs7SUFpQmxCLHNDQUFrQjs7SUFJaEIsc0NBQXdCOztJQUN4QixzQ0FBd0I7O0lBQ3hCLHNDQUF3Qjs7SUFDeEIsc0NBQXdCOztJQUN4QixzQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5mU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvaW5mLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0U2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvZGF0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFiU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvdGFiLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvcHJvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZoU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvZGZoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3lzU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvc3lzLnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBwYXJ0IG9mIHRoZSByZWR1eCBzdG9yZVxuICogdGhhdCBtaXJyb3JzIHRoZSBnZW92aXN0b3J5IHNjaGVtYSAoaW5mLCBkYXQsIHN5cywgZXRjLilcbiAqXG4gKiBUaGUgc2VsZWNvcnMgb2YgaW5mIGFyZSB3cmFwcGVkIGludG8gaGVscGVycyB0aGF0IHNlbGVjdFxuICogdGhlIGl0ZW1zIHRoYXQgYXJlIGluIHRoZSBjdXJyZW50IHByb2plY3QgKHJlZHV4LmFjdGl2ZVByb2plY3QpXG4gKiB1c2luZyBwcm8uaW5mb19wcm9qX3JlbFxuICpcbiAqIEFsbCBvdGhlciBzZWxlY3RvcnMgKGRhdCwgc3lzLCB0YWIsIHBybywgZGZoKSBhcmUgZGlyZWN0bHlcbiAqIGFjY2Vzc2luZyB0aGUgc3RvcmUuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVtYVNlbGVjdG9yc1NlcnZpY2Uge1xuICBpbmYkOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGRhdCQ6IERhdFNlbGVjdG9yLFxuICAgIHB1YmxpYyB0YWIkOiBUYWJTZWxlY3RvcixcbiAgICBwdWJsaWMgcHJvJDogUHJvU2VsZWN0b3IsXG4gICAgcHVibGljIGRmaCQ6IERmaFNlbGVjdG9yLFxuICAgIHB1YmxpYyBzeXMkOiBTeXNTZWxlY3RvcixcbiAgKSB7XG4gICAgY29uc3QgcGtQcm9qZWN0JCA9IG5nUmVkdXguc2VsZWN0PG51bWJlcj4oWydhY3RpdmVQcm9qZWN0JywgJ3BrX3Byb2plY3QnXSkucGlwZShcbiAgICAgIGZpbHRlcihwID0+IHAgIT09IHVuZGVmaW5lZCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4ge1xuICAgICAgICByZXR1cm4geCA9PT0geVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuaW5mJCA9IG5ldyBJbmZTZWxlY3RvcihuZ1JlZHV4LCBwa1Byb2plY3QkKTtcbiAgfVxufVxuIl19