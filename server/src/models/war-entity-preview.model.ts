import {Entity, model, property} from '@loopback/repository';

/**
 * TODO-LB3-LB4
 *
 * Relations: outgoing_statements, incoming_statements, text_properties
 *
 * acls, methods, mixins
 */

@model({
  settings: {
    strict: false,
    forceId: false,
    postgresql: {schema: 'war', table: 'entity_preview'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarEntityPreview extends Entity {
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
  fk_class?: number;

  @property({
    type: 'string',
  })
  class_label?: string;

  @property({
    type: 'string',
  })
  entity_label?: string;

  @property({
    type: 'string',
  })
  entity_type?: string;

  @property({
    type: 'string',
  })
  type_label?: string;

  @property({
    type: 'number',
  })
  fk_type?: number;

  @property({
    type: 'object',
  })
  time_span?: object;

  @property({
    type: 'number',
  })
  first_second?: number;

  @property({
    type: 'number',
  })
  last_second?: number;

  @property({
    type: 'string',
  })
  tmsp_last_modification?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WarEntityPreview>) {
    super(data);
  }
}

export interface WarEntityPreviewRelations {
  // describe navigational properties here
}

export type WarEntityPreviewWithRelations = WarEntityPreview & WarEntityPreviewRelations;