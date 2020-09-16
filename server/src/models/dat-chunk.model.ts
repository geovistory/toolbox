import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {DatEntity, DatNamespace} from '.';
import {InfStatement} from './inf-statement.model';
import {DatDigital} from './dat-digital.model';

@model({
  settings: {
    strict: true,
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


  @belongsTo(() => DatDigital,
    {
      name: 'digital',
      keyTo: 'pk_text'
    },
    {
      type: 'number',
      required: true,
    }
  )
  fk_text: number;

  @belongsTo(() => DatNamespace,
    {
      name: 'namespace'
    },
    {
      type: 'number',
      required: true,
    }
  )
  fk_namespace: number;

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
