import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false, validateUpsert: true, idInjection: true}})
export class DatEntity extends Entity {
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
  fk_namespace?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DatEntity>) {
    super(data);
  }
}

export interface DatEntityRelations {
  // describe navigational properties here
}

export type DatEntityWithRelations = DatEntity & DatEntityRelations;
