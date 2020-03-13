/* tslint:disable */
import {
  DatNamespace
} from '../index';

declare var Object: any;
export interface DatColumnInterface {
  "fk_digital"?: number;
  "fk_data_type"?: number;
  "fk_column_content_type"?: number;
  "fk_column_relationship_type"?: number;
  "fk_original_column"?: number;
  "is_imported"?: number;
  "pk_entity"?: number;
  "fk_namespace"?: number;
  namespace?: DatNamespace;
}

export class DatColumn implements DatColumnInterface {
  "fk_digital": number;
  "fk_data_type": number;
  "fk_column_content_type": number;
  "fk_column_relationship_type": number;
  "fk_original_column": number;
  "is_imported": number;
  "pk_entity": number;
  "fk_namespace": number;
  namespace?: DatNamespace;
  constructor(data?: DatColumnInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DatColumn`.
   */
  public static getModelName() {
    return "DatColumn";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DatColumn for dynamic purposes.
  **/
  public static factory(data: DatColumnInterface): DatColumn{
    return new DatColumn(data);
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
      name: 'DatColumn',
      plural: 'DatColumns',
      path: 'DatColumns',
      idName: 'pk_entity',
      properties: {
        "fk_digital": {
          name: 'fk_digital',
          type: 'number'
        },
        "fk_data_type": {
          name: 'fk_data_type',
          type: 'number'
        },
        "fk_column_content_type": {
          name: 'fk_column_content_type',
          type: 'number'
        },
        "fk_column_relationship_type": {
          name: 'fk_column_relationship_type',
          type: 'number'
        },
        "fk_original_column": {
          name: 'fk_original_column',
          type: 'number'
        },
        "is_imported": {
          name: 'is_imported',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
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
