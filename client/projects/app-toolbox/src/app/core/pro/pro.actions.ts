
import { filter } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProInfoProjRel, ProClassFieldConfig, ProDfhClassProjRel, ProTextProperty, ProProject, ProDfhProfileProjRel } from '@kleiolab/lib-sdk-lb3';
import { LoadActionMeta, StandardActionsFactory, ActionResultObservable, SucceedActionMeta, LoadByPkANsVersionActionMeta } from 'projects/app-toolbox/src/app/core/redux-store/actions';
import { proRoot } from './pro.config';
import { ProInfoProjRelSlice, ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProAnalysisSlice, ProDfhProfileProjRelSlice } from './pro.models';
import { FluxStandardAction } from 'flux-standard-action';
import { ProAnalysis } from '../sdk-lb4/model/proAnalysis';
import { U } from '../util/util';
import { IAppState } from '../redux-store/model';

type Payload = ProInfoProjRelSlice;

export interface LoadVersionAction extends LoadActionMeta { pkEntity: number, entityVersion: number };


export class ProProjectActionFactory extends StandardActionsFactory<Payload, ProProject> {

  // Suffixes of load action types
  static readonly OF_ACCOUNT = 'OF_ACCOUNT';
  static readonly LOAD_BASICS = 'LOAD_BASICS';

  loadOfAccount: (pkProject) => ActionResultObservable<ProProject>;

  /**
   * loads the ProProject and the default InfLanguage
   */
  loadBasics: (pkProject) => ActionResultObservable<ProProject>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProProjectActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'project'))

    this.loadOfAccount = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProProjectActionFactory.OF_ACCOUNT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProProject>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    this.loadBasics = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProProjectActionFactory.LOAD_BASICS,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProProject>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    return this;
  }
}

export interface MarkStatementAsFavoriteActionMeta {
  addPending: string,
  pk: number
  pkStatement: number
  isOutgoing: boolean
}
export class ProInfoProjRelActionFactory extends StandardActionsFactory<Payload, ProInfoProjRel> {

  // Suffixes of load action types
  static readonly MARK_ROLE_AS_FAVORITE = 'MARK_ROLE_AS_FAVORITE';

  markStatementAsFavorite: (pkProject: number, pkStatement: number, isOutgoing: boolean) => ActionResultObservable<ProInfoProjRel>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProInfoProjRelActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'info_proj_rel'))

    this.markStatementAsFavorite = (pkProject: number, pkStatement: number, isOutgoing: boolean) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, MarkStatementAsFavoriteActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE,
        meta: {
          addPending,
          pk: pkProject,
          pkStatement: pkStatement,
          isOutgoing
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProInfoProjRel>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}


export class ProDfhClassProjRelActionFactory extends StandardActionsFactory<Payload, ProDfhClassProjRel> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<ProDfhClassProjRel>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProDfhClassProjRelActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'dfh_class_proj_rel'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProDfhClassProjRelActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProDfhClassProjRel>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}


export class ProDfhProfileProjRelActionFactory extends StandardActionsFactory<Payload, ProDfhProfileProjRel> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<ProDfhProfileProjRel>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProDfhProfileProjRelActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'dfh_profile_proj_rel'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProDfhProfileProjRelActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProDfhProfileProjRel>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}

export class ProClassFieldConfigActionFactory extends StandardActionsFactory<Payload, ProClassFieldConfig> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<ProClassFieldConfig>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProClassFieldConfigActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'class_field_config'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProClassFieldConfigActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProClassFieldConfig>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}

export class ProTextPropertyActionFactory extends StandardActionsFactory<Payload, ProTextProperty> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<ProTextProperty>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): ProTextPropertyActionFactory {
    Object.assign(this, this.createCrudActions(proRoot, 'text_property'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ProTextPropertyActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<ProTextProperty>>(['resolved', addPending]).pipe(filter(x => !!x)),
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
  project = new ProProjectActionFactory(this.ngRedux).createActions()
  info_proj_rel = new ProInfoProjRelActionFactory(this.ngRedux).createActions()
  text_property = new ProTextPropertyActionFactory(this.ngRedux).createActions()
  dfh_class_proj_rel = new ProDfhClassProjRelActionFactory(this.ngRedux).createActions()
  dfh_profile_proj_rel = new ProDfhProfileProjRelActionFactory(this.ngRedux).createActions()
  class_field_config = new ProClassFieldConfigActionFactory(this.ngRedux).createActions()
  analysis = new ProAnalysisActionFactory(this.ngRedux).createActions()

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
