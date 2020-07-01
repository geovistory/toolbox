import {model, property} from '@loopback/repository';
import {DatEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'data', table: 'text_property'}
  }
})
export class DatTextProperty extends DatEntity {
  @property({
    type: 'string',
  })
  string?: string;

  @property({
    type: 'object',
  })
  quill_doc?: object;

  @property({
    type: 'number',
  })
  fk_system_type?: number;

  @property({
    type: 'number',
  })
  fk_language?: number;

  @property({
    type: 'number',
  })
  fk_entity?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DatTextProperty>) {
    super(data);
  }
}

export interface DatTextPropertyRelations {
  // describe navigational properties here
}

export type DatTextPropertyWithRelations = DatTextProperty & DatTextPropertyRelations;
