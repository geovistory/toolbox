/* tslint:disable */

declare var Object: any;
export interface ComClassHasTypePropertyInterface {
  "fk_class"?: number;
  "fk_property"?: number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
}

export class ComClassHasTypeProperty implements ComClassHasTypePropertyInterface {
  "fk_class": number;
  "fk_property": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  constructor(data?: ComClassHasTypePropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComClassHasTypeProperty`.
   */
  public static getModelName() {
    return "ComClassHasTypeProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComClassHasTypeProperty for dynamic purposes.
  **/
  public static factory(data: ComClassHasTypePropertyInterface): ComClassHasTypeProperty{
    return new ComClassHasTypeProperty(data);
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
      name: 'ComClassHasTypeProperty',
      plural: 'ComClassHasTypeProperties',
      path: 'ComClassHasTypeProperties',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "fk_property": {
          name: 'fk_property',
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
      },
      relations: {
      }
    }
  }
}
