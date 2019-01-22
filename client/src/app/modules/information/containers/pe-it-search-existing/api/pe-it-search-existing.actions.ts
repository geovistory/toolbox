import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { PeItSearchExisting } from './pe-it-search-existing.models';
import { InfPersistentItem } from 'app/core';

type Payload = PeItSearchExisting;
interface MetaData {
  pkProject?: number;
  pkClass?: number;
  searchString?: string;
  pkNamespace?: number;
  limit?: number;
  page?: number;
  persistentItems?: InfPersistentItem[];
  collectionSize?: number;
};
export type PeItSearchExistingAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItSearchExistingAPIActions {
  static readonly SEARCH = 'PeItSearchExisting::SEARCH';
  static readonly SEARCH_SUCCEEDED = 'PeItSearchExisting::SEARCH_SUCCEEDED';
  static readonly SEARCH_FAILED = 'PeItSearchExisting::SEARCH_FAILED';

  static readonly DESTROY = 'PeItSearchExisting::DESTROY';

  @dispatch()
  search = (pkProject: number, searchString: string, limit: number, page: number, pkClass: number, pkNamespace: number): PeItSearchExistingAPIAction => ({
    type: PeItSearchExistingAPIActions.SEARCH,
    meta: { pkProject, searchString, limit, page, pkClass, pkNamespace },
    payload: null,
  });

  searchSucceeded = (persistentItems: InfPersistentItem[], collectionSize: number): PeItSearchExistingAPIAction => ({
    type: PeItSearchExistingAPIActions.SEARCH_SUCCEEDED,
    meta: {
      persistentItems, collectionSize
    },
    payload: null
  })

  @dispatch()
  searchFailed = (): PeItSearchExistingAPIAction => ({
    type: PeItSearchExistingAPIActions.SEARCH_FAILED,
    meta: null,
    payload: null
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): PeItSearchExistingAPIAction => ({
    type: PeItSearchExistingAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
