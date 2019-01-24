/* tslint:disable */
import {
  ComClassFieldPropertyRel,
  ComLabel,
  ComUiContextConfig,
  DfhClass
} from '../index';

declare var Object: any;
export interface ComClassFieldInterface {
  "pk_entity"?: number;
  "description"?: string;
  "label"?: string;
  "fk_system_type_ng_component"?: number;
  "used_table"?: string;
  class_field_property_rel?: ComClassFieldPropertyRel[];
  labels?: ComLabel[];
  ui_context_configs?: ComUiContextConfig[];
  classes?: DfhClass[];
}

export class ComClassField implements ComClassFieldInterface {
  "pk_entity": number;
  "description": string;
  "label": string;
  "fk_system_type_ng_component": number;
  "used_table": string;
  class_field_property_rel?: ComClassFieldPropertyRel[];
  labels?: ComLabel[];
  ui_context_configs?: ComUiContextConfig[];
  classes?: DfhClass[];
  constructor(data?: ComClassFieldInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComClassField`.
   */
  public static getModelName() {
    return "ComClassField";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComClassField for dynamic purposes.
  **/
  public static factory(data: ComClassFieldInterface): ComClassField{
    return new ComClassField(data);
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
      name: 'ComClassField',
      plural: 'ComClassFields',
      path: 'ComClassFields',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string'
        },
        "fk_system_type_ng_component": {
          name: 'fk_system_type_ng_component',
          type: 'number'
        },
        "used_table": {
          name: 'used_table',
          type: 'string'
        },
      },
      relations: {
        class_field_property_rel: {
          name: 'class_field_property_rel',
          type: 'ComClassFieldPropertyRel[]',
          model: 'ComClassFieldPropertyRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_class_field'
        },
        labels: {
          name: 'labels',
          type: 'ComLabel[]',
          model: 'ComLabel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        ui_context_configs: {
          name: 'ui_context_configs',
          type: 'ComUiContextConfig[]',
          model: 'ComUiContextConfig',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_class_field'
        },
        classes: {
          name: 'classes',
          type: 'DfhClass[]',
          model: 'DfhClass',
          relationType: 'hasMany',
          modelThrough: 'ComUiContextConfig',
          keyThrough: 'fk_class_for_class_field',
          keyFrom: 'pk_entity',
          keyTo: 'fk_class_field'
        },
      }
    }
  }
}
