/* tslint:disable */
import {
  InfEntityProjectRel,
  InfChunk
} from '../index';

declare var Object: any;
export interface InfDigitalObjectInterface {
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "js_quill_data": any;
  "pk_entity_version_concat"?: string;
  "pk_entity"?: number;
  "entity_version"?: number;
  entity_version_project_rels?: InfEntityProjectRel[];
  chunks?: InfChunk[];
}

export class InfDigitalObject implements InfDigitalObjectInterface {
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "js_quill_data": any;
  "pk_entity_version_concat": string;
  "pk_entity": number;
  "entity_version": number;
  entity_version_project_rels?: InfEntityProjectRel[];
  chunks?: InfChunk[];
  constructor(data?: InfDigitalObjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfDigitalObject`.
   */
  public static getModelName() {
    return "InfDigitalObject";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfDigitalObject for dynamic purposes.
  **/
  public static factory(data: InfDigitalObjectInterface): InfDigitalObject{
    return new InfDigitalObject(data);
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
      name: 'InfDigitalObject',
      plural: 'InfDigitalObjects',
      path: 'InfDigitalObjects',
      idName: 'pk_entity_version_concat',
      properties: {
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
        "js_quill_data": {
          name: 'js_quill_data',
          type: 'any'
        },
        "pk_entity_version_concat": {
          name: 'pk_entity_version_concat',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "entity_version": {
          name: 'entity_version',
          type: 'number'
        },
      },
      relations: {
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'InfEntityProjectRel[]',
          model: 'InfEntityProjectRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity_version_concat',
          keyTo: 'fk_entity_version_concat'
        },
        chunks: {
          name: 'chunks',
          type: 'InfChunk[]',
          model: 'InfChunk',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_digital_object'
        },
      }
    }
  }
}
