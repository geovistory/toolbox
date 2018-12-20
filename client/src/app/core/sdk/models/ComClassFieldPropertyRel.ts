/* tslint:disable */
import {
  ComClassField,
  DfhProperty
} from '../index';

declare var Object: any;
export interface ComClassFieldPropertyRelInterface {
  "pk_entity"?: number;
  "fk_class_field"?: number;
  "fk_property"?: number;
  "property_is_outgoing"?: boolean;
  "ord_num"?: number;
  class_field?: ComClassField;
  property?: DfhProperty;
}

export class ComClassFieldPropertyRel implements ComClassFieldPropertyRelInterface {
  "pk_entity": number;
  "fk_class_field": number;
  "fk_property": number;
  "property_is_outgoing": boolean;
  "ord_num": number;
  class_field?: ComClassField;
  property?: DfhProperty;
  constructor(data?: ComClassFieldPropertyRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComClassFieldPropertyRel`.
   */
  public static getModelName() {
    return "ComClassFieldPropertyRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComClassFieldPropertyRel for dynamic purposes.
  **/
  public static factory(data: ComClassFieldPropertyRelInterface): ComClassFieldPropertyRel{
    return new ComClassFieldPropertyRel(data);
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
      name: 'ComClassFieldPropertyRel',
      plural: 'ComClassFieldPropertyRels',
      path: 'ComClassFieldPropertyRels',
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
          type: 'ComClassField',
          model: 'ComClassField',
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
          keyTo: 'dfh_pk_property'
        },
      }
    }
  }
}
