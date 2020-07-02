import {model, property, Entity} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_place'}
  }
})
export class InfPlace extends Entity implements InfEntity {

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
  long: number;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfPlace>) {
    super(data);
  }
}

export interface InfPlaceRelations {
  // describe navigational properties here
}

export type InfPlaceWithRelations = InfPlace & InfPlaceRelations;
