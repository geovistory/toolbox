/* tslint:disable */
import {
  ProInfoProjRel
} from '../index';

declare var Object: any;
export interface InfTimePrimitiveInterface {
  "fk_class": number;
  "julian_day": number;
  "duration": string;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
}

export class InfTimePrimitive implements InfTimePrimitiveInterface {
  "fk_class": number;
  "julian_day": number;
  "duration": string;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  constructor(data?: InfTimePrimitiveInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTimePrimitive`.
   */
  public static getModelName() {
    return "InfTimePrimitive";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfTimePrimitive for dynamic purposes.
  **/
  public static factory(data: InfTimePrimitiveInterface): InfTimePrimitive{
    return new InfTimePrimitive(data);
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
      name: 'InfTimePrimitive',
      plural: 'InfTimePrimitives',
      path: 'InfTimePrimitives',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "julian_day": {
          name: 'julian_day',
          type: 'number'
        },
        "duration": {
          name: 'duration',
          type: 'string'
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
      }
    }
  }
}
