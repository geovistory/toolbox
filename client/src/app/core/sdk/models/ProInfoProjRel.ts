/* tslint:disable */

declare var Object: any;
export interface ProInfoProjRelInterface {
  "fk_project": number;
  "fk_entity"?: number;
  "fk_entity_version"?: string;
  "fk_entity_version_concat"?: string;
  "is_in_project"?: boolean;
  "is_standard_in_project"?: boolean;
  "calendar"?: string;
  "ord_num_of_domain"?: number;
  "ord_num_of_range"?: number;
  "ord_num_of_text_property"?: number;
  "tmsp_last_modification"?: string;
  "fk_creator"?: number;
  "fk_last_modifier": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "tmsp_creation"?: string;
}

export class ProInfoProjRel implements ProInfoProjRelInterface {
  "fk_project": number;
  "fk_entity"?: number;
  "fk_entity_version"?: string;
  "fk_entity_version_concat"?: string;
  "is_in_project"?: boolean;
  "is_standard_in_project"?: boolean;
  "calendar"?: string;
  "ord_num_of_domain"?: number;
  "ord_num_of_range"?: number;
  "ord_num_of_text_property"?: number;
  "tmsp_last_modification"?: string;
  "fk_creator"?: number;
  "fk_last_modifier": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "tmsp_creation"?: string;
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
  public static factory(data: ProInfoProjRelInterface): ProInfoProjRel {
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
      idName: 'pk_entity',
      properties: {
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
        "ord_num_of_domain": {
          name: 'ord_num_of_domain',
          type: 'number'
        },
        "ord_num_of_range": {
          name: 'ord_num_of_range',
          type: 'number'
        },
        "ord_num_of_text_property": {
          name: 'ord_num_of_text_property',
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
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "entity_version": {
          name: 'entity_version',
          type: 'number'
        },
        "tmsp_creation": {
          name: 'tmsp_creation',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
