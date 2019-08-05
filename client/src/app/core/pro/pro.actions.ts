import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, ProInfoProjRel, ProClassFieldConfig, ProDfhClassProjRel } from 'app/core';
import { LoadActionMeta, StandardActionsFactory } from 'app/core/store/actions';
import { proRoot } from './pro.config';
import { ProInfoProjRelSlice, ProClassFieldConfigSlice, ProDfhClassProjRelSlice } from './pro.models';

export interface LoadVersionAction extends LoadActionMeta { pkEntity: number, entityVersion: number };



@Injectable()
export class ProActions {

  info_proj_rel = new StandardActionsFactory<ProInfoProjRelSlice, ProInfoProjRel>(this.ngRedux).createCrudActions(proRoot, 'info_proj_rel')
  dfh_class_proj_rel = new StandardActionsFactory<ProDfhClassProjRelSlice, ProDfhClassProjRel>(this.ngRedux).createCrudActions(proRoot, 'dfh_class_proj_rel')
  class_field_config = new StandardActionsFactory<ProClassFieldConfigSlice, ProClassFieldConfig>(this.ngRedux).createCrudActions(proRoot, 'class_field_config')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
