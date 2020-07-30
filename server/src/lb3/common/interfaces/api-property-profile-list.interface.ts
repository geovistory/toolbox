
/*
This type reflects the data structure of ontome api

Documentation: http://forum.dataforhistory.org/node/163

Examples:
https://ontome.dataforhistory.org/api/properties-profile.json?lang=en&available-in-profile=8
https://ontome.dataforhistory.org/api/properties-profile.json?lang=en&selected-by-project=6

*/

export type ApiPropertyProfileList = ApiPropertyProfile[];

export interface ApiPropertyProfile {
  propertyID: number,
  propertyLabelLanguage: string,
  propertyLabel: string,
  propertyScopeNoteLanguage: string,
  propertyScopeNote: string,
  isInherited: boolean,
  propertyDomain: number,
  domainInstancesMinQuantifier: number | null,
  domainInstancesMaxQuantifier: number | null,
  propertyRange: number,
  rangeInstancesMinQuantifier: number | null,
  rangeInstancesMaxQuantifier: number | null,
  identityDefining: boolean,
  isHasTypeSubproperty: boolean, // is a subproperty or equivalent property to CRM E55 Type
  propertyIdentifierInNamespace: string,
  namespaceURI: string | null,
  namespaceID: number,
  namespaceLabelLanguage: string,
  namespaceLabel: string,
  profileAssociationType: string | null, // explicitely declared or through general inheritance
  profileID: number,
  profileLabelLanguage: string,
  profileLabel: string
  [key: string]: any
}

