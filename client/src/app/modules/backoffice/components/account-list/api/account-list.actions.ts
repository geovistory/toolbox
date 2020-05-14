import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { AccountList } from './account-list.models';

type Payload = AccountList;
interface MetaData {
  itemsArray?: any[]
};
export type AccountListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class AccountListAPIActions {
  static readonly LOAD = 'AccountList::LOAD';
  static readonly LOAD_SUCCEEDED = 'AccountList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'AccountList::LOAD_FAILED';

  static readonly DESTROY = 'AccountList::DESTROY';

  @dispatch()
  load = (): AccountListAPIAction => ({
    type: AccountListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): AccountListAPIAction => ({
    type: AccountListAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): AccountListAPIAction => ({
    type: AccountListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): AccountListAPIAction => ({
   type: AccountListAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
