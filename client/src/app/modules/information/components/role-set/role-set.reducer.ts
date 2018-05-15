
import { Action } from 'redux';
import { IRoleSetState } from './role-set.model';
import { RoleSetAction, RoleSetActions, roleStateKey } from './role-set.actions';
import { indexBy, prop } from 'ramda';
import { IRoleSets } from '../role-set-list/role-set-list.model';

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

      case RoleSetActions.START_ADDING_ROLE:
        lastState = {
          ...lastState,
          rolesNotInProjectLoading: true,
        }
        break;


      case RoleSetActions.ALTERNATIVE_ROLES_LOADED:
        lastState = {
          ...lastState,
          rolesNotInProjectLoading: false,
          roleStatesInOtherProjectsVisible: true,
          roleStatesInOtherProjects: action.payload.roleStatesInOtherProjects,
          roleStatesInNoProject: action.payload.roleStatesInNoProject,

        }
        break;

      case RoleSetActions.START_CREATE_NEW_ROLE:
        lastState = {
          ...lastState,
          rolesNotInProjectLoading: false,
          // Extends the roleStatesToCreate
          roleStatesToCreate: Object.assign({}, lastState.roleStatesToCreate, action.payload.roleStatesToCreate)
        }
        break;

      case RoleSetActions.STOP_CREATE_NEW_ROLE:
        lastState = {
          ...lastState,
          roleStatesInOtherProjectsVisible: false,
          roleStatesInOtherProjects: action.payload.roleStatesInOtherProjects,
          roleStatesInNoProject: action.payload.roleStatesInNoProject,
          roleStatesToCreate: action.payload.roleStatesToCreate
        }
        break;


      case RoleSetActions.ROLE_SET_UPDATED:
        lastState = {
          ...lastState,
          roleStatesInProject: action.payload.roleStatesInProject
        }
        break;

      case RoleSetActions.ROLE_CREATION_CANCELLED:
        lastState = {
          ...lastState,
          roleStatesToCreate: action.payload.roleStatesToCreate
        }
        break;

    }


    return lastState;
  };

