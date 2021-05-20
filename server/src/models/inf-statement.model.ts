import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {InfDimension, InfEntity, ProInfoProjRel} from '.';
import {DatChunk} from './dat-chunk.model';
import {DatDigital} from './dat-digital.model';
import {InfAppellation} from './inf-appellation.model';
import {InfLangString} from './inf-lang-string.model';
import {InfLanguage} from './inf-language.model';
import {InfPlace} from './inf-place.model';
import {InfResource} from './inf-resource.model';
import {InfTimePrimitive} from './inf-time-primitive.model';

@model({
  settings: {
    strict: true,
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
  entity_version_project_rels?: ProInfoProjRel[];

  @hasOne(()=> InfResource)
  subject_resource?: InfResource;


  @hasOne(()=> DatChunk)
  subject_chunk?: DatChunk;


  @hasOne(()=> InfStatement)
  subject_statement?: InfStatement;


  @hasOne(()=> DatDigital)
  subject_digital?: DatDigital;


  /**
 * Objects value objects
 */


  @hasOne(()=> InfResource)
  object_resource?: InfResource;

  @hasOne(()=> InfAppellation)
  object_appellation?: InfAppellation;


  @hasOne(()=> InfTimePrimitive)
  object_time_primitive?: InfTimePrimitive;


  @hasOne(()=> InfLanguage)
  object_language?: InfLanguage;


  @hasOne(()=> InfLangString)
  object_lang_string?: InfLangString;


  @hasOne(()=> InfDimension)
  object_dimension?: InfDimension;


  @hasOne(()=> InfPlace)
  object_place?: InfPlace;


  @hasOne(()=> DatChunk)
  object_chunk?: DatChunk;





  // Define well-known properties here


  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InfStatement>) {
    super(data);
  }
}

export interface InfStatementRelations {
  entity_version_project_rels?: ProInfoProjRel[];
  subject_resource?: InfResource;
  subject_digital?: DatDigital;
  subject_chunk?: DatChunk;
  subject_statement?: InfStatement;
  object_resource?: InfResource;
  object_appellation?: InfAppellation;
  object_time_primitive?: InfTimePrimitive;
  object_language?: InfLanguage;
  object_lang_string?: InfLangString;
  object_dimension?: InfDimension;
  object_place?: InfPlace;
  object_chunk?: DatChunk;
}



export type InfStatementWithRelations = InfStatement & InfStatementRelations;
