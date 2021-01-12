import {model, property} from '@loopback/repository'
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer'

@model({jsonSchema: {
  additionalProperties: true
}})
export class AnalysisTableRow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

@model()
export class AnalysisTableResponse {
  @property.array(AnalysisTableRow, {required: true})
  rows: AnalysisTableRow[]

  @property()
  full_count: number
};
registerType(AnalysisTableResponse)


