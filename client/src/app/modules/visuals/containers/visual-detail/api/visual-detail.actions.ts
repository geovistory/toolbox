import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { VisualDetail } from './visual-detail.models';

type Payload = VisualDetail;
interface MetaData {
  itemsArray?: any[]
  tabTitle?: string

};
export type VisualDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class VisualDetailAPIActions {

  static readonly SET_TAB_TITLE = 'QueryDetail::SET_TAB_TITLE';
  static readonly SHOW_RIGHT_AREA = 'QueryDetail::SHOW_RIGHT_AREA';
  static readonly HIDE_RIGHT_AREA = 'QueryDetail::HIDE_RIGHT_AREA';

  static readonly LOAD = 'VisualDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'VisualDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'VisualDetail::LOAD_FAILED';

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
  load = (): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.LOAD_FAILED,
    meta: null,
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
