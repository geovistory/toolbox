import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'app/core/store/model';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { filter } from '../../../../node_modules/rxjs/operators';
import { ProInfoProjRel, ProDfhClassProjRel, ProClassFieldConfig } from '../sdk';
import { ProActions } from './pro.actions';
import { proDefinitions, proRoot } from './pro.config';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<M>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<M>([proRoot, this.model, indexKey])
      .pipe(filter(x => !!x))

    const key = (x): Observable<M> => this.ngRedux.select<M>([proRoot, this.model, indexKey, x])
      .pipe(filter(x => !!x))

    return { all$, key }
  }
}

class ProInfoProjRelSelector extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_fk_project__fk_entity$ = this.selector<ProInfoProjRel>('by_fk_project__fk_entity')
}


class ProDfhClassProjRelSelector extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_fk_project__fk_entity$ = this.selector<ProDfhClassProjRel>('by_fk_project__fk_entity')
  public by_fk_project__enabled_in_entities$ = this.selector<ByPk<ProDfhClassProjRel>>('by_fk_project__enabled_in_entities')
}


class ProClassFieldConfigSelector extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_fk_class__fk_app_context$ = this.selector<ByPk<ProClassFieldConfig>>('by_fk_class__fk_app_context')
  public by_fk_property__property_is_outgoing__fk_app_context$ = this.selector<ByPk<ProClassFieldConfig>>('by_fk_property__property_is_outgoing__fk_app_context')
}


@Injectable()
export class ProSelector extends ProActions {

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }

  info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
  dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
  class_field_config$ = new ProClassFieldConfigSelector(this.ngRedux, proDefinitions, 'class_field_config');

}
