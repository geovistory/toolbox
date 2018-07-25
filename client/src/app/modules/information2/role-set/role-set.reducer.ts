
import { Action } from 'redux';
import { RoleSetAction, RoleSetActions, roleStateKey } from './role-set.actions';
import { RoleSet, RoleDetailList, RoleDetail } from '../information.models';
import { indexBy, prop, omit, sort } from 'ramda';
import { InfEntityProjectRel, U } from 'app/core';
import { sortRoleDetailsByOrdNum, sortRoleDetailListByOrdNum } from '../information.helpers';

const INITIAL_STATE = new RoleSet({

});


export const roleSetReducer =
  (lastState: RoleSet = INITIAL_STATE, action: RoleSetAction): RoleSet => {

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
          _role_set_form: {},
          rolesNotInProjectLoading: true,
        }
        break;


      case RoleSetActions.ALTERNATIVE_ROLES_LOADED:
        lastState = {
          ...lastState,
          rolesNotInProjectLoading: false,
          roleStatesInOtherProjectsVisible: true,
          _role_set_form: {
            ...lastState._role_set_form,
            _role_add_list: action.payload._role_set_form._role_add_list,
            _role_add_in_no_project_list: action.payload._role_set_form._role_add_in_no_project_list
          }
        }
        break;

      case RoleSetActions.START_CREATE_NEW_ROLE:
        lastState = {
          ...lastState,
          rolesNotInProjectLoading: false,
          _role_set_form: {
            ...omit(['_role_add_list'], lastState._role_set_form),
            _role_create_list: Object.assign({},
              lastState._role_set_form._role_create_list,
              action.payload._role_set_form._role_create_list)
          }
        }
        break;

      case RoleSetActions.STOP_CREATE_NEW_ROLE:
        lastState = {
          ...omit(['_role_set_form'], lastState),
          roleStatesInOtherProjectsVisible: false,
        }
        break;


      case RoleSetActions.ROLES_CREATED:
        lastState = {
          ...omit(['_role_set_form'], lastState),
          roleStatesInOtherProjectsVisible: false,
          _role_list: {
            ...lastState._role_list,
            ...action.payload._role_list
          }
        }
        break;

      case RoleSetActions.ROLE_CREATION_CANCELLED:
        lastState = {
          roleStatesInOtherProjectsVisible: false,
          ...lastState,
          _role_set_form: {
            ...lastState._role_set_form,
            _role_create_list: action.payload._role_set_form._role_create_list
          }
        }
        break;


      case RoleSetActions.ROLE_REMOVED_FROM_PROJECT:

        lastState = {
          ...lastState,
          _role_list: omit([action.meta.key], lastState._role_list)
        };

        break;



      case RoleSetActions.START_EDITING_ROLE:
        lastState = {
          ...lastState,
          _role_list: {
            ...lastState._role_list,
            [action.meta.key]: action.meta.roleState
          }
        };
        break;

      case RoleSetActions.STOP_EDITING_ROLE:
        lastState = {
          ...lastState,
          _role_list: {
            ...lastState._role_list,
            [action.meta.key]: action.meta.roleState
          }
        };
        break;

      case RoleSetActions.UPDATE_ROLE:
        lastState = {
          ...lastState,
          _role_list: {
            ...omit([action.meta.key], lastState._role_list),
            ...action.payload._role_list
          }
        };
        break;

      case RoleSetActions.ADD_ROLE_TO_ROLE_LIST:
        lastState = {
          ...lastState,
          _role_list: {
            ...lastState._role_list,
            [action.meta.key]: action.meta.roleDetail
          }
        };
        break;

      case RoleSetActions.REMOVE_ROLE_FROM_ROLE_LIST:
        lastState = {
          ...lastState,
          _role_list: {
            ...omit([action.meta.key], lastState._role_list),
          }
        };
        break;

      case RoleSetActions.ROLE_SET_UPDATE_ORDER_SUCCEEDED:
        // update the eprs of of the roles in _role_list
        const updateEprs = (list: RoleDetailList, eprs: InfEntityProjectRel[]): RoleDetailList => {
          let newVal: RoleDetailList = {}
          const newEprsByPk = indexBy(prop('pk_entity'), eprs);
          U.obj2KeyValueArr(list).forEach(item => {
            const roleD = item.value;
            const oldEpr = roleD.role.entity_version_project_rels[0];
            if (newEprsByPk[oldEpr.pk_entity]) {
              const newEpr = newEprsByPk[oldEpr.pk_entity]
              newVal[item.key] = {
                ...roleD,
                role: {
                  ...roleD.role,
                  entity_version_project_rels: [newEpr]
                }
              }
            }
          })
          return newVal;
        }



        lastState = {
          ...lastState,
          _role_list: sortRoleDetailListByOrdNum(updateEprs(lastState._role_list, action.meta.eprs))
        }

        break;

      case RoleSetActions.ROLE_SET_ENABLE_DRAG:
        lastState = {
          ...lastState,
          dragEnabled: true
        };
        break;

      case RoleSetActions.ROLE_SET_DISABLE_DRAG:
        lastState = {
          ...lastState,
          dragEnabled: false
        };
        break;

    }


    return lastState;
  };

