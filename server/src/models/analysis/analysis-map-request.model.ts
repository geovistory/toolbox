import {model, property} from '@loopback/repository';
import {AnalysisDefinition} from '..';

@model()
export class AnalysisMapRequest {

  @property({
    type: AnalysisDefinition,
    required: true,
  })
  analysisDefinition: AnalysisDefinition;

  @property({
    type: 'number',
    required: true,
  })
  fkProject: number;
}
