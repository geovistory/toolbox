
import { Action } from 'redux';
import { IRoleSetState } from './role-set.model';
import { RoleSetAction, RoleSetActions } from './role-set.actions';
import { indexBy, prop } from 'ramda';



const INITIAL_STATE: IRoleSetState = {

};


export const roleSetReducer =
  (lastState: IRoleSetState = INITIAL_STATE, action: RoleSetAction): IRoleSetState => {

    switch (action.type) {
      case RoleSetActions.PROPERTY_LOADED:
        return {
          ...lastState,
          property: action.payload.property
        };
    }


    switch (action.type) {
      case RoleSetActions.ROLE_LABEL_UPDATED:
        return {
          ...lastState,
          roleLabel: action.payload.roleLabel
        };
    }


    switch (action.type) {
      case RoleSetActions.TARGET_CLASS_PK_UPDATED:
        return {
          ...lastState,
          targetClassPk: action.payload.targetClassPk
        };
    }


    switch (action.type) {
      case RoleSetActions.CHILD_ROLES_UPDATED:
        return {
          ...lastState,
          childRoleStates: indexBy((item)=>item.role.pk_entity, action.payload.childRoleStates)
        };
    }


    return lastState;
  };

