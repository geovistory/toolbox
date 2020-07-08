import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'system', table: 'class_field'},
    validateUpsert: true,
    idInjection: false
  }
})
export class SysClassField extends Entity {
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

  @property({
    type: 'number',
  })
  fk_system_type_ng_component?: number;

  @property({
    type: 'string',
  })
  used_table?: string;

  @property({
    type: 'number',
  })
  fk_class_field?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysClassField>) {
    super(data);
  }
}

export interface SysClassFieldRelations {
  // describe navigational properties here
}

export type SysClassFieldWithRelations = SysClassField & SysClassFieldRelations;
