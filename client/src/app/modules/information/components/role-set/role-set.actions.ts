import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IRoleSetState, IRoleStates } from './role-set.model';
import { DfhProperty, InfRole } from 'app/core';
import { RoleSetLabelObj } from './role-set.component';
import { IRoleState } from '../role/role.model';
import { CollapsedExpanded } from '../../information.models';


export function roleStateKey(roleState: IRoleState) { return  '_' + roleState.role.pk_entity };



// replace PiRoleSet with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IRoleSetState;
interface MetaData { [key: string]: any };
export type RoleSetAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class RoleSetActions {

  static readonly PROPERTY_LOADED = 'PROPERTY_LOADED';


  // TODO INIT ACTIONS
  static readonly ROLES_SORTED_BY_POPULARITY = 'ROLES_SORTED_BY_POPULARITY';

  // TODO


  // change standard label
  static readonly DISPLAY_ROLE_FOR_DOMAIN_UPDATED = 'DISPLAY_ROLE_FOR_DOMAIN_UPDATED';

  static readonly START_ADDING_ROLE = 'START_ADDING_ROLE';
  static readonly ALTERNATIVE_ROLES_LOADED = 'ALTERNATIVE_ROLES_LOADED';

  static readonly START_CREATE_NEW_ROLE = 'START_CREATE_NEW_ROLE';
  static readonly STOP_CREATE_NEW_ROLE = 'STOP_CREATE_NEW_ROLE'; // removes all roleStatesToCreate
  static readonly ROLE_CREATION_CANCELLED = 'ROLE_CREATION_CANCELLED'; // removes one roleStateToCreate

  static readonly ROLES_CREATED = 'ROLES_CREATED';
  static readonly ROLE_REMOVED_FROM_PROJECT = 'ROLE_REMOVED_FROM_PROJECT';



  static readonly START_EDITING_ROLE = 'START_EDITING_ROLE';
  static readonly STOP_EDITING_ROLE = 'STOP_EDITING_ROLE';
  static readonly UPDATE_ROLE = 'UPDATE_ROLE';

  static readonly ROLE_READY_TO_CREATE = 'ROLE_READY_TO_CREATE';
  static readonly ROLE_NOT_READY_TO_CREATE = 'ROLE_NOT_READY_TO_CREATE';
  static readonly ENTITIES_TO_CREATE_PERSISTED = 'ENTITIES_TO_CREATE_PERSISTED';

  static readonly ADDED_SELECTED_ROLES_TO_PROJECT = 'ADDED_SELECTED_ROLES_TO_PROJECT';

  static readonly CANCEL_SELECT_ROLES = 'CANCEL_SELECT_ROLES'; // Maybe not a role set action but a role set list action!
  static readonly PROPERTY_SECTION_REMOVED = 'PROPERTY_SECTION_REMOVED';  // Maybe not a role set action but a role set list action!

  static readonly SET_TOGGLE = 'SET_TOGGLE';

  static readonly TOGGLE = 'TOGGLE';

  static readonly ROLE_SET_REMOVED = 'ROLE_SET_REMOVED';

  static readonly DISPLAY_ROLE_CHANGED = 'DISPLAY_ROLE_CHANGED';



  @dispatch()

  propertyLoaded = (property: DfhProperty): RoleSetAction => ({
    type: RoleSetActions.PROPERTY_LOADED,
    meta: null,
    payload: {
      property
    }
  })


  setToggle = (toggle: CollapsedExpanded) => ({
    type: RoleSetActions.SET_TOGGLE,
    meta: null,
    payload: {
      toggle
    }
  })


  toggle = () => ({
    type: RoleSetActions.TOGGLE,
    meta: null,
    payload: null
  })

  /**
* called, when user selected a the kind of property to add
*/
  removeRoleSet = (): RoleSetAction => ({
    type: RoleSetActions.ROLE_SET_REMOVED,
    meta: null,
    payload: null
  })


  startAddingRole = (): RoleSetAction => ({
    type: RoleSetActions.START_ADDING_ROLE,
    meta: null,
    payload: null
  })

  alternativeRolesLoaded = (roleStatesInOtherProjects: IRoleStates, roleStatesInNoProject: IRoleStates): RoleSetAction => ({
    type: RoleSetActions.ALTERNATIVE_ROLES_LOADED,
    meta: null,
    payload: {
      roleStatesInOtherProjects,
      roleStatesInNoProject
    }
  })

  startCreateNewRole = (roleStatesToCreate: IRoleStates): RoleSetAction => ({
    type: RoleSetActions.START_CREATE_NEW_ROLE,
    meta: null,
    payload: {
      roleStatesToCreate
    }
  })


  stopCreateNewRole = (): RoleSetAction => ({
    type: RoleSetActions.STOP_CREATE_NEW_ROLE,
    meta: null,
    payload: {
      roleStatesInOtherProjects: undefined,
      roleStatesInNoProject: undefined,
      roleStatesToCreate: undefined
    }
  })


  roleCreationCancelled = (roleStatesToCreate: IRoleStates): RoleSetAction => ({
    type: RoleSetActions.ROLE_CREATION_CANCELLED,
    meta: null,
    payload: {
      roleStatesToCreate
    }
  })


  rolesCreated = (roleStatesInProject: IRoleStates): RoleSetAction => ({
    type: RoleSetActions.ROLES_CREATED,
    meta: null,
    payload: {
      roleStatesInProject
    }
  })

  /**
 * Removes the current RoleState from the Store. Called upon successfully removing a role
 */
  roleRemovedFromProject = (key: String): RoleSetAction => ({
    type: RoleSetActions.ROLE_REMOVED_FROM_PROJECT,
    meta: { key },
    payload: null
  })

  startEditingRole = (key: string, roleState: IRoleState): RoleSetAction => ({
    type: RoleSetActions.START_EDITING_ROLE,
    meta: {
      key,
      roleState
    },
    payload: null
  })

  stopEditingRole = (key: string, roleState: IRoleState): RoleSetAction => ({
    type: RoleSetActions.STOP_EDITING_ROLE,
    meta: {
      key,
      roleState
    },
    payload: null
  })

  updateRole = (key: string, roleStatesInProject: IRoleStates): RoleSetAction => ({
    type: RoleSetActions.UPDATE_ROLE,
    meta: {
      key
    },
    payload: {
      roleStatesInProject
    }
  })

}
