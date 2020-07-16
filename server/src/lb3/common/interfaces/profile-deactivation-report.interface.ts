export interface ProfileDeactivationReport {
  maintainedClasses: DeactivationReportItem[]
  deactivatedClasses: DeactivationReportItem[]
  maintainedProperties: DeactivationReportItem[]
  deactivatedProperties: DeactivationReportItem[]
}

export interface DeactivationReportItem {
  identifierInNamespace: string,
  label: string,
  id: number,
  numberOfInstances: number
}
