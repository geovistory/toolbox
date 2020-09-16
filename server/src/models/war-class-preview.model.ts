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
    forceId: false,
    postgresql: {schema: 'war', table: 'class_preview'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarClassPreview extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  fk_class?: number;

  @property({
    type: 'number',
  })
  fk_project?: number;

  @property({
    type: 'string',
  })
  label?: string;

  @property({
    type: 'string',
  })
  tmsp_last_modification?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WarClassPreview>) {
    super(data);
  }
}

export interface WarClassPreviewRelations {
  // describe navigational properties here
}

export type WarClassPreviewWithRelations = WarClassPreview & WarClassPreviewRelations;
