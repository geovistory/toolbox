/* tslint:disable */
import {
  ProInfoProjRel,
  InfPersistentItem,
  InfTemporalEntity,
  InfLanguage,
  SysClassField
} from '../index';

declare var Object: any;
export interface InfTextPropertyInterface {
  "fk_class_field": number;
  "fk_concerned_entity": number;
  "fk_language": number;
  "quill_doc": any;
  "string"?: string;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  persistent_item?: InfPersistentItem;
  temporal_entity?: InfTemporalEntity;
  language?: InfLanguage;
  class_field?: SysClassField;
}

export class InfTextProperty implements InfTextPropertyInterface {
  "fk_class_field": number;
  "fk_concerned_entity": number;
  "fk_language": number;
  "quill_doc": any;
  "string": string;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  persistent_item?: InfPersistentItem;
  temporal_entity?: InfTemporalEntity;
  language?: InfLanguage;
  class_field?: SysClassField;
  constructor(data?: InfTextPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTextProperty`.
   */
  public static getModelName() {
    return "InfTextProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfTextProperty for dynamic purposes.
  **/
  public static factory(data: InfTextPropertyInterface): InfTextProperty{
    return new InfTextProperty(data);
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
      name: 'InfTextProperty',
      plural: 'InfTextProperties',
      path: 'InfTextProperties',
      idName: 'pk_entity',
      properties: {
        "fk_class_field": {
          name: 'fk_class_field',
          type: 'number'
        },
        "fk_concerned_entity": {
          name: 'fk_concerned_entity',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'number'
        },
        "quill_doc": {
          name: 'quill_doc',
          type: 'any'
        },
        "string": {
          name: 'string',
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
        persistent_item: {
          name: 'persistent_item',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_concerned_entity',
          keyTo: 'pk_entity'
        },
        temporal_entity: {
          name: 'temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_concerned_entity',
          keyTo: 'pk_entity'
        },
        language: {
          name: 'language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_language',
          keyTo: 'pk_entity'
        },
        class_field: {
          name: 'class_field',
          type: 'SysClassField',
          model: 'SysClassField',
          relationType: 'belongsTo',
                  keyFrom: 'fk_class_field',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}