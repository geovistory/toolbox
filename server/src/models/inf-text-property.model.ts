import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'information', table: 'v_text_property'},
    plural: 'InfTextProperties'
  }
})
export class InfTextProperty extends InfEntity {
  @property({
    type: 'number',
    required: true,
  })
  fk_class_field: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_concerned_entity: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_language: number;

  @property({
    type: 'object',
    required: true,
  })
  quill_doc: object;

  @property({
    type: 'string',
  })
  string?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfTextProperty>) {
    super(data);
  }
}

export interface InfTextPropertyRelations {
  // describe navigational properties here
}

export type InfTextPropertyWithRelations = InfTextProperty & InfTextPropertyRelations;
