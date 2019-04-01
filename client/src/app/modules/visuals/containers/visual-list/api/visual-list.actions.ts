import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { VisualList } from './visual-list.models';

type Payload = VisualList;
interface MetaData {
  itemsArray?: any[]
};
export type VisualListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class VisualListAPIActions {
  static readonly LOAD = 'VisualList::LOAD';
  static readonly LOAD_SUCCEEDED = 'VisualList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'VisualList::LOAD_FAILED';

  static readonly DESTROY = 'VisualList::DESTROY';

  @dispatch()
  load = (): VisualListAPIAction => ({
    type: VisualListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): VisualListAPIAction => ({
    type: VisualListAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): VisualListAPIAction => ({
    type: VisualListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): VisualListAPIAction => ({
   type: VisualListAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
