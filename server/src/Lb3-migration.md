
SchemaObject

GET
​/lb3-api​/SchemaObjects​/remove-entity-from-project
Remove entity with outgoing statements and namings from project.
`--> ProjectData`


GET
​/lb3-api​/SchemaObjects​/add-entity-to-project
Add entity with outgoing statements and namings to project.
`--> ProjectData`

GET
​/lb3-api​/SchemaObjects​/type-of-project
Get a object containing apllations and definition of a type (project variant).
`DELETE`




SysClassField

GET
​/lb3-api​/SysClassFields
Find all instances of the model matched by filter from the data source.
`DELETE`

POST
​/lb3-api​/SysClassFields​/findComplex
`DELETE`
SysClassHasTypeProperty

GET
​/lb3-api​/SysClassHasTypeProperties
Find all instances of the model matched by filter from the data source.
`DELETE`



SysSystemRelevantClass

GET
​/lb3-api​/SysSystemRelevantClasses
Find all instances of the model matched by filter from the data source.
`--> SystemConfig`

POST
​/lb3-api​/SysSystemRelevantClasses​/bulk-replace-or-create
Replace or create all items in the array.
`--> SystemConfig`




PubAccount

GET
​/lb3-api​/PubAccounts​/{id}​/get-roles
Get Roles of the Account
`--> Account`

GET
​/lb3-api​/PubAccounts​/{id}​/list-projects
Get a list of all projects associated with this account.
`--> Account`

GET
​/lb3-api​/PubAccounts​/with-roles-and-projects
Get all accounts with their project pks and their roles
`--> Account`

POST
​/lb3-api​/PubAccounts​/login
Login a user with username/email and password.
`DELETE`

POST
​/lb3-api​/PubAccounts​/logout
Logout a user with access token.
`--> Account`



ProProject

GET
​/lb3-api​/ProProjects​/of-account
Get the projects of account.
`--> Account`

POST
​/lb3-api​/ProProjects​/create-with-label-and-description
Create a new project with a label and a description.
`--> ProjectConfig`

GET
​/lb3-api​/ProProjects​/get-basics
Get basic information about the project (language, name)
`--> ProjectConfig`


ProTextProperty

GET
​/lb3-api​/ProTextProperties​/of-project
Get the text-properties of the project.
`--> ProjectConfig`

POST
​/lb3-api​/ProTextProperties​/bulk-upsert
Inserts or updates items in the array of ProTextProperty. If pk_entity is given and existing, an update is done, else an insert
`--> ProjectConfig`

PUT
​/lb3-api​/ProTextProperties​/bulk-delete
Dletes items in the array of ProTextProperty. Checks for each item if fk_project matches given pkProject
`--> ProjectConfig`


ProInfoProjRel

PATCH
​/lb3-api​/ProInfoProjRels
Patch an existing model instance or insert a new one into the data source.
`--> ProjectData`

GET
​/lb3-api​/ProInfoProjRels
Find all instances of the model matched by filter from the data source.
`--> ProjectData`

PUT
​/lb3-api​/ProInfoProjRels​/mark-statement-as-favorite
Marks the statement as favorite for the given fk_project.
`--> ProjectData`

PUT
​/lb3-api​/ProInfoProjRels​/updateEprAttributes
Updates the ProInfoProjRel found by fk_project and fk_entity.
`--> ProjectData`

PUT
​/lb3-api​/ProInfoProjRels​/bulk-update-attributes
Updates the ProInfoProjRel of all found by fk_project and fk_entity.
`--> ProjectData`

DfhProfile

GET
​/lb3-api​/DfhProfiles​/of-project
Get all profiles that are used by the given project.
`--> DataModel`

DfhLabel

GET
​/lb3-api​/DfhLabels​/of-project
Get all dfh labels needed by the given project.
`--> DataModel`

DatChunk

GET
​/lb3-api​/DatChunks​/{id}
Find a model instance by {{id}} from the data source.
`DELETE`

GET
​/lb3-api​/DatChunks​/of-digital
Get the chunks related to the digital, with their statements.
`--> ProjectData`


DatColumn

GET
​/lb3-api​/DatColumns​/of-digital
Get the columns related to the digital (table).
`--> ProjectData > Table`


DatDigital

GET
​/lb3-api​/DatDigitals​/{id}
Find a model instance by {{id}} from the data source.
`DELETE`

PUT
​/lb3-api​/DatDigitals​/bulk-upsert
Creates or updates instances of DatDigital.
`--> ProjectData > Text`

PUT
​/lb3-api​/DatDigitals​/delete-delete
Deletes instances of DatDigital.
`--> ProjectData > Text`

