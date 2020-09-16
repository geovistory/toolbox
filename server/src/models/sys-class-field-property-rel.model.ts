import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'system', table: 'class_field_property_rel'},
    validateUpsert: true,
    idInjection: false
  }
})
export class SysClassFieldPropertyRel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
  })
  fk_class_field?: number;

  @property({
    type: 'number',
  })
  fk_property?: number;

  @property({
    type: 'boolean',
  })
  property_is_outgoing?: boolean;

  @property({
    type: 'number',
  })
  ord_num?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysClassFieldPropertyRel>) {
    super(data);
  }
}

export interface SysClassFieldPropertyRelRelations {
  // describe navigational properties here
}

export type SysClassFieldPropertyRelWithRelations = SysClassFieldPropertyRel & SysClassFieldPropertyRelRelations;
