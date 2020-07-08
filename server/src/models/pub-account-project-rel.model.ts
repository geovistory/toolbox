import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'public', table: 'account_project_rel'},
    validateUpsert: true,
    idInjection: true
  }
})
export class PubAccountProjectRel extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    default: 'owner',
  })
  role: string;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'number',
    generated: true,
  })
  account_id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PubAccountProjectRel>) {
    super(data);
  }
}

export interface PubAccountProjectRelRelations {
  // describe navigational properties here
}

export type PubAccountProjectRelWithRelations = PubAccountProjectRel & PubAccountProjectRelRelations;
