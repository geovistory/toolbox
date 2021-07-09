
/*
This type reflects the data structure of ontome api

Documentation: http://forum.dataforhistory.org/node/163

Examples:

https://ontome.net/api/profiles.json?lang=en
https://ontome.net/api/profiles.json?lang=en&selected-by-project=28
https://ontome.net/api/profiles.json?lang=en&owned-by-project=6
*/

import {model, property} from '@loopback/repository'
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer'

@model()
export class ApiProfileProject {
  @property({required:true}) projectID: number
  @property({required:true}) projectLabelLanguage: string
  @property({required:true}) projectLabel: string
}

@model()
export class ApiProfileSelectedByProjects {
  @property() numberOfProjects: number
  @property.array(ApiProfileProject) projects: ApiProfileProject[]
}
@model({settings: {strict: false}})
export class ApiProfile {
  @property({required: true}) profileID: number
  @property({required: true}) profileLabelLanguage: string
  @property({required: true}) profileLabel: string
  @property({required: true}) profileDefinitionLanguage: string
  @property({required: true}) profileDefinition: string
  @property({required: true}) ownedByProjectID: number
  @property({required: true}) ownedByProjectLabelLanguage: string
  @property({required: true}) ownedByProjectLabel: string
  @property({required: true, type: ApiProfileSelectedByProjects}) selectedByProjects: ApiProfileSelectedByProjects
  @property({required: true}) isOngoingForcedPublication: boolean
  @property() dateProfilePublished: string
  @property() dateProfileDeprecated: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

@model({
  jsonSchema: {
    "type": "array",
    "items": {$ref: registerType(ApiProfile)}
  }
})
export class ApiProfileList  { }

registerType(ApiProfileList)

