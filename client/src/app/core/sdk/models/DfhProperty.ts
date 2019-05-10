/* tslint:disable */
import {
  DfhClass,
  DfhLabel,
  DfhTextProperty,
  DfhPropertyProfileView,
  ProClassFieldConfig,
  ProDfhClassProjRel
} from '../index';

declare var Object: any;
export interface DfhPropertyInterface {
  "dfh_pk_property": number;
  "dfh_identifier_in_namespace"?: string;
  "dfh_has_domain": number;
  "dfh_has_range": number;
  "dfh_creation_time"?: Date;
  "dfh_modification_time"?: Date;
  "dfh_standard_label"?: string;
  "dfh_fk_property_of_origin"?: number;
  "dfh_domain_instances_min_quantifier"?: number;
  "dfh_domain_instances_max_quantifier"?: number;
  "dfh_range_instances_min_quantifier"?: number;
  "dfh_range_instances_max_quantifier"?: number;
  "identity_defining"?: boolean;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  domain_class?: DfhClass;
  range_class?: DfhClass;
  labels?: DfhLabel[];
  text_properties?: DfhTextProperty[];
  property_profile_view?: DfhPropertyProfileView[];
  class_field_config?: ProClassFieldConfig[];
  proj_rels?: ProDfhClassProjRel[];
}

export class DfhProperty implements DfhPropertyInterface {
  "dfh_pk_property": number;
  "dfh_identifier_in_namespace": string;
  "dfh_has_domain": number;
  "dfh_has_range": number;
  "dfh_creation_time": Date;
  "dfh_modification_time": Date;
  "dfh_standard_label": string;
  "dfh_fk_property_of_origin": number;
  "dfh_domain_instances_min_quantifier": number;
  "dfh_domain_instances_max_quantifier": number;
  "dfh_range_instances_min_quantifier": number;
  "dfh_range_instances_max_quantifier": number;
  "identity_defining": boolean;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  domain_class?: DfhClass;
  range_class?: DfhClass;
  labels?: DfhLabel[];
  text_properties?: DfhTextProperty[];
  property_profile_view?: DfhPropertyProfileView[];
  class_field_config?: ProClassFieldConfig[];
  proj_rels?: ProDfhClassProjRel[];
  constructor(data?: DfhPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhProperty`.
   */
  public static getModelName() {
    return "DfhProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhProperty for dynamic purposes.
  **/
  public static factory(data: DfhPropertyInterface): DfhProperty{
    return new DfhProperty(data);
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
      name: 'DfhProperty',
      plural: 'DfhProperties',
      path: 'DfhProperties',
      idName: 'dfh_pk_property',
      properties: {
        "dfh_pk_property": {
          name: 'dfh_pk_property',
          type: 'number'
        },
        "dfh_identifier_in_namespace": {
          name: 'dfh_identifier_in_namespace',
          type: 'string'
        },
        "dfh_has_domain": {
          name: 'dfh_has_domain',
          type: 'number'
        },
        "dfh_has_range": {
          name: 'dfh_has_range',
          type: 'number'
        },
        "dfh_creation_time": {
          name: 'dfh_creation_time',
          type: 'Date'
        },
        "dfh_modification_time": {
          name: 'dfh_modification_time',
          type: 'Date'
        },
        "dfh_standard_label": {
          name: 'dfh_standard_label',
          type: 'string'
        },
        "dfh_fk_property_of_origin": {
          name: 'dfh_fk_property_of_origin',
          type: 'number'
        },
        "dfh_domain_instances_min_quantifier": {
          name: 'dfh_domain_instances_min_quantifier',
          type: 'number'
        },
        "dfh_domain_instances_max_quantifier": {
          name: 'dfh_domain_instances_max_quantifier',
          type: 'number'
        },
        "dfh_range_instances_min_quantifier": {
          name: 'dfh_range_instances_min_quantifier',
          type: 'number'
        },
        "dfh_range_instances_max_quantifier": {
          name: 'dfh_range_instances_max_quantifier',
          type: 'number'
        },
        "identity_defining": {
          name: 'identity_defining',
          type: 'boolean'
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
        domain_class: {
          name: 'domain_class',
          type: 'DfhClass',
          model: 'DfhClass',
          relationType: 'belongsTo',
                  keyFrom: 'dfh_has_domain',
          keyTo: 'dfh_pk_class'
        },
        range_class: {
          name: 'range_class',
          type: 'DfhClass',
          model: 'DfhClass',
          relationType: 'belongsTo',
                  keyFrom: 'dfh_has_range',
          keyTo: 'dfh_pk_class'
        },
        labels: {
          name: 'labels',
          type: 'DfhLabel[]',
          model: 'DfhLabel',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_property',
          keyTo: 'dfh_fk_property'
        },
        text_properties: {
          name: 'text_properties',
          type: 'DfhTextProperty[]',
          model: 'DfhTextProperty',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_property',
          keyTo: 'dfh_fk_property'
        },
        property_profile_view: {
          name: 'property_profile_view',
          type: 'DfhPropertyProfileView[]',
          model: 'DfhPropertyProfileView',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_property',
          keyTo: 'dfh_pk_property'
        },
        class_field_config: {
          name: 'class_field_config',
          type: 'ProClassFieldConfig[]',
          model: 'ProClassFieldConfig',
          relationType: 'hasMany',
                  keyFrom: 'dfh_pk_property',
          keyTo: 'fk_property'
        },
        proj_rels: {
          name: 'proj_rels',
          type: 'ProDfhClassProjRel[]',
          model: 'ProDfhClassProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
      }
    }
  }
}
