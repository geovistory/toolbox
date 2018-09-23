import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypesI } from './types.models';
import { InfPersistentItem } from 'app/core';

type Payload = TypesI;
interface MetaData {
  pkNamespace?: number,
  pkProject?: number,
  pkTypedClass?: number,
  types?: InfPersistentItem[]
};
export type TypesAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypesAPIActions {
  static readonly LOAD = 'Types::LOAD';
  static readonly LOAD_STARTED = 'Types::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'Types::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'Types::LOAD_FAILED';

  static readonly OPEN_ADD_FORM = 'Types::OPEN_ADD_FORM';
  static readonly CLOSE_ADD_FORM = 'Types::CLOSE_ADD_FORM';

  static readonly DESTROY = 'Types::DESTROY';

  @dispatch()
  load = (pkNamespace: number, pkProject: number, pkTypedClass: number): TypesAPIAction => ({
    type: TypesAPIActions.LOAD,
    meta: {
      pkNamespace,
      pkProject,
      pkTypedClass
    },
    payload: null,
  });

  loadStarted = (): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (types: InfPersistentItem[]): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_SUCCEEDED,
    meta: { types },
    payload: null
  })

  loadFailed = (error): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
 *  Methods related to the add form
 *********************************************************************/
  @dispatch()
  openAddForm = (): TypesAPIAction => ({
    type: TypesAPIActions.OPEN_ADD_FORM,
    meta: null,
    payload: null
  })

  @dispatch()
  closeAddForm = (): TypesAPIAction => ({
    type: TypesAPIActions.CLOSE_ADD_FORM,
    meta: null,
    payload: null
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
