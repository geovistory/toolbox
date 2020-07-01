import {model, property} from '@loopback/repository';
import {SysEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'system', table: 'v_has_type_preview'}
  }
})
export class SysClassHasTypeProperty extends SysEntity {
  @property({
    type: 'number',
  })
  pk_typed_class?: number;

  @property({
    type: 'string',
  })
  typed_class_label?: string;

  @property({
    type: 'number',
  })
  dfh_pk_property?: number;

  @property({
    type: 'string',
  })
  property_label?: string;

  @property({
    type: 'number',
  })
  pk_type_class?: number;

  @property({
    type: 'string',
  })
  type_class_label?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysClassHasTypeProperty>) {
    super(data);
  }
}

export interface SysClassHasTypePropertyRelations {
  // describe navigational properties here
}

export type SysClassHasTypePropertyWithRelations = SysClassHasTypeProperty & SysClassHasTypePropertyRelations;
