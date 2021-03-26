/* tslint:disable */

declare var Object: any;
export interface DfhProfileInterface {
  "pk_profile"?: number;
  "owned_by_project"?: number;
  "is_ongoing_forced_publication"?: boolean;
  "date_profile_published"?: string;
  "date_profile_deprecated"?: string;
  "tmsp_last_dfh_update"?: string;
}

export class DfhProfile implements DfhProfileInterface {
  "pk_profile": number;
  "owned_by_project": number;
  "is_ongoing_forced_publication": boolean;
  "date_profile_published": string;
  "date_profile_deprecated": string;
  "tmsp_last_dfh_update": string;
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
      idName: 'pk_profile',
      properties: {
        "pk_profile": {
          name: 'pk_profile',
          type: 'number'
        },
        "owned_by_project": {
          name: 'owned_by_project',
          type: 'number'
        },
        "is_ongoing_forced_publication": {
          name: 'is_ongoing_forced_publication',
          type: 'boolean'
        },
        "date_profile_published": {
          name: 'date_profile_published',
          type: 'string'
        },
        "date_profile_deprecated": {
          name: 'date_profile_deprecated',
          type: 'string'
        },
        "tmsp_last_dfh_update": {
          name: 'tmsp_last_dfh_update',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
