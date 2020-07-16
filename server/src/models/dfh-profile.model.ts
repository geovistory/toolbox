import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    forceId: false,
    postgresql: {schema: 'data_for_history', table: 'v_profile'},
    validateUpsert: true,
    idInjection: true
  }
})
export class DfhProfile extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  pk_profile?: number;

  @property({
    type: 'number',
  })
  owned_by_project?: number;

  @property({
    type: 'boolean',
  })
  is_ongoing_forced_publication?: boolean;

  @property({
    type: 'string',
  })
  date_profile_published?: string;

  @property({
    type: 'string',
  })
  date_profile_deprecated?: string;

  @property({
    type: 'string',
  })
  tmsp_last_dfh_update?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DfhProfile>) {
    super(data);
  }
}

export interface DfhProfileRelations {
  // describe navigational properties here
}

export type DfhProfileWithRelations = DfhProfile & DfhProfileRelations;
