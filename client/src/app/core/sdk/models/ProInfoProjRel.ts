/* tslint:disable */

declare var Object: any;
export interface ProInfoProjRelInterface {
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
  "fk_creator"?: number;
  "fk_last_modifier": number;
}

export class ProInfoProjRel implements ProInfoProjRelInterface {
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
  "fk_creator": number;
  "fk_last_modifier": number;
  constructor(data?: ProInfoProjRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProInfoProjRel`.
   */
  public static getModelName() {
    return "ProInfoProjRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProInfoProjRel for dynamic purposes.
  **/
  public static factory(data: ProInfoProjRelInterface): ProInfoProjRel{
    return new ProInfoProjRel(data);
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
      name: 'ProInfoProjRel',
      plural: 'ProInfoProjRels',
      path: 'ProInfoProjRels',
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
        "fk_creator": {
          name: 'fk_creator',
          type: 'number'
        },
        "fk_last_modifier": {
          name: 'fk_last_modifier',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
