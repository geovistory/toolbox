import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { InfSelector } from '../../../../../lib-redux/src/lib/redux-store/data/inf/inf.selectors';
import { DatSelector } from '../selectors/dat.service';
import { DfhSelector } from '../selectors/dfh.service';
import { ProSelector } from '../selectors/pro.service';
import { SysSelector } from '../selectors/sys.service';
import { TabSelector } from '../selectors/tab.service';

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
@Injectable({
  providedIn: 'root'
})
export class SchemaSelectorsService {
  inf$: InfSelector;

  constructor(
    ngRedux: NgRedux<IAppState>,
    public dat$: DatSelector,
    public tab$: TabSelector,
    public pro$: ProSelector,
    public dfh$: DfhSelector,
    public sys$: SysSelector,
  ) {
    const pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']).pipe(
      filter(p => p !== undefined),
      distinctUntilChanged((x, y) => {
        return x === y
      })
    );
    this.inf$ = new InfSelector(ngRedux, pkProject$);
  }
}
