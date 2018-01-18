import { Injectable } from '@angular/core';
import { InformationRole } from '../sdk/models/InformationRole';

interface Label {
  sg: string;
  pl: string;
}
interface RoleInfo {
  label: Label;
  maxAlternatives: number;
}

@Injectable()
export class RoleService {

  /**
  * Properties
  */

  // rolesObject holds information about roles structured by pk_entity of roles

  private rolesObject = {
    'R63': <RoleInfo> {
      'label': <Label> {
        'sg': 'Name',
        'pl': 'Names'
      },
      'maxAlternatives': <number> -1
    },
    'R64': <RoleInfo> {
      'label': <Label> {
        'sg': 'Name',
        'pl': 'Names'
      },
      'maxAlternatives': <number> 1
    },
    'R61': <RoleInfo> {
      'label': <Label> {
        'sg': 'Language of name',
        'pl': 'Language of name'
      },
      'maxAlternatives': <number> 1
    }
  }

  constructor() { }


  /**
  * Methods
  */


  /**
  * getRoleInfo - returns RoleInfo of the role found by pkEntity.
  *
  * @param  {number} pkEntity pk_entity of the role
  * @return {string}  singular label
  */
  getRoleInfo(pkEntity:number):RoleInfo{

    return this.rolesObject[pkEntity];
  }

  /**
  * getLabelSingular - returns singular label of the role with the provided
  * pkEntity.
  *
  * @param  {number} pkEntity pk_entity of the role
  * @return {string}  singular label
  */
  getLabelSingular(pkEntity:number):string{

    return this.getRoleInfo(pkEntity).label.sg;
  }


  /**
  * getLabelPlural - returns plural label of the role with the provided
  * pkEntity.
  *
  * @param  {number} pkEntity pk_entity of the role
  * @return {string}  plural label
  */
  getLabelPlural(pkEntity:number):string{

    return this.getRoleInfo(pkEntity).label.pl;
  }

  /**
  * getMaxAlternatives - returns number of maxAlternatives allowed for the
  * role found by pk_entity
  *
  * @param  {number} pkEntity pk_entity of the role
  * @return {number} maxAlternatives
  */
  getMaxAlternatives(pkEntity:number):number{

    return this.getRoleInfo(pkEntity).maxAlternatives;
  }



  /**
  * getKindsOfRoles - returns an array of objects that holds the different
  * roles.fk_property as keys and an array of all roles of that key in an
  * array.
  *
  * @param  {InformationRole[]} roles array of InformationRole
  * @return {array}       array of {fkProperty: key, roles: InformationRole[]}
  */

  getKindsOfRoles(roles:InformationRole[]):object[]{

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
      kindsOfRoles.push({fkProperty: key, roles: rolesByKind[key]});
    }
    return kindsOfRoles;
  }



}
