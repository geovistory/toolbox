/* tslint:disable */
import {
  InfRole,
  ProInfoProjRel
} from '../index';

declare var Object: any;
export interface InfAppellationInterface {
  "quill_doc": any;
  "fk_class": number;
  "string"?: string;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  roles?: InfRole[];
  entity_version_project_rels?: ProInfoProjRel[];
}

export class InfAppellation implements InfAppellationInterface {
  "quill_doc": any;
  "fk_class": number;
  "string": string;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  roles?: InfRole[];
  entity_version_project_rels?: ProInfoProjRel[];
  constructor(data?: InfAppellationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfAppellation`.
   */
  public static getModelName() {
    return "InfAppellation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfAppellation for dynamic purposes.
  **/
  public static factory(data: InfAppellationInterface): InfAppellation{
    return new InfAppellation(data);
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
      name: 'InfAppellation',
      plural: 'InfAppellations',
      path: 'InfAppellations',
      idName: 'pk_entity',
      properties: {
        "quill_doc": {
          name: 'quill_doc',
          type: 'any'
        },
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "string": {
          name: 'string',
          type: 'string'
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
        roles: {
          name: 'roles',
          type: 'InfRole[]',
          model: 'InfRole',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'ProInfoProjRel[]',
          model: 'ProInfoProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
      }
    }
  }
}
