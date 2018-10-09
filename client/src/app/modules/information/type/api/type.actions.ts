import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypeDetail } from 'app/core/state/models/type-detail';

type Payload = TypeDetail;
interface MetaData {
  itemsArray?: any[]
};
export type TypeAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypeAPIActions {
  static readonly LOAD = 'Type::LOAD';
  static readonly LOAD_SUCCEEDED = 'Type::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'Type::LOAD_FAILED';

  static readonly START_EDIT = 'Type::START_EDIT';
  static readonly STOP_EDIT = 'Type::STOP_EDIT';

  static readonly DESTROY = 'Type::DESTROY';

  @dispatch()
  load = (): TypeAPIAction => ({
    type: TypeAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): TypeAPIAction => ({
    type: TypeAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TypeAPIAction => ({
    type: TypeAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  @dispatch()
  startEdit = (): TypeAPIAction => ({
    type: TypeAPIActions.START_EDIT,
    meta: null,
    payload: null,
  })

  @dispatch()
  stopEdit = (): TypeAPIAction => ({
    type: TypeAPIActions.STOP_EDIT,
    meta: null,
    payload: null,
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TypeAPIAction => ({
    type: TypeAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
