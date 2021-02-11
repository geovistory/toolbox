import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { EntityDetail } from 'projects/app-toolbox/src/app/core';
import { InfPersistentItem } from '@kleiolab/lib-sdk-lb3';
import { DatNamespace } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { Types } from './types.models';
import { DfhClass } from 'projects/app-toolbox/src/app/core/sdk-lb4';

type Payload = Types;
interface MetaData {
  types?: InfPersistentItem[],
  typeClass?: DfhClass,
  type?: InfPersistentItem,
  peItDetail?: EntityDetail,
  namespace?: DatNamespace;
  pkTypeClass?: number;
  pkProject?: number;
  tabTitle?: string;
}
export type TypesAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypesAPIActions {
  // static readonly LOAD = 'Types::LOAD';
  // static readonly LOAD_STARTED = 'Types::LOAD_STARTED';
  // static readonly LOAD_SUCCEEDED = 'Types::LOAD_SUCCEEDED';
  // static readonly LOAD_FAILED = 'Types::LOAD_FAILED';

  // static readonly OPEN_ADD_FORM = 'Types::OPEN_ADD_FORM';
  // static readonly CLOSE_ADD_FORM = 'Types::CLOSE_ADD_FORM';

  // static readonly CREATE = 'Types::CREATE';
  // static readonly CREATE_STARTED = 'Types::CREATE_STARTED';
  // static readonly CREATE_SUCCEEDED = 'Types::CREATE_SUCCEEDED';
  // static readonly CREATE_FAILED = 'Types::CREATE_FAILED';

  // static readonly OPEN_EDIT_FORM = 'Types::OPEN_EDIT_FORM';
  // static readonly OPEN_EDIT_FORM_SUCCEEDED = 'Types::OPEN_EDIT_FORM_SUCCEEDED';
  // static readonly OPEN_EDIT_FORM_FAILED = 'Types::OPEN_EDIT_FORM_FAILED';

  // static readonly CLOSE_EDIT_FORM = 'Types::CLOSE_EDIT_FORM';

  static readonly SET_TAB_TITLE = 'Types::SET_TAB_TITLE';

  static readonly DESTROY = 'Types::DESTROY';

  //   @dispatch()
  //   load = (pkProject: number, pkTypeClass: number): TypesAPIAction => ({
  //     type: TypesAPIActions.LOAD,
  //     meta: { pkProject, pkTypeClass },
  //     payload: null,
  //   });

  //   loadSucceeded = (types: InfPersistentItem[]): TypesAPIAction => ({
  //     type: TypesAPIActions.LOAD_SUCCEEDED,
  //     meta: { types },
  //     payload: null
  //   })

  //   loadFailed = (error): TypesAPIAction => ({
  //     type: TypesAPIActions.LOAD_FAILED,
  //     meta: null,
  //     payload: null,
  //     error,
  //   })

  //   /*********************************************************************
  //  *  Methods related to the add form
  //  *********************************************************************/
  //   @dispatch()
  //   openAddForm = (create: CreateOrAddEntity): TypesAPIAction => ({
  //     type: TypesAPIActions.OPEN_ADD_FORM,
  //     meta: { create },
  //     payload: null
  //   })

  //   @dispatch()
  //   closeAddForm = (): TypesAPIAction => ({
  //     type: TypesAPIActions.CLOSE_ADD_FORM,
  //     meta: null,
  //     payload: null
  //   })


  //   @dispatch()
  //   createSucceeded = (type: InfPersistentItem): TypesAPIAction => ({
  //     type: TypesAPIActions.CREATE_SUCCEEDED,
  //     meta: { type },
  //     payload: null
  //   })

  //   /*********************************************************************
  //    *  Methods related to the edit form
  //    *********************************************************************/


  //   @dispatch()
  //   openEditForm = (pkProject: number, type: InfPersistentItem): TypesAPIAction => ({
  //     type: TypesAPIActions.OPEN_EDIT_FORM,
  //     meta: { pkProject, type },
  //     payload: null
  //   })

  //   openEditFormSucceeded = (peItDetail: PeItDetail): TypesAPIAction => ({
  //     type: TypesAPIActions.OPEN_EDIT_FORM_SUCCEEDED,
  //     meta: { peItDetail },
  //     payload: null
  //   })

  //   openEditFormFailed = (error): TypesAPIAction => ({
  //     type: TypesAPIActions.OPEN_EDIT_FORM_FAILED,
  //     meta: null,
  //     payload: null,
  //     error
  //   })

  //   @dispatch()
  //   closeEditForm = (): TypesAPIAction => ({
  //     type: TypesAPIActions.CLOSE_EDIT_FORM,
  //     meta: null,
  //     payload: null
  //   })


  /*********************************************************************
  *  Set the tab title
  *********************************************************************/

  @dispatch() setTabTitle = (tabTitle: string): TypesAPIAction => ({
    type: TypesAPIActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TypesAPIAction => ({
    type: TypesAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
