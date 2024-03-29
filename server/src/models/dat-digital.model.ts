import {model, property, Entity, belongsTo} from '@loopback/repository';
import {DatEntity, DatNamespace} from '.';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'data', table: 'digital'}
  }
})
export class DatDigital extends Entity implements DatEntity {

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
  entity_version?: number;

  @property({
    type: 'number',
    generated: true,
  })
  pk_text?: number;

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
  })
  fk_system_type?: number;


  @belongsTo(() => DatNamespace, {name: 'namespace'})
  fk_namespace?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DatDigital>) {
    super(data);
  }
}

export interface DatDigitalRelations {
  // describe navigational properties here
}

export type DatDigitalWithRelations = DatDigital & DatDigitalRelations;
