import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { NamespaceListI } from './namespace-list.models';

type Payload = NamespaceListI;
interface MetaData {
  itemsArray?: any[]
};
export type NamespaceListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class NamespaceListAPIActions {
  static readonly LOAD = 'NamespaceList::LOAD';
  static readonly LOAD_STARTED = 'NamespaceList::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'NamespaceList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'NamespaceList::LOAD_FAILED';

  @dispatch()
  load = (): NamespaceListAPIAction => ({
    type: NamespaceListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): NamespaceListAPIAction => ({
    type: NamespaceListAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): NamespaceListAPIAction => ({
    type: NamespaceListAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): NamespaceListAPIAction => ({
    type: NamespaceListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): ProjectSettingsDataAPIAction => ({
   type: ProjectSettingsDataAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
