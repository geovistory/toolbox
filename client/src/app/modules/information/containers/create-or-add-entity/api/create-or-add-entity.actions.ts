import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { CreateOrAddEntity } from './create-or-add-entity.models';
import { ProjectCrm, InfEntityAssociation, InfTypeNamespaceRel } from 'app/core';

type Payload = CreateOrAddEntity;
interface MetaData {
  pkClass?: number;
  domainEntityAssociations?: InfEntityAssociation[];
  typeNamespaceRels?: InfTypeNamespaceRel[];
  crm?: ProjectCrm;
  pkUiContext?: number;
  itemsArray?: any[]
};
export type CreateOrAddEntityAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class CreateOrAddEntityAPIActions {
  static readonly INIT_CREATE_FORM = 'CreateOrAddEntity::INIT_CREATE_FORM';

  static readonly LOAD = 'CreateOrAddEntity::LOAD';
  static readonly LOAD_SUCCEEDED = 'CreateOrAddEntity::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'CreateOrAddEntity::LOAD_FAILED';

  static readonly DESTROY = 'CreateOrAddEntity::DESTROY';

  @dispatch()
  initCreateForm = (pkClass: number, domainEntityAssociations: InfEntityAssociation[], typeNamespaceRels: InfTypeNamespaceRel[], crm: ProjectCrm, pkUiContext: number): CreateOrAddEntityAPIAction => ({
    type: CreateOrAddEntityAPIActions.INIT_CREATE_FORM,
    meta: { pkClass, domainEntityAssociations, typeNamespaceRels, crm, pkUiContext },
    payload: null,
  });

  @dispatch()
  load = (): CreateOrAddEntityAPIAction => ({
    type: CreateOrAddEntityAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): CreateOrAddEntityAPIAction => ({
    type: CreateOrAddEntityAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): CreateOrAddEntityAPIAction => ({
    type: CreateOrAddEntityAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): CreateOrAddEntityAPIAction => ({
    type: CreateOrAddEntityAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
