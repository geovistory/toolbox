import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {InfEntity, ProInfoProjRel} from '.';
import {DatChunk} from './dat-chunk.model';
import {DatDigital} from './dat-digital.model';
import {InfAppellation} from './inf-appellation.model';
import {InfLangString} from './inf-lang-string.model';
import {InfLanguage} from './inf-language.model';
import {InfPersistentItem} from './inf-persistent-item.model';
import {InfPlace} from './inf-place.model';
import {InfTemporalEntity} from './inf-temporal-entity.model';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_statement'}
  }
})
export class InfStatement extends Entity implements InfEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_info?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_data?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_tables_cell?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_tables_row?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_property?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_property_of_property?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_info?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_data?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_tables_cell?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_tables_row?: number;

  @property({
    type: 'number',
  })
  is_in_project_count?: number;

  @property({
    type: 'number',
  })
  is_standard_in_project_count?: number;

  @property({
    type: 'string',
  })
  community_favorite_calendar?: string;

  @hasMany(() => ProInfoProjRel, {keyTo: 'fk_entity'})
  entity_version_project_rels: ProInfoProjRel[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfStatement>) {
    super(data);
  }
}

export interface InfStatementRelations {
  subject_persistent_item?: InfPersistentItem;
  subject_temporal_entity?: InfTemporalEntity;
  subject_digital?: DatDigital;
  subject_chunk?: DatChunk;
  subject_statement?: InfStatement;
  object_persistent_item?: InfPersistentItem;
  object_temporal_entity?: InfTemporalEntity;
  object_appellation?: InfAppellation;
  object_language?: InfLanguage;
  object_lang_string?: InfLangString;
  object_place?: InfPlace;
  object_chunk?: DatChunk;
}

export type InfStatementWithRelations = InfStatement & InfStatementRelations;
