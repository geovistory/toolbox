/* tslint:disable */

declare var Object: any;
export interface DfhProjRelInterface {
  "pk_entity"?: number;
  "fk_entity": number;
  "fk_project": number;
  "is_in_project"?: boolean;
}

export class DfhProjRel implements DfhProjRelInterface {
  "pk_entity": number;
  "fk_entity": number;
  "fk_project": number;
  "is_in_project": boolean;
  constructor(data?: DfhProjRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhProjRel`.
   */
  public static getModelName() {
    return "DfhProjRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhProjRel for dynamic purposes.
  **/
  public static factory(data: DfhProjRelInterface): DfhProjRel{
    return new DfhProjRel(data);
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
      name: 'DfhProjRel',
      plural: 'DfhProjRels',
      path: 'DfhProjRels',
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
