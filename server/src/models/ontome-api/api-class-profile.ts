
/*
This type reflects the data structure of ontome api

Documentation: http://forum.dataforhistory.org/node/163

Examples:
http://ontome.net/api/classes-class.json?lang=en&available-in-class=8
http://ontome.net/api/classes-class.json?lang=en&selected-by-project=6

*/

import {model, property} from '@loopback/repository'
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer'

@model({settings: {strict: false}})
export class ApiClassProfile {
  @property({required: true}) classID: number
  @property({required: true}) classIdentifierInNamespace: string
  @property({required: true}) classLabel: string
  @property({required: true}) classLabelLanguage: string
  @property({required: true}) classScopeNote: string
  @property({required: true}) classScopeNoteLanguage: string
  @property({required: true}) entityBasicType: number
  @property({required: false}) entityBasicTypeLabel: string
  @property({required: true}) namespaceID: number
  @property({required: true}) namespaceLabel: string
  @property({required: true}) namespaceLabelLanguage: string
  @property({required: false}) namespaceURI: string
  @property({required: true}) profileAssociationType: string
  @property({required: true}) profileID: number
  @property({required: true}) profileLabel: string
  @property({required: true}) profileLabelLanguage: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

@model({
  jsonSchema: {
    "type": "array",
    "items": {$ref: registerType(ApiClassProfile)}
  }
})
export class ApiClassProfileList { }

registerType(ApiClassProfileList)
