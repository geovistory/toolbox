import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_persistent_item'}
  }
})
export class InfPersistentItem extends InfEntity {
  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfPersistentItem>) {
    super(data);
  }
}

export interface InfPersistentItemRelations {
  // describe navigational properties here
}

export type InfPersistentItemWithRelations = InfPersistentItem & InfPersistentItemRelations;
