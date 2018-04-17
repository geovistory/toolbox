import { Action } from 'redux';
import { IRoleState } from './role.model';
import { RoleAction, RoleActions } from './role.actions';


const INITIAL_STATE: IRoleState = {

};


export const roleReducer =
  (lastState: IRoleState = INITIAL_STATE, action: RoleAction): IRoleState => {

    switch (action.type) {
      case RoleActions.ROLE_TO_CREATE_UPDATED:
        return {
          ...lastState,
          roleToCreate: action.payload.roleToCreate
        };
    }

    switch (action.type) {
      case RoleActions.ROLE_TO_CREATE_UPDATED:
        return {
          ...lastState,
          roleToCreate: action.payload.roleToCreate
        };
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

