import { Injectable, Inject, forwardRef } from '@angular/core';
import { InfRole } from 'app/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { indexBy, groupBy, prop } from 'ramda';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { RoleService } from './role.service';
import { RoleDetailList, RoleDetail, RoleSet } from 'app/core/state/models';


@Injectable()
export class RoleSetService {

  constructor(
    @Inject(forwardRef(() => RoleService)) private roleService: RoleService
  ) { }

  createChildren(roles: InfRole[], isOutgoing: boolean): RoleDetail[] {
    if (!roles) return null;

    return roles.map(role => {
      return {
        role,
        isOutgoing
      } as RoleDetail
    })
  }


  static getRoleStatesContainerForState(roleSet: RoleSet): RoleDetailList {

    return roleSet._role_list;

  }

  /**
   * find role of roleSet with highest number of display count.
   * @param roleStates 
   */
  static getDisplayRangeFavoriteOfRoleStates(roleStates: RoleDetailList): number {
    let highestCount = -1;
    let pkEntityWithHighestCount;
    for (const j in roleStates) {
      if (roleStates.hasOwnProperty(j)) {
        const roleState: RoleDetail = roleStates[j];
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



  /**
   * Verify if more roles can be added in given roleSet
   *
   * @param  quantityOfRoles  quantity of roles in roleSet
   * @param  roleSet roleSetState
   * @return  true, if more roles are possible
   */
  moreRolesPossible(quantityOfRoles: number, roleSet: RoleSet): boolean {
    let max, min;

    if (roleSet.isOutgoing) {
      max = roleSet.property.dfh_range_instances_max_quantifier;
    }
    else {
      max = roleSet.property.dfh_domain_instances_max_quantifier;
    }

    max = (max === -1 ? Number.POSITIVE_INFINITY : max);

    /** increase the quantityOfRoles by one and check if this would still be ok */
    return ((quantityOfRoles + 1) <= max)

  }

}
