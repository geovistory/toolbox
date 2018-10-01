import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypesI } from './types.models';
import { InfPersistentItem, DfhClass, InfNamespace, PeItDetail } from 'app/core';

type Payload = TypesI;
interface MetaData {
  types?: InfPersistentItem[],
  typeClass?: DfhClass,
  type?: InfPersistentItem,
  peItDetail?: PeItDetail,
  namespace?: InfNamespace
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

  static readonly CREATE = 'Types::CREATE';
  static readonly CREATE_STARTED = 'Types::CREATE_STARTED';
  static readonly CREATE_SUCCEEDED = 'Types::CREATE_SUCCEEDED';
  static readonly CREATE_FAILED = 'Types::CREATE_FAILED';

  static readonly OPEN_EDIT_FORM = 'Types::OPEN_EDIT_FORM';
  static readonly OPEN_EDIT_FORM_SUCCEEDED = 'Types::OPEN_EDIT_FORM_SUCCEEDED';
  static readonly OPEN_EDIT_FORM_FAILED = 'Types::OPEN_EDIT_FORM_FAILED';

  static readonly CLOSE_EDIT_FORM = 'Types::CLOSE_EDIT_FORM';

  static readonly EDIT = 'Types::EDIT';
  static readonly EDIT_STARTED = 'Types::EDIT_STARTED';
  static readonly EDIT_SUCCEEDED = 'Types::EDIT_SUCCEEDED';
  static readonly EDIT_FAILED = 'Types::EDIT_FAILED';


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

  loadSucceeded = (typeClass: DfhClass, types: InfPersistentItem[], namespace: InfNamespace): TypesAPIAction => ({
    type: TypesAPIActions.LOAD_SUCCEEDED,
    meta: { typeClass, types, namespace },
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

  @dispatch()
  create = (type: InfPersistentItem): TypesAPIAction => ({
    type: TypesAPIActions.CREATE,
    meta: { type },
    payload: null
  })

  createStarted = (): TypesAPIAction => ({
    type: TypesAPIActions.CREATE_STARTED,
    meta: null,
    payload: null,
  })

  createSucceeded = (type: InfPersistentItem): TypesAPIAction => ({
    type: TypesAPIActions.CREATE_SUCCEEDED,
    meta: { type },
    payload: null
  })

  createFailed = (error): TypesAPIAction => ({
    type: TypesAPIActions.CREATE_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
   *  Methods related to the edit form
   *********************************************************************/


  @dispatch()
  openEditForm = (type: InfPersistentItem): TypesAPIAction => ({
    type: TypesAPIActions.OPEN_EDIT_FORM,
    meta: { type },
    payload: null
  })

  openEditFormSucceeded = (peItDetail: PeItDetail): TypesAPIAction => ({
    type: TypesAPIActions.OPEN_EDIT_FORM_SUCCEEDED,
    meta: { peItDetail },
    payload: null
  })

  openEditFormFailed = (error): TypesAPIAction => ({
    type: TypesAPIActions.OPEN_EDIT_FORM_FAILED,
    meta: null,
    payload: null,
    error
  })

  @dispatch()
  closeEditForm = (error): TypesAPIAction => ({
    type: TypesAPIActions.CLOSE_EDIT_FORM,
    meta: null,
    payload: null,
    error
  })

  edit = (type: InfPersistentItem): TypesAPIAction => ({
    type: TypesAPIActions.EDIT,
    meta: { type },
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
