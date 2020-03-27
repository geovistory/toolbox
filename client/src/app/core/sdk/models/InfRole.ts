/* tslint:disable */
import {
  ProInfoProjRel,
  InfTemporalEntity,
  InfAppellation,
  InfLangString,
  WarEntityPreview,
  DatChunk,
  DatDigital,
  InfLanguage,
  InfPersistentItem,
  InfTimePrimitive,
  InfPlace
} from '../index';

declare var Object: any;
export interface InfRoleInterface {
  "fk_temporal_entity"?: number;
  "fk_subject_data"?: number;
  "fk_subject_tables_cell"?: number;
  "fk_subject_tables_row"?: number;
  "fk_property"?: number;
  "fk_property_of_property"?: number;
  "fk_entity"?: number;
  "fk_object_data"?: number;
  "fk_object_tables_cell"?: number;
  "fk_object_tables_row"?: number;
  "is_in_project_count"?: number;
  "is_standard_in_project_count"?: number;
  "community_favorite_calendar"?: string;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  range_temporal_entity?: InfTemporalEntity;
  appellation?: InfAppellation;
  lang_string?: InfLangString;
  temporal_entity?: InfTemporalEntity;
  persistent_item_preview?: WarEntityPreview;
  temporal_entity_preview?: WarEntityPreview;
  domain_chunk?: DatChunk;
  range_chunk?: DatChunk;
  domain_digital?: DatDigital;
  language?: InfLanguage;
  persistent_item?: InfPersistentItem;
  domain_pe_it?: InfPersistentItem;
  range_pe_it?: InfPersistentItem;
  time_primitive?: InfTimePrimitive;
  place?: InfPlace;
}

export class InfRole implements InfRoleInterface {
  "fk_temporal_entity": number;
  "fk_subject_data": number;
  "fk_subject_tables_cell": number;
  "fk_subject_tables_row": number;
  "fk_property": number;
  "fk_property_of_property": number;
  "fk_entity": number;
  "fk_object_data": number;
  "fk_object_tables_cell": number;
  "fk_object_tables_row": number;
  "is_in_project_count": number;
  "is_standard_in_project_count": number;
  "community_favorite_calendar": string;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  range_temporal_entity?: InfTemporalEntity;
  appellation?: InfAppellation;
  lang_string?: InfLangString;
  temporal_entity?: InfTemporalEntity;
  persistent_item_preview?: WarEntityPreview;
  temporal_entity_preview?: WarEntityPreview;
  domain_chunk?: DatChunk;
  range_chunk?: DatChunk;
  domain_digital?: DatDigital;
  language?: InfLanguage;
  persistent_item?: InfPersistentItem;
  domain_pe_it?: InfPersistentItem;
  range_pe_it?: InfPersistentItem;
  time_primitive?: InfTimePrimitive;
  place?: InfPlace;
  constructor(data?: InfRoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfRole`.
   */
  public static getModelName() {
    return "InfRole";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfRole for dynamic purposes.
  **/
  public static factory(data: InfRoleInterface): InfRole{
    return new InfRole(data);
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
      name: 'InfRole',
      plural: 'InfRoles',
      path: 'InfRoles',
      idName: 'pk_entity',
      properties: {
        "fk_temporal_entity": {
          name: 'fk_temporal_entity',
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
        "fk_entity": {
          name: 'fk_entity',
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
        range_temporal_entity: {
          name: 'range_temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        appellation: {
          name: 'appellation',
          type: 'InfAppellation',
          model: 'InfAppellation',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        lang_string: {
          name: 'lang_string',
          type: 'InfLangString',
          model: 'InfLangString',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        temporal_entity: {
          name: 'temporal_entity',
          type: 'InfTemporalEntity',
          model: 'InfTemporalEntity',
          relationType: 'belongsTo',
                  keyFrom: 'fk_temporal_entity',
          keyTo: 'pk_entity'
        },
        persistent_item_preview: {
          name: 'persistent_item_preview',
          type: 'WarEntityPreview',
          model: 'WarEntityPreview',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        temporal_entity_preview: {
          name: 'temporal_entity_preview',
          type: 'WarEntityPreview',
          model: 'WarEntityPreview',
          relationType: 'belongsTo',
                  keyFrom: 'fk_temporal_entity',
          keyTo: 'pk_entity'
        },
        domain_chunk: {
          name: 'domain_chunk',
          type: 'DatChunk',
          model: 'DatChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_subject_data',
          keyTo: 'pk_entity'
        },
        range_chunk: {
          name: 'range_chunk',
          type: 'DatChunk',
          model: 'DatChunk',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_data',
          keyTo: 'pk_entity'
        },
        domain_digital: {
          name: 'domain_digital',
          type: 'DatDigital',
          model: 'DatDigital',
          relationType: 'belongsTo',
                  keyFrom: 'fk_object_data',
          keyTo: 'pk_entity'
        },
        language: {
          name: 'language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        persistent_item: {
          name: 'persistent_item',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        domain_pe_it: {
          name: 'domain_pe_it',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_temporal_entity',
          keyTo: 'pk_entity'
        },
        range_pe_it: {
          name: 'range_pe_it',
          type: 'InfPersistentItem',
          model: 'InfPersistentItem',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        time_primitive: {
          name: 'time_primitive',
          type: 'InfTimePrimitive',
          model: 'InfTimePrimitive',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
        place: {
          name: 'place',
          type: 'InfPlace',
          model: 'InfPlace',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
