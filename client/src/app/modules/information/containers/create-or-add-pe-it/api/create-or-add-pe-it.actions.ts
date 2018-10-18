import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { CreateOrAddPeIt } from './create-or-add-pe-it.models';
import { ProjectCrm } from 'app/core';

type Payload = CreateOrAddPeIt;
interface MetaData {
  pkClass?: number;
  crm?: ProjectCrm;
  itemsArray?: any[]
};
export type CreateOrAddPeItAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class CreateOrAddPeItAPIActions {
  static readonly INIT_CREATE_FORM = 'CreateOrAddPeIt::INIT_CREATE_FORM';

  static readonly LOAD = 'CreateOrAddPeIt::LOAD';
  static readonly LOAD_SUCCEEDED = 'CreateOrAddPeIt::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'CreateOrAddPeIt::LOAD_FAILED';

  static readonly DESTROY = 'CreateOrAddPeIt::DESTROY';

  @dispatch()
  initCreateForm = (pkClass: number, crm: ProjectCrm): CreateOrAddPeItAPIAction => ({
    type: CreateOrAddPeItAPIActions.INIT_CREATE_FORM,
    meta: { pkClass, crm },
    payload: null,
  });

  @dispatch()
  load = (): CreateOrAddPeItAPIAction => ({
    type: CreateOrAddPeItAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): CreateOrAddPeItAPIAction => ({
    type: CreateOrAddPeItAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): CreateOrAddPeItAPIAction => ({
    type: CreateOrAddPeItAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): CreateOrAddPeItAPIAction => ({
    type: CreateOrAddPeItAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
