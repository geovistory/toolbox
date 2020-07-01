import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false, validateUpsert: true, idInjection: true}})
export class ProEntity extends Entity {
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
    type: 'string',
    generated: true,
  })
  tmsp_creation?: string;

  @property({
    type: 'string',
    generated: true,
  })
  tmsp_last_modification?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProEntity>) {
    super(data);
  }
}

export interface ProEntityRelations {
  // describe navigational properties here
}

export type ProEntityWithRelations = ProEntity & ProEntityRelations;
