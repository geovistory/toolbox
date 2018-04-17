import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IRoleSetListState } from './role-set-list.model';
import { IRoleSetState, RoleSetState } from '../../components/role-set/role-set.model';
import { DfhProperty, InfRole, DfhClass } from 'app/core';
import { indexBy, prop } from 'ramda';

export function roleSetKey(roleSet: RoleSetState) {
  return roleSet.property.dfh_pk_property + '_' + (roleSet.isOutgoing ? 'outgoing' : 'ingoing')
}

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IRoleSetListState;
interface MetaData { };
export type RoleSetListAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class RoleSetListActions {

  // static readonly ROLE_SETS_INITIALIZED = 'ROLE_SETS_INITIALIZED';

  // static readonly FK_CLASS_AND_ROLES_INITIALIZED = 'FK_CLASS_AND_ROLES_INITIALIZED';

  static readonly START_SELECT_PROPERTY = 'START_SELECT_PROPERTY';

  static readonly STOP_SELECT_PROPERTY = 'STOP_SELECT_PROPERTY';

  static readonly PROPERTY_SELECTED = 'PROPERTY_SELECTED';

  static readonly ROLE_SET_ADDED = 'ROLE_SET_ADDED';

  @dispatch()


  // roleSetsInitialized = (roleSets: IRoleSetState[], ingoingRoleSets: RoleSetState[], outgoingRoleSets: RoleSetState[]): RoleSetListAction => ({
  //   type: RoleSetListActions.ROLE_SETS_INITIALIZED,
  //   meta: null,
  //   payload: {
  //     ingoingRoleSets,
  //     outgoingRoleSets,
  //     roleSets: indexBy(roleSetKey, roleSets)
  //   }
  // })

  /**
  * startSelectProperty - called, when user clicks on add a property
  */
  startSelectProperty = (): RoleSetListAction => ({
    type: RoleSetListActions.START_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'selectProp'
    }
  })


  /**
  * stopSelectProperty - called, when user clicks on close button of property
  * selector
  */
  stopSelectProperty = (): RoleSetListAction => ({
    type: RoleSetListActions.STOP_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'init'
    }
  })

  /**
  * called, when user selected a the kind of property to add
  */
  addRoleSet = (roleSet: RoleSetState): RoleSetListAction => ({
    type: RoleSetListActions.ROLE_SET_ADDED,
    meta: null,
    payload: {
      roleSets: indexBy(roleSetKey, [roleSet]),
      selectPropState: 'init'
    }
  })



  // fkClassAndRolesInitialized = (fkClass: number, dfhClass: DfhClass, roles: InfRole[]): RoleSetListAction => ({
  //   type: RoleSetListActions.FK_CLASS_AND_ROLES_INITIALIZED,
  //   meta: null,
  //   payload: {
  //     fkClass,
  //     dfhClass,
  //     roles
  //   }
  // })



}
