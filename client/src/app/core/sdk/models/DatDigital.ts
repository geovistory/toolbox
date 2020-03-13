/* tslint:disable */
import {
  DatNamespace
} from '../index';

declare var Object: any;
export interface DatDigitalInterface {
  "entity_version"?: number;
  "pk_text"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "quill_doc"?: any;
  "string"?: string;
  "pk_entity"?: number;
  "fk_namespace"?: number;
  namespace?: DatNamespace;
}

export class DatDigital implements DatDigitalInterface {
  "entity_version": number;
  "pk_text": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "quill_doc": any;
  "string": string;
  "pk_entity": number;
  "fk_namespace": number;
  namespace?: DatNamespace;
  constructor(data?: DatDigitalInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DatDigital`.
   */
  public static getModelName() {
    return "DatDigital";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DatDigital for dynamic purposes.
  **/
  public static factory(data: DatDigitalInterface): DatDigital{
    return new DatDigital(data);
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
      name: 'DatDigital',
      plural: 'DatDigitals',
      path: 'DatDigitals',
      idName: 'pk_entity',
      properties: {
        "entity_version": {
          name: 'entity_version',
          type: 'number'
        },
        "pk_text": {
          name: 'pk_text',
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
        "quill_doc": {
          name: 'quill_doc',
          type: 'any'
        },
        "string": {
          name: 'string',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_namespace": {
          name: 'fk_namespace',
          type: 'number'
        },
      },
      relations: {
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
