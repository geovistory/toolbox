/* tslint:disable */
import {
  PubAccount,
  ProProject
} from '../index';

declare var Object: any;
export interface ProQueryInterface {
  "name": string;
  "description"?: string;
  "query": any;
  "fk_project": number;
  "fk_last_modifier": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  account?: PubAccount;
  project?: ProProject;
}

export class ProQuery implements ProQueryInterface {
  "name": string;
  "description": string;
  "query": any;
  "fk_project": number;
  "fk_last_modifier": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  account?: PubAccount;
  project?: ProProject;
  constructor(data?: ProQueryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProQuery`.
   */
  public static getModelName() {
    return "ProQuery";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProQuery for dynamic purposes.
  **/
  public static factory(data: ProQueryInterface): ProQuery{
    return new ProQuery(data);
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
      name: 'ProQuery',
      plural: 'ProQueries',
      path: 'ProQueries',
      idName: 'pk_entity',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "query": {
          name: 'query',
          type: 'any'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_last_modifier": {
          name: 'fk_last_modifier',
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
        account: {
          name: 'account',
          type: 'PubAccount',
          model: 'PubAccount',
          relationType: 'belongsTo',
                  keyFrom: 'fk_last_modifier',
          keyTo: 'id'
        },
        project: {
          name: 'project',
          type: 'ProProject',
          model: 'ProProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
