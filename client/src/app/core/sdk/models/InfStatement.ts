/* tslint:disable */
import {
  ProInfoProjRel,
  InfTemporalEntity,
  DatDigital,
  DatChunk,
  InfAppellation,
  InfLangString,
  InfLanguage,
  InfPersistentItem,
  InfTimePrimitive,
  InfPlace
} from '../index';

declare var Object: any;
export interface InfStatementInterface {
  "fk_subject_info"?: number;
  "fk_subject_data"?: number;
  "fk_subject_tables_cell"?: number;
  "fk_subject_tables_row"?: number;
  "fk_property"?: number;
  "fk_property_of_property"?: number;
  "fk_object_info"?: number;
  "fk_object_data"?: number;
  "fk_object_tables_cell"?: number;
  "fk_object_tables_row"?: number;
  "is_in_project_count"?: number;
  "is_standard_in_project_count"?: number;
  "community_favorite_calendar"?: string;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  subject_temporal_entity?: InfTemporalEntity;
  subject_digital?: DatDigital;
  subject_chunk?: DatChunk;
  subject_statement?: InfStatement;
  object_temporal_entity?: InfTemporalEntity;
  object_appellation?: InfAppellation;
  object_lang_string?: InfLangString;
  object_chunk?: DatChunk;
  object_language?: InfLanguage;
  subject_persistent_item?: InfPersistentItem;
  object_persistent_item?: InfPersistentItem;
  object_time_primitive?: InfTimePrimitive;
  object_place?: InfPlace;
}

export class InfStatement implements InfStatementInterface {
  "fk_subject_info": number;
  "fk_subject_data": number;
  "fk_subject_tables_cell": number;
  "fk_subject_tables_row": number;
  "fk_property": number;
  "fk_property_of_property": number;
  "fk_object_info": number;
  "fk_object_data": number;
  "fk_object_tables_cell": number;
  "fk_object_tables_row": number;
  "is_in_project_count": number;
  "is_standard_in_project_count": number;
  "community_favorite_calendar": string;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  subject_temporal_entity?: InfTemporalEntity;
  subject_digital?: DatDigital;
  subject_chunk?: DatChunk;
  subject_statement?: InfStatement;
  object_temporal_entity?: InfTemporalEntity;
  object_appellation?: InfAppellation;
  object_lang_string?: InfLangString;
  object_chunk?: DatChunk;
  object_language?: InfLanguage;
  subject_persistent_item?: InfPersistentItem;
  object_persistent_item?: InfPersistentItem;
  object_time_primitive?: InfTimePrimitive;
  object_place?: InfPlace;
  constructor(data?: InfStatementInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfStatement`.
   */
  public static getModelName() {
    return "InfStatement";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfStatement for dynamic purposes.
  **/
  public static factory(data: InfStatementInterface): InfStatement{
    return new InfStatement(data);
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
      name: 'InfStatement',
      plural: 'InfStatements',
      path: 'InfStatements',
      idName: 'pk_entity',
      properties: {
        "fk_subject_info": {
          name: 'fk_subject_info',
          type: 'number',
          default: 0
        },
        "fk_subject_data": {
          name: 'fk_subject_data',
          type: 'number',
          default: 0
        },
        "fk_subject_tables_cell": {
          name: 'fk_subject_tables_cell',
          type: 'number',
          default: 0
        },
        "fk_subject_tables_row": {
          name: 'fk_subject_tables_row',
          type: 'number',
          default: 0
        },
        "fk_property": {
          name: 'fk_property',
          type: 'number',
          default: 0
        },
        "fk_property_of_property": {
          name: 'fk_property_of_property',
          type: 'number',
          default: 0
        },
        "fk_object_info": {
          name: 'fk_object_info',
          type: 'number',
          default: 0
        },
        "fk_object_data": {
          name: 'fk_object_data',
          type: 'number',
          default: 0
        },
        "fk_object_tables_cell": {
          name: 'fk_object_tables_cell',
          type: 'number',
          default: 0
        },
        "fk_object_tables_row": {
          name: 'fk_object_tables_row',
          type: 'number',
          default: 0
        },
        "is_in_project_count": {
          name: 'is_in_project_count',
          type: 'number'
        },
        "is_standard_in_project_count": {
          name: 'is_standard_in_project_count',
          type: 'number'
        },
        "community_favorite_calendar": {
          name: 'community_favorite_calendar',
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
        subject_temporal_entity: {
          name: 'subject_temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_subject_info',
          keyTo: 'pk_entity'
        },
        subject_digital: {
          name: 'subject_digital',
          type: 'DatDigital',
          model: 'DatDigital',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_data',
          keyTo: 'pk_entity'
        },
        subject_chunk: {
          name: 'subject_chunk',
          type: 'DatChunk',
          model: 'DatChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_subject_data',
          keyTo: 'pk_entity'
        },
        subject_statement: {
          name: 'subject_statement',
          type: 'InfStatement',
          model: 'InfStatement',
          relationType: 'belongsTo',
                  keyFrom: 'fk_subject_info',
          keyTo: 'pk_entity'
        },
        object_temporal_entity: {
          name: 'object_temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
        object_appellation: {
          name: 'object_appellation',
          type: 'InfAppellation',
          model: 'InfAppellation',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
        object_lang_string: {
          name: 'object_lang_string',
          type: 'InfLangString',
          model: 'InfLangString',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
        object_chunk: {
          name: 'object_chunk',
          type: 'DatChunk',
          model: 'DatChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_data',
          keyTo: 'pk_entity'
        },
        object_language: {
          name: 'object_language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
        subject_persistent_item: {
          name: 'subject_persistent_item',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_subject_info',
          keyTo: 'pk_entity'
        },
        object_persistent_item: {
          name: 'object_persistent_item',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
        object_time_primitive: {
          name: 'object_time_primitive',
          type: 'InfTimePrimitive',
          model: 'InfTimePrimitive',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
        object_place: {
          name: 'object_place',
          type: 'InfPlace',
          model: 'InfPlace',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_info',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
