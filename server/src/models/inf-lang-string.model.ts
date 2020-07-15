import {model, property, Entity, hasMany, belongsTo} from '@loopback/repository';
import {InfEntity} from '.';
import {InfStatement} from './inf-statement.model';
import {InfLanguage} from './inf-language.model';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_lang_string'}
  }
})
export class InfLangString extends Entity implements InfEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;
  @property({
    type: 'object',
  })
  quill_doc?: object;

  @property({
    type: 'string',
  })
  string?: string;

  @hasMany(() => InfStatement, {keyTo: 'fk_object_info'})
  incoming_statements: InfStatement[];

  @belongsTo(() => InfLanguage, {name: 'language'})
  fk_language: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfLangString>) {
    super(data);
  }
}

export interface InfLangStringRelations {
  // describe navigational properties here
  language?: InfLanguage
}

export type InfLangStringWithRelations = InfLangString & InfLangStringRelations;
