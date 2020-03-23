/* tslint:disable */
import {
  DatNamespace
} from '../index';

declare var Object: any;
export interface DatTextPropertyInterface {
  "string"?: string;
  "quill_doc"?: any;
  "fk_system_type"?: number;
  "fk_language"?: number;
  "fk_entity"?: number;
  "pk_entity"?: number;
  "fk_namespace"?: number;
  namespace?: DatNamespace;
}

export class DatTextProperty implements DatTextPropertyInterface {
  "string": string;
  "quill_doc": any;
  "fk_system_type": number;
  "fk_language": number;
  "fk_entity": number;
  "pk_entity": number;
  "fk_namespace": number;
  namespace?: DatNamespace;
  constructor(data?: DatTextPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DatTextProperty`.
   */
  public static getModelName() {
    return "DatTextProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DatTextProperty for dynamic purposes.
  **/
  public static factory(data: DatTextPropertyInterface): DatTextProperty{
    return new DatTextProperty(data);
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
      name: 'DatTextProperty',
      plural: 'DatTextProperties',
      path: 'DatTextProperties',
      idName: 'pk_entity',
      properties: {
        "string": {
          name: 'string',
          type: 'string'
        },
        "quill_doc": {
          name: 'quill_doc',
          type: 'any'
        },
        "fk_system_type": {
          name: 'fk_system_type',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'number'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
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
