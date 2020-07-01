import {model, property} from '@loopback/repository';
import {ProEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'projects', table: 'v_info_proj_rel'}
  }
})
export class ProInfoProjRel extends ProEntity {
  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'number',
    generated: true,
  })
  fk_entity?: number;

  @property({
    type: 'string',
    generated: true,
  })
  fk_entity_version?: string;

  @property({
    type: 'string',
  })
  fk_entity_version_concat?: string;

  @property({
    type: 'boolean',
  })
  is_in_project?: boolean;

  @property({
    type: 'boolean',
  })
  is_standard_in_project?: boolean;

  @property({
    type: 'string',
  })
  calendar?: string;

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
  ord_num_of_text_property?: number;

  @property({
    type: 'number',
  })
  fk_creator?: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_last_modifier: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProInfoProjRel>) {
    super(data);
  }
}

export interface ProInfoProjRelRelations {
  // describe navigational properties here
}

export type ProInfoProjRelWithRelations = ProInfoProjRel & ProInfoProjRelRelations;
