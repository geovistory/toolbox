/* tslint:disable */
import {
  InfEntityAssociation
} from '../index';

declare var Object: any;
export interface DatChunkInterface {
  "quill_doc"?: any;
  "string"?: string;
  "fk_text": number;
  "fk_entity_version": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "fk_digital"?: number;
  data_info_association?: InfEntityAssociation[];
}

export class DatChunk implements DatChunkInterface {
  "quill_doc": any;
  "string": string;
  "fk_text": number;
  "fk_entity_version": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "fk_digital": number;
  data_info_association?: InfEntityAssociation[];
  constructor(data?: DatChunkInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DatChunk`.
   */
  public static getModelName() {
    return "DatChunk";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DatChunk for dynamic purposes.
  **/
  public static factory(data: DatChunkInterface): DatChunk{
    return new DatChunk(data);
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
      name: 'DatChunk',
      plural: 'DatChunks',
      path: 'DatChunks',
      idName: 'pk_entity',
      properties: {
        "quill_doc": {
          name: 'quill_doc',
          type: 'any'
        },
        "string": {
          name: 'string',
          type: 'string'
        },
        "fk_text": {
          name: 'fk_text',
          type: 'number'
        },
        "fk_entity_version": {
          name: 'fk_entity_version',
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
        "fk_digital": {
          name: 'fk_digital',
          type: 'number'
        },
      },
      relations: {
        data_info_association: {
          name: 'data_info_association',
          type: 'InfEntityAssociation[]',
          model: 'InfEntityAssociation',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_info_domain'
        },
      }
    }
  }
}
