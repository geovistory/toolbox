/* tslint:disable */
import {
  InfEntityProjectRel
} from '../index';

declare var Object: any;
export interface InfPlaceInterface {
  "long": number;
  "lat": number;
  "fk_class": number;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  entity_version_project_rels?: InfEntityProjectRel[];
}

export class InfPlace implements InfPlaceInterface {
  "long": number;
  "lat": number;
  "fk_class": number;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  entity_version_project_rels?: InfEntityProjectRel[];
  constructor(data?: InfPlaceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfPlace`.
   */
  public static getModelName() {
    return "InfPlace";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfPlace for dynamic purposes.
  **/
  public static factory(data: InfPlaceInterface): InfPlace{
    return new InfPlace(data);
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
      name: 'InfPlace',
      plural: 'InfPlaces',
      path: 'InfPlaces',
      idName: 'pk_entity',
      properties: {
        "long": {
          name: 'long',
          type: 'number'
        },
        "lat": {
          name: 'lat',
          type: 'number'
        },
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
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
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'InfEntityProjectRel[]',
          model: 'InfEntityProjectRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
      }
    }
  }
}
