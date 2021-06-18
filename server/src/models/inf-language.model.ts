import {model, property, Entity} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'information', table: 'language'}
  }
})
export class InfLanguage extends Entity implements InfEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
    generated: true,
  })
  fk_class?: number;

  @property({
    type: 'string',
  })
  pk_language?: string;

  @property({
    jsonSchema: {nullable: true},
    type: 'string',
  })
  lang_type?: string;

  @property({
    jsonSchema: {nullable: true},
    type: 'string',
  })
  scope?: string;

  @property({
    jsonSchema: {nullable: true},
    type: 'string',
  })
  iso6392b?: string;

  @property({
    jsonSchema: {nullable: true},
    type: 'string',
  })
  iso6392t?: string;

  @property({
    jsonSchema: {nullable: true},
    type: 'string',
  })
  iso6391?: string;

  @property({
    jsonSchema: {nullable: true},
    type: 'string',
  })
  notes?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InfLanguage>) {
    super(data);
  }
}

export interface InfLanguageRelations {
  // describe navigational properties here
}

export type InfLanguageWithRelations = InfLanguage & InfLanguageRelations;
