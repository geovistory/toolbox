import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypesI } from './types.models';

type Payload = TypesI;
interface MetaData {
  itemsArray?: any[]
};
export type TypesAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypesAPIActions {
  static readonly LOAD = 'Types::LOAD';
  static readonly LOAD_STARTED = 'Types::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'Types::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'Types::LOAD_FAILED';

  static readonly DESTROY = 'Types::DESTROY';

  @dispatch()
  load = (): TypesAPIAction => ({
    type: TypesAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): TypesAPIAction => ({
   type: TypesAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
