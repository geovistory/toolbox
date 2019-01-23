import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SystemTypeListI } from './system-type-list.models';
import { ComSystemType } from 'app/core/sdk/models/ComSystemType';

type Payload = SystemTypeListI;
interface MetaData {
  systemtypes?: ComSystemType[]
};
export type SystemTypeListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SystemTypeListAPIActions {
  static readonly LOAD = 'SystemTypeList::LOAD';
  static readonly LOAD_STARTED = 'SystemTypeList::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'SystemTypeList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'SystemTypeList::LOAD_FAILED';

  static readonly DESTROY = 'SystemTypeList::DESTROY';

  @dispatch()
  load = (): SystemTypeListAPIAction => ({
    type: SystemTypeListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): SystemTypeListAPIAction => ({
    type: SystemTypeListAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (systemtypes: ComSystemType[]): SystemTypeListAPIAction => ({
    type: SystemTypeListAPIActions.LOAD_SUCCEEDED,
    meta: null,
    payload: { systemtypes }
  })

  loadFailed = (error): SystemTypeListAPIAction => ({
    type: SystemTypeListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): SystemTypeListAPIAction => ({
    type: SystemTypeListAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
