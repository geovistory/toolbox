import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassFieldList } from './class-field-list.models';

type Payload = ClassFieldList;
interface MetaData {
  itemsArray?: any[]
};
export type ClassFieldListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassFieldListAPIActions {
  static readonly LOAD = 'ClassFieldList::LOAD';
  static readonly LOAD_SUCCEEDED = 'ClassFieldList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'ClassFieldList::LOAD_FAILED';

  static readonly DESTROY = 'ClassFieldList::DESTROY';

  @dispatch()
  load = (): ClassFieldListAPIAction => ({
    type: ClassFieldListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): ClassFieldListAPIAction => ({
    type: ClassFieldListAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): ClassFieldListAPIAction => ({
    type: ClassFieldListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): ClassFieldListAPIAction => ({
   type: ClassFieldListAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
