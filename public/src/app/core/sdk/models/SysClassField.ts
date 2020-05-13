/* tslint:disable */
import {
  SysClassFieldPropertyRel,
  ProClassFieldConfig,
  DfhClass
} from '../index';

declare var Object: any;
export interface SysClassFieldInterface {
  "pk_entity"?: number;
  "description"?: string;
  "label"?: string;
  "fk_system_type_ng_component"?: number;
  "used_table"?: string;
  class_field_property_rel?: SysClassFieldPropertyRel[];
  class_field_configs?: ProClassFieldConfig[];
  classes?: DfhClass[];
}

export class SysClassField implements SysClassFieldInterface {
  "pk_entity": number;
  "description": string;
  "label": string;
  "fk_system_type_ng_component": number;
  "used_table": string;
  class_field_property_rel?: SysClassFieldPropertyRel[];
  class_field_configs?: ProClassFieldConfig[];
  classes?: DfhClass[];
  constructor(data?: SysClassFieldInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysClassField`.
   */
  public static getModelName() {
    return "SysClassField";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysClassField for dynamic purposes.
  **/
  public static factory(data: SysClassFieldInterface): SysClassField{
    return new SysClassField(data);
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
      name: 'SysClassField',
      plural: 'SysClassFields',
      path: 'SysClassFields',
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
          type: 'SysClassFieldPropertyRel[]',
          model: 'SysClassFieldPropertyRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_class_field'
        },
        class_field_configs: {
          name: 'class_field_configs',
          type: 'ProClassFieldConfig[]',
          model: 'ProClassFieldConfig',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_class_field'
        },
        classes: {
          name: 'classes',
          type: 'DfhClass[]',
          model: 'DfhClass',
          relationType: 'hasMany',
          modelThrough: 'ProClassFieldConfig',
          keyThrough: 'fk_class_for_class_field',
          keyFrom: 'pk_entity',
          keyTo: 'fk_class_field'
        },
      }
    }
  }
}
