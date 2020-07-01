import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_lang_string'}
  }
})
export class InfLangString extends InfEntity {
  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_language: number;

  @property({
    type: 'object',
  })
  quill_doc?: object;

  @property({
    type: 'string',
  })
  string?: string;

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
}

export type InfLangStringWithRelations = InfLangString & InfLangStringRelations;
