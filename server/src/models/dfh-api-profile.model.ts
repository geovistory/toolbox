import {Entity, model, property} from '@loopback/repository';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';

@model({
  settings: {
    strict: true,
    forceId: false,
    postgresql: {schema: 'data_for_history', table: 'api_profile'},
    validateUpsert: true,
    idInjection: true
  }
})
export class DfhApiProfile extends Entity {
  @property({type: 'number', id: true})
  pk_entity: number;

  @property({type: 'number'})
  dfh_pk_profile?: number;

  @property({type: 'string'})
  tmsp_last_dfh_update?: string;

  @property({type: 'boolean'})
  is_enabled_in_profile?: boolean;

  @property({type: 'boolean'})
  removed_from_api?: boolean;

  @property({type: 'string'})
  requested_language?: string;

  @property({type: 'string'})
  dfh_profile_label_language?: string;

  @property({type: 'string'})
  dfh_profile_label?: string;

  @property({type: 'string'})
  dfh_profile_definition_language?: string;

  @property({type: 'string'})
  dfh_profile_definition?: string;

  @property({type: 'number'})
  dfh_owned_by_project?: number;

  @property({type: 'string'})
  dfh_project_label_language?: string;

  @property({type: 'string'})
  dfh_project_label?: string;

  @property({type: 'boolean'})
  dfh_is_ongoing_forced_publication?: boolean;

  @property({type: 'string'})
  dfh_date_profile_published?: string;

  @property({type: 'string'})
  dfh_date_profile_deprecated?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DfhApiProfile>) {
    super(data);
  }
}

export interface DfhApiProfileRelations {
  // describe navigational properties here
}

export type DfhApiProfileWithRelations = DfhApiProfile & DfhApiProfileRelations;

registerType(DfhApiProfile)
