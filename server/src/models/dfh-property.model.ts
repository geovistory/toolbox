import {Entity, model, property} from '@loopback/repository';
import {RelatedProfile} from "./related-profile";

@model({
  settings: {
    strict: true,
    forceId: false,
    postgresql: {schema: 'data_for_history', table: 'v_property'},
    validateUpsert: true,
    plural: 'DfhProperties',
    idInjection: true
  }
})
export class DfhProperty extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  pk_property: number;

  @property({
    type: 'boolean',
  })
  is_inherited?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  has_domain: number;

  @property({
    type: 'number',
  })
  domain_instances_min_quantifier?: number;

  @property({
    type: 'number',
  })
  domain_instances_max_quantifier?: number;

  @property({
    type: 'number',
    required: true,
  })
  has_range: number;

  @property({
    type: 'number',
  })
  range_instances_min_quantifier?: number;

  @property({
    type: 'number',
  })
  range_instances_max_quantifier?: number;

  @property({
    type: 'boolean',
  })
  identity_defining?: boolean;

  @property({
    type: 'boolean',
  })
  is_has_type_subproperty?: boolean;

  @property({
    type: 'string',
  })
  identifier_in_namespace?: string;

  @property.array(RelatedProfile)
  profiles?: RelatedProfile[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DfhProperty>) {
    super(data);
  }
}

export interface DfhPropertyRelations {
  // describe navigational properties here
}

export type DfhPropertyWithRelations = DfhProperty & DfhPropertyRelations;
