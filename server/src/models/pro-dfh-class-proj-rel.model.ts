import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'projects', table: 'dfh_class_proj_rel'},
    validateUpsert: true,
    idInjection: true
  }
})
export class ProDfhClassProjRel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'boolean',
  })
  enabled_in_entities?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProDfhClassProjRel>) {
    super(data);
  }
}

export interface ProDfhClassProjRelRelations {
  // describe navigational properties here
}

export type ProDfhClassProjRelWithRelations = ProDfhClassProjRel & ProDfhClassProjRelRelations;
