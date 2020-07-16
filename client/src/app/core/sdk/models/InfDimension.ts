/* tslint:disable */
import {
  ProInfoProjRel,
  InfStatement,
  InfPersistentItem
} from '../index';

declare var Object: any;
export interface InfDimensionInterface {
  "fk_class": number;
  "fk_measurement_unit": number;
  "numeric_value"?: number;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  incoming_statements?: InfStatement[];
  measurement_unit?: InfPersistentItem;
}

export class InfDimension implements InfDimensionInterface {
  "fk_class": number;
  "fk_measurement_unit": number;
  "numeric_value": number;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  incoming_statements?: InfStatement[];
  measurement_unit?: InfPersistentItem;
  constructor(data?: InfDimensionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfDimension`.
   */
  public static getModelName() {
    return "InfDimension";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfDimension for dynamic purposes.
  **/
  public static factory(data: InfDimensionInterface): InfDimension{
    return new InfDimension(data);
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
      name: 'InfDimension',
      plural: 'InfDimensions',
      path: 'InfDimensions',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "fk_measurement_unit": {
          name: 'fk_measurement_unit',
          type: 'number'
        },
        "numeric_value": {
          name: 'numeric_value',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
      },
      relations: {
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'ProInfoProjRel[]',
          model: 'ProInfoProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        incoming_statements: {
          name: 'incoming_statements',
          type: 'InfStatement[]',
          model: 'InfStatement',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_object_info'
        },
        measurement_unit: {
          name: 'measurement_unit',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_measurement_unit',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
