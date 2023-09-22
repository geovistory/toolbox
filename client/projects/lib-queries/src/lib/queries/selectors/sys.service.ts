import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState, ReducerConfigCollection, SysActions, SysConfigSlice, sysDefinitions, SysRelevantClassSlice, sysRoot } from '@kleiolab/lib-redux';
import { SysConfigValue, SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';

class Selector<Slice> {

  slice$ = this.ngRedux.select<Slice>([sysRoot, this.model])

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([sysRoot, this.model, indexKey])

    const key = (x): Observable<M> => this.ngRedux.select<M>([sysRoot, this.model, indexKey, x])

    return { all$, key }
  }
}

// SystemRelevantClass Selectors
class SysSystemRelevantClassSelections extends Selector<SysRelevantClassSlice> {
  public by_pk_entity$ = this.selector<SysSystemRelevantClass>('by_pk_entity');
  public by_fk_class$ = this.selector<ByPk<SysSystemRelevantClass>>('by_fk_class');
  public by_required_by_sources$ = this.selector<ByPk<SysSystemRelevantClass>>('by_required_by_sources');
  public by_required$ = this.selector<ByPk<SysSystemRelevantClass>>('by_required');

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

// // AnalysisType Selectors
// class SysAnalysisTypeSelections extends Selector<SysAnalysisTypeSlice> {
//   public by_pk_entity$ = this.selector<SysAnalysisType>('by_pk_entity');
//   constructor(
//     public ngRedux: NgRedux<IAppState>,
//     public configs: ReducerConfigCollection,
//     public model: string
//   ) { super(ngRedux, configs, model) }
// }


// Config Selectors
class SysConfigSelections extends Selector<SysConfigSlice> {
  public main$ = this.ngRedux.select<SysConfigValue>([sysRoot, this.model, 'by_main', 'main'])

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

@Injectable({
  providedIn: 'root'
})
export class SysSelector extends SysActions {
  system_relevant_class$ = new SysSystemRelevantClassSelections(this.ngRedux, sysDefinitions, 'system_relevant_class')
  // analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')

  config$ = new SysConfigSelections(this.ngRedux, sysDefinitions, 'config')
}
