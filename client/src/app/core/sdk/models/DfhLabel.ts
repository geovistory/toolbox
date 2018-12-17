/* tslint:disable */
import {
  DfhProjRel
} from '../index';

declare var Object: any;
export interface DfhLabelInterface {
  "pk_entity"?: number;
  "dfh_pk_label"?: number;
  "dfh_label": string;
  "dfh_language_iso_code"?: string;
  "dfh_is_standard_label_for_language"?: boolean;
  "dfh_fk_property"?: number;
  "dfh_fk_namespace"?: number;
  "dfh_fk_class"?: number;
  "dfh_fk_project"?: number;
  "dfh_fk_class_type"?: number;
  "dfh_fk_property_type"?: number;
  "dfh_fk_profile"?: number;
  "dfh_creation_time"?: Date;
  "dfh_modification_time"?: Date;
  "com_fk_system_type"?: number;
  "inf_fk_language"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  proj_rels?: DfhProjRel[];
}

export class DfhLabel implements DfhLabelInterface {
  "pk_entity": number;
  "dfh_pk_label": number;
  "dfh_label": string;
  "dfh_language_iso_code": string;
  "dfh_is_standard_label_for_language": boolean;
  "dfh_fk_property": number;
  "dfh_fk_namespace": number;
  "dfh_fk_class": number;
  "dfh_fk_project": number;
  "dfh_fk_class_type": number;
  "dfh_fk_property_type": number;
  "dfh_fk_profile": number;
  "dfh_creation_time": Date;
  "dfh_modification_time": Date;
  "com_fk_system_type": number;
  "inf_fk_language": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  proj_rels?: DfhProjRel[];
  constructor(data?: DfhLabelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhLabel`.
   */
  public static getModelName() {
    return "DfhLabel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhLabel for dynamic purposes.
  **/
  public static factory(data: DfhLabelInterface): DfhLabel{
    return new DfhLabel(data);
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
      name: 'DfhLabel',
      plural: 'DfhLabels',
      path: 'DfhLabels',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "dfh_pk_label": {
          name: 'dfh_pk_label',
          type: 'number'
        },
        "dfh_label": {
          name: 'dfh_label',
          type: 'string'
        },
        "dfh_language_iso_code": {
          name: 'dfh_language_iso_code',
          type: 'string'
        },
        "dfh_is_standard_label_for_language": {
          name: 'dfh_is_standard_label_for_language',
          type: 'boolean'
        },
        "dfh_fk_property": {
          name: 'dfh_fk_property',
          type: 'number'
        },
        "dfh_fk_namespace": {
          name: 'dfh_fk_namespace',
          type: 'number'
        },
        "dfh_fk_class": {
          name: 'dfh_fk_class',
          type: 'number'
        },
        "dfh_fk_project": {
          name: 'dfh_fk_project',
          type: 'number'
        },
        "dfh_fk_class_type": {
          name: 'dfh_fk_class_type',
          type: 'number'
        },
        "dfh_fk_property_type": {
          name: 'dfh_fk_property_type',
          type: 'number'
        },
        "dfh_fk_profile": {
          name: 'dfh_fk_profile',
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
        "com_fk_system_type": {
          name: 'com_fk_system_type',
          type: 'number'
        },
        "inf_fk_language": {
          name: 'inf_fk_language',
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
