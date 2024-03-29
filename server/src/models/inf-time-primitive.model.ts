import {Entity, model, property} from '@loopback/repository';
import {InfEntity} from '.';
import {CalendarType} from './enums/CalendarType';
import {Granularity} from './enums/Granularity';

@model({
  settings: {strict: true, postgresql: {schema: 'information', table: 'v_time_primitive'}}
})
export class InfTimePrimitive extends Entity implements InfEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

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
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(Granularity),
    },
  })
  duration: Granularity;

  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(CalendarType),
    },
  }) calendar: CalendarType;
  // Define well-known properties here


  constructor(data?: Partial<InfTimePrimitive>) {
    super(data);
  }
}

export interface InfTimePrimitiveRelations {
  // describe navigational properties here
}

export type InfTimePrimitiveWithRelations = InfTimePrimitive & InfTimePrimitiveRelations;
