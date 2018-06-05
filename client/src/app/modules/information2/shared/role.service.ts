import { Injectable, forwardRef, Inject } from '@angular/core';
import { InfRole, DfhProperty } from 'app/core';
import { groupBy, prop } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { RoleSet } from '../information.models';

interface Label {
  sg: string;
  pl: string;
}
interface RoleInfo {
  label: Label;
  maxAlternatives: number;
}

export interface RolesPerProperty {
  fkProperty: number;
  roles: InfRole[];
}
export interface DirectedRole {
  isOutgoing: boolean;
  role: InfRole;
}

@Injectable()
export class RoleService {

  /**
  * Properties
  */


  constructor() { }


  /**
  * Methods
  */

  /**
  * getRolesPerProperty - returns an array of objects that holds the different
  * roles.fk_property as keys and an array of all roles of that key in an
  * array.
  *
  * @param  {InfRole[]} roles array of InfRole
  * @return {array}       array of {fkProperty: key, roles: InfRole[]}
  */
  getRolesPerProperty(roles: InfRole[]): RolesPerProperty[] {

    let rolesByKind = {};
    roles.forEach(role => {

      // if key does not exist in object, create key with empty array as property
      rolesByKind[role.fk_property] =
        rolesByKind[role.fk_property] ? rolesByKind[role.fk_property] : [];

      // push role to the array
      rolesByKind[role.fk_property].push(role);

    })

    let kindsOfRoles = [];
    for (let key in rolesByKind) {
      kindsOfRoles.push({ fkProperty: key, roles: rolesByKind[key] });
    }
    return kindsOfRoles;
  }



  /**
   * Adds roles to given role sets and assigns generic options for all RoleSets
   * 
   * @param {InfRole[]} roles array of roles a PeIti
   * @param {RoleSet[]} ingoingRoleSets array of ingoing properties (depending on context)
   * @param {RoleSet[]} outgoingRoleSets array of outgoing properties (depending on context)
   * @param {RoleSet} options any other option that should be apllied to all of the roleSets
   * @return {RoleSet[]} Array of RoleSet, the model of the Gui-Element for RoleSets
   */
  addRolesToRoleSets(roles: InfRole[], ingoingRoleSets: RoleSet[], outgoingRoleSets: RoleSet[], options: RoleSet = {}): RoleSet[] {

    // declare array that will be returned
    const roleSets: RoleSet[] = [];

    const rolesByFkProp = groupBy(prop('fk_property'), roles)

    // enrich role sets with roles
    ingoingRoleSets.forEach(rs => {
      const roleSet: RoleSet = Object.assign(rs, options, {
        roles: rolesByFkProp[rs.property.dfh_pk_property]
      })
      if (roleSet.roles && roleSet.roles.length)
        roleSets.push(roleSet);
    })

    // enrich role sets with roles
    outgoingRoleSets.forEach(rs => {
      const roleSet: RoleSet = Object.assign(rs, options, {
        roles: rolesByFkProp[rs.property.dfh_pk_property]
      })
      if (roleSet.roles && roleSet.roles.length)
        roleSets.push(roleSet);
    })

    return roleSets;
  }



  /**
    * Group roles by fk_property. Return an obj, where
    * fk_property is used as key and an array of roles as value
    *
    * @param  {InfRole[]} roles description
    * @return {RolesPerProperty[]}
    */
  groupRolesByProperty(roles): RolesPerProperty[] {
    let rolesByPropertyObj = {};

    roles.forEach(role => {

      // if key does not exist in object, create key with empty array as property
      rolesByPropertyObj[role.fk_property] =
        rolesByPropertyObj[role.fk_property] ? rolesByPropertyObj[role.fk_property] : [];

      // push role to the array
      rolesByPropertyObj[role.fk_property].push(role);

    })

    let rolesByPropertyArr = [];
    for (let key in rolesByPropertyObj) {
      rolesByPropertyArr.push({ fkProperty: key, roles: rolesByPropertyObj[key] });
    }

    return rolesByPropertyArr;
  }

  /**
   * Returns true, if this is the display role for the project
   * @param isOutgoing 
   * @param isDisplayRoleForDomain 
   * @param isDisplayRoleForRange 
   * @returns boolen
   */
  static isDisplayRole(isOutgoing: boolean, isDisplayRoleForDomain: boolean, isDisplayRoleForRange: boolean): boolean {
    if (isOutgoing === true && isDisplayRoleForDomain) return true;
    if (isOutgoing === false && isDisplayRoleForRange) return true;
    return false
  }


}
