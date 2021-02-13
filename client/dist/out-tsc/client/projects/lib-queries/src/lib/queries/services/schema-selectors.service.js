import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { InfSelector } from '../selectors/inf.service';
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
let SchemaSelectorsService = class SchemaSelectorsService {
    constructor(ngRedux, dat$, tab$, pro$, dfh$, sys$) {
        this.dat$ = dat$;
        this.tab$ = tab$;
        this.pro$ = pro$;
        this.dfh$ = dfh$;
        this.sys$ = sys$;
        const pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter(p => p !== undefined), distinctUntilChanged((x, y) => {
            return x === y;
        }));
        this.inf$ = new InfSelector(ngRedux, pkProject$);
    }
};
SchemaSelectorsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SchemaSelectorsService);
export { SchemaSelectorsService };
//# sourceMappingURL=schema-selectors.service.js.map