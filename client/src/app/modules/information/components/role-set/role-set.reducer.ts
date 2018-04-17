
import { Action } from 'redux';
import { IRoleSetState } from './role-set.model';
import { RoleSetAction, RoleSetActions, roleStateKey } from './role-set.actions';
import { indexBy, prop } from 'ramda';

const INITIAL_STATE: IRoleSetState = {

};


export const roleSetReducer =
  (lastState: IRoleSetState = INITIAL_STATE, action: RoleSetAction): IRoleSetState => {

    switch (action.type) {
      case RoleSetActions.PROPERTY_LOADED:
        lastState = {
          ...lastState,
          property: action.payload.property
        };
        break;

      case RoleSetActions.ROLE_LABEL_UPDATED:
        lastState = {
          ...lastState,
          label: action.payload.label
        };
        break;

      case RoleSetActions.TARGET_CLASS_PK_UPDATED:
        lastState = {
          ...lastState,
          targetClassPk: action.payload.targetClassPk
        };
        break;

      case RoleSetActions.CHILD_ROLES_UPDATED:
        lastState = {
          ...lastState,
          childRoleStates: indexBy(roleStateKey, action.payload.childRoleStates)
        };
        break;

      case RoleSetActions.SET_TOGGLE:
        lastState = {
          ...lastState,
          toggle: action.payload.toggle
        };
        break;

      case RoleSetActions.TOGGLE:
        lastState = {
          ...lastState,
          toggle: lastState.toggle === 'expanded' ? 'collapsed' : 'expanded'
        };
        break;

      case RoleSetActions.ROLE_SET_REMOVED:
        lastState = undefined
        break;

    }


    return lastState;
  };

