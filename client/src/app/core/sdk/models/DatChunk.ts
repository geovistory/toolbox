/* tslint:disable */
import {
  DatDigital,
  InfRole,
  DatNamespace
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
  "fk_namespace"?: number;
  digital?: DatDigital;
  subject_of_roles?: InfRole[];
  namespace?: DatNamespace;
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
  "fk_namespace": number;
  digital?: DatDigital;
  subject_of_roles?: InfRole[];
  namespace?: DatNamespace;
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
        "fk_namespace": {
          name: 'fk_namespace',
          type: 'number'
        },
      },
      relations: {
        digital: {
          name: 'digital',
          type: 'DatDigital',
          model: 'DatDigital',
          relationType: 'belongsTo',
                  keyFrom: 'fk_text',
          keyTo: 'pk_text'
        },
        subject_of_roles: {
          name: 'subject_of_roles',
          type: 'InfRole[]',
          model: 'InfRole',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_data_subject'
        },
        namespace: {
          name: 'namespace',
          type: 'DatNamespace',
          model: 'DatNamespace',
          relationType: 'belongsTo',
                  keyFrom: 'fk_namespace',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
