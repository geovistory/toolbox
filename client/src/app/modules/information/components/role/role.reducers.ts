import { Action } from 'redux';
import { IRoleState } from './role.model';
import { RoleAction, RoleActions } from './role.actions';
import { InfEntityProjectRel } from '../../../../core';
import { RoleService } from '../../shared/role.service';


const INITIAL_STATE: IRoleState = {

};


export const roleReducer =
  (lastState: IRoleState = INITIAL_STATE, action: RoleAction): IRoleState => {

    switch (action.type) {
      case RoleActions.INF_ROLE_UPDATED:
        lastState = {
          ...lastState,
          role: action.payload.role
        };
        break;

      case RoleActions.CHANGE_DISPLAY_ROLE_LOADING:
        lastState = {
          ...lastState,
          changingDisplayRole: action.payload.changingDisplayRole
        };
        break;

        /**
      * If the role is outgoing, this means that it can be display role for the domain.
      * In this case, the entity_project_relation.is_display_role_for_domain will be adapted.
      * 
      * If the role is ingoing, this means that it can be display role for the range.
      * In this case, the entity_project_relation.is_display_role_for_range will be adapted.  
      */
      case RoleActions.CHANGE_DISPLAY_ROLE_SUCCEEDED:
        var epr: InfEntityProjectRel = new InfEntityProjectRel;
        Object.assign(epr, lastState.role.entity_version_project_rels[0]);

        //adapt the roles epr
        if (action.payload.isOutgoing) {
          // TODO: epr.is_display_role_for_domain = action.meta.isDisplayRoles
        }
        if (action.payload.isOutgoing == false) {
          epr.is_standard_in_project = action.meta.isDisplayRole
        }
        var count = lastState.role.is_standard_in_project_count;
        if (action.meta.isDisplayRole) {
          count++;
        } else {
          count--;
        }

        lastState = {
          ...lastState,
          changingDisplayRole: false,
          // if is ingoing, adapt isDisplayRoleForRange 
          isDisplayRoleForRange: !action.payload.isOutgoing ? action.meta.isDisplayRole : lastState.isDisplayRoleForRange,
          // if is outgoing, adapt isDisplayRoleForDomain
          isDisplayRoleForDomain: action.payload.isOutgoing ? action.meta.isDisplayRole : lastState.isDisplayRoleForDomain,
          role: {
            ...lastState.role,
            entity_version_project_rels: [epr],
            is_standard_in_project_count: count,
          }
        };
        break;


      case RoleActions.LEAF_PE_IT_STATE_ADDED:
        lastState = {
          ...lastState,
          peItState: action.payload.peItState
        };
        break;

      case RoleActions.LEAF_PK_ENTITY_SELECTED:
        lastState = {
          ...lastState,
          isReadyToCreate: action.payload.isReadyToCreate,
          role: {
            ...lastState.role,
            fk_entity: action.payload.role.fk_entity
          }
        };
        break;

    }

    // switch (action.type) {
    //   case RoleActions.SET_DISPLAY_ROLE_FOR_RANGE:
    //     return {
    //       ...lastState,
    //       isDisplayRoleForRange: action.payload.isDisplayRoleForRange
    //     };
    // }

    // switch (action.type) {
    //   case RoleActions.SET_DISPLAY_ROLE_FOR_DOMAIN:
    //     return {
    //       ...lastState,
    //       isDisplayRoleForDomain: action.payload.isDisplayRoleForDomain
    //     };
    // }

    // switch (action.type) {
    //   case RoleActions.CHILD_TE_ENT_INITIALIZED:
    //     return {
    //       ...lastState,
    //       childTeEnt: action.payload.childTeEnt
    //     };
    // }

    return lastState;
  };

