import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TextPropertyField } from 'app/core/state/models/text-property-field';
import { InfTextProperty } from 'app/core';
import { TextPropertyDetail } from 'app/core/state/models/text-property-detail';

type Payload = TextPropertyField;
interface MetaData {
  infTextProperty?: InfTextProperty;
  txtPropDetail?: TextPropertyDetail;
  itemsArray?: any[];
  key?: string;
  pkEntity?: number;
};
export type TextPropertyFieldAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TextPropertyFieldAPIActions {

  static readonly TOGGLE = 'TextPropertyField::TOGGLE';

  static readonly OPEN_CREATE_OR_ADD_FORM = 'TextPropertyField::OPEN_CREATE_OR_ADD_FORM';
  static readonly CLOSE_CREATE_OR_ADD_FORM = 'TextPropertyField::CLOSE_CREATE_OR_ADD_FORM';

  static readonly CREATE = 'TextPropertyField::CREATE';
  static readonly CREATE_SUCCEEDED = 'TextPropertyField::CREATE_SUCCEEDED';
  static readonly CREATE_FAILED = 'TextPropertyField::CREATE_FAILED';

  static readonly LOAD = 'TextPropertyField::LOAD';
  static readonly LOAD_SUCCEEDED = 'TextPropertyField::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TextPropertyField::LOAD_FAILED';

  static readonly REMOVE_FROM_PROJECT = 'TextPropertyField::REMOVE_FROM_PROJECT';
  static readonly REMOVE_FROM_PROJECT_SUCCEEDED = 'TextPropertyField::REMOVE_FROM_PROJECT_SUCCEEDED';
  static readonly REMOVE_FROM_PROJECT_FAILED = 'TextPropertyField::REMOVE_FROM_PROJECT_FAILED';

  static readonly TOGGLE_TEXT_PROP_DETAIL = 'TextPropertyField::TOGGLE_TEXT_PROP_DETAIL';

  static readonly REMOVE_FIELD = 'TextPropertyField::REMOVE_FIELD';

  static readonly DESTROY = 'TextPropertyField::DESTROY';

  @dispatch()
  load = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  @dispatch() create = (infTextProperty: InfTextProperty): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.CREATE,
    meta: { infTextProperty },
    payload: null,
  });

  createSucceeded = (txtPropDetail: TextPropertyDetail): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.CREATE_SUCCEEDED,
    meta: {
      txtPropDetail
    },
    payload: null
  })

  createFailed = (error): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.CREATE_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
  *  Method to remove the text property from project
  *********************************************************************/

  @dispatch() remove = (pkEntity: number, key: string): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.REMOVE_FROM_PROJECT,
    meta: { pkEntity, key },
    payload: null,
  });

  removeSucceeded = (key: string): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.REMOVE_FROM_PROJECT_SUCCEEDED,
    meta: {
      key
    },
    payload: null
  })

  removeFailed = (error): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.REMOVE_FROM_PROJECT_FAILED,
    meta: null,
    payload: null,
    error,
  })



  @dispatch() toggle = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.TOGGLE,
    meta: null,
    payload: null,
  })

  @dispatch() toggleTextPropertyDetail = (key: string): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.TOGGLE_TEXT_PROP_DETAIL,
    meta: { key },
    payload: null,
  })

  @dispatch() openCreateOrAddForm = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.OPEN_CREATE_OR_ADD_FORM,
    meta: null,
    payload: null,
  })

  @dispatch() closeCreateOrAddForm = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.CLOSE_CREATE_OR_ADD_FORM,
    meta: null,
    payload: null,
  })




  /*********************************************************************
  *  Method to remove the class field (reduced by parent)
  *********************************************************************/
  removeField = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.REMOVE_FIELD,
    meta: null,
    payload: null,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
