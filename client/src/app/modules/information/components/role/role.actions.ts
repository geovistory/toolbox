import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IRoleState } from './role.model';
import { InfRole } from 'app/core';
import { CollapsedExpanded } from '../../information.models';
import { ITeEntState } from '../te-ent/te-ent.model';

// replace Role with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IRoleState;
interface MetaData { };
export type RoleAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class RoleActions {
  static readonly ROLE_TO_CREATE_UPDATED = 'ROLE_TO_CREATE_UPDATED';
  static readonly ROLE_TO_ADD_UPDATED = 'ROLE_TO_ADD_UPDATED';
  // static readonly SET_DISPLAY_ROLE_FOR_RANGE = 'SET_DISPLAY_ROLE_FOR_RANGE';
  // static readonly SET_DISPLAY_ROLE_FOR_DOMAIN = 'SET_DISPLAY_ROLE_FOR_DOMAIN ';

  // static readonly CHILD_TE_ENT_INITIALIZED = 'CHILD_TE_ENT_INITIALIZED';


  @dispatch()

  roleToCreateUpdated = (roleToCreate:InfRole): RoleAction => ({
    type: RoleActions.ROLE_TO_CREATE_UPDATED,
    meta: null,
    payload: {
      roleToCreate
    }
  })


  roleToAddUpdated = (roleToAdd:InfRole): RoleAction => ({
    type: RoleActions.ROLE_TO_CREATE_UPDATED,
    meta: null,
    payload: {
      roleToAdd
    }
  })

  // setDisplayRoleForRange = (isDisplayRoleForRange:boolean): RoleAction => ({
  //   type: RoleActions.SET_DISPLAY_ROLE_FOR_RANGE,
  //   meta: null,
  //   payload: {
  //     isDisplayRoleForRange
  //   }
  // })

  // setDisplayRoleForDomain = (isDisplayRoleForDomain:boolean): RoleAction => ({
  //   type: RoleActions.SET_DISPLAY_ROLE_FOR_DOMAIN,
  //   meta: null,
  //   payload: {
  //     isDisplayRoleForDomain
  //   }
  // })

  // childTeEntInitialized = (childTeEnt:ITeEntState): RoleAction => ({
  //   type: RoleActions.CHILD_TE_ENT_INITIALIZED,
  //   meta: null,
  //   payload: {
  //     childTeEnt
  //   }
  // })

}
