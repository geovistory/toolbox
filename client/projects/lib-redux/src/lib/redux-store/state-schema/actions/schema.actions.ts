import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { GvFieldPageReq, GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { LoadActionMeta } from '../_helpers/schema-actions-factory';

export type GvSchemaObjectAction = FluxStandardAction<Observable<GvPositiveSchemaObject>, LoadActionMeta>;
export type GvSchemaModifierAction = FluxStandardAction<Observable<GvSchemaModifier>, LoadActionMeta>;

interface GvPaginationObjectActionMeta extends LoadActionMeta {
  req: GvFieldPageReq
}
export type GvPaginationObjectAction = FluxStandardAction<Observable<GvPaginationObject>, LoadActionMeta>;


/**
 * Class for actions that handle the loading of schema objects,
 * negative schema objects ect.
 */
@Injectable({
  providedIn: 'root'
})
export class GvSchemaActions {
  static readonly GV_SCHEMA_OBJECT_LOAD = 'GV_SCHEMA_OBJECT::LOAD';
  static readonly GV_SCHEMA_MODIFIER_LOAD = 'GV_SCHEMA_MODIFIER::LOAD';
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
  ) {
    const addPending = U.uuid()
    const $ = apiCall$.pipe(shareReplay())
    const action: GvSchemaObjectAction = {
      type: GvSchemaActions.GV_SCHEMA_OBJECT_LOAD,
      meta: { addPending },
      payload: $,
    };
    this.ngRedux.dispatch(action)
    return $
  }

  /**
 * Action for loading GvSchemaModifier into the store
 * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
 *                we'll end up with two subscriptions and thus two api calls
 */
  loadGvSchemaModifier(
    apiCall$: Observable<GvSchemaModifier>
  ) {
    const addPending = U.uuid()
    const $ = apiCall$.pipe(shareReplay())
    const action: GvSchemaModifierAction = {
      type: GvSchemaActions.GV_SCHEMA_MODIFIER_LOAD,
      meta: { addPending },
      payload: $,
    };
    this.ngRedux.dispatch(action)
    return $
  }

  /**
 * Action for loading GvPaginationObject into the store
 * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
 *                we'll end up with two subscriptions and thus two api calls
 */
  loadGvPaginationObject(
    apiCall$: Observable<GvPaginationObject>
  ) {
    const addPending = U.uuid()
    const $ = apiCall$.pipe(shareReplay())
    const action: GvPaginationObjectAction = {
      type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
      meta: { addPending },
      payload: $
    };
    this.ngRedux.dispatch(action)
    return $
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
