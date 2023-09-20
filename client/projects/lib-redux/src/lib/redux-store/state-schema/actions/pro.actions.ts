
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProAnalysis, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { filter } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { ProInfoProjRelSlice } from '../models/pro.models';
import { proRoot } from '../reducer-configs/pro.config';
import { LoadActionMeta, LoadByPkAndVersionActionMeta, SchemaActionsFactory, SucceedActionMeta } from '../_helpers/schema-actions-factory';


type Payload = ProInfoProjRelSlice;



export interface MarkStatementAsFavoriteActionMeta {
  addPending: string,
  pk: number
  pkStatement: number
  isOutgoing: boolean
}
export class ProInfoProjRelActionFactory extends SchemaActionsFactory<ProInfoProjRel> {

  // Suffixes of load action types
  static readonly MARK_ROLE_AS_FAVORITE = 'MARK_ROLE_AS_FAVORITE';

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux, proRoot, 'info_proj_rel') }

  markStatementAsFavorite(pkProject: number, pkStatement: number, isOutgoing: boolean) {
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
}


export class ProDfhClassProjRelActionFactory extends SchemaActionsFactory<ProDfhClassProjRel> {

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux, proRoot, 'dfh_class_proj_rel') }

}


export class ProDfhProfileProjRelActionFactory extends SchemaActionsFactory<ProDfhProfileProjRel> {
  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux, proRoot, 'dfh_profile_proj_rel') }

  loadOfProject(pkProject: number) {
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

}


export class ProTextPropertyActionFactory extends SchemaActionsFactory<ProTextProperty> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux, proRoot, 'text_property') }
  loadOfProject(pkProject: number) {
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

}

export class ProAnalysisActionFactory extends SchemaActionsFactory<ProAnalysis> {

  // Suffixes of load action types
  static readonly BY_PK_AND_VERSION = 'BY_PK_AND_VERSION';

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux, proRoot, 'analysis') }
  loadByIdAndVersion(pkProject: number, pkEntity: number, version: number) {
    const addPending = U.uuid()
    const action: FluxStandardAction<Payload, LoadByPkAndVersionActionMeta> = {
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

}



@Injectable({
  providedIn: 'root'
})
export class ProActions {
  text_property = new ProTextPropertyActionFactory(this.ngRedux)
  dfh_class_proj_rel = new ProDfhClassProjRelActionFactory(this.ngRedux)
  dfh_profile_proj_rel = new ProDfhProfileProjRelActionFactory(this.ngRedux)
  analysis = new ProAnalysisActionFactory(this.ngRedux)
  table_config = new SchemaActionsFactory(this.ngRedux, proRoot, 'table_config');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
