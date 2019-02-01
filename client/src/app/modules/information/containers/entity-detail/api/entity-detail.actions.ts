import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PeItDetail, TeEntDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';
import { EntityDetail } from './entity-detail.models';

type Payload = EntityDetail;
interface MetaData {
  pkProject?: number,
  pkEntity?: number,
  peItDetail?: PeItDetail,
  teEntDetail?: TeEntDetail;
  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
  pkClasses?: number[];
  tabTitle?: string
};
export type EntityDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityDetailAPIActions {



  static readonly OPEN_ENTITY_EDITOR = 'EntityDetail::OPEN_ENTITY_EDITOR';
  static readonly OPEN_ENTITY_EDITOR_SUCCEEDED = 'EntityDetail::OPEN_ENTITY_EDITOR_SUCCEEDED';
  static readonly OPEN_ENTITY_EDITOR_FAILED = 'EntityDetail::OPEN_ENTITY_EDITOR_FAILED';

  static readonly OPEN_PHENOMENON_EDITOR = 'EntityDetail::OPEN_PHENOMENON_EDITOR';
  static readonly OPEN_PHENOMENON_EDITOR_SUCCEEDED = 'EntityDetail::OPEN_PHENOMENON_EDITOR_SUCCEEDED';
  static readonly OPEN_PHENOMENON_EDITOR_FAILED = 'EntityDetail::OPEN_PHENOMENON_EDITOR_FAILED';

  static readonly START_CREATE = 'EntityDetail::START_CREATE';
  static readonly STOP_CREATE = 'EntityDetail::STOP_CREATE';

  static readonly REMOVE_PE_IT = 'EntityDetail::REMOVE_PE_IT';
  static readonly REMOVE_PE_IT_SUCCEEDED = 'EntityDetail::REMOVE_PE_IT_SUCCEEDED';
  static readonly REMOVE_PE_IT_FAILED = 'EntityDetail::REMOVE_PE_IT_FAILED';

  static readonly SET_TAB_TITLE = 'EntityDetail::SET_TAB_TITLE';

  static readonly DESTROY = 'EntityDetail::DESTROY';


  /*********************************************************************
  *  Actions to manage entity editor
  *********************************************************************/

  @dispatch() openEntityEditor = (pkEntity: number, pkProject: number): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.OPEN_ENTITY_EDITOR,
    meta: { pkEntity, pkProject },
    payload: null,
  });

  openEntityEditorSucceeded = (peItDetail: PeItDetail): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.OPEN_ENTITY_EDITOR_SUCCEEDED,
    meta: { peItDetail },
    payload: null
  })

  openEntityEditorFailed = (error): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.OPEN_ENTITY_EDITOR_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
*  Actions to manage phenomenon editor
*********************************************************************/

  @dispatch() openPhenomenonEditor = (pkEntity: number, pkProject: number): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.OPEN_PHENOMENON_EDITOR,
    meta: { pkEntity, pkProject },
    payload: null,
  });

  openPhenomenonEditorSucceeded = (teEntDetail: TeEntDetail): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.OPEN_PHENOMENON_EDITOR_SUCCEEDED,
    meta: { teEntDetail },
    payload: null
  })

  openPhenomenonEditorFailed = (error): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.OPEN_PHENOMENON_EDITOR_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /***************************************************************
   * Manage the create or add screen
   ***************************************************************/

  @dispatch() startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

  @dispatch() stopCreate = (): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })


  /**********************************************
 * Method remove PeIt from Project
 **********************************************/

  @dispatch() removePeIt = (pkEntity: number, pkProject: number): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.REMOVE_PE_IT,
    meta: { pkEntity, pkProject },
    payload: null
  })

  removePeItSucceded = (): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.REMOVE_PE_IT_SUCCEEDED,
    meta: null,
    payload: null
  })

  removePeItFailed = (error): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.REMOVE_PE_IT_FAILED,
    meta: null,
    payload: null,
    error
  })


  /*********************************************************************
  *  Set the tab title
  *********************************************************************/

  @dispatch() setTabTitle = (tabTitle: string): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): EntityDetailAPIAction => ({
    type: EntityDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
