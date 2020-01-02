export interface ProfileActivationReport {
  newClasses: ActivationReportItem[]
  oldClasses: ActivationReportItem[]
  newProperties: ActivationReportItem[]
  oldProperties: ActivationReportItem[]
}

export interface ActivationReportItem {
  label: string,
  identifierInNamespace: string,
  id: number
}
