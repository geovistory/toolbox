
import { InfEntityProjectRel, U } from 'app/core';
import { RoleDetailList, PropertyField } from 'app/core/state/models';
import { indexBy, omit, prop } from 'ramda';
import { sortRoleDetailListByOrdNum } from '../information.helpers';
import { PropertyFieldAction, PropertyFieldActions } from './role-set.actions';

const INITIAL_STATE = new PropertyField({

});


export const propertyFieldReducer =
  (lastState: PropertyField = INITIAL_STATE, action: PropertyFieldAction): PropertyField => {

    switch (action.type) {
      case PropertyFieldActions.PROPERTY_LOADED:
        lastState = {
          ...lastState,
          property: action.payload.property
        };
        break;

      case PropertyFieldActions.SET_TOGGLE:
        lastState = {
          ...lastState,
          toggle: action.payload.toggle
        };
        break;

      case PropertyFieldActions.TOGGLE:
        lastState = {
          ...lastState,
          toggle: lastState.toggle === 'expanded' ? 'collapsed' : 'expanded'
        };
        break;

      // case RoleSetActions.ROLE_SET_REMOVED:
      //   lastState = undefined
      //   break;

      case PropertyFieldActions.START_ADDING_ROLE:
        lastState = {
          ...lastState,
          _role_set_form: {},
          rolesNotInProjectLoading: true,
        }
        break;


      case PropertyFieldActions.ALTERNATIVE_ROLES_LOADED:
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

      case PropertyFieldActions.START_CREATE_NEW_ROLE:
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

      case PropertyFieldActions.STOP_CREATE_NEW_ROLE:
        lastState = {
          ...new PropertyField(omit(['_role_set_form'], lastState)),
          roleStatesInOtherProjectsVisible: false,
        }
        break;


      /**
       * Deprecated: This reducer will be replaced by ADD_ROLES_WITH_TE_ENT_SUCCEEDED and
       * ADD_ROLES_WITHOUT_TE_ENT_SUCCEEDED
       */
      case PropertyFieldActions.ROLES_CREATED:
        lastState = {
          ...new PropertyField(omit(['_role_set_form'], lastState)),
          roleStatesInOtherProjectsVisible: false,
          _role_list: {
            ...lastState._role_list,
            ...action.payload._role_list
          }
        }
        break;

      case PropertyFieldActions.ROLE_CREATION_CANCELLED:
        lastState = {
          roleStatesInOtherProjectsVisible: false,
          ...lastState,
          _role_set_form: {
            ...lastState._role_set_form,
            _role_create_list: action.payload._role_set_form._role_create_list
          }
        }
        break;


      case PropertyFieldActions.ROLE_REMOVED_FROM_PROJECT:

        lastState = {
          ...lastState,
          _role_list: omit([action.meta.key], lastState._role_list)
        };

        break;



      case PropertyFieldActions.START_EDITING_ROLE:
        lastState = {
          ...lastState,
          _role_list: {
            ...lastState._role_list,
            [action.meta.key]: action.meta.roleDetail
          }
        };
        break;

      case PropertyFieldActions.STOP_EDITING_ROLE:
        lastState = {
          ...lastState,
          _role_list: {
            ...lastState._role_list,
            [action.meta.key]: action.meta.roleDetail
          }
        };
        break;

      case PropertyFieldActions.UPDATE_ROLE:
        lastState = {
          ...lastState,
          _role_list: {
            ...omit([action.meta.key], lastState._role_list),
            ...action.payload._role_list
          }
        };
        break;

      case PropertyFieldActions.ADD_ROLE_TO_ROLE_LIST:
        lastState = {
          ...lastState,
          _role_list: {
            ...lastState._role_list,
            [action.meta.key]: action.meta.roleDetail
          }
        };
        break;

      case PropertyFieldActions.REMOVE_ROLE_FROM_ROLE_LIST:
        lastState = {
          ...lastState,
          _role_list: {
            ...omit([action.meta.key], lastState._role_list),
          }
        };
        break;

      case PropertyFieldActions.ROLE_SET_UPDATE_ORDER_SUCCEEDED:
        // update the eprs of of the roles in _role_list
        const updateEprs = (list: RoleDetailList, eprs: InfEntityProjectRel[]): RoleDetailList => {
          const newVal: RoleDetailList = {}
          const newEprsByPk = indexBy(prop('pk_entity'), eprs);
          U.obj2KeyValueArr(list).forEach(item => {
            const roleD = item.value;
            const oldEpr = roleD.role.entity_version_project_rels[0];
            if (newEprsByPk[oldEpr.pk_entity]) {
              const newEpr = newEprsByPk[oldEpr.pk_entity] as InfEntityProjectRel;
              newVal[item.key] = {
                ...roleD,
                role: {
                  ...roleD.role,
                  entity_version_project_rels: [newEpr]
                }
              }
            }
          })
          return { ...list, ...newVal };
        }



        lastState = {
          ...lastState,
          _role_list: sortRoleDetailListByOrdNum(updateEprs(lastState._role_list, action.meta.eprs))
        }

        break;

      case PropertyFieldActions.ROLE_SET_ENABLE_DRAG:
        lastState = {
          ...lastState,
          dragEnabled: true
        };
        break;

      case PropertyFieldActions.ROLE_SET_DISABLE_DRAG:
        lastState = {
          ...lastState,
          dragEnabled: false
        };
        break;

      /************************************
       * Add roles with teir teEnt (pi-roles)
       ************************************/

      case PropertyFieldActions.ADD_ROLES_WITH_TE_ENT:
        lastState = {
          ...lastState,
          loading: true
        };
        break;

      case PropertyFieldActions.ADD_ROLES_WITH_TE_ENT_SUCCEEDED:
        lastState = {
          ...new PropertyField(omit(['_role_set_form'], lastState)),
          roleStatesInOtherProjectsVisible: false,
          loading: false,
          _role_list: {
            ...lastState._role_list,
            ...action.meta.roleDetailList
          }
        }
        break;

      case PropertyFieldActions.ADD_ROLES_WITH_TE_ENT_FAILED:
        lastState = {
          ...lastState,
          loading: false
        };
        break;

      /************************************
      * Add roles without teEnt (te-roles)
      *************************************/

      case PropertyFieldActions.ADD_ROLES_WITHOUT_TE_ENT:
        lastState = {
          ...lastState,
          loading: true
        };
        break;


      case PropertyFieldActions.ADD_ROLES_WITHOUT_TE_ENT_SUCCEEDED:
        lastState = {
          ...new PropertyField(omit(['_role_set_form'], lastState)),
          roleStatesInOtherProjectsVisible: false,
          loading: false,
          _role_list: {
            ...lastState._role_list,
            ...action.meta.roleDetailList
          }
        }
        break;

      case PropertyFieldActions.ADD_ROLES_WITHOUT_TE_ENT_FAILED:
        lastState = {
          ...lastState,
          loading: false
        };
        break;



    }


    return lastState;
  };

