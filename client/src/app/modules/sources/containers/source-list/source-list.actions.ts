import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ISourceListState, ISourceDetailState, ISourceSearchHitState } from '../../sources.models';
import { InfDigitalObject } from '../../../../core';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';

// replace SourceList with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ISourceListState;
interface MetaData {
  classAndTypePk?: ClassAndTypePk
};
export type SourceListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SourceListAPIActions {
  static readonly STATE_UPDATED = 'SourceList::STATE_UPDATED';

  static readonly SEARCH_HITS_UPDATED = 'SourceList::SEARCH_HITS_UPDATED';

  static readonly OPEN = 'SourceList::OPEN';
  static readonly CLOSE = 'SourceList::CLOSE';

  static readonly START_REMOVE = 'SourceList::START_REMOVE';
  static readonly CANCEL_REMOVE = 'SourceList::CANCEL_REMOVE';
  static readonly REMOVED = 'SourceList::REMOVED';

  static readonly START_CREATE = 'SourceList::START_CREATE';
  static readonly STOP_CREATE = 'SourceList::STOP_CREATE';
  static readonly SOURCE_UPDATED = 'SourceList::SOURCE_UPDATED';



  @dispatch()

  stateUpdated = (payload: ISourceListState): SourceListAPIAction => ({
    type: SourceListAPIActions.STATE_UPDATED,
    meta: null,
    payload
  })

  searchHitsUpdated = (list: { [key: string]: ISourceSearchHitState }): SourceListAPIAction => ({
    type: SourceListAPIActions.SEARCH_HITS_UPDATED,
    meta: null,
    payload: {
      list
    }
  })


  open = (edit: ISourceDetailState): SourceListAPIAction => ({
    type: SourceListAPIActions.OPEN,
    meta: null,
    payload: {
      edit
    }
  })

  startRemove = (remove: ISourceSearchHitState): SourceListAPIAction => ({
    type: SourceListAPIActions.START_REMOVE,
    meta: null,
    payload: {
      remove
    }
  })

  cancelRemove = (): SourceListAPIAction => ({
    type: SourceListAPIActions.CANCEL_REMOVE,
    meta: null,
    payload: null
  })


  removed = (): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVED,
    meta: null,
    payload: null
  })


  startCreate = (classAndTypePk: ClassAndTypePk): SourceListAPIAction => ({
    type: SourceListAPIActions.START_CREATE,
    meta: { classAndTypePk },
    payload: null
  })

  stopCreate = (): SourceListAPIAction => ({
    type: SourceListAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })

  close = (): SourceListAPIAction => ({
    type: SourceListAPIActions.CLOSE,
    meta: null,
    payload: null
  })

  sourceUpdated = (digitObj: InfDigitalObject): SourceListAPIAction => ({
    type: SourceListAPIActions.SOURCE_UPDATED,
    meta: null,
    payload: {
      edit: {
        view: digitObj
      }
    }
  })

}
