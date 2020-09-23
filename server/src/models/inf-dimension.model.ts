import {model, property, Entity} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_dimension'}
  }
})
export class InfDimension extends Entity implements InfEntity {

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
  fk_measurement_unit: number;

  @property({
    type: 'number',
  })
  numeric_value?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfDimension>) {
    super(data);
  }
}

export interface InfDimensionRelations {
  // describe navigational properties here
}

export type InfDimensionWithRelations = InfDimension & InfDimensionRelations;
