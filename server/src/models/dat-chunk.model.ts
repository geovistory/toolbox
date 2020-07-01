import {model, property, Entity, hasMany, belongsTo} from '@loopback/repository';
import {DatEntity} from '.';
import {InfStatement} from './inf-statement.model';
import {DatDigital} from './dat-digital.model';
import {DatNamespace} from './dat-namespace.model';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'data', table: 'v_chunk'}
  }
})
export class DatChunk extends Entity implements DatEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

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
  fk_entity_version: number;

  @hasMany(() => InfStatement, {keyTo: 'fk_subject_data'})
  outgoing_statements: InfStatement[];

  @property({
    type: 'number',
    required: true,
  })
  fk_text: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_namespace: number;

  @property({
    type: 'number',
  })
  fk_subject_data?: number;

  @property({
    type: 'number',
  })
  fk_object_data?: number;
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
