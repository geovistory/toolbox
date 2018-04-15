import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem, InfRole } from 'app/core';
import {  IPeItState } from './pe-it.model';
import { RoleSetListState } from '../../components/role-set-list/role-set-list.model';
import { RoleSetListActions } from '../../components/role-set-list/role-set-list-actions';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPeItState;
interface MetaData { };
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions extends RoleSetListActions {
  static readonly PEIT_TO_EDIT_UPDATED = 'PEIT_TO_EDIT_UPDATED';

  static readonly PEIT_TO_ADD_UPDATED = 'PEIT_TO_ADD_UPDATED';

  static readonly PEIT_TO_CREATE_UPDATED = 'PEIT_TO_CREATE_UPDATED';

  @dispatch()

  peItToEditUpdated = (peItToEdit: InfPersistentItem): PeItAction => ({
    type: PeItActions.PEIT_TO_EDIT_UPDATED,
    meta: null,
    payload: {
      peItToEdit
    }
  })

  peItToAddUpdated = (peItToAdd: InfPersistentItem): PeItAction => ({
    type: PeItActions.PEIT_TO_ADD_UPDATED,
    meta: null,
    payload: {
      peItToAdd
    }
  })

  peItToCreateUpdated = (peItToCreate: InfPersistentItem): PeItAction => ({
    type: PeItActions.PEIT_TO_CREATE_UPDATED,
    meta: null,
    payload: {
      peItToCreate
    }
  })


}
