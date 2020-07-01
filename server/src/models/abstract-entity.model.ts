import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false, validateUpsert: true, idInjection: true}})
export class AbstractEntity extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AbstractEntity>) {
    super(data);
  }
}

export interface AbstractEntityRelations {
  // describe navigational properties here
}

export type AbstractEntityWithRelations = AbstractEntity & AbstractEntityRelations;
