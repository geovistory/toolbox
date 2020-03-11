import { NgRedux } from '@angular-redux/store';
import { SysClassHasTypeProperty, SysAnalysisType } from 'app/core';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { ByPk, IAppState } from '../store/model';
import { SysActions } from './sys.actions';
import { sysDefinitions, sysRoot } from './sys.config';
import { SysClassHasTypePropertySlice, SysRelevantClassSlice, SysAnalysisTypeSlice } from './sys.models';
import { Injectable } from "@angular/core";

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


// // ClassHasTypeProperty Selectors
// class SysClassHasTypePropertySelections extends Selector<SysClassHasTypePropertySlice> {
//   public by_pk_entity$ = this.selector<SysClassHasTypeProperty>('by_pk_entity');
//   public by_fk_class$ = this.selector<ByPk<SysClassHasTypeProperty>>('by_fk_class');
//   public by_dfh_pk_property$ = this.selector<ByPk<SysClassHasTypeProperty>>('by_dfh_pk_property');
//   public by_pk_type_class$ = this.selector<ByPk<SysClassHasTypeProperty>>('by_pk_type_class');
//   public by_pk_typed_class$ = this.selector<ByPk<SysClassHasTypeProperty>>('by_pk_typed_class');

//   constructor(
//     public ngRedux: NgRedux<IAppState>,
//     public configs: ReducerConfigCollection,
//     public model: string
//   ) { super(ngRedux, configs, model) }
// }

// AnalysisType Selectors
class SysAnalysisTypeSelections extends Selector<SysAnalysisTypeSlice> {
  public by_pk_entity$ = this.selector<SysAnalysisType>('by_pk_entity');
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}



@Injectable()
export class SystemSelector extends SysActions {
  system_relevant_class$ = new SysSystemRelevantClassSelections(this.ngRedux, sysDefinitions, 'system_relevant_class')
  // class_has_type_property$ = new SysClassHasTypePropertySelections(this.ngRedux, sysDefinitions, 'class_has_type_property')
  analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')
}
