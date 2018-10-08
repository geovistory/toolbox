import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { LeafPeItViewI } from './leaf-pe-it-view.models';
import { PeItDetail, ProjectDetail } from 'app/core';

type Payload = LeafPeItViewI;
interface MetaData {
  pkEntity?: number, projectDetail?: ProjectDetail,
  peItDetail?: PeItDetail
};
export type LeafPeItViewAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class LeafPeItViewAPIActions {
  static readonly LOAD = 'LeafPeItView::LOAD';
  static readonly LOAD_SUCCEEDED = 'LeafPeItView::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LeafPeItView::LOAD_FAILED';

  static readonly REMOVE = 'LeafPeItView::REMOVE';

  static readonly DESTROY = 'LeafPeItView::DESTROY';

  @dispatch()
  load = (pkEntity: number, projectDetail: ProjectDetail): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.LOAD,
    meta: { pkEntity, projectDetail },
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


  /**
   * Removes the peItState (used by leaf-pe-it-crtl)
   */
  @dispatch()
  remove = (): LeafPeItViewAPIAction => ({
    type: LeafPeItViewAPIActions.REMOVE,
    meta: null,
    payload: null
  })

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
