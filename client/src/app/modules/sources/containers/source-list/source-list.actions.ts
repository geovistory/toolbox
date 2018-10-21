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
  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
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

  /**
   * Updates the list of search hits in store
   */
  @dispatch() searchHitsUpdated = (list: { [key: string]: ISourceSearchHitState }): SourceListAPIAction => ({
    type: SourceListAPIActions.SEARCH_HITS_UPDATED,
    meta: null,
    payload: {
      list
    }
  })


  /**
  * Opens a source for viewing and editing
  * - creates a SourceDetailState
  * - update store: 'edit'
  */
  @dispatch() open = (edit: ISourceDetailState): SourceListAPIAction => ({
    type: SourceListAPIActions.OPEN,
    meta: null,
    payload: {
      edit
    }
  })

  /**
* Closes a source
* - update store: delete 'edit'
*/
  @dispatch() close = (): SourceListAPIAction => ({
    type: SourceListAPIActions.CLOSE,
    meta: null,
    payload: null
  })


  /**
   * Leads to the 'are you sure?' question
   * - update store: set 'remove' = add a clone of entry
   */
  @dispatch() startRemove = (remove: ISourceSearchHitState): SourceListAPIAction => ({
    type: SourceListAPIActions.START_REMOVE,
    meta: null,
    payload: {
      remove
    }
  })

  /**
  * Back to list
  * - update store: delete 'remove'
  */
  @dispatch() cancelRemove = (): SourceListAPIAction => ({
    type: SourceListAPIActions.CANCEL_REMOVE,
    meta: null,
    payload: null
  })


  /**
  * Back to list
  * - update store: delete 'remove'
  */
  @dispatch() removed = (): SourceListAPIAction => ({
    type: SourceListAPIActions.REMOVED,
    meta: null,
    payload: null
  })

  /**
  * Shows create form
  * - updates store: set 'create' true
  */
  @dispatch() startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): SourceListAPIAction => ({
    type: SourceListAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

   /**
   * Hides create form
   * - updates store: set 'create' false
   */
  @dispatch() stopCreate = (): SourceListAPIAction => ({
    type: SourceListAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })


  /**
  *  Updates store: updates 'edit', 'view', sets 'edit', 'edit' false
  */
  @dispatch() sourceUpdated = (digitObj: InfDigitalObject): SourceListAPIAction => ({
    type: SourceListAPIActions.SOURCE_UPDATED,
    meta: null,
    payload: {
      edit: {
        view: digitObj
      }
    }
  })

}
