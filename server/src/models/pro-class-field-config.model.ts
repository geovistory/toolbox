import {Entity, model, property, hasOne} from '@loopback/repository';
import {ProEntity} from '.';
import {DfhProperty} from './dfh-property.model';
import {SysClassField} from './sys-class-field.model';
import {ProProject} from './pro-project.model';

@model({
  settings: {
    strict: false,
    postgresql: {schema: 'projects', table: 'class_field_config'},
    validateUpsert: true,
    idInjection: false
  }
})
export class ProClassFieldConfig extends Entity implements ProEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
  })
  fk_project?: number;

  @property({
    type: 'number',
  })
  fk_property?: number;

  @property({
    type: 'number',
  })
  fk_class_field?: number;

  @property({
    type: 'number',
  })
  fk_domain_class?: number;

  @property({
    type: 'number',
  })
  fk_range_class?: number;

  @property({
    type: 'number',
  })
  ord_num?: number;

  @property({
    type: 'number',
  })
  fk_class_for_class_field?: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProClassFieldConfig>) {
    super(data);
  }
}

export interface ProClassFieldConfigRelations {
  property?: DfhProperty;
  class_field?: SysClassField;
  project?: ProProject;
}

export type ProClassFieldConfigWithRelations = ProClassFieldConfig & ProClassFieldConfigRelations;