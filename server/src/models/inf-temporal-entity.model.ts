import { Entity, hasMany, model, property } from '@loopback/repository';
import { InfEntity, ProInfoProjRel } from '.';
import { InfStatement } from './inf-statement.model';
import { InfTextProperty } from './inf-text-property.model';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: { schema: 'information', table: 'temporal_entity' }
  }
})
export class InfTemporalEntity extends Entity implements InfEntity {

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

  @hasMany(() => ProInfoProjRel, { keyTo: 'fk_entity' })
  entity_version_project_rels?: ProInfoProjRel[];

  // @property({
  //   type: 'number',
  // })
  // fk_subject_info?: number;

  // @property({
  //   type: 'number',
  // })
  // fk_object_info?: number;

  @hasMany(() => InfStatement, { keyTo: 'fk_subject_info' })
  outgoing_statements?: InfStatement[];

  @hasMany(() => InfStatement, { keyTo: 'fk_object_info' })
  incoming_statements?: InfStatement[];

  @hasMany(() => InfTextProperty, { keyTo: 'fk_concerned_entity' })
  text_properties?: InfTextProperty[];


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<InfTemporalEntity>) {
    super(data);
  }
}

export interface InfTemporalEntityRelations {
  // describe navigational properties here
}

export type InfTemporalEntityWithRelations = InfTemporalEntity & InfTemporalEntityRelations;
