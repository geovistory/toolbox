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
  "pk_entity"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
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
  "pk_entity": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
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
        "text_property_quill_doc": {
          name: 'text_property_quill_doc',
          type: 'any'
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
          type: 'ComClassField',
          model: 'ComClassField',
          relationType: 'belongsTo',
                  keyFrom: 'fk_class_field',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
