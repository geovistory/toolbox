import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    strict: true,
    postgresql: { schema: 'projects', table: 'project' },
    validateUpsert: true,
    idInjection: false
  }
})
export class ProProject extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity: number;

  @property({
    type: 'number',
  })
  fk_language?: number;

  @property({
    type: 'number',
  })
  fk_cloned_from_project?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<ProProject>) {
    super(data);
  }
}

export interface ProProjectRelations {
  // describe navigational properties here
}

export type ProProjectWithRelations = ProProject & ProProjectRelations;
