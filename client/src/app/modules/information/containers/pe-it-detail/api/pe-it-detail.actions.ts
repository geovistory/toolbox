import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PeItDetail, TeEntDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassAndTypePk } from '../../create-or-add-entity/create-or-add-entity.component';
import { PeItActions } from './pe-it.actions';

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
  // settings?: StateSettings,
  // crm?: ProjectCrm
};
export type PeItDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItDetailAPIActions extends PeItActions {

  static readonly INIT = 'PeItDetail::INIT';

  static readonly REMOVE_PE_IT = 'PeItDetail::REMOVE_PE_IT';
  static readonly REMOVE_PE_IT_SUCCEEDED = 'PeItDetail::REMOVE_PE_IT_SUCCEEDED';
  static readonly REMOVE_PE_IT_FAILED = 'PeItDetail::REMOVE_PE_IT_FAILED';

  static readonly DESTROY = 'PeItDetail::DESTROY';


  /*********************************************************************
  *  Actions to manage entity editor
  *********************************************************************/

  @dispatch() init = (config: PeItDetail): PeItDetailAPIAction => ({
    type: PeItDetailAPIActions.INIT,
    meta: { config },
    payload: null,
  });

  // loadSucceeded = (peItDetail: PeItDetail): PeItDetailAPIAction => ({
  //   type: PeItDetailAPIActions.LOAD_SUCCEEDED,
  //   meta: { peItDetail },
  //   payload: null
  // })

  // loadFailed = (error): PeItDetailAPIAction => ({
  //   type: PeItDetailAPIActions.LOAD_FAILED,
  //   meta: null,
  //   payload: null,
  //   error,
  // })


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
