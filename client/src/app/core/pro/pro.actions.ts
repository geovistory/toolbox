import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, ProInfoProjRel } from 'app/core';
import { LoadActionMeta, StandardActionsFactory } from 'app/core/store/actions';
import { proRoot } from './pro.config';
import { ProInfoProjRelSlice } from './pro.models';

export interface LoadVersionAction extends LoadActionMeta { pkEntity: number, entityVersion: number };



@Injectable()
export class ProActions {

  info_proj_rel = new StandardActionsFactory<ProInfoProjRelSlice, ProInfoProjRel>(this.ngRedux).createCrudActions(proRoot, 'info_proj_rel')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
