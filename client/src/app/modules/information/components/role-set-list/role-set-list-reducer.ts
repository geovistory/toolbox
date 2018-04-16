
import { Action } from 'redux';
import { IRoleSetListState } from './role-set-list.model';
import { RoleSetListAction, RoleSetListActions } from './role-set-list-actions';
import { indexBy, prop } from 'ramda';


const INITIAL_STATE: IRoleSetListState = {
  roles: [],
  ingoingProperties: [],
  outgoingProperties: [],
  state: 'edit',
  selectPropState: 'init',
  parentPeIt: null,
};


export const roleSetListReducer =
  (lastState: IRoleSetListState = INITIAL_STATE, action: RoleSetListAction): IRoleSetListState => {

    switch (action.type) {
      case RoleSetListActions.ROLE_SETS_INITIALIZED:
        lastState = {
          ...lastState,
          roleSets: indexBy(prop('fkProperty'), action.payload.roleSets),
          ingoingProperties: action.payload.ingoingProperties,
          outgoingProperties: action.payload.outgoingProperties,
          ingoingPropertiesToAdd: action.payload.ingoingPropertiesToAdd,
          outgoingPropertiesToAdd: action.payload.outgoingPropertiesToAdd
        }
        break;

      case RoleSetListActions.START_SELECT_PROPERTY:
        lastState = {
          ...lastState,
          selectPropState: action.payload.selectPropState
        }
        break;

      case RoleSetListActions.STOP_SELECT_PROPERTY:
        lastState = {
          ...lastState,
          selectPropState: action.payload.selectPropState
        }
        break;

      case RoleSetListActions.START_SELECT_ROLES:
        lastState = {
          ...lastState,
          roleSets: action.payload.roleSets,
          selectPropState: action.payload.selectPropState
        }
        break;

      case RoleSetListActions.FK_CLASS_AND_ROLES_INITIALIZED:
        lastState = {
          ...lastState,
          fkClass: action.payload.fkClass,
          dfhClass: action.payload.dfhClass,
          roles: action.payload.roles
        };
        break;
    }


    return lastState;
  };

