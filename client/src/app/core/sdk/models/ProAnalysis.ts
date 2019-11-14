/* tslint:disable */
import {
  PubAccount,
  ProProject
} from '../index';

declare var Object: any;
export interface ProAnalysisInterface {
  "name": string;
  "description"?: string;
  "analysis_definition": any;
  "fk_project": number;
  "fk_analysis_type": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "fk_last_modifier"?: number;
  account?: PubAccount;
  project?: ProProject;
}

export class ProAnalysis implements ProAnalysisInterface {
  "name": string;
  "description": string;
  "analysis_definition": any;
  "fk_project": number;
  "fk_analysis_type": number;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "fk_last_modifier": number;
  account?: PubAccount;
  project?: ProProject;
  constructor(data?: ProAnalysisInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProAnalysis`.
   */
  public static getModelName() {
    return "ProAnalysis";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProAnalysis for dynamic purposes.
  **/
  public static factory(data: ProAnalysisInterface): ProAnalysis{
    return new ProAnalysis(data);
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
      name: 'ProAnalysis',
      plural: 'ProAnalyses',
      path: 'ProAnalyses',
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
        "analysis_definition": {
          name: 'analysis_definition',
          type: 'any'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_analysis_type": {
          name: 'fk_analysis_type',
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
        "fk_last_modifier": {
          name: 'fk_last_modifier',
          type: 'number'
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
