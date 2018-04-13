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

    switch (action.type) {
      case RoleActions.IS_STANDARD_IN_PROJECT_UPDATED:
        return {
          ...lastState,
          isStandardInProject: action.payload.isStandardInProject
        };
    }

    switch (action.type) {
      case RoleActions.CHILD_TE_ENT_INITIALIZED:
        return {
          ...lastState,
          childTeEnt: action.payload.childTeEnt
        };
    }

    return lastState;
  };

