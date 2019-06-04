import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TeEntDetail, ProjectCrm } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TeEntActions } from '../../../entity/te-ent/te-ent.actions';
import { StateSettings } from 'app/core/state/services/state-creator';

type Payload = TeEntDetail;
interface MetaData {
  pkProject?: number,
  pkEntity?: number,
  teEntDetail?: TeEntDetail;
  pkUiContext?: number;
  pkClasses?: number[];
  config?: TeEntDetail
  settings?: StateSettings,
  crm?: ProjectCrm
};
export type TeEntDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntDetailAPIActions extends TeEntActions {


  static readonly LOAD = 'TeEntDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'TeEntDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TeEntDetail::LOAD_FAILED';

  static readonly DESTROY = 'TeEntDetail::DESTROY';



  /*********************************************************************
  *  Actions to manage temporal entity editor
  *********************************************************************/

 load = (pkEntity: number, pkProject: number, config: TeEntDetail, settings: StateSettings, crm:ProjectCrm): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.LOAD,
    meta: { pkEntity, pkProject, config, settings, crm },
    payload: null,
  });

  loadSucceeded = (teEntDetail: TeEntDetail): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.LOAD_SUCCEEDED,
    meta: { teEntDetail },
    payload: null
  })

  loadFailed = (error): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): TeEntDetailAPIAction => ({
    type: TeEntDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
