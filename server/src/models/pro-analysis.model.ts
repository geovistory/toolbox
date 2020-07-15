import {model, property, Entity, hasOne} from '@loopback/repository';
import {ProEntity} from '.';
import {ProProject} from './pro-project.model';
import {PubAccount} from './pub-account.model';

@model({
  settings: {
    strict: true,
    idInjection: false,
    postgresql: {schema: 'projects', table: 'analysis'}
  }
})
export class ProAnalysis extends Entity implements ProEntity {

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  pk_entity?: number;

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
  project?: ProProject;
  account?: PubAccount;
}

export type ProAnalysisWithRelations = ProAnalysis & ProAnalysisRelations;
