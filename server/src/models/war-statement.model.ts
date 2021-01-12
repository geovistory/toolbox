import {Entity, model, property} from '@loopback/repository';

/**
 * TODO-LB3-LB4
 *
 * Relations: outgoing_statements, incoming_statements, text_properties
 *
 * acls, methods, mixins
 */
export interface WarStatementId {
  pk_entity: number,
  fk_project?: number | null
}

@model({
  settings: {
    forceId: false,
    id: ['pk_entity', 'fk_project'],
    postgresql: {schema: 'war', table: 'statement'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarStatement extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
  })
  fk_project?: number;

  @property({
    type: 'number',
  })
  project?: number;

  @property({
    type: 'number',
  })
  fk_property?: number;

  @property({
    type: 'number',
  })
  fk_object_info?: number;

  @property({
    type: 'number',
  })
  fk_subject_info?: number;

  @property({
    type: 'number',
  })
  ord_num_of_domain?: number;

  @property({
    type: 'number',
  })
  ord_num_of_range?: number;


  @property({
    type: 'number',
  })
  is_in_project_count?: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WarStatement>) {
    super(data);
  }
}

export interface WarStatementRelations {
  // describe navigational properties here
}

export type WarStatementWithRelations = WarStatement & WarStatementRelations;
