import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_temporal_entity'}
  }
})
export class InfTemporalEntity extends InfEntity {
  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfTemporalEntity>) {
    super(data);
  }
}

export interface InfTemporalEntityRelations {
  // describe navigational properties here
}

export type InfTemporalEntityWithRelations = InfTemporalEntity & InfTemporalEntityRelations;
