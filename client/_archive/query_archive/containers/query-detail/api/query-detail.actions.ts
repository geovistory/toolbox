import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProQuery } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { QueryDefinition } from '../../../../../../../../src/common/interfaces';
import { FileType, QueryDetail } from './query-detail.models';
type Payload = QueryDetail;
interface MetaData {
  queryResults?: any[],
  pkProject?: number;
  pkEntity?: number;
  query?: QueryDefinition;
  comQuery?: ProQuery;
  offset?: number
  limit?: number,
  tabTitle?: string
  filetype?: FileType
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

  static readonly RUN_INIT = 'QueryDetail::RUN_INIT';
  static readonly RUN = 'QueryDetail::RUN';
  static readonly RUN_SUCCEEDED = 'QueryDetail::RUN_SUCCEEDED';
  static readonly RUN_FAILED = 'QueryDetail::RUN_FAILED';

  static readonly DELETE = 'QueryDetail::DELETE';
  static readonly DELETE_SUCCEEDED = 'QueryDetail::DELETE_SUCCEEDED';
  static readonly DELETE_FAILED = 'QueryDetail::DELETE_FAILED';

  static readonly DOWNLOAD = 'QueryDetail::DOWNLOAD';
  static readonly DOWNLOAD_SUCCEEDED = 'QueryDetail::DOWNLOAD_SUCCEEDED';
  static readonly DOWNLOAD_FAILED = 'QueryDetail::DOWNLOAD_FAILED';

  static readonly DESTROY = 'QueryDetail::DESTROY';



  /*********************************************************************
  *  Load an existing query
  *********************************************************************/

  @dispatch()
  load = (pkProject: number, pkEntity: number): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.LOAD,
    meta: { pkProject, pkEntity },
    payload: null,
  });

  loadSucceeded = (comQuery: ProQuery): QueryDetailAPIAction => ({
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
  save = (comQuery: ProQuery, pkEntity: number): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.SAVE,
    meta: { comQuery, pkEntity },
    payload: null,
  });

  saveSucceeded = (comQuery: ProQuery): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.SAVE_SUCCEEDED,
    meta: { comQuery },
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
  runInit = (pkProject: number, query: QueryDefinition): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.RUN_INIT,
    meta: { pkProject, query },
    payload: null,
  });

  @dispatch()
  run = (pkProject: number, query: QueryDefinition): QueryDetailAPIAction => ({
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
  *  Delete a query
  *********************************************************************/

  @dispatch()
  delete = (pkEntity: number): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DELETE,
    meta: { pkEntity },
    payload: null,
  });

  deleteSucceeded = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DELETE_SUCCEEDED,
    meta: {},
    payload: null
  })

  deleteFailed = (error): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DELETE_FAILED,
    meta: null,
    payload: null,
    error,
  })



  /*********************************************************************
  *  Download query result
  *********************************************************************/

  @dispatch()
  download = (pkProject: number, query: QueryDefinition, filetype: FileType): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DOWNLOAD,
    meta: { pkProject, query, filetype },
    payload: null,
  });

  downloadSucceeded = (): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DOWNLOAD_SUCCEEDED,
    meta: null,
    payload: null
  })

  downloadFailed = (error): QueryDetailAPIAction => ({
    type: QueryDetailAPIActions.DOWNLOAD_FAILED,
    meta: null,
    payload: null,
    error,
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
