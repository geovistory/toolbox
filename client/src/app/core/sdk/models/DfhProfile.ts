/* tslint:disable */

declare var Object: any;
export interface DfhProfileInterface {
  "dfh_pk_profile"?: number;
  "dfh_profile_label_en"?: string;
  "dfh_profile_definition_en"?: string;
  "dfh_owned_by_project"?: number;
  "dfh_project_label_en"?: string;
  "dfh_is_ongoing_forced_publication"?: boolean;
  "dfh_date_profile_published"?: string;
  "dfh_date_profile_deprecated"?: string;
  "pk_entity"?: number;
  "entity_version"?: number;
  "id"?: number;
}

export class DfhProfile implements DfhProfileInterface {
  "dfh_pk_profile": number;
  "dfh_profile_label_en": string;
  "dfh_profile_definition_en": string;
  "dfh_owned_by_project": number;
  "dfh_project_label_en": string;
  "dfh_is_ongoing_forced_publication": boolean;
  "dfh_date_profile_published": string;
  "dfh_date_profile_deprecated": string;
  "pk_entity": number;
  "entity_version": number;
  "id": number;
  constructor(data?: DfhProfileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhProfile`.
   */
  public static getModelName() {
    return "DfhProfile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhProfile for dynamic purposes.
  **/
  public static factory(data: DfhProfileInterface): DfhProfile{
    return new DfhProfile(data);
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
      name: 'DfhProfile',
      plural: 'DfhProfiles',
      path: 'DfhProfiles',
      idName: 'id',
      properties: {
        "dfh_pk_profile": {
          name: 'dfh_pk_profile',
          type: 'number'
        },
        "dfh_profile_label_en": {
          name: 'dfh_profile_label_en',
          type: 'string'
        },
        "dfh_profile_definition_en": {
          name: 'dfh_profile_definition_en',
          type: 'string'
        },
        "dfh_owned_by_project": {
          name: 'dfh_owned_by_project',
          type: 'number'
        },
        "dfh_project_label_en": {
          name: 'dfh_project_label_en',
          type: 'string'
        },
        "dfh_is_ongoing_forced_publication": {
          name: 'dfh_is_ongoing_forced_publication',
          type: 'boolean'
        },
        "dfh_date_profile_published": {
          name: 'dfh_date_profile_published',
          type: 'string'
        },
        "dfh_date_profile_deprecated": {
          name: 'dfh_date_profile_deprecated',
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
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
