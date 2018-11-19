import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { MentioningList } from './mentioning-list.models';

type Payload = MentioningList;
interface MetaData {
  itemsArray?: any[]
};
export type MentioningListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class MentioningListAPIActions {
  static readonly LOAD = 'MentioningList::LOAD';
  static readonly LOAD_SUCCEEDED = 'MentioningList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'MentioningList::LOAD_FAILED';

  static readonly DESTROY = 'MentioningList::DESTROY';

  @dispatch()
  load = (): MentioningListAPIAction => ({
    type: MentioningListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): MentioningListAPIAction => ({
    type: MentioningListAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): MentioningListAPIAction => ({
    type: MentioningListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): MentioningListAPIAction => ({
   type: MentioningListAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
