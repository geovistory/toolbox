/* tslint:disable */
import {
  DfhProjRel
} from '../index';

declare var Object: any;
export interface DfhPropertyProfileViewInterface {
  "pk_entity"?: number;
  "is_enabled_in_profile"?: boolean;
  "dfh_profile_label"?: string;
  "removed_from_api"?: boolean;
  "dfh_pk_property"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  proj_rels?: DfhProjRel[];
}

export class DfhPropertyProfileView implements DfhPropertyProfileViewInterface {
  "pk_entity": number;
  "is_enabled_in_profile": boolean;
  "dfh_profile_label": string;
  "removed_from_api": boolean;
  "dfh_pk_property": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  proj_rels?: DfhProjRel[];
  constructor(data?: DfhPropertyProfileViewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhPropertyProfileView`.
   */
  public static getModelName() {
    return "DfhPropertyProfileView";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhPropertyProfileView for dynamic purposes.
  **/
  public static factory(data: DfhPropertyProfileViewInterface): DfhPropertyProfileView{
    return new DfhPropertyProfileView(data);
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
      name: 'DfhPropertyProfileView',
      plural: 'DfhPropertyProfileViews',
      path: 'DfhPropertyProfileViews',
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
        "dfh_profile_label": {
          name: 'dfh_profile_label',
          type: 'string'
        },
        "removed_from_api": {
          name: 'removed_from_api',
          type: 'boolean'
        },
        "dfh_pk_property": {
          name: 'dfh_pk_property',
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
