import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    forceId: false,
    postgresql: {schema: 'data_for_history', table: 'v_label'},
    validateUpsert: true,
    idInjection: true
  }
})
export class DfhLabel extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  type?: string;

  @property({
    type: 'string',
  })
  label?: string;

  @property({
    type: 'string',
  })
  language?: string;

  @property({
    type: 'number',
  })
  fk_profile?: number;

  @property({
    type: 'number',
  })
  fk_project?: number;

  @property({
    type: 'number',
  })
  fk_property?: number;

  @property({
    type: 'number',
  })
  fk_class?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DfhLabel>) {
    super(data);
  }
}

export interface DfhLabelRelations {
  // describe navigational properties here
}

export type DfhLabelWithRelations = DfhLabel & DfhLabelRelations;
