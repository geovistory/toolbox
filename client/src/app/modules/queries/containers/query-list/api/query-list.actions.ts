import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { QueryList } from './query-list.models';

type Payload = QueryList;
interface MetaData {
  itemsArray?: any[]
};
export type QueryListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class QueryListAPIActions {
  static readonly LOAD = 'QueryList::LOAD';
  static readonly LOAD_SUCCEEDED = 'QueryList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'QueryList::LOAD_FAILED';

  static readonly DESTROY = 'QueryList::DESTROY';

  @dispatch()
  load = (): QueryListAPIAction => ({
    type: QueryListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): QueryListAPIAction => ({
    type: QueryListAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): QueryListAPIAction => ({
    type: QueryListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): QueryListAPIAction => ({
   type: QueryListAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
