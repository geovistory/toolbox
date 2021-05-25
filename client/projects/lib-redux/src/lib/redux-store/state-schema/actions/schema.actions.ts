import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { GvFieldPageReq, GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { IAppState } from '../../root/models/model';
import { LoadActionMeta } from '../_helpers/schema-actions-factory';

export type GvSchemaObjectAction = FluxStandardAction<Observable<GvPositiveSchemaObject>, LoadActionMeta>;

interface GvPaginationObjectActionMeta extends LoadActionMeta {
  req: GvFieldPageReq
}
export type GvPaginationObjectAction = FluxStandardAction<null, GvPaginationObjectActionMeta>;


/**
 * Class for actions that handle the loading of schema objects,
 * negative schema objects ect.
 */
@Injectable({
  providedIn: 'root'
})
export class GvSchemaActions {
  static readonly GV_SCHEMA_OBJECT_LOAD = 'GV_SCHEMA_OBJECT::LOAD';
  static readonly GV_PAGINATION_OBJECT_LOAD = 'GV_PAGINATION_OBJECT::LOAD';

  // action for gv modifier succeeded

  static readonly GV_MODIFIER_LOAD_SUCCEEDED = 'GV_MODIFIER_LOAD_SUCCEEDED::SUCCEEDED';

  constructor(private ngRedux: NgRedux<IAppState>) { }

  /**
   * Action for loading GvSchemaObject into the store
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
  loadGvSchemaObject(
    apiCall$: Observable<GvPositiveSchemaObject>
  ): void {
    const addPending = U.uuid()
    const action: GvSchemaObjectAction = {
      type: GvSchemaActions.GV_SCHEMA_OBJECT_LOAD,
      meta: { addPending },
      payload: apiCall$,
    };
    this.ngRedux.dispatch(action)
  }

  /**
 * Action for loading GvPaginationObject into the store
 * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
 *                we'll end up with two subscriptions and thus two api calls
 */
  loadGvPaginationObject(
    req: GvFieldPageReq,
  ): void {
    const addPending = U.uuid()
    const action: GvPaginationObjectAction = {
      type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
      meta: { addPending, req },
    };
    this.ngRedux.dispatch(action)
  }


  /**
* Action for storing GvSchemaModifier into the store
*/
  storeGvSchemaModifier(
    req: GvSchemaModifier,
  ): void {
    const action: FluxStandardAction<GvSchemaModifier> = {
      type: GvSchemaActions.GV_MODIFIER_LOAD_SUCCEEDED,
      payload: req,
    };
    this.ngRedux.dispatch(action)
  }
}
