import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypeCtrl, TypeOptions } from './type-ctrl.models';
import { TreeviewItem } from 'ngx-treeview';

type Payload = TypeCtrl;
interface MetaData {
  pkTypedClass?: number,
  pkProject?: number,
  itemsArray?: any[]
};
export type TypeCtrlAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypeCtrlAPIActions {
  static readonly LOAD = 'TypeCtrl::LOAD';
  static readonly LOAD_SUCCEEDED = 'TypeCtrl::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TypeCtrl::LOAD_FAILED';

  static readonly DESTROY = 'TypeCtrl::DESTROY';

  @dispatch()
  load = (pkProject: number, pkTypedClass: number, ): TypeCtrlAPIAction => ({
    type: TypeCtrlAPIActions.LOAD,
    meta: { pkProject, pkTypedClass },
    payload: null,
  });

  loadSucceeded = (items: TreeviewItem[]): TypeCtrlAPIAction => ({
    type: TypeCtrlAPIActions.LOAD_SUCCEEDED,
    meta: null,
    payload: { items }
  })

  loadFailed = (error): TypeCtrlAPIAction => ({
    type: TypeCtrlAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TypeCtrlAPIAction => ({
    type: TypeCtrlAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
