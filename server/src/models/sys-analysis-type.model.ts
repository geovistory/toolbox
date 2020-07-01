import {model, property} from '@loopback/repository';
import {ProEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'system', table: 'analysis_type'}
  }
})
export class SysAnalysisType extends ProEntity {
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
