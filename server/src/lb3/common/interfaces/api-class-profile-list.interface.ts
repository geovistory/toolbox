
/*
This type reflects the data structure of ontome api

Documentation: http://forum.dataforhistory.org/node/163

Examples:
http://ontome.net/api/classes-class.json?lang=en&available-in-class=8
http://ontome.net/api/classes-class.json?lang=en&selected-by-project=6

*/

export type ApiClassProfileList = ApiClassProfile[];

export interface ApiClassProfile {
  classID: number
  classIdentifierInNamespace: string
  classLabel: string
  classLabelLanguage: string
  classScopeNote: string
  classScopeNoteLanguage: string
  entityBasicType: number
  entityBasicTypeLabel: string | null
  namespaceID: number
  namespaceLabel: string
  namespaceLabelLanguage: string
  namespaceURI: string | null
  profileAssociationType: string
  profileID: number
  profileLabel: string
  profileLabelLanguage: string
  [key: string]: any
}
