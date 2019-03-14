import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { HasType } from './has-type.models';

type Payload = HasType;
interface MetaData {
  itemsArray?: any[]
};
export type HasTypeAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class HasTypeAPIActions {
  static readonly LOAD = 'HasType::LOAD';
  static readonly LOAD_SUCCEEDED = 'HasType::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'HasType::LOAD_FAILED';

  static readonly DESTROY = 'HasType::DESTROY';

  @dispatch()
  load = (): HasTypeAPIAction => ({
    type: HasTypeAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): HasTypeAPIAction => ({
    type: HasTypeAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): HasTypeAPIAction => ({
    type: HasTypeAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): HasTypeAPIAction => ({
   type: HasTypeAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
