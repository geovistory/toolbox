/* tslint:disable */
import {
  DfhClass,
  ProDfhClassProjRel
} from '../index';

declare var Object: any;
export interface DfhClassProfileViewInterface {
  "pk_entity"?: number;
  "is_enabled_in_profile"?: boolean;
  "removed_from_api"?: boolean;
  "dfh_fk_class"?: number;
  "dfh_fk_system_type"?: number;
  "dfh_type_label"?: string;
  "dfh_root_namespace"?: string;
  "dfh_profile_association_type"?: string;
  "dfh_fk_profile"?: number;
  "dfh_profile_label"?: string;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  persistent_items?: DfhClass;
  proj_rels?: ProDfhClassProjRel[];
}

export class DfhClassProfileView implements DfhClassProfileViewInterface {
  "pk_entity": number;
  "is_enabled_in_profile": boolean;
  "removed_from_api": boolean;
  "dfh_fk_class": number;
  "dfh_fk_system_type": number;
  "dfh_type_label": string;
  "dfh_root_namespace": string;
  "dfh_profile_association_type": string;
  "dfh_fk_profile": number;
  "dfh_profile_label": string;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  persistent_items?: DfhClass;
  proj_rels?: ProDfhClassProjRel[];
  constructor(data?: DfhClassProfileViewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhClassProfileView`.
   */
  public static getModelName() {
    return "DfhClassProfileView";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhClassProfileView for dynamic purposes.
  **/
  public static factory(data: DfhClassProfileViewInterface): DfhClassProfileView{
    return new DfhClassProfileView(data);
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
      name: 'DfhClassProfileView',
      plural: 'DfhClassProfileViews',
      path: 'DfhClassProfileViews',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "is_enabled_in_profile": {
          name: 'is_enabled_in_profile',
          type: 'boolean'
        },
        "removed_from_api": {
          name: 'removed_from_api',
          type: 'boolean'
        },
        "dfh_fk_class": {
          name: 'dfh_fk_class',
          type: 'number'
        },
        "dfh_fk_system_type": {
          name: 'dfh_fk_system_type',
          type: 'number'
        },
        "dfh_type_label": {
          name: 'dfh_type_label',
          type: 'string'
        },
        "dfh_root_namespace": {
          name: 'dfh_root_namespace',
          type: 'string'
        },
        "dfh_profile_association_type": {
          name: 'dfh_profile_association_type',
          type: 'string'
        },
        "dfh_fk_profile": {
          name: 'dfh_fk_profile',
          type: 'number'
        },
        "dfh_profile_label": {
          name: 'dfh_profile_label',
          type: 'string'
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
          type: 'DfhClass',
          model: 'DfhClass',
          relationType: 'belongsTo',
                  keyFrom: 'dfh_fk_class',
          keyTo: 'dfh_pk_class'
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
