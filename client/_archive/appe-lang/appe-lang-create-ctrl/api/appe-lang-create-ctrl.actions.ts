import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { AppeLangCreateCtrlI } from './appe-lang-create-ctrl.models';

type Payload = AppeLangCreateCtrlI;
interface MetaData {
  itemsArray?: any[]
};
export type AppeLangCreateCtrlAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class AppeLangCreateCtrlAPIActions {
  static readonly LOAD = 'AppeLangCreateCtrl::LOAD';
  static readonly LOAD_STARTED = 'AppeLangCreateCtrl::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'AppeLangCreateCtrl::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'AppeLangCreateCtrl::LOAD_FAILED';

  static readonly DESTROY = 'AppeLangCreateCtrl::DESTROY';

  @dispatch()
  load = (): AppeLangCreateCtrlAPIAction => ({
    type: AppeLangCreateCtrlAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): AppeLangCreateCtrlAPIAction => ({
    type: AppeLangCreateCtrlAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): AppeLangCreateCtrlAPIAction => ({
    type: AppeLangCreateCtrlAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): AppeLangCreateCtrlAPIAction => ({
    type: AppeLangCreateCtrlAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): AppeLangCreateCtrlAPIAction => ({
   type: AppeLangCreateCtrlAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
