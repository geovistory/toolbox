import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TeEntDetail, PeItDetail, ProjectCrm } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';
import { PeItActions } from '../../../entity/pe-it/pe-it.actions';
import { StateSettings } from '../../../../../core/state/services/state-creator';

type Payload = PeItDetail;
interface MetaData {
  pkProject?: number,
  pkEntity?: number,
  peItDetail?: PeItDetail,
  teEntDetail?: TeEntDetail;
  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
  pkClasses?: number[];
  config?: PeItDetail
  settings?: StateSettings,
  crm?: ProjectCrm
};
export type PeItDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItDetailAPIActions extends PeItActions {

  static readonly LOAD = 'PeItDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'PeItDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'PeItDetail::LOAD_FAILED';

  static readonly REMOVE_PE_IT = 'PeItDetail::REMOVE_PE_IT';
  static readonly REMOVE_PE_IT_SUCCEEDED = 'PeItDetail::REMOVE_PE_IT_SUCCEEDED';
  static readonly REMOVE_PE_IT_FAILED = 'PeItDetail::REMOVE_PE_IT_FAILED';

  static readonly DESTROY = 'PeItDetail::DESTROY';


  /*********************************************************************
  *  Actions to manage entity editor
  *********************************************************************/

  @dispatch() load = (pkEntity: number, pkProject: number, config: PeItDetail, settings: StateSettings, crm:ProjectCrm): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.LOAD,
    meta: { pkEntity, pkProject, config, settings, crm },
    payload: null,
  });

  loadSucceeded = (peItDetail: PeItDetail): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.LOAD_SUCCEEDED,
    meta: { peItDetail },
    payload: null
  })

  loadFailed = (error): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /**********************************************
 * Method remove PeIt from Project
 **********************************************/

  @dispatch() removePeIt = (pkEntity: number, pkProject: number): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.REMOVE_PE_IT,
    meta: { pkEntity, pkProject },
    payload: null
  })

  removePeItSucceded = (): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.REMOVE_PE_IT_SUCCEEDED,
    meta: null,
    payload: null
  })

  removePeItFailed = (error): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.REMOVE_PE_IT_FAILED,
    meta: null,
    payload: null,
    error
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
