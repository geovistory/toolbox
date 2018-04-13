import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem } from 'app/core';
import {  IPeItState } from './pe-it.model';
import { PiRoleSetListState } from '../pe-it-role-set-list/pe-it-role-set-list.model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPeItState;
interface MetaData { };
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions {
  static readonly PEIT_TO_EDIT_UPDATED = 'PEIT_TO_EDIT_UPDATED';

  static readonly PEIT_TO_ADD_UPDATED = 'PEIT_TO_ADD_UPDATED';

  static readonly PEIT_TO_CREATE_UPDATED = 'PEIT_TO_CREATE_UPDATED';

  static readonly PE_IT_ROLE_SET_LIST_INITIALIZED = 'PE_IT_ROLE_SET_LIST_INITIALIZED';


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

  /**
 * Called when the role sets are initialized
 */
  roleSetsInitialized = (piRoleSetListState: PiRoleSetListState): PeItAction => ({
    type: PeItActions.PE_IT_ROLE_SET_LIST_INITIALIZED,
    meta: null,
    payload: {
      piRoleSetListState
    }
  })
}
