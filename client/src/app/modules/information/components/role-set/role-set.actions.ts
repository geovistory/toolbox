import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IRoleSetState } from './role-set.model';
import { DfhProperty } from '../../../../core';
import { RoleSetLabelObj } from './role-set.component';
import { IRoleState } from '../role/role.model';
import { CollapsedExpanded } from '../../information.models';


export function roleStateKey (roleState: IRoleState) { return roleState.role.pk_entity };



// replace PiRoleSet with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IRoleSetState;
interface MetaData { };
export type RoleSetAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class RoleSetActions {
  static readonly PROPERTY_LOADED = 'PROPERTY_LOADED';

  // INIT ACTIONS
  static readonly ROLE_LABEL_UPDATED = 'ROLE_LABEL_UPDATED';
  static readonly TARGET_CLASS_PK_UPDATED = 'TARGET_CLASS_PK_UPDATED';
  static readonly CHILD_ROLES_UPDATED = 'CHILD_ROLES_UPDATED';
  // TODO INIT ACTIONS
  static readonly ROLES_SORTED_BY_POPULARITY = 'ROLES_SORTED_BY_POPULARITY';

  // TODO


  // change standard label
  static readonly DISPLAY_ROLE_FOR_DOMAIN_UPDATED = 'DISPLAY_ROLE_FOR_DOMAIN_UPDATED';

  static readonly CANCEL_CREATE_NEW_ROLE = 'CANCEL_CREATE_NEW_ROLE';
  static readonly ROLE_READY_TO_CREATE = 'ROLE_READY_TO_CREATE';
  static readonly ROLE_NOT_READY_TO_CREATE = 'ROLE_NOT_READY_TO_CREATE';
  static readonly ENTITIES_TO_CREATE_PERSISTED = 'ENTITIES_TO_CREATE_PERSISTED';

  static readonly ADDED_SELECTED_ROLES_TO_PROJECT = 'ADDED_SELECTED_ROLES_TO_PROJECT';

  static readonly CANCEL_SELECT_ROLES = 'CANCEL_SELECT_ROLES'; // Maybe not a role set action but a role set list action!
  static readonly PROPERTY_SECTION_REMOVED = 'PROPERTY_SECTION_REMOVED';  // Maybe not a role set action but a role set list action!

  static readonly SET_TOGGLE = 'SET_TOGGLE';

  static readonly TOGGLE = 'TOGGLE';

  static readonly ROLE_SET_REMOVED = 'ROLE_SET_REMOVED';


  @dispatch()

  propertyLoaded = (property: DfhProperty): RoleSetAction => ({
    type: RoleSetActions.PROPERTY_LOADED,
    meta: null,
    payload: {
      property
    }
  })

  labelUpdated = (label: RoleSetLabelObj): RoleSetAction => ({
    type: RoleSetActions.ROLE_LABEL_UPDATED,
    meta: null,
    payload: {
      label
    }
  })

  targetPkUpdated = (targetClassPk: number): RoleSetAction => ({
    type: RoleSetActions.TARGET_CLASS_PK_UPDATED,
    meta: null,
    payload: {
      targetClassPk
    }
  })

  childRolesUpdated = (childRoleStates: IRoleState[]) => ({
    type: RoleSetActions.CHILD_ROLES_UPDATED,
    meta: null,
    payload: {
      childRoleStates
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


}
