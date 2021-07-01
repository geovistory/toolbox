import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {PartialDeep} from 'type-fest';
import {InfEntity} from '.';
import {GvLoopbackEntity} from '../utils/GvLoopbackEntity';
import {InfLanguage} from './inf-language.model';
import {InfStatement} from './inf-statement.model';
import {QuillDoc} from './quill-doc/quill-doc.model';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_lang_string'}
  }
})
export class InfLangString extends GvLoopbackEntity implements InfEntity {

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
  @property()
  quill_doc?: QuillDoc;

  @property({
    type: 'string',
  })
  string?: string;

  @hasMany(() => InfStatement, {keyTo: 'fk_object_info'})
  incoming_statements?: InfStatement[];

  @belongsTo(() => InfLanguage, {name: 'language'})
  fk_language: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: PartialDeep<InfLangString>) {
    super(data);
  }
}

export interface InfLangStringRelations {
  // describe navigational properties here
  language?: InfLanguage
}

export type InfLangStringWithRelations = InfLangString & InfLangStringRelations;
