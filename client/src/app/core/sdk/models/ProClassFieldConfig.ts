/* tslint:disable */
import {
  SysAppContext,
  DfhProperty,
  SysClassField,
  ProProject
} from '../index';

declare var Object: any;
export interface ProClassFieldConfigInterface {
  "pk_entity"?: number;
  "fk_app_context": number;
  "fk_project"?: number;
  "fk_class"?: number;
  "fk_property"?: number;
  "fk_class_field"?: number;
  "property_is_outgoing"?: boolean;
  "ord_num"?: number;
  "fk_class_for_class_field"?: number;
  app_context?: SysAppContext;
  property?: DfhProperty;
  class_field?: SysClassField;
  project?: ProProject;
}

export class ProClassFieldConfig implements ProClassFieldConfigInterface {
  "pk_entity": number;
  "fk_app_context": number;
  "fk_project": number;
  "fk_class": number;
  "fk_property": number;
  "fk_class_field": number;
  "property_is_outgoing": boolean;
  "ord_num": number;
  "fk_class_for_class_field": number;
  app_context?: SysAppContext;
  property?: DfhProperty;
  class_field?: SysClassField;
  project?: ProProject;
  constructor(data?: ProClassFieldConfigInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProClassFieldConfig`.
   */
  public static getModelName() {
    return "ProClassFieldConfig";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProClassFieldConfig for dynamic purposes.
  **/
  public static factory(data: ProClassFieldConfigInterface): ProClassFieldConfig{
    return new ProClassFieldConfig(data);
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
      name: 'ProClassFieldConfig',
      plural: 'ProClassFieldConfigs',
      path: 'ProClassFieldConfigs',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_app_context": {
          name: 'fk_app_context',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_class": {
          name: 'fk_class',
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
        app_context: {
          name: 'app_context',
          type: 'SysAppContext',
          model: 'SysAppContext',
          relationType: 'belongsTo',
                  keyFrom: 'fk_app_context',
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
          type: 'SysClassField',
          model: 'SysClassField',
          relationType: 'belongsTo',
                  keyFrom: 'fk_class_field',
          keyTo: 'pk_entity'
        },
        project: {
          name: 'project',
          type: 'ProProject',
          model: 'ProProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
