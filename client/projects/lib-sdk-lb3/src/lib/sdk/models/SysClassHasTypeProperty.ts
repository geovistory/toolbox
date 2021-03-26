/* tslint:disable */

declare var Object: any;
export interface SysClassHasTypePropertyInterface {
  "pk_typed_class"?: number;
  "typed_class_label"?: string;
  "dfh_pk_property"?: number;
  "property_label"?: string;
  "pk_type_class"?: number;
  "type_class_label"?: string;
  "pk_entity"?: number;
}

export class SysClassHasTypeProperty implements SysClassHasTypePropertyInterface {
  "pk_typed_class": number;
  "typed_class_label": string;
  "dfh_pk_property": number;
  "property_label": string;
  "pk_type_class": number;
  "type_class_label": string;
  "pk_entity": number;
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
        "pk_typed_class": {
          name: 'pk_typed_class',
          type: 'number'
        },
        "typed_class_label": {
          name: 'typed_class_label',
          type: 'string'
        },
        "dfh_pk_property": {
          name: 'dfh_pk_property',
          type: 'number'
        },
        "property_label": {
          name: 'property_label',
          type: 'string'
        },
        "pk_type_class": {
          name: 'pk_type_class',
          type: 'number'
        },
        "type_class_label": {
          name: 'type_class_label',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