GET
​/lb3-api​/DatDigitals​/get-version
Finds the version of given digital. If no version specified, latest is returned.
`--> ProjectData > Text`

POST
​/lb3-api​/DatDigitals​/getTablePage
Get page of table
`DELETE`


ProClassFieldConfig

PATCH
​/lb3-api​/ProClassFieldConfigs
Patch an existing model instance or insert a new one into the data source.
`DELETE`

GET
​/lb3-api​/ProClassFieldConfigs​/of-project
Find ProClassFieldConfig of project
`--> ProjectConfig`

PUT
​/lb3-api​/ProClassFieldConfigs​/bulk-upsert
Creates or updates instances of ProClassFieldConfig.
`--> ProjectConfig`

PUT
​/lb3-api​/ProClassFieldConfigs​/bulk-delete
Deletes instances of ProClassFieldConfig.
`--> ProjectConfig`

ProDfhClassProjRel

POST
​/lb3-api​/ProDfhClassProjRels
Create a new instance of the model and persist it into the data source.
`DELETE`

GET
​/lb3-api​/ProDfhClassProjRels​/of-project
Find ProDfhClassProjRel of project
`--> ProjectConfig`

PUT
​/lb3-api​/ProDfhClassProjRels​/bulk-upsert
Creates or updates instances of ProDfhClassProjRel.
`--> ProjectConfig`


ProDfhProfileProjRel

GET
​/lb3-api​/ProDfhProfileProjRels​/of-project
Find ProDfhProfileProjRel of project where enabled is true
`--> ProjectConfig`

PUT
​/lb3-api​/ProDfhProfileProjRels​/bulk-upsert
Creates or updates instances of ProDfhProfileProjRel.
`DELETE`


InfTemporalEntity



POST
​/lb3-api​/InfTemporalEntities​/find-or-create-many
Find or create many information temporal entities.
`--> ProjectData` --> `project-data/upsert-resources`

GET
​/lb3-api​/InfTemporalEntities​/own-properties
Get e schema object of own properties of the temporal entity in project version.
`--> ProjectData` --> `project-data/get-resource`



InfStatement


POST
​/lb3-api​/InfStatements​/find-or-create-many
Find or create information statement.
`--> ProjectData`


InfLanguage

GET
​/lb3-api​/InfLanguages
Find all instances of the model matched by filter from the data source.
`DELETE`

GET
​/lb3-api​/InfLanguages​/query-by-string
Perform a ranked search on languages by search string.
`--> ProjectData`


InfPersistentItem

POST
​/lb3-api​/InfPersistentItems​/find-or-create-many
Find or create many information persistent items.
`--> ProjectData` --> `project-data/upsert-resources`


GET
​/lb3-api​/InfPersistentItems​/own-properties
Get only miminal properties of persistent item.
`--> ProjectData` --> `project-data/get-resource`


GET
​/lb3-api​/InfPersistentItems​/types-of-project
Get a minimal nested object of all types in the project.
`--> ProjectData` --> `project-data/get-types-of-project`


GET
​/lb3-api​/InfPersistentItems​/types-of-classes-and-project
Find types of typed class and project. E.g. get the types for the class 'histC8 Geographical Place' (pk_typed_class=363) used in project (pk_project=123)
`DELETE`

GET
​/lb3-api​/InfPersistentItems​/type-nested
Find one type by pk_entity with appellations and text properties.
`DELETE`



InfPlace

GET
​/lb3-api​/InfPlaces
Find all instances of the model matched by filter from the data source.
`DELETE`

POST
​/lb3-api​/InfPlaces​/findOrCreate
Find or create a InfPlace and update the project relation if needed.
`DELETE`

DatNamespace

GET
​/lb3-api​/DatNamespaces​/{id}
Find a model instance by {{id}} from the data source.
`DELETE`

GET
​/lb3-api​/DatNamespaces
Find all instances of the model matched by filter from the data source.
`DELETE`

GET
​/lb3-api​/DatNamespaces​/find-by-project
Finds namespaces of a project.
`--> ProjectConfig`


InfTextProperty

POST
​/lb3-api​/InfTextProperties​/find-or-create-many
Find or create information text properties.
`DELETE`

POST
​/lb3-api​/InfTextProperties​/findOrCreate
Find or create a InfTextProperty and update the project relation if needed.
`DELETE`

POST
​/lb3-api​/InfTextProperties​/findAlternativeTextProperties
Find all InfTextProperties that are not yet added to the given project.
`DELETE`

SysSystemType

GET
​/lb3-api​/SysSystemTypes
Find all instances of the model matched by filter from the data source.
`--> SystemConfig`
