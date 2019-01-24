/* tslint:disable */
import {
  ComLanguage,
  ComProject
} from '../index';

declare var Object: any;
export interface ComTextPropertyInterface {
  "pk_text_property"?: number;
  "text_property": string;
  "text_property_xml": string;
  "fk_system_type": number;
  "fk_language": string;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "fk_entity"?: number;
  language?: ComLanguage;
  project?: ComProject;
}

export class ComTextProperty implements ComTextPropertyInterface {
  "pk_text_property": number;
  "text_property": string;
  "text_property_xml": string;
  "fk_system_type": number;
  "fk_language": string;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "fk_entity": number;
  language?: ComLanguage;
  project?: ComProject;
  constructor(data?: ComTextPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComTextProperty`.
   */
  public static getModelName() {
    return "ComTextProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComTextProperty for dynamic purposes.
  **/
  public static factory(data: ComTextPropertyInterface): ComTextProperty{
    return new ComTextProperty(data);
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
      name: 'ComTextProperty',
      plural: 'ComTextProperties',
      path: 'ComTextProperties',
      idName: 'pk_text_property',
      properties: {
        "pk_text_property": {
          name: 'pk_text_property',
          type: 'number'
        },
        "text_property": {
          name: 'text_property',
          type: 'string'
        },
        "text_property_xml": {
          name: 'text_property_xml',
          type: 'string'
        },
        "fk_system_type": {
          name: 'fk_system_type',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'string'
        },
        "entity_version": {
          name: 'entity_version',
          type: 'number'
        },
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "tmsp_creation": {
          name: 'tmsp_creation',
          type: 'string'
        },
        "tmsp_last_modification": {
          name: 'tmsp_last_modification',
          type: 'string'
        },
        "sys_period": {
          name: 'sys_period',
          type: 'string'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
        },
      },
      relations: {
        language: {
          name: 'language',
          type: 'ComLanguage',
          model: 'ComLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_language',
          keyTo: 'pk_language'
        },
        project: {
          name: 'project',
          type: 'ComProject',
          model: 'ComProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
