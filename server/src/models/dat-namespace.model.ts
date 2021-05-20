import {model, property, Entity} from '@loopback/repository';


@model({settings: {strict: true, postgresql: {schema: 'data', table: 'namespace'}}})
export class DatNamespace extends Entity {
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
  fk_root_namespace?: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'string',
    required: true,
  })
  standard_label: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<DatNamespace>) {
    super(data);
  }
}

export interface DatNamespaceRelations {
  // describe navigational properties here
}

export type DatNamespaceWithRelations = DatNamespace & DatNamespaceRelations;
