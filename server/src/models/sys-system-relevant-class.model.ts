import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {strict: true, postgresql: {schema: 'system', table: 'system_relevant_class'}}
})
export class SysSystemRelevantClass extends Entity {
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
  fk_class?: number;

  @property({
    type: 'boolean',
  })
  required_by_entities?: boolean;

  @property({
    type: 'boolean',
  })
  required_by_sources?: boolean;

  @property({
    type: 'boolean',
  })
  required_by_basics?: boolean;

  @property({
    type: 'boolean',
  })
  excluded_from_entities?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysSystemRelevantClass>) {
    super(data);
  }
}

export interface SysSystemRelevantClassRelations {
  // describe navigational properties here
}

export type SysSystemRelevantClassWithRelations = SysSystemRelevantClass & SysSystemRelevantClassRelations;
