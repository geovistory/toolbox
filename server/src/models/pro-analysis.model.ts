import {model, property} from '@loopback/repository';
import {ProEntity} from '.';

@model({
  settings: {
    strict: false,
    idInjection: false,
    postgresql: {schema: 'projects', table: 'analysis'}
  }
})
export class ProAnalysis extends ProEntity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'object',
    required: true,
  })
  analysis_definition: object;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_analysis_type: number;

  @property({
    type: 'number',
  })
  fk_last_modifier?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProAnalysis>) {
    super(data);
  }
}

export interface ProAnalysisRelations {
  // describe navigational properties here
}

export type ProAnalysisWithRelations = ProAnalysis & ProAnalysisRelations;
