import {model, property} from '@loopback/repository';

@model()
export class AnalysisTableExportResponse  {

  @property()
  res?: string;

}
