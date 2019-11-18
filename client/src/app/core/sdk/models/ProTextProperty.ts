/* tslint:disable */
import {
  ProProject,
  InfLanguage,
  SysSystemType
} from '../index';

declare var Object: any;
export interface ProTextPropertyInterface {
  "string": string;
  "quill_doc": string;
  "fk_system_type": number;
  "fk_language": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "fk_entity"?: number;
  project?: ProProject;
  language?: InfLanguage;
  systemType?: SysSystemType;
}

export class ProTextProperty implements ProTextPropertyInterface {
  "string": string;
  "quill_doc": string;
  "fk_system_type": number;
  "fk_language": number;
  "pk_entity": number;
  "entity_version": number;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "fk_entity": number;
  project?: ProProject;
  language?: InfLanguage;
  systemType?: SysSystemType;
  constructor(data?: ProTextPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProTextProperty`.
   */
  public static getModelName() {
    return "ProTextProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProTextProperty for dynamic purposes.
  **/
  public static factory(data: ProTextPropertyInterface): ProTextProperty{
    return new ProTextProperty(data);
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
      name: 'ProTextProperty',
      plural: 'ProTextProperties',
      path: 'ProTextProperties',
      idName: 'pk_entity',
      properties: {
        "string": {
          name: 'string',
          type: 'string'
        },
        "quill_doc": {
          name: 'quill_doc',
          type: 'string'
        },
        "fk_system_type": {
          name: 'fk_system_type',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
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
        "tmsp_last_modification": {
          name: 'tmsp_last_modification',
          type: 'string'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
        },
      },
      relations: {
        project: {
          name: 'project',
          type: 'ProProject',
          model: 'ProProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        language: {
          name: 'language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_language',
          keyTo: 'pk_entity'
        },
        systemType: {
          name: 'systemType',
          type: 'SysSystemType',
          model: 'SysSystemType',
          relationType: 'belongsTo',
                  keyFrom: 'fk_system_type',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
