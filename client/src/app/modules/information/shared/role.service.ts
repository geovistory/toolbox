import { Injectable } from '@angular/core';
import { InfRole, DfhProperty } from 'app/core';

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
export interface RoleSets {
  fkProperty: number;
  isOutgoing: boolean;
  roles: InfRole[];
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
   * transform roles to an array grouped by property and direction of the role.
   * This is useful for adding property sections to the gui, since for each
   * property there needs to be a property section and each property section
   * needs to know if it is outgoing or ingoing (for the display label)
   *
   * @param {InfRole[]} roles array of roles
   * @param {Property[]} ingoing array of ingoing properties (depending on context)
   * @param {Property[]} outgoing array of outgoing properties (depending on context)
   *
   * @return {RoleSets[]} Array of RoleSets
   */
  toRoleSets(roles: InfRole[], ingoing: DfhProperty[], outgoing: DfhProperty[]): RoleSets[] {

    // declare array that will be returned
    const directedRolesPerProperty: RoleSets[] = [];

    // create array of ingoing fk_property
    const fkPropIn: number[] = ingoing.map(p => p.dfh_pk_property)

    // create array of outgoing fk_property
    const fkPropOut: number[] = outgoing.map(p => p.dfh_pk_property)

    // filter for ingoing Roles
    const ingoingRoles = roles.filter(role => fkPropIn.includes(role.fk_property))

    // filter for outgoing Roles
    const outgoingRoles = roles.filter(role => fkPropOut.includes(role.fk_property))

    // group ingoing Roles by Property
    const ingoingRolesPerProperty = this.getRolesPerProperty(ingoingRoles);

    // group outgoing Roles by Property
    const outgoingRolesPerProperty = this.getRolesPerProperty(outgoingRoles);

    // create directed roles per property
    outgoingRolesPerProperty.forEach(rpp => {
      const drpp: RoleSets = {
        isOutgoing: true,
        fkProperty: rpp.fkProperty,
        roles: rpp.roles
      }
      directedRolesPerProperty.push(drpp);
    })

    // create directed roles per property
    ingoingRolesPerProperty.forEach(rpp => {
      const drpp: RoleSets = {
        isOutgoing: false,
        fkProperty: rpp.fkProperty,
        roles: rpp.roles
      }
      directedRolesPerProperty.push(drpp);
    })


    return directedRolesPerProperty;
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


}
