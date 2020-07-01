import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'data_for_history', table: 'v_class'},
    validateUpsert: true,
    plural: 'DfhClasses',
    idInjection: true
  }
})
export class DfhClass extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_class?: number;

  @property({
    type: 'string',
  })
  identifier_in_namespace?: string;

  @property({
    type: 'number',
  })
  basic_type?: number;

  @property({
    type: 'array',
    itemType: 'object',
  })
  profiles?: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DfhClass>) {
    super(data);
  }
}

export interface DfhClassRelations {
  // describe navigational properties here
}

export type DfhClassWithRelations = DfhClass & DfhClassRelations;
