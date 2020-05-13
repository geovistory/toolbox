import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypeEditFormI } from './type-edit-form.models';

type Payload = TypeEditFormI;
interface MetaData {
  itemsArray?: any[]
};
export type TypeEditFormAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypeEditFormAPIActions {
  static readonly LOAD = 'TypeEditForm::LOAD';
  static readonly LOAD_STARTED = 'TypeEditForm::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'TypeEditForm::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TypeEditForm::LOAD_FAILED';

  static readonly DESTROY = 'TypeEditForm::DESTROY';

  @dispatch()
  load = (): TypeEditFormAPIAction => ({
    type: TypeEditFormAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): TypeEditFormAPIAction => ({
    type: TypeEditFormAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): TypeEditFormAPIAction => ({
    type: TypeEditFormAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TypeEditFormAPIAction => ({
    type: TypeEditFormAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): TypeEditFormAPIAction => ({
   type: TypeEditFormAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
