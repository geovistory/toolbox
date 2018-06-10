import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { PeItDetail } from '../../information.models';


// replace Role with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = PeItDetail;
export type LeafPeItAction = FluxStandardAction<Payload, any>;

@Injectable()
export class LeafPeItActions {

  static readonly LEAF_PE_IT_START_LOADING = 'LEAF_PE_IT_START_LOADING';

  static readonly LEAF_PE_IT_STATE_ADDED = 'LEAF_PE_IT_STATE_ADDED';
  static readonly LEAF_PK_ENTITY_SELECTED = 'LEAF_PK_ENTITY_SELECTED';


  @dispatch()
  /**
   * Attaches the given peItState (quite a huge object!) to the current role
   */
  leafPeItStateAdded = (payload: PeItDetail): LeafPeItAction => ({
    type: LeafPeItActions.LEAF_PE_IT_STATE_ADDED,
    meta: null,
    payload
  })

  @dispatch()
  leafPeItStartLoading = (): LeafPeItAction => ({
    type: LeafPeItActions.LEAF_PE_IT_START_LOADING,
    meta: null,
    payload: null
  })


  //   /**
  //    * When a leaf pk_entity is selected, this means, that the user has chosen a pe-it 
  //    * (e.g. in the role of the mother of a birth) or a object (e.g. a appellation) to
  //    * be added as the target of a role. This action puts the role in the state, where
  //    * the user can confirm to create that role or cancel the creation of the role.
  //    */
  //   leafPkEntitySelected = (role:InfRole): LeafPeItAction => ({
  //     type: LeafPeItActions.LEAF_PK_ENTITY_SELECTED,
  //     meta: null,
  //     payload: {
  //       isReadyToCreate: true,
  //       role
  //     }
  //   })



}
