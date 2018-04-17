
import { Action } from 'redux';
import { IRoleSetListState } from './role-set-list.model';
import { RoleSetListAction, RoleSetListActions } from './role-set-list-actions';


const INITIAL_STATE: IRoleSetListState = {
  roles: [],
  state: 'edit',
  selectPropState: 'init',
  parentPeIt: null,
};


export const roleSetListReducer =
  (lastState: IRoleSetListState = INITIAL_STATE, action: RoleSetListAction): IRoleSetListState => {

    switch (action.type) {
      // case RoleSetListActions.ROLE_SETS_INITIALIZED:
      //   lastState = {
      //     ...lastState,
      //     roleSets: action.payload.roleSets,
      //     ingoingRoleSets: action.payload.ingoingRoleSets,
      //     outgoingRoleSets: action.payload.outgoingRoleSets
      //   }
      //   break;

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

      case RoleSetListActions.ROLE_SET_ADDED:
        lastState = {
          ...lastState,
          roleSets: {
            ...lastState.roleSets,
            ...action.payload.roleSets
          },
          selectPropState: action.payload.selectPropState
        }
        break;


      // case RoleSetListActions.FK_CLASS_AND_ROLES_INITIALIZED:
      //   lastState = {
      //     ...lastState,
      //     fkClass: action.payload.fkClass,
      //     dfhClass: action.payload.dfhClass,
      //     roles: action.payload.roles
      //   };
      //   break;
    }


    return lastState;
  };

