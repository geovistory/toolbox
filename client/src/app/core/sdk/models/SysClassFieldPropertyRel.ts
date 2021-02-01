/* tslint:disable */
import {
  SysClassField,
  // DfhProperty
} from '../index';

declare var Object: any;
export interface SysClassFieldPropertyRelInterface {
  "pk_entity"?: number;
  "fk_class_field"?: number;
  "fk_property"?: number;
  "property_is_outgoing"?: boolean;
  "ord_num"?: number;
  class_field?: SysClassField;
  // property?: DfhProperty;
}

export class SysClassFieldPropertyRel implements SysClassFieldPropertyRelInterface {
  "pk_entity": number;
  "fk_class_field": number;
  "fk_property": number;
  "property_is_outgoing": boolean;
  "ord_num": number;
  class_field?: SysClassField;
  // property?: DfhProperty;
  constructor(data?: SysClassFieldPropertyRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysClassFieldPropertyRel`.
   */
  public static getModelName() {
    return "SysClassFieldPropertyRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysClassFieldPropertyRel for dynamic purposes.
  **/
  public static factory(data: SysClassFieldPropertyRelInterface): SysClassFieldPropertyRel {
    return new SysClassFieldPropertyRel(data);
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
      name: 'SysClassFieldPropertyRel',
      plural: 'SysClassFieldPropertyRels',
      path: 'SysClassFieldPropertyRels',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_class_field": {
          name: 'fk_class_field',
          type: 'number'
        },
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "property_is_outgoing": {
          name: 'property_is_outgoing',
          type: 'boolean'
        },
        "ord_num": {
          name: 'ord_num',
          type: 'number'
        },
      },
      relations: {
        class_field: {
          name: 'class_field',
          type: 'SysClassField',
          model: 'SysClassField',
          relationType: 'belongsTo',
          keyFrom: 'fk_class_field',
          keyTo: 'pk_entity'
        },
        property: {
          name: 'property',
          type: 'DfhProperty',
          model: 'DfhProperty',
          relationType: 'belongsTo',
          keyFrom: 'fk_property',
          keyTo: 'pk_property'
        },
      }
    }
  }
}
