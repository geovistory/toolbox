/* tslint:disable */

declare var Object: any;
export interface ProDfhProfileProjRelInterface {
  "pk_entity"?: number;
  "fk_profile": number;
  "fk_project": number;
  "enabled"?: boolean;
}

export class ProDfhProfileProjRel implements ProDfhProfileProjRelInterface {
  "pk_entity": number;
  "fk_profile": number;
  "fk_project": number;
  "enabled": boolean;
  constructor(data?: ProDfhProfileProjRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProDfhProfileProjRel`.
   */
  public static getModelName() {
    return "ProDfhProfileProjRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProDfhProfileProjRel for dynamic purposes.
  **/
  public static factory(data: ProDfhProfileProjRelInterface): ProDfhProfileProjRel{
    return new ProDfhProfileProjRel(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ProDfhProfileProjRel',
      plural: 'ProDfhProfileProjRels',
      path: 'ProDfhProfileProjRels',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_profile": {
          name: 'fk_profile',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "enabled": {
          name: 'enabled',
          type: 'boolean'
        },
      },
      relations: {
      }
    }
  }
}
