import {model, property} from '@loopback/repository';
import {InfEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_statement'}
  }
})
export class InfStatement extends InfEntity {
  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_info?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_data?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_tables_cell?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_subject_tables_row?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_property?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_property_of_property?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_info?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_data?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_tables_cell?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fk_object_tables_row?: number;

  @property({
    type: 'number',
  })
  is_in_project_count?: number;

  @property({
    type: 'number',
  })
  is_standard_in_project_count?: number;

  @property({
    type: 'string',
  })
  community_favorite_calendar?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfStatement>) {
    super(data);
  }
}

export interface InfStatementRelations {
  // describe navigational properties here
}

export type InfStatementWithRelations = InfStatement & InfStatementRelations;
