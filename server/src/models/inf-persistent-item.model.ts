import {model, property, Entity, hasMany, belongsTo} from '@loopback/repository';
import {InfEntity, ProInfoProjRel} from '.';
import {InfStatement} from './inf-statement.model';
import {InfTextProperty} from './inf-text-property.model';
import {DfhClass} from './dfh-class.model';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_persistent_item'}
  }
})
export class InfPersistentItem extends Entity implements InfEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;
  @hasMany(() => ProInfoProjRel, {keyTo: 'fk_entity'})
  entity_version_project_rels: ProInfoProjRel[];

  @hasMany(() => InfStatement, {keyTo: 'fk_object_info'})
  incoming_statements: InfStatement[];

  @hasMany(() => InfStatement, {keyTo: 'fk_subject_info'})
  outgoing_statements: InfStatement[];

  @hasMany(() => InfTextProperty, {keyTo: 'fk_concerned_entity'})
  text_properties: InfTextProperty[];

  @belongsTo(() => DfhClass, {name: 'dfh_class'})
  fk_class: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfPersistentItem>) {
    super(data);
  }
}

export interface InfPersistentItemRelations {
  // describe navigational properties here
}

export type InfPersistentItemWithRelations = InfPersistentItem & InfPersistentItemRelations;