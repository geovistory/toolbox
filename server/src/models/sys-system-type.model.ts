import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {strict: true, postgresql: {schema: 'system', table: 'system_type'}}
})
export class SysSystemType extends Entity {
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
  notes?: string;

  @property({
    type: 'string',
  })
  definition?: string;

  @property({
    type: 'string',
  })
  st_schema_name?: string;

  @property({
    type: 'string',
  })
  st_table_name?: string;

  @property({
    type: 'string',
  })
  st_column_name?: string;

  @property({
    type: 'string',
  })
  st_group?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysSystemType>) {
    super(data);
  }
}

export interface SysSystemTypeRelations {
  // describe navigational properties here
}

export type SysSystemTypeWithRelations = SysSystemType & SysSystemTypeRelations;
