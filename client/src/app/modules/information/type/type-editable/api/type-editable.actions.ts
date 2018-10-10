import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { InfEntityAssociation } from '../../../../../core';

type Payload = TypeDetail;
interface MetaData {
  pkProject?: number,
  entityAssociations?: InfEntityAssociation[];
  entityAssociation?: InfEntityAssociation;
};
export type TypeAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TypeEditableAPIActions {
  static readonly CHANGE_TYPE = 'Type::CHANGE_TYPE';
  static readonly CHANGE_TYPE_SUCCEEDED = 'Type::CHANGE_TYPE_SUCCEEDED';
  static readonly CHANGE_TYPE_FAILED = 'Type::CHANGE_TYPE_FAILED';


  static readonly LOAD_SUCCEEDED = 'Type::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'Type::LOAD_FAILED';

  static readonly START_EDIT = 'Type::START_EDIT';
  static readonly STOP_EDIT = 'Type::STOP_EDIT';

  static readonly DESTROY = 'Type::DESTROY';

  /**
   * Change the type by passing one or two InfEntityAssociations to
   * this method. Each of those InfEntityAssociations must have a related
   * entity_version_project_rel that defines whether the InfEntityAssociation
   * is in project or not.
   *
   * To replace a type, provide two InfEntityAssociations while the old one
   * has is_in_project = false and the new one has is_in_project = true
   *
   * To add a type for the first time, provide one InfEntityAssociation with
   * is_in_project = true
   *
   */
  @dispatch()
  changeType = (pkProject: number, entityAssociations: InfEntityAssociation[]): TypeAPIAction => ({
    type: TypeEditableAPIActions.CHANGE_TYPE,
    meta: { pkProject, entityAssociations },
    payload: null,
  });

  changeTypeSucceeded = (entityAssociation: InfEntityAssociation): TypeAPIAction => ({
    type: TypeEditableAPIActions.CHANGE_TYPE_SUCCEEDED,
    meta: { entityAssociation },
    payload: null
  })

  changeTypeFailed = (error): TypeAPIAction => ({
    type: TypeEditableAPIActions.CHANGE_TYPE_FAILED,
    meta: null,
    payload: null,
    error,
  })

  loadSucceeded = (payload:TypeDetail): TypeAPIAction => ({
    type: TypeEditableAPIActions.LOAD_SUCCEEDED,
    meta: null,
    payload
  })

  loadFailed = (error): TypeAPIAction => ({
    type: TypeEditableAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  @dispatch()
  startEdit = (): TypeAPIAction => ({
    type: TypeEditableAPIActions.START_EDIT,
    meta: null,
    payload: null,
  })

  @dispatch()
  stopEdit = (): TypeAPIAction => ({
    type: TypeEditableAPIActions.STOP_EDIT,
    meta: null,
    payload: null,
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TypeAPIAction => ({
    type: TypeEditableAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
