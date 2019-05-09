/* tslint:disable */
import {
  ProInfoProjRel,
  DatNamespace
} from '../index';

declare var Object: any;
export interface InfTypeNamespaceRelInterface {
  "pk_entity"?: number;
  "fk_persistent_item": number;
  "fk_namespace": number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  entity_version_project_rels?: ProInfoProjRel[];
  namespace?: DatNamespace;
}

export class InfTypeNamespaceRel implements InfTypeNamespaceRelInterface {
  "pk_entity": number;
  "fk_persistent_item": number;
  "fk_namespace": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  entity_version_project_rels?: ProInfoProjRel[];
  namespace?: DatNamespace;
  constructor(data?: InfTypeNamespaceRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTypeNamespaceRel`.
   */
  public static getModelName() {
    return "InfTypeNamespaceRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfTypeNamespaceRel for dynamic purposes.
  **/
  public static factory(data: InfTypeNamespaceRelInterface): InfTypeNamespaceRel{
    return new InfTypeNamespaceRel(data);
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
      name: 'InfTypeNamespaceRel',
      plural: 'InfTypeNamespaceRels',
      path: 'InfTypeNamespaceRels',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_persistent_item": {
          name: 'fk_persistent_item',
          type: 'number'
        },
        "fk_namespace": {
          name: 'fk_namespace',
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
        namespace: {
          name: 'namespace',
          type: 'InfNamespace',
          model: 'InfNamespace',
          relationType: 'belongsTo',
                  keyFrom: 'fk_namespace',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
