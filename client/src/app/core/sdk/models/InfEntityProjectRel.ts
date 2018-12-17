/* tslint:disable */

declare var Object: any;
export interface InfEntityProjectRelInterface {
  "pk_entity_version_project_rel"?: number;
  "pk_entity"?: number;
  "fk_project": number;
  "fk_entity"?: number;
  "fk_entity_version"?: string;
  "fk_entity_version_concat"?: string;
  "is_in_project"?: boolean;
  "is_standard_in_project"?: boolean;
  "calendar"?: string;
  "ord_num"?: number;
  "tmsp_last_modification"?: string;
}

export class InfEntityProjectRel implements InfEntityProjectRelInterface {
  "pk_entity_version_project_rel": number;
  "pk_entity": number;
  "fk_project": number;
  "fk_entity": number;
  "fk_entity_version": string;
  "fk_entity_version_concat": string;
  "is_in_project": boolean;
  "is_standard_in_project": boolean;
  "calendar": string;
  "ord_num": number;
  "tmsp_last_modification": string;
  constructor(data?: InfEntityProjectRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfEntityProjectRel`.
   */
  public static getModelName() {
    return "InfEntityProjectRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfEntityProjectRel for dynamic purposes.
  **/
  public static factory(data: InfEntityProjectRelInterface): InfEntityProjectRel{
    return new InfEntityProjectRel(data);
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
      name: 'InfEntityProjectRel',
      plural: 'InfEntityProjectRels',
      path: 'InfEntityProjectRels',
      idName: 'pk_entity_version_project_rel',
      properties: {
        "pk_entity_version_project_rel": {
          name: 'pk_entity_version_project_rel',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
        },
        "fk_entity_version": {
          name: 'fk_entity_version',
          type: 'string'
        },
        "fk_entity_version_concat": {
          name: 'fk_entity_version_concat',
          type: 'string'
        },
        "is_in_project": {
          name: 'is_in_project',
          type: 'boolean'
        },
        "is_standard_in_project": {
          name: 'is_standard_in_project',
          type: 'boolean'
        },
        "calendar": {
          name: 'calendar',
          type: 'string'
        },
        "ord_num": {
          name: 'ord_num',
          type: 'number'
        },
        "tmsp_last_modification": {
          name: 'tmsp_last_modification',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
