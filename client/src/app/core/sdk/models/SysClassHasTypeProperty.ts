/* tslint:disable */

declare var Object: any;
export interface SysClassHasTypePropertyInterface {
  "fk_class"?: number;
  "fk_property"?: number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
}

export class SysClassHasTypeProperty implements SysClassHasTypePropertyInterface {
  "fk_class": number;
  "fk_property": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  constructor(data?: SysClassHasTypePropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysClassHasTypeProperty`.
   */
  public static getModelName() {
    return "SysClassHasTypeProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysClassHasTypeProperty for dynamic purposes.
  **/
  public static factory(data: SysClassHasTypePropertyInterface): SysClassHasTypeProperty{
    return new SysClassHasTypeProperty(data);
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
      name: 'SysClassHasTypeProperty',
      plural: 'SysClassHasTypeProperties',
      path: 'SysClassHasTypeProperties',
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
