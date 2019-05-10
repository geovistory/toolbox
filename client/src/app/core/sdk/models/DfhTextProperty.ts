/* tslint:disable */
import {
  ProDfhClassProjRel
} from '../index';

declare var Object: any;
export interface DfhTextPropertyInterface {
  "dfh_pk_text_property": number;
  "dfh_text_property": string;
  "dfh_language_iso_code"?: string;
  "dfh_creation_time"?: Date;
  "dfh_modification_time"?: Date;
  "dfh_fk_property"?: number;
  "dfh_fk_namespace"?: number;
  "dfh_fk_class"?: number;
  "dfh_fk_project"?: number;
  "dfh_fk_class_type"?: number;
  "dfh_fk_property_type"?: number;
  "dfh_fk_system_type"?: number;
  "dfh_fk_entity_association"?: number;
  "dfh_fk_profile"?: number;
  "dfh_fk_is_subclass_of"?: number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  proj_rels?: ProDfhClassProjRel[];
}

export class DfhTextProperty implements DfhTextPropertyInterface {
  "dfh_pk_text_property": number;
  "dfh_text_property": string;
  "dfh_language_iso_code": string;
  "dfh_creation_time": Date;
  "dfh_modification_time": Date;
  "dfh_fk_property": number;
  "dfh_fk_namespace": number;
  "dfh_fk_class": number;
  "dfh_fk_project": number;
  "dfh_fk_class_type": number;
  "dfh_fk_property_type": number;
  "dfh_fk_system_type": number;
  "dfh_fk_entity_association": number;
  "dfh_fk_profile": number;
  "dfh_fk_is_subclass_of": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  proj_rels?: ProDfhClassProjRel[];
  constructor(data?: DfhTextPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhTextProperty`.
   */
  public static getModelName() {
    return "DfhTextProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhTextProperty for dynamic purposes.
  **/
  public static factory(data: DfhTextPropertyInterface): DfhTextProperty{
    return new DfhTextProperty(data);
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
      name: 'DfhTextProperty',
      plural: 'DfhTextProperties',
      path: 'DfhTextProperties',
      idName: 'dfh_pk_text_property',
      properties: {
        "dfh_pk_text_property": {
          name: 'dfh_pk_text_property',
          type: 'number'
        },
        "dfh_text_property": {
          name: 'dfh_text_property',
          type: 'string'
        },
        "dfh_language_iso_code": {
          name: 'dfh_language_iso_code',
          type: 'string'
        },
        "dfh_creation_time": {
          name: 'dfh_creation_time',
          type: 'Date'
        },
        "dfh_modification_time": {
          name: 'dfh_modification_time',
          type: 'Date'
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
        "dfh_fk_system_type": {
          name: 'dfh_fk_system_type',
          type: 'number'
        },
        "dfh_fk_entity_association": {
          name: 'dfh_fk_entity_association',
          type: 'number'
        },
        "dfh_fk_profile": {
          name: 'dfh_fk_profile',
          type: 'number'
        },
        "dfh_fk_is_subclass_of": {
          name: 'dfh_fk_is_subclass_of',
          type: 'number'
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
