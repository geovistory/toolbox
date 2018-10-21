import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PeItDetail } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information, SearchResponse } from './information.models';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';

type Payload = Information;
interface MetaData {
  pkProject?: number, searchString?: string, limit?: number, page?: number,
  searchResponse?: SearchResponse,
  pkEntity?: number,
  peItDetail?: PeItDetail,
  classAndTypePk?: ClassAndTypePk;
  pkUiContext?: number;
};
export type InformationAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class InformationAPIActions {
  static readonly SEARCH = 'Information::SEARCH';
  static readonly SEARCH_STARTED = 'Information::SEARCH_STARTED';
  static readonly SEARCH_SUCCEEDED = 'Information::SEARCH_SUCCEEDED';
  static readonly SEARCH_FAILED = 'Information::SEARCH_FAILED';

  static readonly OPEN_ENTITY_EDITOR = 'Information::OPEN_ENTITY_EDITOR';
  static readonly OPEN_ENTITY_EDITOR_SUCCEEDED = 'Information::OPEN_ENTITY_EDITOR_SUCCEEDED';
  static readonly OPEN_ENTITY_EDITOR_FAILED = 'Information::OPEN_ENTITY_EDITOR_FAILED';

  static readonly DESTROY = 'Information::DESTROY';

  static readonly START_CREATE = 'Information::START_CREATE';
  static readonly STOP_CREATE = 'Information::STOP_CREATE';

  // static readonly ENTITY_ADD_EXISTING_INITIALIZED = 'ENTITY_ADD_EXISTING_INITIALIZED';
  // static readonly ENTITY_ADD_EXISTING_DESTROYED = 'ENTITY_ADD_EXISTING_DESTROYED';
  // static readonly PE_IT_CREATE_ADDED = 'PE_IT_CREATE_ADDED';
  // static readonly PE_IT_CREATE_DESTROYED = 'PE_IT_CREATE_DESTROYED';

  /*********************************************************************
  *  Actions to manage search of data units
  *********************************************************************/
  @dispatch()
  search = (pkProject: number, searchString: string, limit: number, page: number): InformationAPIAction => ({
    type: InformationAPIActions.SEARCH,
    meta: { pkProject, searchString, limit, page },
    payload: null,
  });

  searchStarted = (): InformationAPIAction => ({
    type: InformationAPIActions.SEARCH_STARTED,
    meta: null,
    payload: null,
  })

  searchSucceeded = (searchResponse: SearchResponse): InformationAPIAction => ({
    type: InformationAPIActions.SEARCH_SUCCEEDED,
    meta: { searchResponse },
    payload: null
  })

  searchFailed = (error): InformationAPIAction => ({
    type: InformationAPIActions.SEARCH_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Actions to manage entity editor
  *********************************************************************/

  @dispatch()
  openEntityEditor = (pkEntity: number, pkProject: number): InformationAPIAction => ({
    type: InformationAPIActions.OPEN_ENTITY_EDITOR,
    meta: { pkEntity, pkProject },
    payload: null,
  });

  openEntityEditorSucceeded = (peItDetail: PeItDetail): InformationAPIAction => ({
    type: InformationAPIActions.OPEN_ENTITY_EDITOR_SUCCEEDED,
    meta: { peItDetail },
    payload: null
  })

  openEntityEditorFailed = (error): InformationAPIAction => ({
    type: InformationAPIActions.OPEN_ENTITY_EDITOR_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /***************************************************************
   * TODO: Evaluate if those actions are needed
   */

  @dispatch()
  startCreate = (classAndTypePk: ClassAndTypePk, pkUiContext: number): InformationAPIAction => ({
    type: InformationAPIActions.START_CREATE,
    meta: { classAndTypePk, pkUiContext },
    payload: null
  })

  @dispatch()
  stopCreate = (): InformationAPIAction => ({
    type: InformationAPIActions.STOP_CREATE,
    meta: null,
    payload: null
  })


  // entityAddExistingInitialized = (_peIt_add_form: PeItDetail): InformationAPIAction => ({
  //   type: InformationAPIActions.ENTITY_ADD_EXISTING_INITIALIZED,
  //   meta: null,
  //   payload: {
  //     _peIt_add_form
  //   }
  // });
  // entityAddExistingDestroyed = (): InformationAPIAction => ({
  //   type: InformationAPIActions.ENTITY_ADD_EXISTING_DESTROYED,
  //   meta: null,
  //   payload: null
  // });


  // @dispatch()
  // peItCreateFormAdded = (_peIt_create_form: PeItDetail): InformationAPIAction => ({
  //   type: InformationAPIActions.PE_IT_CREATE_ADDED,
  //   meta: null,
  //   payload: {
  //     _peIt_create_form
  //   }
  // });
  // peItCreateFormDestroyed = (): InformationAPIAction => ({
  //   type: InformationAPIActions.PE_IT_CREATE_DESTROYED,
  //   meta: null,
  //   payload: null
  // });

  /**
   *
  **************************************************************/


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): InformationAPIAction => ({
    type: InformationAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
