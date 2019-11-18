import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'app/core/store/model';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { filter } from '../../../../node_modules/rxjs/operators';
import { ProInfoProjRel, ProDfhClassProjRel, ProClassFieldConfig, ProPropertyLabel, ProAnalysis } from '../sdk';
import { ProActions } from './pro.actions';
import { proDefinitions, proRoot } from './pro.config';
import { toString } from 'ramda';


class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x: string | (string | number)[]) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([proRoot, this.model, indexKey])

    const key = (x: string | (string | number)[]): Observable<M> => {
      const k = typeof x === 'string' ? x : x.map((part: string | number) => toString(part)).join('_');;

      return this.ngRedux.select<M>([proRoot, this.model, indexKey, k])
    }

    return { all$, key }
  }
}

class ProInfoProjRelSelector extends Selector {
  public by_fk_project__fk_entity$ = this.selector<ProInfoProjRel>('by_fk_project__fk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}


class ProDfhClassProjRelSelector extends Selector {
  public by_fk_project__enabled_in_entities$ = this.selector<ByPk<ProDfhClassProjRel>>('by_fk_project__enabled_in_entities')
  public by_fk_project__fk_entity$ = this.selector<ProDfhClassProjRel>('by_fk_project__fk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}


class ProClassFieldConfigSelector extends Selector {
  public by_fk_class__fk_app_context$ = this.selector<ByPk<ProClassFieldConfig>>('by_fk_class__fk_app_context')
  public by_fk_property__property_is_outgoing__fk_app_context$ = this.selector<ByPk<ProClassFieldConfig>>('by_fk_property__property_is_outgoing__fk_app_context')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}


class ProPropertyLabelSelector extends Selector {
  public by_pk_entity$ = this.selector<ProPropertyLabel>('by_pk_entity')
  public by_fk_project__fk_property__fk_domain_class__fk_range_class$ = this.selector<ByPk<ProPropertyLabel>>('by_fk_project__fk_property__fk_domain_class__fk_range_class')
  public by_fk_project__fk_property__fk_domain_class__fk_range_class__fk_system_type$ = this.selector<ByPk<ProPropertyLabel>>('by_fk_project__fk_property__fk_domain_class__fk_range_class__fk_system_type')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}


class ProAnalysisSelector extends Selector {

  public by_pk_entity$ = this.selector<ProAnalysis>('by_pk_entity')
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

@Injectable()
export class ProSelector extends ProActions {

  info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
  dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
  class_field_config$ = new ProClassFieldConfigSelector(this.ngRedux, proDefinitions, 'class_field_config');
  property_label$ = new ProPropertyLabelSelector(this.ngRedux, proDefinitions, 'property_label');
  analysis$ = new ProAnalysisSelector(this.ngRedux, proDefinitions, 'analysis');

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }
}
