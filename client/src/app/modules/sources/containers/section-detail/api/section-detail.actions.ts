import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SectionDetail } from './section-detail.models';

type Payload = SectionDetail;
interface MetaData {
  itemsArray?: any[]
};
export type SectionDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SectionDetailAPIActions {
  static readonly LOAD = 'SectionDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'SectionDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'SectionDetail::LOAD_FAILED';

  static readonly DESTROY = 'SectionDetail::DESTROY';

  @dispatch()
  load = (): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): SectionDetailAPIAction => ({
    type: SectionDetailAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): SectionDetailAPIAction => ({
   type: SectionDetailAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
