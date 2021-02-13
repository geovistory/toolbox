import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@kleiolab/lib-redux';
import { InfSelector } from '../selectors/inf.service';
import { DatSelector } from '../selectors/dat.service';
import { TabSelector } from '../selectors/tab.service';
import { ProSelector } from '../selectors/pro.service';
import { DfhSelector } from '../selectors/dfh.service';
import { SysSelector } from '../selectors/sys.service';
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
export declare class SchemaSelectorsService {
    dat$: DatSelector;
    tab$: TabSelector;
    pro$: ProSelector;
    dfh$: DfhSelector;
    sys$: SysSelector;
    inf$: InfSelector;
    constructor(ngRedux: NgRedux<IAppState>, dat$: DatSelector, tab$: TabSelector, pro$: ProSelector, dfh$: DfhSelector, sys$: SysSelector);
}
