import {model, property} from '@loopback/repository';
import {DatEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'data', table: 'v_chunk'}
  }
})
export class DatChunk extends DatEntity {
  @property({
    type: 'object',
  })
  quill_doc?: object;

  @property({
    type: 'string',
  })
  string?: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_text: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_entity_version: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DatChunk>) {
    super(data);
  }
}

export interface DatChunkRelations {
  // describe navigational properties here
}

export type DatChunkWithRelations = DatChunk & DatChunkRelations;
