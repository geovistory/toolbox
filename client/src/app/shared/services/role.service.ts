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

export interface KindOfRoles {
  fkProperty: string;
  roles: InformationRole[];
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
  * @param  {InformationRole[]} roles array of InformationRole
  * @return {array}       array of {fkProperty: key, roles: InformationRole[]}
  */

  getRolesPerProperty(roles:InformationRole[]):KindOfRoles[]{

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
