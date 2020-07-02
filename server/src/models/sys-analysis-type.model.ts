import {model, property, Entity} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'system', table: 'analysis_type'}
  }
})
export class SysAnalysisType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

  @property({
    type: 'string',
  })
  standard_label?: string;

  @property({
    type: 'number',
    required: true,
  })
  rows_limit: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SysAnalysisType>) {
    super(data);
  }
}

export interface SysAnalysisTypeRelations {
  // describe navigational properties here
}

export type SysAnalysisTypeWithRelations = SysAnalysisType & SysAnalysisTypeRelations;
