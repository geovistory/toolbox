/* tslint:disable */
import {
  ProClassFieldConfig,
  SysClassField,
  ProDfhClassProjRel,
  InfPersistentItem
} from '../index';
import { DfhProperty } from 'app/core/sdk-lb4';

declare var Object: any;
export interface DfhClassInterface {
  "pk_class"?: number;
  "identifier_in_namespace"?: string;
  "basic_type"?: number;
  "profiles"?: Array<any>;
  ingoing_properties?: DfhProperty[];
  outgoing_properties?: DfhProperty[];
  class_field_configs?: ProClassFieldConfig[];
  class_fields?: SysClassField[];
  proj_rels?: ProDfhClassProjRel[];
  persistent_items?: InfPersistentItem[];
}

export class DfhClass implements DfhClassInterface {
  "pk_class": number;
  "identifier_in_namespace": string;
  "basic_type": number;
  "profiles": Array<any>;
  ingoing_properties?: DfhProperty[];
  outgoing_properties?: DfhProperty[];
  class_field_configs?: ProClassFieldConfig[];
  class_fields?: SysClassField[];
  proj_rels?: ProDfhClassProjRel[];
  persistent_items?: InfPersistentItem[];
  constructor(data?: DfhClassInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhClass`.
   */
  public static getModelName() {
    return "DfhClass";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhClass for dynamic purposes.
  **/
  public static factory(data: DfhClassInterface): DfhClass {
    return new DfhClass(data);
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
      name: 'DfhClass',
      plural: 'DfhClasses',
      path: 'DfhClasses',
      idName: 'pk_class',
      properties: {
        "pk_class": {
          name: 'pk_class',
          type: 'number'
        },
        "identifier_in_namespace": {
          name: 'identifier_in_namespace',
          type: 'string'
        },
        "basic_type": {
          name: 'basic_type',
          type: 'number'
        },
        "profiles": {
          name: 'profiles',
          type: 'Array&lt;any&gt;'
        },
      },
      relations: {
        ingoing_properties: {
          name: 'ingoing_properties',
          type: 'DfhProperty[]',
          model: 'DfhProperty',
          relationType: 'hasMany',
          keyFrom: 'pk_class',
          keyTo: 'has_range'
        },
        outgoing_properties: {
          name: 'outgoing_properties',
          type: 'DfhProperty[]',
          model: 'DfhProperty',
          relationType: 'hasMany',
          keyFrom: 'pk_class',
          keyTo: 'has_domain'
        },
        class_field_configs: {
          name: 'class_field_configs',
          type: 'ProClassFieldConfig[]',
          model: 'ProClassFieldConfig',
          relationType: 'hasMany',
          keyFrom: 'pk_class',
          keyTo: 'fk_class_for_class_field'
        },
        class_fields: {
          name: 'class_fields',
          type: 'SysClassField[]',
          model: 'SysClassField',
          relationType: 'hasMany',
          modelThrough: 'ProClassFieldConfig',
          keyThrough: 'fk_class_field',
          keyFrom: 'pk_class',
          keyTo: 'fk_class_for_class_field'
        },
        proj_rels: {
          name: 'proj_rels',
          type: 'ProDfhClassProjRel[]',
          model: 'ProDfhClassProjRel',
          relationType: 'hasMany',
          keyFrom: 'pk_class',
          keyTo: 'fk_class'
        },
        persistent_items: {
          name: 'persistent_items',
          type: 'InfPersistentItem[]',
          model: 'InfPersistentItem',
          relationType: 'hasMany',
          keyFrom: 'pk_class',
          keyTo: 'fk_class'
        },
      }
    }
  }
}
