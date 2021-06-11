import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {DatEntity, DatNamespace} from '.';
import {overrideType} from '../components/spec-enhancer/model.spec.enhancer';
import {DatDigital} from './dat-digital.model';
import {InfStatement} from './inf-statement.model';
import {QuillDoc} from './quill-doc/quill-doc.model';

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

  @property()
  quill_doc?: QuillDoc;

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


overrideType(DatChunk) // TODO: remove this, when loopback 3 is completely removed
