import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { RoleDetail, RoleDetailList, CollapsedExpanded, PropertyField } from 'app/core/state/models';
import { DfhProperty, ProInfoProjRel } from 'app/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';



export function roleStateKey(roleState: RoleDetail) { return '_' + roleState.role.pk_entity };



// replace PiPropertyField with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = PropertyField;
interface MetaData {
  key?: string;
  roleDetail?: RoleDetail;
  eprs?: ProInfoProjRel[];
  pk_roles?: number[]; // array of pk_entity of roles
  roleDetailList?: RoleDetailList;
  cdkDragDropEvent?: CdkDragDrop<string[]>;
};
export type PropertyFieldAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PropertyFieldActions {

  static readonly PROPERTY_LOADED = 'PropertyField::PROPERTY_LOADED';


  // TODO INIT ACTIONS
  static readonly ROLES_SORTED_BY_POPULARITY = 'PropertyField::ROLES_SORTED_BY_POPULARITY';



  // change standard label
  static readonly DISPLAY_ROLE_FOR_DOMAIN_UPDATED = 'PropertyField::DISPLAY_ROLE_FOR_DOMAIN_UPDATED';

  static readonly START_ADDING_ROLE = 'PropertyField::START_ADDING_ROLE';
  static readonly ALTERNATIVE_ROLES_LOADED = 'PropertyField::ALTERNATIVE_ROLES_LOADED';

  static readonly START_CREATE_NEW_ROLE = 'PropertyField::START_CREATE_NEW_ROLE';
  static readonly STOP_CREATE_NEW_ROLE = 'PropertyField::STOP_CREATE_NEW_ROLE'; // removes all roleStatesToCreate
  static readonly ROLE_CREATION_CANCELLED = 'PropertyField::ROLE_CREATION_CANCELLED'; // removes one roleStateToCreate

  static readonly ROLES_CREATED = 'PropertyField::ROLES_CREATED';
  static readonly ROLE_REMOVED_FROM_PROJECT = 'PropertyField::ROLE_REMOVED_FROM_PROJECT';

  static readonly START_EDITING_ROLE = 'PropertyField::START_EDITING_ROLE';
  static readonly STOP_EDITING_ROLE = 'PropertyField::STOP_EDITING_ROLE';
  static readonly UPDATE_ROLE = 'PropertyField::UPDATE_ROLE';

  static readonly ROLE_READY_TO_CREATE = 'PropertyField::ROLE_READY_TO_CREATE';
  static readonly ROLE_NOT_READY_TO_CREATE = 'PropertyField::ROLE_NOT_READY_TO_CREATE';
  static readonly ENTITIES_TO_CREATE_PERSISTED = 'PropertyField::ENTITIES_TO_CREATE_PERSISTED';

  static readonly ADDED_SELECTED_ROLES_TO_PROJECT = 'PropertyField::ADDED_SELECTED_ROLES_TO_PROJECT';

  static readonly CANCEL_SELECT_ROLES = 'PropertyField::CANCEL_SELECT_ROLES'; // Maybe not a role set action but a role set list action!
  static readonly PROPERTY_SECTION_REMOVED = 'PropertyField::PROPERTY_SECTION_REMOVED';  // Maybe not a role set action but a role set list action!

  static readonly SET_TOGGLE = 'PropertyField::SET_TOGGLE';

  static readonly TOGGLE = 'PropertyField::TOGGLE';

  static readonly REMOVE_ROLE_SET = 'PropertyField::REMOVE_ROLE_SET';

  static readonly DISPLAY_ROLE_CHANGED = 'PropertyField::DISPLAY_ROLE_CHANGED';

  static readonly ADD_ROLE_TO_ROLE_LIST = 'PropertyField::ADD_ROLE_TO_ROLE_LIST';

  static readonly REMOVE_ROLE_FROM_ROLE_LIST = 'PropertyField::REMOVE_ROLE_FROM_ROLE_LIST';

  static readonly ROLE_SET_UPDATE_ORDER = 'PropertyField::ROLE_SET_UPDATE_ORDER';
  static readonly ROLE_SET_UPDATE_ORDER_SUCCEEDED = 'PropertyField::ROLE_SET_UPDATE_ORDER_SUCCEEDED';
  static readonly ROLE_SET_UPDATE_ORDER_FAILED = 'PropertyField::ROLE_SET_UPDATE_ORDER_FAILED';

  static readonly ROLE_SET_ENABLE_DRAG = 'PropertyField::ROLE_SET_ENABLE_DRAG';
  static readonly ROLE_SET_DISABLE_DRAG = 'PropertyField::ROLE_SET_DISABLE_DRAG';

  // used by pe it role set form
  static readonly ADD_ROLES_WITH_TE_ENT = 'PropertyField::ADD_ROLES_WITH_TE_ENT';
  static readonly ADD_ROLES_WITH_TE_ENT_SUCCEEDED = 'PropertyField::ADD_ROLES_WITH_TE_ENT_SUCCEEDED';
  static readonly ADD_ROLES_WITH_TE_ENT_FAILED = 'PropertyField::ADD_ROLES_WITH_TE_ENT_FAILED';

  // used by te ent role set form
  // TODO: once there are roles connecting two te ents, we need another api to add those
  static readonly ADD_ROLES_WITHOUT_TE_ENT = 'PropertyField::ADD_ROLES_WITHOUT_TE_ENT';
  static readonly ADD_ROLES_WITHOUT_TE_ENT_SUCCEEDED = 'PropertyField::ADD_ROLES_WITHOUT_TE_ENT_SUCCEEDED';
  static readonly ADD_ROLES_WITHOUT_TE_ENT_FAILED = 'PropertyField::ADD_ROLES_WITHOUT_TE_ENT_FAILED';


  @dispatch()

  propertyLoaded = (property: DfhProperty): PropertyFieldAction => ({
    type: PropertyFieldActions.PROPERTY_LOADED,
    meta: null,
    payload: new PropertyField({
      property
    })
  })


  setToggle = (toggle: CollapsedExpanded) => ({
    type: PropertyFieldActions.SET_TOGGLE,
    meta: null,
    payload: {
      toggle
    }
  })


  toggle = () => ({
    type: PropertyFieldActions.TOGGLE,
    meta: null,
    payload: null
  })

  /**
* called, when user selected a the kind of property to add
*/
  removePropertyField = (): PropertyFieldAction => ({
    type: PropertyFieldActions.REMOVE_ROLE_SET,
    meta: null,
    payload: null
  })


  startAddingRole = (): PropertyFieldAction => ({
    type: PropertyFieldActions.START_ADDING_ROLE,
    meta: null,
    payload: null
  })

  alternativeRolesLoaded = (_role_add_list: RoleDetailList, _role_add_in_no_project_list: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.ALTERNATIVE_ROLES_LOADED,
    meta: null,
    payload: new PropertyField({
      _property_field_form: {
        _role_add_list,
        _role_add_in_no_project_list
      }
    })
  })

  startCreateNewRole = (_role_create_list: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.START_CREATE_NEW_ROLE,
    meta: null,
    payload: new PropertyField({
      _property_field_form: {
        _role_create_list,

      }
    })
  })


  stopCreateNewRole = (): PropertyFieldAction => ({
    type: PropertyFieldActions.STOP_CREATE_NEW_ROLE,
    meta: null,
    payload: null
  })


  roleCreationCancelled = (_role_create_list: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_CREATION_CANCELLED,
    meta: null,
    payload: new PropertyField({
      _property_field_form: {
        _role_create_list
      }
    })
  })


  rolesCreated = (_role_list: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLES_CREATED,
    meta: null,
    payload: new PropertyField({
      _role_list
    })
  })

  /**
   * Removes the current RoleDetail from the Store. Called upon successfully removing a role
   */
  roleRemovedFromProject = (key: string, roleDetail: RoleDetail): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_REMOVED_FROM_PROJECT,
    meta: { key, roleDetail },
    payload: null
  })

  startEditingRole = (key: string, roleDetail: RoleDetail): PropertyFieldAction => ({
    type: PropertyFieldActions.START_EDITING_ROLE,
    meta: {
      key,
      roleDetail
    },
    payload: null
  })

  stopEditingRole = (key: string, roleDetail: RoleDetail): PropertyFieldAction => ({
    type: PropertyFieldActions.STOP_EDITING_ROLE,
    meta: {
      key,
      roleDetail
    },
    payload: null
  })

  updateRole = (key: string, _role_list: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.UPDATE_ROLE,
    meta: {
      key
    },
    payload: new PropertyField({
      _role_list
    })
  })


  addRoleToRoleList = (key: string, roleDetail: RoleDetail): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLE_TO_ROLE_LIST,
    meta: {
      key,
      roleDetail
    },
    payload: null
  })

  removeRoleFromRoleList = (key: string): PropertyFieldAction => ({
    type: PropertyFieldActions.REMOVE_ROLE_FROM_ROLE_LIST,
    meta: {
      key
    },
    payload: null
  })


  // updates the state immediately
  updateOrder = (eprs: ProInfoProjRel[], cdkDragDropEvent: CdkDragDrop<string[]>): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_SET_UPDATE_ORDER,
    meta: {
      eprs,
      cdkDragDropEvent
    },
    payload: null
  })

  // updates the eprs
  updateOrderSucceeded = (eprs: ProInfoProjRel[]): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_SET_UPDATE_ORDER_SUCCEEDED,
    meta: {
      eprs
    },
    payload: null
  })

  // reverts the old state
  updateOrderFailed = (_role_list: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_SET_UPDATE_ORDER_FAILED,
    meta: {},
    payload: { _role_list }
  })



  enableDrag = (): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_SET_ENABLE_DRAG,
    meta: null,
    payload: null
  })

  disableDrag = (): PropertyFieldAction => ({
    type: PropertyFieldActions.ROLE_SET_DISABLE_DRAG,
    meta: null,
    payload: null
  })


  /**
   * Add roles with temproal entities to the role set
   */
  addRolesWithTeEnt = (pk_roles: number[]): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLES_WITH_TE_ENT,
    meta: { pk_roles },
    payload: null
  })

  addRolesWithTeEntSucceeded = (roleDetailList: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLES_WITH_TE_ENT_SUCCEEDED,
    meta: { roleDetailList },
    payload: null
  })

  addRolesWithTeEntFailed = (): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLES_WITH_TE_ENT_FAILED,
    meta: null,
    payload: null
  })

  /**
   * Add roles without temproal entities to the role set
   */
  addRolesWithoutTeEnt = (pk_roles: number[]): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLES_WITHOUT_TE_ENT,
    meta: { pk_roles },
    payload: null
  })

  addRolesWithoutTeEntSucceeded = (roleDetailList: RoleDetailList): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLES_WITHOUT_TE_ENT_SUCCEEDED,
    meta: { roleDetailList },
    payload: null
  })

  addRolesWithoutTeEntFailed = (): PropertyFieldAction => ({
    type: PropertyFieldActions.ADD_ROLES_WITHOUT_TE_ENT_FAILED,
    meta: null,
    payload: null
  })
}
