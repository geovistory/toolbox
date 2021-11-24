import {Entity, hasMany, model, property} from '@loopback/repository';
import {InfEntity} from '.';
import {overrideType} from '../components/spec-enhancer/model.spec.enhancer';
import {InfStatement} from './inf-statement.model';
import {ProInfoProjRel} from './pro-info-proj-rel.model';
import {QuillDoc} from './quill-doc/quill-doc.model';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'information', table: 'v_appellation'}
  }
})
export class InfAppellation extends Entity implements InfEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property()
  quill_doc?: QuillDoc;

  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  @property({
    type: 'string',
  })
  string?: string;

  @hasMany(() => InfStatement, {keyTo: 'fk_object_info'})
  incoming_statements?: InfStatement[];

  @hasMany(() => ProInfoProjRel, {keyTo: 'fk_entity'})
  entity_version_project_rels?: ProInfoProjRel[]

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InfAppellation>) {
    super(data);
  }
}

export interface InfAppellationRelations {
  // describe navigational properties here
}

export type InfAppellationWithRelations = InfAppellation & InfAppellationRelations;


overrideType(InfAppellation) // TODO: remove this, when loopback 3 is completely removed
