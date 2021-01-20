import {model, property} from '@loopback/repository'
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer'
import {WarEntityPreview} from '../war-entity-preview.model'
import {WarStatementObjectValue} from '../war-statement.model'
@model()
export class AnalysisTableCellValue {
  @property({type: WarStatementObjectValue})
  value: WarStatementObjectValue
  @property()
  pkStatement: number
  @property()
  fkSubjectInfo: number
  @property()
  fkObjectInfo: number
}
@model()
export class AnalysisTableCell {

  // from root table
  @property({type: WarEntityPreview})
  entity?: WarEntityPreview
  @property()
  entityLabel?: string
  @property()
  entityClassLabel?: string
  @property()
  entityTypeLabel?: string
  @property({type: AnalysisTableCellValue})
  value?: AnalysisTableCellValue

  // from joined table
  @property.array(WarEntityPreview)
  entities?: WarEntityPreview[]
  @property.array(AnalysisTableCellValue)
  values?: AnalysisTableCellValue[]
}

@model({
  jsonSchema: {
    additionalProperties: {
      $ref: registerType(AnalysisTableCell)
    }
  }
})
export class AnalysisTableRow {
  col1?: AnalysisTableCell
  [key: string]: AnalysisTableCell | undefined
}

@model()
export class AnalysisTableResponse {
  @property.array(AnalysisTableRow, {required: true})
  rows: AnalysisTableRow[]

  @property()
  full_count: number
};
registerType(AnalysisTableResponse)


