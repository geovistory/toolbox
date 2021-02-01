import {Entity, hasMany, model, property} from '@loopback/repository';
import {DfhProperty} from './dfh-property.model';
import {ProClassFieldConfig} from './pro-class-field-config.model';
import {ProDfhClassProjRel} from './pro-dfh-class-proj-rel.model';
import {RelatedProfile} from './related-profile';

@model({
  settings: {
    strict: true,
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

  @property.array(RelatedProfile)
  profiles?: RelatedProfile[];

  @hasMany(() => ProDfhClassProjRel, {keyTo: 'fk_class'})
  proj_rels: ProDfhClassProjRel[];

  @hasMany(() => DfhProperty, {keyTo: 'has_range'})
  ingoing_properties: DfhProperty[];

  @hasMany(() => DfhProperty, {keyTo: 'has_domain'})
  outgoing_properties: DfhProperty[];

  @hasMany(() => ProClassFieldConfig, {keyTo: 'fk_class_for_class_field'})
  class_field_configs: ProClassFieldConfig[];

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
