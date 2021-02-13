/**
 * @fileoverview added by tsickle
 * Generated from: services/schema-selectors.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCdkQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7O0lBR2pDLFlBQ0UsT0FBMkIsRUFDcEIsSUFBaUIsRUFDakIsSUFBaUIsRUFDakIsSUFBaUIsRUFDakIsSUFBaUIsRUFDakIsSUFBaUI7UUFKakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFhOztjQUVsQixVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBUyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0UsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBQyxFQUM1QixvQkFBb0I7Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hCLENBQUMsRUFBQyxDQUNIO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7O1lBckJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXhCUSxPQUFPO1lBS1AsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsV0FBVztZQUNYLFdBQVc7Ozs7O0lBaUJsQixzQ0FBa0I7O0lBSWhCLHNDQUF3Qjs7SUFDeEIsc0NBQXdCOztJQUN4QixzQ0FBd0I7O0lBQ3hCLHNDQUF3Qjs7SUFDeEIsc0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluZlNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2luZi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdFNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2RhdC5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYlNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RhYi5zZXJ2aWNlJztcbmltcG9ydCB7IFByb1NlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3Byby5zZXJ2aWNlJztcbmltcG9ydCB7IERmaFNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2RmaC5zZXJ2aWNlJztcbmltcG9ydCB7IFN5c1NlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3N5cy5zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIGFjY2VzcyB0byB0aGUgcGFydCBvZiB0aGUgcmVkdXggc3RvcmVcbiAqIHRoYXQgbWlycm9ycyB0aGUgZ2VvdmlzdG9yeSBzY2hlbWEgKGluZiwgZGF0LCBzeXMsIGV0Yy4pXG4gKlxuICogVGhlIHNlbGVjb3JzIG9mIGluZiBhcmUgd3JhcHBlZCBpbnRvIGhlbHBlcnMgdGhhdCBzZWxlY3RcbiAqIHRoZSBpdGVtcyB0aGF0IGFyZSBpbiB0aGUgY3VycmVudCBwcm9qZWN0IChyZWR1eC5hY3RpdmVQcm9qZWN0KVxuICogdXNpbmcgcHJvLmluZm9fcHJval9yZWxcbiAqXG4gKiBBbGwgb3RoZXIgc2VsZWN0b3JzIChkYXQsIHN5cywgdGFiLCBwcm8sIGRmaCkgYXJlIGRpcmVjdGx5XG4gKiBhY2Nlc3NpbmcgdGhlIHN0b3JlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIHtcbiAgaW5mJDogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBkYXQkOiBEYXRTZWxlY3RvcixcbiAgICBwdWJsaWMgdGFiJDogVGFiU2VsZWN0b3IsXG4gICAgcHVibGljIHBybyQ6IFByb1NlbGVjdG9yLFxuICAgIHB1YmxpYyBkZmgkOiBEZmhTZWxlY3RvcixcbiAgICBwdWJsaWMgc3lzJDogU3lzU2VsZWN0b3IsXG4gICkge1xuICAgIGNvbnN0IHBrUHJvamVjdCQgPSBuZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsnYWN0aXZlUHJvamVjdCcsICdwa19wcm9qZWN0J10pLnBpcGUoXG4gICAgICBmaWx0ZXIocCA9PiBwICE9PSB1bmRlZmluZWQpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHgsIHkpID0+IHtcbiAgICAgICAgcmV0dXJuIHggPT09IHlcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLmluZiQgPSBuZXcgSW5mU2VsZWN0b3IobmdSZWR1eCwgcGtQcm9qZWN0JCk7XG4gIH1cbn1cbiJdfQ==