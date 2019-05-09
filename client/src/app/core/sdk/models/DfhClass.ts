/* tslint:disable */
import {
  InfPersistentItem,
  DfhProperty,
  DfhLabel,
  DfhTextProperty,
  DfhClassProfileView,
  ProClassFieldConfig,
  SysClassField,
  DfhProjRel
} from '../index';

declare var Object: any;
export interface DfhClassInterface {
  "dfh_pk_class"?: number;
  "dfh_identifier_in_namespace"?: string;
  "dfh_standard_label"?: string;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  persistent_items?: InfPersistentItem[];
  ingoing_properties?: DfhProperty[];
  outgoing_properties?: DfhProperty[];
  labels?: DfhLabel[];
  text_properties?: DfhTextProperty[];
  class_profile_view?: DfhClassProfileView[];
  class_field_configs?: ProClassFieldConfig[];
  class_fields?: SysClassField[];
  proj_rels?: DfhProjRel[];
}

export class DfhClass implements DfhClassInterface {
  "dfh_pk_class": number;
  "dfh_identifier_in_namespace": string;
  "dfh_standard_label": string;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  persistent_items?: InfPersistentItem[];
  ingoing_properties?: DfhProperty[];
  outgoing_properties?: DfhProperty[];
  labels?: DfhLabel[];
  text_properties?: DfhTextProperty[];
  class_profile_view?: DfhClassProfileView[];
  class_field_configs?: ProClassFieldConfig[];
  class_fields?: SysClassField[];
  proj_rels?: DfhProjRel[];
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
  public static factory(data: DfhClassInterface): DfhClass{
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
      idName: 'dfh_pk_class',
      properties: {
        "dfh_pk_class": {
          name: 'dfh_pk_class',
          type: 'number'
        },
        "dfh_identifier_in_namespace": {
          name: 'dfh_identifier_in_namespace',
          type: 'string'
        },
        "dfh_standard_label": {
          name: 'dfh_standard_label',
          type: 'string'
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
        persistent_items: {
          name: 'persistent_items',
          type: 'InfPersistentItem[]',
          model: 'InfPersistentItem',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'fk_class'
        },
        ingoing_properties: {
          name: 'ingoing_properties',
          type: 'DfhProperty[]',
          model: 'DfhProperty',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'dfh_has_range'
        },
        outgoing_properties: {
          name: 'outgoing_properties',
          type: 'DfhProperty[]',
          model: 'DfhProperty',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'dfh_has_domain'
        },
        labels: {
          name: 'labels',
          type: 'DfhLabel[]',
          model: 'DfhLabel',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'dfh_fk_class'
        },
        text_properties: {
          name: 'text_properties',
          type: 'DfhTextProperty[]',
          model: 'DfhTextProperty',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'dfh_fk_class'
        },
        class_profile_view: {
          name: 'class_profile_view',
          type: 'DfhClassProfileView[]',
          model: 'DfhClassProfileView',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'dfh_fk_class'
        },
        ui_context_configs: {
          name: 'ui_context_configs',
          type: 'ComUiContextConfig[]',
          model: 'ComUiContextConfig',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_class',
          keyTo: 'fk_class_for_class_field'
        },
        class_fields: {
          name: 'class_fields',
          type: 'ComClassField[]',
          model: 'ComClassField',
          relationType: 'hasMany',
          modelThrough: 'ComUiContextConfig',
          keyThrough: 'fk_class_field',
          keyFrom: 'dfh_pk_class',
          keyTo: 'fk_class_for_class_field'
        },
        proj_rels: {
          name: 'proj_rels',
          type: 'DfhProjRel[]',
          model: 'DfhProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
      }
    }
  }
}
