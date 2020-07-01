import {model, property, Entity, hasMany, hasOne} from '@loopback/repository';
import {InfEntity, ProInfoProjRel} from '.';
import {InfPersistentItem} from './inf-persistent-item.model';
import {InfTemporalEntity} from './inf-temporal-entity.model';
import {InfLanguage} from './inf-language.model';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'information', table: 'v_text_property'},
    plural: 'InfTextProperties'
  }
})
export class InfTextProperty extends Entity implements InfEntity {

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
  fk_class_field: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_concerned_entity: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_language: number;

  @property({
    type: 'object',
    required: true,
  })
  quill_doc: object;

  @property({
    type: 'string',
  })
  string?: string;

  @hasMany(() => ProInfoProjRel, {keyTo: 'fk_entity'})
  entity_version_project_rels: ProInfoProjRel[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InfTextProperty>) {
    super(data);
  }
}

export interface InfTextPropertyRelations {
  persistent_item?: InfPersistentItem;
  temporal_entity?: InfTemporalEntity;
  language?: InfLanguage;
}

export type InfTextPropertyWithRelations = InfTextProperty & InfTextPropertyRelations;
