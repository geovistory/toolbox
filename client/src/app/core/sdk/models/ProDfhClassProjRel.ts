/* tslint:disable */

declare var Object: any;
export interface ProDfhClassProjRelInterface {
  "pk_entity"?: number;
  "fk_entity": number;
  "fk_project": number;
  "enabled_in_entities"?: boolean;
}

export class ProDfhClassProjRel implements ProDfhClassProjRelInterface {
  "pk_entity": number;
  "fk_entity": number;
  "fk_project": number;
  "enabled_in_entities": boolean;
  constructor(data?: ProDfhClassProjRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProDfhClassProjRel`.
   */
  public static getModelName() {
    return "ProDfhClassProjRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProDfhClassProjRel for dynamic purposes.
  **/
  public static factory(data: ProDfhClassProjRelInterface): ProDfhClassProjRel{
    return new ProDfhClassProjRel(data);
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
      name: 'ProDfhClassProjRel',
      plural: 'ProDfhClassProjRels',
      path: 'ProDfhClassProjRels',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "is_in_project": {
          name: 'is_in_project',
          type: 'boolean'
        },
      },
      relations: {
      }
    }
  }
}
