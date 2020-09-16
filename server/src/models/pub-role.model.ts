import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'public', table: 'role'},
  }
})
export class PubRole extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    defaultFn: Date.now,
  })
  created?: string;

  @property({
    type: 'date',
    defaultFn: Date.now,
  })
  modified?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PubRole>) {
    super(data);
  }
}

export interface PubRoleRelations {
  // describe navigational properties here
}

export type PubRoleWithRelations = PubRole & PubRoleRelations;
