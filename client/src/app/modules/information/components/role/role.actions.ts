import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IRoleState } from './role.model';
import { InfRole } from 'app/core';
import { CollapsedExpanded } from '../../information.models';
import { ITeEntState } from '../te-ent/te-ent.model';
import { IPeItState } from '../../containers/pe-it/pe-it.model';

// replace Role with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IRoleState;
export type RoleAction = FluxStandardAction<Payload, any>;

@Injectable()
export class RoleActions {
  static readonly ROLE_TO_CREATE_UPDATED = 'ROLE_TO_CREATE_UPDATED';
  static readonly ROLE_TO_ADD_UPDATED = 'ROLE_TO_ADD_UPDATED';

  static readonly CHANGE_DISPLAY_ROLE_LOADING = 'CHANGE_DISPLAY_ROLE_LOADING';
  static readonly CHANGE_DISPLAY_ROLE_SUCCEEDED = 'CHANGE_DISPLAY_ROLE_SUCCEEDED';

  static readonly ROLE_STATE_REMOVED = 'ROLE_STATE_REMOVED';

  static readonly LEAF_PE_IT_STATE_ADDED = 'LEAF_PE_IT_STATE_ADDED';

  static readonly LEAF_PK_ENTITY_SELECTED = 'LEAF_PK_ENTITY_SELECTED';


  @dispatch()

  roleToCreateUpdated = (roleToCreate: InfRole): RoleAction => ({
    type: RoleActions.ROLE_TO_CREATE_UPDATED,
    meta: null,
    payload: {
      roleToCreate
    }
  })


  roleToAddUpdated = (roleToAdd: InfRole): RoleAction => ({
    type: RoleActions.ROLE_TO_CREATE_UPDATED,
    meta: null,
    payload: {
      roleToAdd
    }
  })


  changeDisplayRoleLoading = (bool: boolean): RoleAction => ({
    type: RoleActions.CHANGE_DISPLAY_ROLE_LOADING,
    meta: null,
    payload: {
      changingDisplayRole: bool
    }
  })

  /**
   * If the role is outgoing, this means that it can be display role for the domain.
   * In this case, the entity_project_relation.is_display_role_for_domain will be adapted.
   * 
   * If the role is ingoing, this means that it can be display role for the range.
   * In this case, the entity_project_relation.is_display_role_for_range will be adapted.  
   */
  changeDisplayRoleSucceeded = (isDisplayRole: boolean, isOutgoing: boolean) => {
    return ({
      type: RoleActions.CHANGE_DISPLAY_ROLE_SUCCEEDED,
      meta: {
        isDisplayRole
      },
      payload: {
        isOutgoing
      }
    })
  }

  /**
   * Attaches the given peItState (quite a huge object!) to the current role
   */
  leafPeItStateAdded = (peItState: IPeItState): RoleAction => ({
    type: RoleActions.LEAF_PE_IT_STATE_ADDED,
    meta: null,
    payload: {
      peItState
    }
  })

  /**
   * When a leaf pk_entity is selected, this means, that the user has chosen a pe-it 
   * (e.g. in the role of the mother of a birth) or a object (e.g. a appellation) to
   * be added as the target of a role. This action puts the role in the state, where
   * the user can confirm to create that role or cancel the creation of the role.
   */
  leafPkEntitySelected = (role:InfRole): RoleAction => ({
    type: RoleActions.LEAF_PK_ENTITY_SELECTED,
    meta: null,
    payload: {
      isReadyToCreate: true,
      role   
    }
  })

  /**
   * Removes the current RoleState from the Store. Called upon successfully removing a role
   */
  roleStateRemoved = (): RoleAction => ({
    type: RoleActions.ROLE_STATE_REMOVED,
    meta: null,
    payload: null
  })



}
