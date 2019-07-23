import { select, WithSubStore, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { ByPk, IAppState } from '../store/model';
import { SysActions } from './sys.actions';
import { SysClassHasTypeProperty } from 'app/core';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { sysDefinitions, sysRoot } from './sys.config';
import { SysRelevantClassSlice, SysClassHasTypePropertySlice } from './sys.models';
import { filter } from '../../../../node_modules/rxjs/operators';

class Selector<Slice> {

  slice$ = this.ngRedux.select<Slice>([sysRoot, this.model])

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([sysRoot, this.model, indexKey])
      .pipe(filter(x => !!x))

    const key = (x): Observable<M> => this.ngRedux.select<M>([sysRoot, this.model, indexKey, x])
      .pipe(filter(x => !!x))

    return { all$, key }
  }
}

// SystemRelevantClass Selectors
class SysSystemRelevantClassSelections extends Selector<SysRelevantClassSlice> {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_pk_entity$ = this.selector<SysSystemRelevantClass>('by_pk_entity');
  public by_fk_class$ = this.selector<ByPk<SysSystemRelevantClass>>('by_fk_class');
  public by_required_by_sources$ = this.selector<ByPk<SysSystemRelevantClass>>('by_required_by_sources');

}

// ClassHasTypeProperty Selectors
class SysClassHasTypePropertySelections extends Selector<SysClassHasTypePropertySlice> {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_pk_entity$ = this.selector<SysClassHasTypeProperty>('by_pk_entity');
  public by_fk_class$ = this.selector<ByPk<SysClassHasTypeProperty>>('by_fk_class');
  public by_fk_property$ = this.selector<ByPk<SysClassHasTypeProperty>>('by_fk_property');

}


export class SystemSelector extends SysActions {
  system_relevant_class$ = new SysSystemRelevantClassSelections(this.ngRedux, sysDefinitions, 'system_relevant_class')
  class_has_type_property$ = new SysClassHasTypePropertySelections(this.ngRedux, sysDefinitions, 'class_has_type_property')
}
