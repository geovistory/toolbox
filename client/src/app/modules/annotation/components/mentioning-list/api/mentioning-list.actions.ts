import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { MentioningList, Mentioning } from './mentioning-list.models';
import { InfEntityAssociation } from 'app/core';

type Payload = MentioningList;
interface MetaData {
  ea?: InfEntityAssociation
  pkEntity?: number,
  items?: Mentioning[]
};
export type MentioningListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class MentioningListAPIActions {


  static readonly LOAD = 'MentioningList::LOAD';
  static readonly LOAD_SUCCEEDED = 'MentioningList::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'MentioningList::LOAD_FAILED';

  static readonly CREATE = 'MentioningList::CREATE';
  static readonly CREATE_SUCCEEDED = 'MentioningList::CREATE_SUCCEEDED';
  static readonly CREATE_FAILED = 'MentioningList::CREATE_FAILED';

  static readonly DESTROY = 'MentioningList::DESTROY';

  /***************************************************************
   * Load the list of mentionings
   ***************************************************************/

  @dispatch()
  load = (): MentioningListAPIAction => ({
    type: MentioningListAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (items: Mentioning[]): MentioningListAPIAction => ({
    type: MentioningListAPIActions.LOAD_SUCCEEDED,
    meta: { items },
    payload: null
  })

  loadFailed = (error): MentioningListAPIAction => ({
    type: MentioningListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /***************************************************************
 * Load the list of mentionings
 ***************************************************************/

  @dispatch()
  create = (ea: InfEntityAssociation): MentioningListAPIAction => ({
    type: MentioningListAPIActions.CREATE,
    meta: { ea },
    payload: null,
  });

  createSucceeded = (ea: InfEntityAssociation): MentioningListAPIAction => ({
    type: MentioningListAPIActions.CREATE_SUCCEEDED,
    meta: { ea },
    payload: null
  })

  createFailed = (error): MentioningListAPIAction => ({
    type: MentioningListAPIActions.CREATE_FAILED,
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
