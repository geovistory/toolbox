import {model, property, Entity, belongsTo} from '@loopback/repository';
import {DatEntity} from '.';
import {DatNamespace} from './dat-namespace.model';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'data', table: 'column'}
  }
})
export class DatColumn extends Entity implements DatEntity {

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
  fk_digital?: number;

  @property({
    type: 'number',
  })
  fk_data_type?: number;

  @property({
    type: 'number',
  })
  fk_column_content_type?: number;

  @property({
    type: 'number',
  })
  fk_column_relationship_type?: number;

  @property({
    type: 'number',
  })
  fk_original_column?: number;

  @property({
    type: 'boolean',
  })
  is_imported?: boolean;

  @belongsTo(() => DatNamespace, {name: 'namespace'})
  fk_namespace: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DatColumn>) {
    super(data);
  }
}

export interface DatColumnRelations {
  // describe navigational properties here
}

export type DatColumnWithRelations = DatColumn & DatColumnRelations;
