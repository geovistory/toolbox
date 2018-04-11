import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem } from 'app/core';
import {  IPeItState } from './pe-it.model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPeItState;
interface MetaData { };
export type PeItAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItActions {
  static readonly PEIT_TO_EDIT_UPDATED = 'PEIT_TO_EDIT_UPDATED';

  static readonly PEIT_TO_ADD_UPDATED = 'PEIT_TO_ADD_UPDATED';

  static readonly PEIT_TO_CREATE_UPDATED = 'PEIT_TO_CREATE_UPDATED';

  static readonly ROLE_SETS_INITIALIZED = 'ROLE_SETS_INITIALIZED';


  @dispatch()

  peItToEditUpdated = (peItToEdit: InfPersistentItem): PeItAction => ({
    type: PeItActions.PEIT_TO_EDIT_UPDATED,
    meta: null,
    payload: {
      peItToEdit
    }
  })

  peItToAddUpdated = (payload: Payload): PeItAction => ({
    type: PeItActions.PEIT_TO_ADD_UPDATED,
    meta: null,
    payload,
  })

  peItToCreateUpdated = (payload: Payload): PeItAction => ({
    type: PeItActions.PEIT_TO_CREATE_UPDATED,
    meta: null,
    payload,
  })

  /**
 * Called when the rol sets are initialized
 */
  roleSetsInitialized = (): PeItAction => ({
    type: PeItActions.ROLE_SETS_INITIALIZED,
    meta: null,
    payload: null
  })
}
