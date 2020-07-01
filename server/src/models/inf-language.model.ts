import {model, property, Entity} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_language'}
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
    type: 'string',
  })
  lang_type?: string;

  @property({
    type: 'string',
  })
  scope?: string;

  @property({
    type: 'string',
  })
  iso6392b?: string;

  @property({
    type: 'string',
  })
  iso6392t?: string;

  @property({
    type: 'string',
  })
  iso6391?: string;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'number',
  })
  fk_object_info?: number;

  @property({
    type: 'number',
  })
  fk_language?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfLanguage>) {
    super(data);
  }
}

export interface InfLanguageRelations {
  // describe navigational properties here
}

export type InfLanguageWithRelations = InfLanguage & InfLanguageRelations;
