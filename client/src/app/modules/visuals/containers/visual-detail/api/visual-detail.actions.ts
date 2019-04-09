import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { VisualDetail } from './visual-detail.models';

type Payload = VisualDetail;
interface MetaData {
  itemsArray?: any[]
  tabTitle?: string

  pkProject?: number;
  pkEntity?: number;
  version?: number;

};
export type VisualDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class VisualDetailAPIActions {

  static readonly SET_TAB_TITLE = 'QueryDetail::SET_TAB_TITLE';
  static readonly SHOW_RIGHT_AREA = 'QueryDetail::SHOW_RIGHT_AREA';
  static readonly HIDE_RIGHT_AREA = 'QueryDetail::HIDE_RIGHT_AREA';

  static readonly LOAD_PREVIEW = 'VisualDetail::LOAD_PREVIEW';
  static readonly LOAD_PREVIEW_SUCCEEDED = 'VisualDetail::LOAD_PREVIEW_SUCCEEDED';
  static readonly LOAD_PREVIEW_FAILED = 'VisualDetail::LOAD_PREVIEW_FAILED';

  static readonly DESTROY = 'VisualDetail::DESTROY';
  /*********************************************************************
  *  Set tab title
  *********************************************************************/
  @dispatch()
  setTabTitle = (tabTitle: string): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null,
  });

  /*********************************************************************
   *  Load an existing visual
   *********************************************************************/

  @dispatch()
  loadPreview = (pkProject: number, pkEntity: number, version: number): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.LOAD_PREVIEW,
    meta: { pkProject, pkEntity, version },
    payload: null,
  });

  loadPreviewSucceeded = (itemsArray: any[], pkEntity: number, version: number): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.LOAD_PREVIEW_SUCCEEDED,
    meta: {
      itemsArray, pkEntity, version
    },
    payload: null
  })

  loadPreviewFailed = (error, pkEntity: number, version: number): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.LOAD_PREVIEW_FAILED,
    meta: {
      pkEntity, version
    },
    payload: null,
    error,
  })

  /*********************************************************************
*  Layout
*********************************************************************/
  @dispatch()
  showRightArea = (): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.SHOW_RIGHT_AREA,
    meta: null,
    payload: null
  })
  @dispatch()
  hideRightArea = (): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.HIDE_RIGHT_AREA,
    meta: null,
    payload: null
  })

  /******
   /*********************************************************************
   *  Method to distroy the slice of store
   *********************************************************************/
  @dispatch()
  destroy = (): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
