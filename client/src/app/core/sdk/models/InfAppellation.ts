/* tslint:disable */
import {
  InfRole,
  InfEntityProjectRel
} from '../index';

declare var Object: any;
export interface InfAppellationInterface {
  "appellation_label": any;
  "fk_class": number;
  "notes"?: string;
  "pk_entity"?: number;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  roles?: InfRole[];
  entity_version_project_rels?: InfEntityProjectRel[];
}

export class InfAppellation implements InfAppellationInterface {
  "appellation_label": any;
  "fk_class": number;
  "notes": string;
  "pk_entity": number;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  roles?: InfRole[];
  entity_version_project_rels?: InfEntityProjectRel[];
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
        "appellation_label": {
          name: 'appellation_label',
          type: 'any'
        },
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
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
