import { Injectable } from '@angular/core';
import { InfRole, DfhProperty } from 'app/core';
import { RoleSetState, IRoleSetState } from '../components/role-set/role-set.model';

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
   * create RoleSetStates out of 
   * - the roles of a PeIti
   * - the ingoing properties of the PeIt-class
   * - the outgoing properties of the PeIt-class
   * - generic options for all RoleSetStates
   * 
   * @param {InfRole[]} roles array of roles a PeIti
   * @param {Property[]} ingoing array of ingoing properties (depending on context)
   * @param {Property[]} outgoing array of outgoing properties (depending on context)
   *
   * @return {RoleSets[]} Array of RoleSetState, the model of the Gui-Element for RoleSets
   */
  toRoleSetStates(roles: InfRole[], ingoing: DfhProperty[], outgoing: DfhProperty[], options: IRoleSetState = {}): IRoleSetState[] {

    // declare array that will be returned
    const roleSets: IRoleSetState[] = [];

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

    // create role sets
    outgoingRolesPerProperty.forEach(rpp => {
      const roleSet = new RoleSetState(Object.assign(options, {
        isOutgoing: true,
        fkProperty: rpp.fkProperty,
        roles: rpp.roles
      }))

      roleSets.push(roleSet);
    })

    // create role sets
    ingoingRolesPerProperty.forEach(rpp => {
      const roleSet = new RoleSetState(Object.assign(options, {
        isOutgoing: false,
        fkProperty: rpp.fkProperty,
        roles: rpp.roles
      }))

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




}
