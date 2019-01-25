/* tslint:disable */
import {
  ComUiContext,
  DfhProperty,
  ComClassField,
  ComProject
} from '../index';

declare var Object: any;
export interface ComUiContextConfigInterface {
  "pk_entity"?: number;
  "fk_ui_context": number;
  "fk_project"?: number;
  "fk_property"?: number;
  "fk_class_field"?: number;
  "property_is_outgoing"?: boolean;
  "ord_num"?: number;
  "fk_class_for_class_field"?: number;
  ui_context?: ComUiContext;
  property?: DfhProperty;
  class_field?: ComClassField;
  project?: ComProject;
}

export class ComUiContextConfig implements ComUiContextConfigInterface {
  "pk_entity": number;
  "fk_ui_context": number;
  "fk_project": number;
  "fk_property": number;
  "fk_class_field": number;
  "property_is_outgoing": boolean;
  "ord_num": number;
  "fk_class_for_class_field": number;
  ui_context?: ComUiContext;
  property?: DfhProperty;
  class_field?: ComClassField;
  project?: ComProject;
  constructor(data?: ComUiContextConfigInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComUiContextConfig`.
   */
  public static getModelName() {
    return "ComUiContextConfig";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComUiContextConfig for dynamic purposes.
  **/
  public static factory(data: ComUiContextConfigInterface): ComUiContextConfig{
    return new ComUiContextConfig(data);
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
      name: 'ComUiContextConfig',
      plural: 'ComUiContextConfigs',
      path: 'ComUiContextConfigs',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_ui_context": {
          name: 'fk_ui_context',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "fk_class_field": {
          name: 'fk_class_field',
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
        "fk_class_for_class_field": {
          name: 'fk_class_for_class_field',
          type: 'number'
        },
      },
      relations: {
        ui_context: {
          name: 'ui_context',
          type: 'ComUiContext',
          model: 'ComUiContext',
          relationType: 'belongsTo',
                  keyFrom: 'fk_ui_context',
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
        class_field: {
          name: 'class_field',
          type: 'ComClassField',
          model: 'ComClassField',
          relationType: 'belongsTo',
                  keyFrom: 'fk_class_field',
          keyTo: 'pk_entity'
        },
        project: {
          name: 'project',
          type: 'ComProject',
          model: 'ComProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_project'
        },
      }
    }
  }
}
