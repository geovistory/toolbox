import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { QueryDetail } from './query-detail.models';

type Payload = QueryDetail;
interface MetaData {
  queryResults?: any[],
  pkProject?: number;
  query?: any;
};
export type QueryDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class QueryDetailAPIActions {
  static readonly LOAD = 'QueryDetail::LOAD';
  static readonly LOAD_SUCCEEDED = 'QueryDetail::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'QueryDetail::LOAD_FAILED';

  static readonly SAVE = 'QueryDetail::SAVE';
  static readonly SAVE_SUCCEEDED = 'QueryDetail::SAVE_SUCCEEDED';
  static readonly SAVE_FAILED = 'QueryDetail::SAVE_FAILED';

  static readonly RUN = 'QueryDetail::RUN';
  static readonly RUN_SUCCEEDED = 'QueryDetail::RUN_SUCCEEDED';
  static readonly RUN_FAILED = 'QueryDetail::RUN_FAILED';

  static readonly SHOW_RIGHT_AREA = 'QueryDetail::SHOW_RIGHT_AREA';
  static readonly HIDE_RIGHT_AREA = 'QueryDetail::HIDE_RIGHT_AREA';


  static readonly DESTROY = 'QueryDetail::DESTROY';

  @dispatch()
  load = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (queryResults: any[]): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD_SUCCEEDED,
    meta: {
      queryResults
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
  *  Run a query
  *********************************************************************/

  @dispatch()
  run = (pkProject: number, query): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN,
    meta: { pkProject, query },
    payload: null,
  });

  runSucceeded = (queryResults: any[]): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN_SUCCEEDED,
    meta: {
      queryResults
    },
    payload: null
  })

  runFailed = (error): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN_FAILED,
    meta: null,
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
