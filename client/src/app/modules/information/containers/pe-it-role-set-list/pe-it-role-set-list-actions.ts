import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IPiRoleSetListState } from './pe-it-role-set-list.model';
import { IRoleSetState, RoleSetState } from '../../components/role-set/role-set.model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPiRoleSetListState;
interface MetaData { };
export type PiRoleSetListAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PiRoleSetListActions {

  static readonly PE_IT_ROLE_SETS_INITIALIZED = 'PE_IT_ROLE_SETS_INITIALIZED';

  static readonly START_SELECT_PROPERTY = 'START_SELECT_PROPERTY';

  static readonly STOP_SELECT_PROPERTY = 'STOP_SELECT_PROPERTY';

  static readonly PROPERTY_SELECTED = 'PROPERTY_SELECTED';

  static readonly START_SELECT_ROLES = 'START_SELECT_ROLES';

  static readonly COMMUNITY_STATS_VISIBILITY_TOGGLED = 'COMMUNITY_STATS_VISIBILITY_TOGGLED';

  static readonly ONTO_INFO_VISIBILITY_TOGGLED = 'ONTO_INFO_VISIBILITY_TOGGLED';

  @dispatch()

  piRoleSetListInitialized = (roleSets: IRoleSetState[]): PiRoleSetListAction => ({
    type: PiRoleSetListActions.PE_IT_ROLE_SETS_INITIALIZED,
    meta: null,
    payload: {
      roleSets
    }
  })

  /**
  * startSelectProperty - called, when user clicks on add a property
  */
  startSelectProperty = (): PiRoleSetListAction => ({
    type: PiRoleSetListActions.START_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'selectProp'
    }
  })


  /**
  * stopSelectProperty - called, when user clicks on close button of property
  * selector
  */
  stopSelectProperty = (): PiRoleSetListAction => ({
    type: PiRoleSetListActions.STOP_SELECT_PROPERTY,
    meta: null,
    payload: {
      selectPropState: 'init'
    }
  })

  /**
  * called, when user selected a the kind of property to add
  */
  startSelectRoles = (roleSets:RoleSetState[]): PiRoleSetListAction => ({
    type: PiRoleSetListActions.START_SELECT_ROLES,
    meta: null,
    payload: {
      roleSets,
      selectPropState: 'init'
    }
  })

  communityStatsVisibilityToggled = (communityStatsVisible:boolean): PiRoleSetListAction => ({
    type: PiRoleSetListActions.COMMUNITY_STATS_VISIBILITY_TOGGLED,
    meta: null,
    payload: {
      communityStatsVisible
    }
  })

  ontoInfoVisibilityToggled = (ontoInfoVisible:boolean): PiRoleSetListAction => ({
    type: PiRoleSetListActions.ONTO_INFO_VISIBILITY_TOGGLED,
    meta: null,
    payload: {
      ontoInfoVisible
    }
  })




}
