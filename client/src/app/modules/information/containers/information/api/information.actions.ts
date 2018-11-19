import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PeItDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information, SearchResponse } from './information.models';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';

type Payload = Information;
interface MetaData {
  pkProject?: number,
  pkEntity?: number,
  peItDetail?: PeItDetail,
  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
  pkClasses?: number[]
};
export type InformationAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class InformationAPIActions {


  static readonly INITIALIZE_LIST = 'Information::INITIALIZE_LIST';

  static readonly OPEN_ENTITY_EDITOR = 'Information::OPEN_ENTITY_EDITOR';
  static readonly OPEN_ENTITY_EDITOR_SUCCEEDED = 'Information::OPEN_ENTITY_EDITOR_SUCCEEDED';
  static readonly OPEN_ENTITY_EDITOR_FAILED = 'Information::OPEN_ENTITY_EDITOR_FAILED';

  static readonly DESTROY = 'Information::DESTROY';

  static readonly START_CREATE = 'Information::START_CREATE';
  static readonly STOP_CREATE = 'Information::STOP_CREATE';


  static readonly REMOVE_PE_IT = 'Information::REMOVE_PE_IT';
  static readonly REMOVE_PE_IT_SUCCEEDED = 'Information::REMOVE_PE_IT_SUCCEEDED';
  static readonly REMOVE_PE_IT_FAILED = 'Information::REMOVE_PE_IT_FAILED';

  /*********************************************************************
  *  Actions to manage the list
  *********************************************************************/

  @dispatch() initializeList = (pkClasses: number[]): InformationAPIAction => ({
    type: InformationAPIActions.INITIALIZE_LIST,
    meta: { pkClasses },
    payload: null,
  });

  /*********************************************************************
  *  Actions to manage entity editor
  *********************************************************************/

  @dispatch() openEntityEditor = (pkEntity: number, pkProject: number): InformationAPIAction => ({
    type: InformationAPIActions.OPEN_ENTITY_EDITOR,
    meta: { pkEntity, pkProject },
    payload: null,
  });

  openEntityEditorSucceeded = (peItDetail: PeItDetail): InformationAPIAction => ({
    type: InformationAPIActions.OPEN_ENTITY_EDITOR_SUCCEEDED,
    meta: { peItDetail },
    payload: null
  })

  openEntityEditorFailed = (error): InformationAPIAction => ({
    type: InformationAPIActions.OPEN_ENTITY_EDITOR_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /***************************************************************
   * Manage the create or add screen
   ***************************************************************/

  @dispatch() startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): InformationAPIAction => ({
    type: InformationAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

  @dispatch() stopCreate = (): InformationAPIAction => ({
    type: InformationAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })


  /**********************************************
 * Method remove PeIt from Project
 **********************************************/

  @dispatch() removePeIt = (pkEntity: number, pkProject: number): InformationAPIAction => ({
    type: InformationAPIActions.REMOVE_PE_IT,
    meta: { pkEntity, pkProject },
    payload: null
  })

  removePeItSucceded = (): InformationAPIAction => ({
    type: InformationAPIActions.REMOVE_PE_IT_SUCCEEDED,
    meta: null,
    payload: null
  })

  removePeItFailed = (error): InformationAPIAction => ({
    type: InformationAPIActions.REMOVE_PE_IT_FAILED,
    meta: null,
    payload: null,
    error
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): InformationAPIAction => ({
    type: InformationAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
