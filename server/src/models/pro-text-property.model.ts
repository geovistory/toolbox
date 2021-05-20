import {model, property, Entity} from '@loopback/repository';
import {ProEntity} from '.';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'projects', table: 'text_property'}
  }
})
export class ProTextProperty  extends Entity implements ProEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'string',
    required: true,
  })
  string: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_system_type: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_language: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'number',
  })
  fk_dfh_class?: number;

  @property({
    type: 'number',
  })
  fk_dfh_property?: number;

  @property({
    type: 'number',
  })
  fk_dfh_property_domain?: number;

  @property({
    type: 'number',
  })
  fk_dfh_property_range?: number;

  @property({
    type: 'number',
  })
  fk_pro_project?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<ProTextProperty>) {
    super(data);
  }
}

export interface ProTextPropertyRelations {
  // describe navigational properties here
}

export type ProTextPropertyWithRelations = ProTextProperty & ProTextPropertyRelations;
