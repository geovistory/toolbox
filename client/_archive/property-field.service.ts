import { Injectable, Inject, forwardRef } from '@angular/core';
import { InfRole } from 'app/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { indexBy, groupBy, prop } from 'ramda';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { RoleService } from './role.service';
import { RoleDetailList, RoleDetail, PropertyField } from 'app/core/state/models';


@Injectable()
export class PropertyFieldService {

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


  static getRoleStatesContainerForState(propertyField: PropertyField): RoleDetailList {

    return propertyField._role_list;

  }

  /**
   * find role of propertyField with highest number of display count.
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
 * find role of propertyField with highest number of display count.
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
   * Verify if more roles can be added in given propertyField
   *
   * @param  quantityOfRoles  quantity of roles in propertyField
   * @param  propertyField propertyFieldState
   * @return  true, if more roles are possible
   */
  moreRolesPossible(quantityOfRoles: number, propertyField: PropertyField): boolean {
    let max, min;

    if (propertyField.isOutgoing) {
      max = propertyField.property.dfh_range_instances_max_quantifier;
    }
    else {
      max = propertyField.property.dfh_domain_instances_max_quantifier;
    }

    max = (max === -1 ? Number.POSITIVE_INFINITY : max);

    /** increase the quantityOfRoles by one and check if this would still be ok */
    return ((quantityOfRoles + 1) <= max)

  }

}
