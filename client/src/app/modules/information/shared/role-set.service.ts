import { Injectable, Inject, forwardRef } from '@angular/core';
import { EditorStates } from '../information.models';
import { IRoleState, RoleState } from '../components/role/role.model';
import { InfRole } from 'app/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RoleSetState, IRoleSetState, IRoleStates } from '../components/role-set/role-set.model';
import { indexBy, groupBy, prop } from 'ramda';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { roleStateKey } from '../components/role-set/role-set.actions';
import { BehaviorSubject } from 'rxjs';
import { ITeEntState } from '../components/te-ent/te-ent.model';
import { Observable } from 'rxjs/Observable';
import { RoleService } from './role.service';


@Injectable()
export class RoleSetService {

  constructor(
    @Inject(forwardRef(() => RoleService)) private roleService: RoleService
  ) { }

  createChildren(roles: InfRole[], state: EditorStates, isOutgoing: boolean): IRoleState[] {
    if (!roles || !state) return null;

    return roles.map(role =>
      new RoleState({
        role,
        state,
        isOutgoing
      }))
  }


  static getRoleStatesContainerForState(roleSet: IRoleSetState): IRoleStates {
    let roleStates: IRoleStates;

    switch (roleSet.state) {
      /** if the roleset is in editable mode, the roles that are in project need to be taken */
      case 'editable':
        return roleSet.roleStatesInProject;

      /** 
       * if the roleset is in add-pe-it mode, the roles that are in other projects need to be taken.
       */
      case 'add-pe-it':
        return roleSet.roleStatesInOtherProjects


      default:
        return roleSet.roleStatesInProject;
    }

  }

  /**
   * find role of roleSet with highest number of display count.
   * @param roleStates 
   */
  static getDisplayRangeFavoriteOfRoleStates(roleStates: IRoleStates): number {
    let highestCount = -1;
    let pkEntityWithHighestCount;
    for (const j in roleStates) {
      if (roleStates.hasOwnProperty(j)) {
        const roleState: IRoleState = roleStates[j];
        if (roleState.role.is_standard_in_project_count > highestCount) {
          highestCount = roleState.role.is_standard_in_project_count;
          pkEntityWithHighestCount = roleState.role.pk_entity;
        }
      }
    }
    return pkEntityWithHighestCount;
  }

  /**
 * find role of roleSet with highest number of display count.
 * @param roleStates 
 */
  static getDisplayRangeFavoriteOfRoles(roles: InfRole[]): number {
    let highestCount = -1;
    let pkEntityWithHighestCount;

    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      if (role.is_standard_in_project_count > highestCount) {
        highestCount = role.is_standard_in_project_count;
        pkEntityWithHighestCount = role.pk_entity;
      }
    }

    return pkEntityWithHighestCount;
  }


}
