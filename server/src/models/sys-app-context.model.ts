import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'system', table: 'app_context'},
    validateUpsert: true,
    idInjection: false
  }
})
export class SysAppContext extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  label?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysAppContext>) {
    super(data);
  }
}

export interface SysAppContextRelations {
  // describe navigational properties here
}

export type SysAppContextWithRelations = SysAppContext & SysAppContextRelations;
