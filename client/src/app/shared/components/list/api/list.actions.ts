import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { List, SearchResponse } from './list.models';
import { EntityType } from 'app/core/state/models/entity-preview';

type Payload = List;
interface MetaData {
  pkProject?: number, searchString?: string, pkClasses?: number[], entityType?: EntityType, limit?: number, page?: number,
  searchResponse?: SearchResponse
};
export type ListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ListAPIActions {
  static readonly SEARCH = 'List::SEARCH';
  static readonly SEARCH_STARTED = 'List::SEARCH_STARTED';
  static readonly SEARCH_SUCCEEDED = 'List::SEARCH_SUCCEEDED';
  static readonly SEARCH_FAILED = 'List::SEARCH_FAILED';

  static readonly DESTROY = 'List::DESTROY';

  /*********************************************************************
  *  Actions to manage search of entities
  *********************************************************************/
  @dispatch()
  search = (pkProject: number, searchString: string, pkClasses: number[], entityType: EntityType, limit: number, page: number): ListAPIAction => ({
    type: ListAPIActions.SEARCH,
    meta: { pkProject, searchString, pkClasses, entityType, limit, page },
    payload: null,
  });

  searchStarted = (): ListAPIAction => ({
    type: ListAPIActions.SEARCH_STARTED,
    meta: null,
    payload: null,
  })

  searchSucceeded = (searchResponse: SearchResponse): ListAPIAction => ({
    type: ListAPIActions.SEARCH_SUCCEEDED,
    meta: { searchResponse },
    payload: null
  })

  searchFailed = (error): ListAPIAction => ({
    type: ListAPIActions.SEARCH_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): ListAPIAction => ({
    type: ListAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
