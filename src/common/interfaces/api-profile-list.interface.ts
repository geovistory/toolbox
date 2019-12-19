
/*
This type reflects the data structure of ontome api

Documentation: http://forum.dataforhistory.org/node/163

Examples:

https://ontome.dataforhistory.org/api/profiles.json?lang=en
https://ontome.dataforhistory.org/api/profiles.json?lang=en&selected-by-project=28
https://ontome.dataforhistory.org/api/profiles.json?lang=en&owned-by-project=6
*/

export type ApiProfileList = ApiProfile[];

export interface ApiProfile {
  profileID: number,
  profileLabelLanguage: string,
  profileLabel: string,
  profileDefinitionLanguage: string,
  profileDefinition: string,
  ownedByProjectID: number,
  ownedByProjectLabelLanguage: string,
  ownedByProjectLabel: string,
  selectedByProjects: {
    numberOfProjects: number,
    projects: ApiProfileProject[]
  },
  isOngoingForcedPublication: boolean,
  dateProfilePublished: string | null,
  dateProfileDeprecated: string | null
  [key: string]: any
}

export interface ApiProfileProject {
  projectID: number,
  projectLabelLanguage: string,
  projectLabel: string
}
