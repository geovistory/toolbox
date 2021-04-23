
/*
This type reflects the data structure of ontome api

Documentation: http://forum.dataforhistory.org/node/163

Examples:
https://ontome.dataforhistory.org/api/properties-profile.json?lang=en&available-in-profile=8
https://ontome.dataforhistory.org/api/properties-profile.json?lang=en&selected-by-project=6

*/

import {property, model} from '@loopback/repository'
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer'

@model({settings: {strict: false}})
export class ApiPropertyProfile {
  @property({required:true}) propertyID: number
  @property({required:true}) propertyLabelLanguage: string
  @property({required:true}) propertyLabel: string
  @property({required:true}) propertyInverseLabel: string
  @property({required:true}) propertyScopeNoteLanguage: string
  @property({required:true}) propertyScopeNote: string
  @property({required:true}) isInherited: boolean
  @property({required:true}) propertyDomain: number
  @property({required:false}) domainInstancesMinQuantifier: number
  @property({required:false}) domainInstancesMaxQuantifier: number
  @property({required:true}) propertyRange: number
  @property({required:false}) rangeInstancesMinQuantifier: number
  @property({required:false}) rangeInstancesMaxQuantifier: number
  @property({required:true}) identityDefining: boolean
  @property({required:true}) isHasTypeSubproperty: boolean // is a subproperty or equivalent property to CRM E55 Type
  @property({required:true}) propertyIdentifierInNamespace: string
  @property({required:false}) namespaceURI: string
  @property({required:true}) namespaceID: number
  @property({required:true}) namespaceLabelLanguage: string
  @property({required:true}) namespaceLabel: string
  @property({required:false}) profileAssociationType: string // explicitely declared or through general inheritance
  @property({required:true}) profileID: number
  @property({required:true}) profileLabelLanguage: string
  @property({required:true}) profileLabel: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
@model({
  jsonSchema: {
    "type": "array",
    "items": {$ref: registerType(ApiPropertyProfile)}
  }
})
export class ApiPropertyProfileList  { }

registerType(ApiPropertyProfileList)
