import { model, property } from '@loopback/repository';
import { AnalysisDefinition } from '../pro-analysis.model';

export enum TableExportFileType { 'json' = 'json', 'csv' = 'csv' }

@model()
export class AnalysisTableExportRequest {

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(TableExportFileType),
    },
    required: true
  })
  fileType: TableExportFileType;


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
