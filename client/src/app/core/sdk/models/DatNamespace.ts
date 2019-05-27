/* tslint:disable */

declare var Object: any;
export interface DatNamespaceInterface {
  "pk_entity"?: number;
  "fk_root_namespace"?: number;
  "fk_project": number;
  "standard_label": string;
}

export class DatNamespace implements DatNamespaceInterface {
  "pk_entity": number;
  "fk_root_namespace": number;
  "fk_project": number;
  "standard_label": string;
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
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
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
      },
      relations: {
      }
    }
  }
}
