import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {strict: false, postgresql: {schema: 'information', table: 'v_time_primitive'}}
})
export class InfTimePrimitive extends InfEntity {
  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  @property({
    type: 'number',
    required: true,
  })
  julian_day: number;

  @property({
    type: 'string',
    required: true,
  })
  duration: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfTimePrimitive>) {
    super(data);
  }
}

export interface InfTimePrimitiveRelations {
  // describe navigational properties here
}

export type InfTimePrimitiveWithRelations = InfTimePrimitive & InfTimePrimitiveRelations;
