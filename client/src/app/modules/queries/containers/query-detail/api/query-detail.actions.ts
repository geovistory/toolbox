import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { QueryDetail } from './query-detail.models';
import { GvQuery } from '../query-detail.component';
import { ComQuery } from 'app/core';

type Payload = QueryDetail;
interface MetaData {
  queryResults?: any[],
  pkProject?: number;
  pkEntity?: number;
  query?: GvQuery;
  comQuery?: ComQuery;
  offset?: number
  limit?: number,
  tabTitle?:string
};
export type QueryDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class QueryDetailAPIActions {
  static readonly SET_TAB_TITLE = 'QueryDetail::SET_TAB_TITLE';

  static readonly LOAD = 'QueryDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'QueryDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'QueryDetail::LOAD_FAILED';

  static readonly SAVE = 'QueryDetail::SAVE';
  static readonly SAVE_SUCCEEDED = 'QueryDetail::SAVE_SUCCEEDED';
  static readonly SAVE_FAILED = 'QueryDetail::SAVE_FAILED';


  static readonly RUN_INIT = 'QueryDetail::RUN_INIT';
  static readonly RUN = 'QueryDetail::RUN';
  static readonly RUN_SUCCEEDED = 'QueryDetail::RUN_SUCCEEDED';
  static readonly RUN_FAILED = 'QueryDetail::RUN_FAILED';

  static readonly SHOW_RIGHT_AREA = 'QueryDetail::SHOW_RIGHT_AREA';
  static readonly HIDE_RIGHT_AREA = 'QueryDetail::HIDE_RIGHT_AREA';


  static readonly DESTROY = 'QueryDetail::DESTROY';


  /*********************************************************************
  *  Set tab title
  *********************************************************************/
  @dispatch()
  setTabTitle = (tabTitle:string): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD,
    meta: { tabTitle },
    payload: null,
  });

  /*********************************************************************
  *  Load an existing query
  *********************************************************************/

  @dispatch()
  load = (pkProject: number, pkEntity: number): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD,
    meta: { pkProject, pkEntity },
    payload: null,
  });

  loadSucceeded = (comQuery: ComQuery): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD_SUCCEEDED,
    meta: {
      comQuery
    },
    payload: null
  })

  loadFailed = (error): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Save a query
  *********************************************************************/

  @dispatch()
  save = (comQuery: ComQuery): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.SAVE,
    meta: { comQuery },
    payload: null,
  });

  saveSucceeded = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.SAVE_SUCCEEDED,
    meta: null,
    payload: null
  })

  saveFailed = (error): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.SAVE_FAILED,
    meta: null,
    payload: null,
    error,
  })



  /*********************************************************************
  *  Run a query
  *********************************************************************/


  @dispatch()
  runInit = (pkProject: number, query: GvQuery): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN_INIT,
    meta: { pkProject, query },
    payload: null,
  });

  @dispatch()
  run = (pkProject: number, query: GvQuery): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN,
    meta: { pkProject, query },
    payload: null,
  });

  runSucceeded = (queryResults: any[], offset: number, limit: number): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN_SUCCEEDED,
    meta: {
      queryResults, offset, limit
    },
    payload: null
  })

  runFailed = (error, offset: number, limit: number): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN_FAILED,
    meta: { offset, limit },
    payload: null,
    error,
  })

  /*********************************************************************
  *  Layout
  *********************************************************************/
  @dispatch()
  showRightArea = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.SHOW_RIGHT_AREA,
    meta: null,
    payload: null
  })
  @dispatch()
  hideRightArea = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.HIDE_RIGHT_AREA,
    meta: null,
    payload: null
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
