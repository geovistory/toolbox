import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypeAddFormI } from './type-add-form.models';

type Payload = TypeAddFormI;
interface MetaData {
  itemsArray?: any[]
};
export type TypeAddFormAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypeAddFormAPIActions {
  static readonly LOAD = 'TypeAddForm::LOAD';
  static readonly LOAD_STARTED = 'TypeAddForm::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'TypeAddForm::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TypeAddForm::LOAD_FAILED';

  static readonly DESTROY = 'TypeAddForm::DESTROY';

  @dispatch()
  load = (): TypeAddFormAPIAction => ({
    type: TypeAddFormAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): TypeAddFormAPIAction => ({
    type: TypeAddFormAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): TypeAddFormAPIAction => ({
    type: TypeAddFormAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TypeAddFormAPIAction => ({
    type: TypeAddFormAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): TypeAddFormAPIAction => ({
   type: TypeAddFormAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
