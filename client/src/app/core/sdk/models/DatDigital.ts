/* tslint:disable */
import {
  DatChunk
} from '../index';

declare var Object: any;
export interface DatDigitalInterface {
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "js_quill_data": any;
  "pk_entity"?: number;
  "entity_version"?: number;
  chunks?: DatChunk[];
}

export class DatDigital implements DatDigitalInterface {
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "js_quill_data": any;
  "pk_entity": number;
  "entity_version": number;
  chunks?: DatChunk[];
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
        chunks: {
          name: 'chunks',
          type: 'DatChunk[]',
          model: 'DatChunk',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_digital_object'
        },
      }
    }
  }
}
