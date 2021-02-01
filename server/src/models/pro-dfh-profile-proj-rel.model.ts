import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'projects', table: 'dfh_profile_proj_rel'},
    validateUpsert: true,
    idInjection: true
  }
})
export class ProDfhProfileProjRel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_profile: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'boolean',
  })
  enabled?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProDfhProfileProjRel>) {
    super(data);
  }
}

export interface ProDfhProfileProjRelRelations {
  // describe navigational properties here
}

export type ProDfhProfileProjRelWithRelations = ProDfhProfileProjRel & ProDfhProfileProjRelRelations;
