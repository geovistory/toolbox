import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { VisualDetail } from './visual-detail.models';
import { ProVisual } from 'app/core/sdk';

type Payload = VisualDetail;
interface MetaData {
  itemsArray?: any[]
  tabTitle?: string

  pkProject?: number;
  pkEntity?: number;
  version?: number;

  comVisual?: ProVisual;
};
export type VisualDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class VisualDetailAPIActions {

  static readonly SET_PK_ENTITY = 'VisualDetail::SET_PK_ENTITY';

  static readonly LOAD = 'VisualDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'VisualDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'VisualDetail::LOAD_FAILED';

  static readonly SAVE = 'VisualDetail::SAVE';
  static readonly SAVE_SUCCEEDED = 'VisualDetail::SAVE_SUCCEEDED';
  static readonly SAVE_FAILED = 'VisualDetail::SAVE_FAILED';

  static readonly LOAD_PREVIEW = 'VisualDetail::LOAD_PREVIEW';
  static readonly LOAD_PREVIEW_SUCCEEDED = 'VisualDetail::LOAD_PREVIEW_SUCCEEDED';
  static readonly LOAD_PREVIEW_FAILED = 'VisualDetail::LOAD_PREVIEW_FAILED';

  static readonly DELETE = 'VisualDetail::DELETE';
  static readonly DELETE_SUCCEEDED = 'VisualDetail::DELETE_SUCCEEDED';
  static readonly DELETE_FAILED = 'VisualDetail::DELETE_FAILED';

  static readonly DESTROY = 'VisualDetail::DESTROY';

  /*********************************************************************
  *  Set pk entity
  *********************************************************************/
  @dispatch()
  setPkEntity = (pkEntity: number): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.SET_PK_ENTITY,
    meta: { pkEntity },
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
  *  Save a visual
  *********************************************************************/

  @dispatch()
  save = (comVisual: ProVisual, pkEntity: number): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.SAVE,
    meta: { comVisual, pkEntity },
    payload: null,
  });

  saveSucceeded = (comVisual: ProVisual): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.SAVE_SUCCEEDED,
    meta: { comVisual },
    payload: null
  })

  saveFailed = (error): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.SAVE_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Delete a query
  *********************************************************************/

  @dispatch()
  delete = (pkEntity: number): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.DELETE,
    meta: { pkEntity },
    payload: null,
  });

  deleteSucceeded = (): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.DELETE_SUCCEEDED,
    meta: {},
    payload: null
  })

  deleteFailed = (error): VisualDetailAPIAction => ({
    type: VisualDetailAPIActions.DELETE_FAILED,
    meta: null,
    payload: null,
    error,
  })

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
