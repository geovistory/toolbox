import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';

type Payload = EntityAssociationDetail;
interface MetaData {
  fkRangeEntity?: number
  fkDomainEntity?: number
  fkProperty?: number
  existingList?: EntityAssociationDetail[];
};
export type EntityAssociationAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityAssociationAPIActions {
 
  static readonly LOAD_EXISTING_LIST = 'EntityAssociation::LOAD_EXISTING_LIST';
  static readonly LOAD_EXISTING_LIST_SUCCEEDED = 'EntityAssociation::LOAD_EXISTING_LIST_SUCCEEDED';
  static readonly LOAD_EXISTING_LIST_FAILED = 'EntityAssociation::LOAD_EXISTING_LIST_FAILED';

  static readonly DESTROY = 'EntityAssociation::DESTROY';

  @dispatch()
  load = (fkRangeEntity: number, fkDomainEntity: number, fkProperty: number): EntityAssociationAPIAction => ({
    type: EntityAssociationAPIActions.LOAD_EXISTING_LIST,
    meta: { fkRangeEntity, fkDomainEntity, fkProperty },
    payload: null,
  });

  loadSucceeded = (existingList: any[]): EntityAssociationAPIAction => ({
    type: EntityAssociationAPIActions.LOAD_EXISTING_LIST_SUCCEEDED,
    meta: {
      existingList
    },
    payload: null
  })

  loadFailed = (error): EntityAssociationAPIAction => ({
    type: EntityAssociationAPIActions.LOAD_EXISTING_LIST_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): EntityAssociationAPIAction => ({
    type: EntityAssociationAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
