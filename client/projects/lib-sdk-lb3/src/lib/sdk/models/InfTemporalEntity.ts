/* tslint:disable */
import {
  ProInfoProjRel,
  InfStatement,
  InfTextProperty
} from '../index';

declare var Object: any;
export interface InfTemporalEntityInterface {
  "fk_class": number;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  outgoing_statements?: InfStatement[];
  incoming_statements?: InfStatement[];
  text_properties?: InfTextProperty[];
}

export class InfTemporalEntity implements InfTemporalEntityInterface {
  "fk_class": number;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  outgoing_statements?: InfStatement[];
  incoming_statements?: InfStatement[];
  text_properties?: InfTextProperty[];
  constructor(data?: InfTemporalEntityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTemporalEntity`.
   */
  public static getModelName() {
    return "InfTemporalEntity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfTemporalEntity for dynamic purposes.
  **/
  public static factory(data: InfTemporalEntityInterface): InfTemporalEntity{
    return new InfTemporalEntity(data);
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
      name: 'InfTemporalEntity',
      plural: 'InfTemporalEntities',
      path: 'InfTemporalEntities',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
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
        outgoing_statements: {
          name: 'outgoing_statements',
          type: 'InfStatement[]',
          model: 'InfStatement',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_subject_info'
        },
        incoming_statements: {
          name: 'incoming_statements',
          type: 'InfStatement[]',
          model: 'InfStatement',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_object_info'
        },
        text_properties: {
          name: 'text_properties',
          type: 'InfTextProperty[]',
          model: 'InfTextProperty',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_concerned_entity'
        },
      }
    }
  }
}