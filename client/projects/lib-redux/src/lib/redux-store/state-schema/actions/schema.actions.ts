import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { GvPaginationObject, GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { IAppState } from '../../root/models/model';
import { LoadActionMeta } from '../_helpers/schema-actions-factory';
import { LoadPaginatedStatementListMeta } from './inf.actions';

export type GvSchemaObjectAction = FluxStandardAction<Observable<GvSchemaObject>, LoadActionMeta>;
export type GvPaginationObjectAction = FluxStandardAction<Observable<GvPaginationObject>, LoadPaginatedStatementListMeta>;


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

  constructor(private ngRedux: NgRedux<IAppState>) { }

  /**
   * Action for loading GvSchemaObject into the store
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
  loadGvSchemaObject(
    apiCall$: Observable<GvSchemaObject>
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
    apiCall$: Observable<GvPaginationObject>,
    meta: Omit<LoadPaginatedStatementListMeta, 'addPending'>,
  ): void {
    const addPending = U.uuid()
    const action: GvPaginationObjectAction = {
      type: GvSchemaActions.GV_PAGINATION_OBJECT_LOAD,
      meta: { addPending, ...meta },
      payload: apiCall$,
    };
    this.ngRedux.dispatch(action)
  }
}
