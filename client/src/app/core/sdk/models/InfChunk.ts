/* tslint:disable */
import {
  InfEntityProjectRel,
  InfEntityAssociation,
  InfDigitalObject
} from '../index';

declare var Object: any;
export interface InfChunkInterface {
  "fk_digital_object": number;
  "js_quill_data": any;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  entity_version_project_rels?: InfEntityProjectRel[];
  entity_associations?: InfEntityAssociation[];
  digital_object?: InfDigitalObject;
}

export class InfChunk implements InfChunkInterface {
  "fk_digital_object": number;
  "js_quill_data": any;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  entity_version_project_rels?: InfEntityProjectRel[];
  entity_associations?: InfEntityAssociation[];
  digital_object?: InfDigitalObject;
  constructor(data?: InfChunkInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfChunk`.
   */
  public static getModelName() {
    return "InfChunk";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfChunk for dynamic purposes.
  **/
  public static factory(data: InfChunkInterface): InfChunk{
    return new InfChunk(data);
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
      name: 'InfChunk',
      plural: 'InfChunks',
      path: 'InfChunks',
      idName: 'pk_entity',
      properties: {
        "fk_digital_object": {
          name: 'fk_digital_object',
          type: 'number'
        },
        "js_quill_data": {
          name: 'js_quill_data',
          type: 'any'
        },
        "pk_entity": {
          name: 'pk_entity',
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
      },
      relations: {
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'InfEntityProjectRel[]',
          model: 'InfEntityProjectRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        entity_associations: {
          name: 'entity_associations',
          type: 'InfEntityAssociation[]',
          model: 'InfEntityAssociation',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_domain_entity'
        },
        digital_object: {
          name: 'digital_object',
          type: 'InfDigitalObject',
          model: 'InfDigitalObject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_digital_object',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
