import { Entity, model, property } from '@loopback/repository';


@model({ settings: { strict: true, postgresql: { schema: 'data', table: 'factoid_mapping' } } })
export class DatFactoidMapping extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
  })
  fk_class?: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_digital: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<DatFactoidMapping>) {
    super(data);
  }
}

export interface DatFactoidMappingRelations {
  // describe navigational properties here
}

export type DatFactoidMappingWithRelations = DatFactoidMapping & DatFactoidMappingRelations;
