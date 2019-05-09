/* tslint:disable */
import {
  ProInfoProjRel
} from '../index';

declare var Object: any;
export interface InfNamespaceInterface {
  "fk_root_namespace"?: number;
  "fk_project": number;
  "standard_label": string;
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  entity_version_project_rels?: ProInfoProjRel[];
}

export class DatNamespace implements InfNamespaceInterface {
  "fk_root_namespace": number;
  "fk_project": number;
  "standard_label": string;
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  entity_version_project_rels?: ProInfoProjRel[];
  constructor(data?: InfNamespaceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfNamespace`.
   */
  public static getModelName() {
    return "InfNamespace";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfNamespace for dynamic purposes.
  **/
  public static factory(data: InfNamespaceInterface): DatNamespace{
    return new DatNamespace(data);
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
      name: 'InfNamespace',
      plural: 'InfNamespaces',
      path: 'InfNamespaces',
      idName: 'pk_entity',
      properties: {
        "fk_root_namespace": {
          name: 'fk_root_namespace',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "standard_label": {
          name: 'standard_label',
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
