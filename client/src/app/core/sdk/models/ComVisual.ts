/* tslint:disable */
import {
  PubAccount,
  ComProject
} from '../index';

declare var Object: any;
export interface ComVisualInterface {
  "name": string;
  "description"?: string;
  "visual": any;
  "fk_project": number;
  "fk_last_modifier": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  account?: PubAccount;
  project?: ComProject;
}

export class ComVisual implements ComVisualInterface {
  "name": string;
  "description": string;
  "visual": any;
  "fk_project": number;
  "fk_last_modifier": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  account?: PubAccount;
  project?: ComProject;
  constructor(data?: ComVisualInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComVisual`.
   */
  public static getModelName() {
    return "ComVisual";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComVisual for dynamic purposes.
  **/
  public static factory(data: ComVisualInterface): ComVisual{
    return new ComVisual(data);
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
      name: 'ComVisual',
      plural: 'ComVisuals',
      path: 'ComVisuals',
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
        "visual": {
          name: 'visual',
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
          type: 'ComProject',
          model: 'ComProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
