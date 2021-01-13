import {model, property} from '@loopback/repository'
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer'
import {WarEntityPreview} from '../war-entity-preview.model'
import {ChartLinePoint} from './analysis-time-chart-response.model'

@model({
  jsonSchema: {
    additionalProperties: true
  }
})
export class AnalysisTableRow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | WarEntityPreview | ChartLinePoint[];

}

@model()
export class AnalysisTableResponse {
  @property.array(AnalysisTableRow, {required: true})
  rows: AnalysisTableRow[]

  @property()
  full_count: number
};
registerType(AnalysisTableResponse)


