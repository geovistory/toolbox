import { Entity, hasMany, model, property } from '@loopback/repository';
import { InfEntity, InfStatementWithRelations, ProInfoProjRel } from '.';
import { InfStatement } from './inf-statement.model';
import {CommunityVisibilityOptions} from './sys-config/sys-config-community-visibility-options';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: { schema: 'information', table: 'resource' }
  }
})
export class InfResource extends Entity implements InfEntity {

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


  @hasMany(() => InfStatement, { keyTo: 'fk_subject_info' })
  outgoing_statements?: InfStatementWithRelations[];

  @hasMany(() => InfStatement, { keyTo: 'fk_object_info' })
  incoming_statements?: InfStatementWithRelations[];


  @property({
    type: CommunityVisibilityOptions,
  })
  community_visibility: CommunityVisibilityOptions;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InfResource>) {
    super(data);
  }
}

export interface InfResourceRelations {
  outgoing_statements?: InfStatementWithRelations[];
  incoming_statements?: InfStatementWithRelations[];
}


export type InfResourceWithRelations = InfResource & InfResourceRelations;
