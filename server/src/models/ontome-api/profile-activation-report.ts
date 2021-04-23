import {model, property} from '@loopback/repository'

@model()
export class ActivationReportItem {
  @property({required: true}) label: string
  @property({required: true}) identifierInNamespace: string
  @property({required: true}) id: number
}

@model()
export class ProfileActivationReport {
  @property.array(ActivationReportItem) newClasses: ActivationReportItem[]
  @property.array(ActivationReportItem) oldClasses: ActivationReportItem[]
  @property.array(ActivationReportItem) newProperties: ActivationReportItem[]
  @property.array(ActivationReportItem) oldProperties: ActivationReportItem[]
}
