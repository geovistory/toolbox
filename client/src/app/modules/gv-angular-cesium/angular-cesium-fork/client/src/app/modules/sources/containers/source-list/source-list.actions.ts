import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ISourceListState, ISourceDetailState, ISourceSearchHitState } from '../../sources.models';
import { InfDigitalObject } from '../../../../core';

// replace SourceList with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ISourceListState;
export type SourceListAction = FluxStandardAction<Payload, any>;

@Injectable()
export class SourceListActions {
  static readonly SOURCE_LIST_STATE_UPDATED = 'SOURCE_LIST_STATE_UPDATED';

  static readonly SOURCE_LIST_SEARCH_HITS_UPDATED = 'SOURCE_LIST_SEARCH_HITS_UPDATED';

  static readonly SOURCE_LIST_OPEN = 'SOURCE_LIST_OPEN';
  static readonly SOURCE_LIST_CLOSE = 'SOURCE_LIST_CLOSE';

  static readonly SOURCE_LIST_START_REMOVE = 'SOURCE_LIST_START_REMOVE';
  static readonly SOURCE_LIST_CANCEL_REMOVE = 'SOURCE_LIST_CANCEL_REMOVE';
  static readonly SOURCE_LIST_REMOVED = 'SOURCE_LIST_REMOVED';

  static readonly SOURCE_LIST_START_CREATE = 'SOURCE_LIST_START_CREATE';
  static readonly SOURCE_LIST_CANCEL_CREATE = 'SOURCE_LIST_CANCEL_CREATE';
  static readonly SOURCE_LIST_SOURCE_UPDATED = 'SOURCE_LIST_SOURCE_UPDATED';



  @dispatch()

  stateUpdated = (payload: ISourceListState): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_STATE_UPDATED,
    meta: null,
    payload
  })

  searchHitsUpdated = (list: { [key: string]: ISourceSearchHitState }): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_SEARCH_HITS_UPDATED,
    meta: null,
    payload: {
      list
    }
  })


  open = (edit: ISourceDetailState): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_OPEN,
    meta: null,
    payload: {
      edit
    }
  })

  startRemove = (remove: ISourceSearchHitState): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_START_REMOVE,
    meta: null,
    payload: {
      remove
    }
  })

  cancelRemove = (): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_CANCEL_REMOVE,
    meta: null,
    payload: null
  })


  removed = (): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_REMOVED,
    meta: null,
    payload: null
  })


  startCreate = (): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_START_CREATE,
    meta: null,
    payload: null
  })

  cancelCreate = (): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_CANCEL_CREATE,
    meta: null,
    payload: null
  })

  close = (): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_CLOSE,
    meta: null,
    payload: null
  })

  sourceUpdated = (digitObj: InfDigitalObject): SourceListAction => ({
    type: SourceListActions.SOURCE_LIST_SOURCE_UPDATED,
    meta: null,
    payload: {
      edit: {
        view: digitObj
      }
    }
  })

}
