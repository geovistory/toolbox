/* tslint:disable */

declare var Object: any;
export interface DatNamespaceInterface {
  "fk_root_namespace"?: number;
  "fk_project": number;
  "standard_label": string;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "fk_namespace"?: number;
  namespace?: DatNamespace;
}

export class DatNamespace implements DatNamespaceInterface {
  "fk_root_namespace": number;
  "fk_project": number;
  "standard_label": string;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "fk_namespace": number;
  namespace?: DatNamespace;
  constructor(data?: DatNamespaceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DatNamespace`.
   */
  public static getModelName() {
    return "DatNamespace";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DatNamespace for dynamic purposes.
  **/
  public static factory(data: DatNamespaceInterface): DatNamespace{
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
      name: 'DatNamespace',
      plural: 'DatNamespaces',
      path: 'DatNamespaces',
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
        "fk_namespace": {
          name: 'fk_namespace',
          type: 'number'
        },
      },
      relations: {
        namespace: {
          name: 'namespace',
          type: 'DatNamespace',
          model: 'DatNamespace',
          relationType: 'belongsTo',
                  keyFrom: 'fk_namespace',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
