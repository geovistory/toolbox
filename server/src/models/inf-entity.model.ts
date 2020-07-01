import {model, property} from '@loopback/repository';
import {AbstractEntity} from '.';

@model({settings: {strict: false}})
export class InfEntity extends AbstractEntity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfEntity>) {
    super(data);
  }
}

export interface InfEntityRelations {
  // describe navigational properties here
}

export type InfEntityWithRelations = InfEntity & InfEntityRelations;
