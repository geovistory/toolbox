import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState, ProActions, proDefinitions, proRoot, ReducerConfigCollection } from '@kleiolab/lib-redux';
import { ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { ProAnalysis, ProClassFieldConfig, ProProject } from '@kleiolab/lib-sdk-lb4';
import { toString } from 'ramda';
import { Observable } from 'rxjs';




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

class ProProjectSelector extends Selector {
  public by_pk_entity$ = this.selector<ProProject>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
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
  public by_fk_project__fk_class$ = this.selector<ProDfhClassProjRel>('by_fk_project__fk_class')
  public by_fk_project$ = this.selector<ProDfhClassProjRel>('by_fk_project')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

class ProDfhProfileProjRelSelector extends Selector {
  public by_fk_project__enabled$ = this.selector<ByPk<ProDfhProfileProjRel>>('by_fk_project__enabled')
  public by_fk_project__fk_profile$ = this.selector<ProDfhProfileProjRel>('by_fk_project__fk_profile')
  public by_fk_project$ = this.selector<ProDfhProfileProjRel>('by_fk_project')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

class ProClassFieldConfigSelector extends Selector {
  public by_fk_project__fk_class$ = this.selector<ByPk<ProClassFieldConfig>>('by_fk_project__fk_class')
  public by_pk_entity$ = this.selector<ProClassFieldConfig>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}


class ProTextPropertySelector extends Selector {
  public by_fks$ = this.selector<ProTextProperty>('by_fks')
  public by_fks_without_lang$ = this.selector<ByPk<ProTextProperty>>('by_fks_without_lang')
  // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
  // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')

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

@Injectable({
  providedIn: 'root'
})
export class ProSelector extends ProActions {

  project$ = new ProProjectSelector(this.ngRedux, proDefinitions, 'project');
  info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
  dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
  dfh_profile_proj_rel$ = new ProDfhProfileProjRelSelector(this.ngRedux, proDefinitions, 'dfh_profile_proj_rel');
  class_field_config$ = new ProClassFieldConfigSelector(this.ngRedux, proDefinitions, 'class_field_config');
  text_property$ = new ProTextPropertySelector(this.ngRedux, proDefinitions, 'text_property');
  analysis$ = new ProAnalysisSelector(this.ngRedux, proDefinitions, 'analysis');

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }
}
