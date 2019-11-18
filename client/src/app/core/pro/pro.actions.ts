
import { filter } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, ProInfoProjRel, ProClassFieldConfig, ProDfhClassProjRel, ProPropertyLabel, U, ProAnalysis } from 'app/core';
import { LoadActionMeta, StandardActionsFactory, ActionResultObservable, SucceedActionMeta, LoadByPkANsVersionActionMeta } from 'app/core/store/actions';
import { proRoot } from './pro.config';
import { ProInfoProjRelSlice, ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProAnalysisSlice } from './pro.models';
import { FluxStandardAction } from '../../../../node_modules/flux-standard-action';

type Payload = ProInfoProjRelSlice;

export interface LoadVersionAction extends LoadActionMeta { pkEntity: number, entityVersion: number };

export class ProPropertyLabelActionFactory extends StandardActionsFactory<Payload, ProPropertyLabel> {

  // Suffixes of load action types
  static readonly DEFAULT_LABELS = 'DEFAULT_LABELS';

  loadDefaultLabels: (pkProject) => ActionResultObservable<ProPropertyLabel>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProPropertyLabelActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'property_label'))

    this.loadDefaultLabels = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProPropertyLabelActionFactory.DEFAULT_LABELS,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProPropertyLabel>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}

export class ProAnalysisActionFactory extends StandardActionsFactory<ProAnalysisSlice, ProAnalysis> {

  // Suffixes of load action types
  static readonly BY_PK_AND_VERSION = 'BY_PK_AND_VERSION';

  loadByIdAndVersion: (pkProject: number, pkEntity: number, version: number) => ActionResultObservable<ProAnalysis>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProAnalysisActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'analysis'))

    this.loadByIdAndVersion = (pkProject: number, pkEntity: number, version: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadByPkANsVersionActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProAnalysisActionFactory.BY_PK_AND_VERSION,
        meta: {
          addPending,
          pk: pkProject,
          pkEntity,
          version
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProAnalysis>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}



@Injectable()
export class ProActions {

  info_proj_rel = new StandardActionsFactory<ProInfoProjRelSlice, ProInfoProjRel>(this.ngRedux).createCrudActions(proRoot, 'info_proj_rel')
  property_label = new ProPropertyLabelActionFactory(this.ngRedux).createActions()
  dfh_class_proj_rel = new StandardActionsFactory<ProDfhClassProjRelSlice, ProDfhClassProjRel>(this.ngRedux).createCrudActions(proRoot, 'dfh_class_proj_rel')
  class_field_config = new StandardActionsFactory<ProClassFieldConfigSlice, ProClassFieldConfig>(this.ngRedux).createCrudActions(proRoot, 'class_field_config')
  analysis = new ProAnalysisActionFactory(this.ngRedux).createActions()

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
