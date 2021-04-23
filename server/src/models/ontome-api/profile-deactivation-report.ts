import {model,property} from '@loopback/repository'

@model()
export class DeactivationReportItem {
 @property({required:true}) identifierInNamespace: string
 @property({required:true}) label: string
 @property({required:true}) id: number
 @property({required:true}) numberOfInstances: number
}

@model()
export class ProfileDeactivationReport {
 @property.array(DeactivationReportItem) maintainedClasses: DeactivationReportItem[]
 @property.array(DeactivationReportItem) deactivatedClasses: DeactivationReportItem[]
 @property.array(DeactivationReportItem) maintainedProperties: DeactivationReportItem[]
 @property.array(DeactivationReportItem) deactivatedProperties: DeactivationReportItem[]
}
