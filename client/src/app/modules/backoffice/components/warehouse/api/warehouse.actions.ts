import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Warehouse } from './warehouse.models';

type Payload = Warehouse;
interface MetaData {
  createEntityPreviewsInfo?: string
};
export type WarehouseAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class WarehouseAPIActions {
  static readonly CREATE_ALL_ENTITY_PREVIEWS = 'Warehouse::CREATE_ALL_ENTITY_PREVIEWS';
  static readonly CREATE_ALL_ENTITY_PREVIEWS_SUCCEEDED = 'Warehouse::CREATE_ALL_ENTITY_PREVIEWS_SUCCEEDED';
  static readonly CREATE_ALL_ENTITY_PREVIEWS_FAILED = 'Warehouse::CREATE_ALL_ENTITY_PREVIEWS_FAILED';

  static readonly DESTROY = 'Warehouse::DESTROY';

  @dispatch()
  createAllEntityPreviews = (): WarehouseAPIAction => ({
    type: WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS,
    meta: null,
    payload: null,
  });

  createAllEntityPreviewsSucceeded = (createEntityPreviewsInfo: string): WarehouseAPIAction => ({
    type: WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS_SUCCEEDED,
    meta: {
      createEntityPreviewsInfo
    },
    payload: null
  })

  createAllEntityPreviewsFailed = (error): WarehouseAPIAction => ({
    type: WarehouseAPIActions.CREATE_ALL_ENTITY_PREVIEWS_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): WarehouseAPIAction => ({
    type: WarehouseAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
