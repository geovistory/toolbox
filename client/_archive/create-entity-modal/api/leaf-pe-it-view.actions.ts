import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PeItDetail, ProjectDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { LeafPeItView } from './leaf-pe-it-view.models';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.componen';

type Payload = LeafPeItView;
interface MetaData {
  pkEntity?: number,
  peItDetail?: PeItDetail;
  selectOrCreate?: CreateOrAddEntity
};
export type LeafPeItViewAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class LeafPeItViewAPIActions {
  static readonly LOAD = 'LeafPeItView::LOAD';
  static readonly LOAD_SUCCEEDED = 'LeafPeItView::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LeafPeItView::LOAD_FAILED';

  static readonly SET_PK_ENTITY = 'LeafPeItView::SET_PK_ENTITY';
  static readonly OPEN_SELECT_OR_CREATE_MODAL = 'LeafPeItView::OPEN_SELECT_OR_CREATE_MODAL';
  static readonly CLOSE_SELECT_OR_CREATE_MODAL = 'LeafPeItView::CLOSE_SELECT_OR_CREATE_MODAL';

  static readonly REMOVE = 'LeafPeItView::REMOVE';

  static readonly DESTROY = 'LeafPeItView::DESTROY';

  @dispatch()
  load = (pkEntity: number): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.LOAD,
    meta: { pkEntity },
    payload: null,
  });

  loadSucceeded = (peItDetail: PeItDetail): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.LOAD_SUCCEEDED,
    meta: {
      peItDetail
    },
    payload: null
  })

  loadFailed = (error): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  @dispatch()
  setPkEntity = (pkEntity: number): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.SET_PK_ENTITY,
    meta: { pkEntity },
    payload: null,
  });

  /**
   * Removes the peItState (used by leaf-pe-it-crtl)
   */
  @dispatch()
  remove = (): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.REMOVE,
    meta: null,
    payload: null
  })


  @dispatch()
  openModal = (selectOrCreate: CreateOrAddEntity): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.OPEN_SELECT_OR_CREATE_MODAL,
    meta: { selectOrCreate },
    payload: null,
  });

  @dispatch()
  closeModal = (): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.CLOSE_SELECT_OR_CREATE_MODAL,
    meta: null,
    payload: null,
  });


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}