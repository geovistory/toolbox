# Changelog of Geovistory Developments
## Sprint 16
### Features
* Queries:
  * Added new table commons.query, storing the query itself (not the results). `GEOV-396 GEOV-397`
  * Added API Endpoints, all of them restricted to project_members: `GEOV-397`
    * findPerProject: finds all queries of the project
    * findByIdAndProject: finds one query by id
    * create: persists a new query to the datastore 
    * patchAttributes: updates an existing query
    * deleteById: deletes a query
    * run: executes a query and returns results (with pagination, if requested)
    * runAndExport: executes a query and returns a json or csv of the entire query results (without pagination)
  * Added GUI: `GEOV-397`
    * Query-List: Simple list of all Queries of project with name and description (no filtering, sorting yet)
    * Query-Detail-Page: 
      * Visual Query Builder allows to create new or edit existing queries, defining complex filters to restrict the resulting row and specific query paths to map related information to different columns. 
      * A Result Table shows the results with infinit virtual scroll
      * Export button allows to download the full Query Results as JSON or CSV
* Backoffice: 
  * Warehouse tab with Button to recreate all entity previews in the warehouse. Useful to initialize entity previews after deployment on a fresh db and for debugging.
  * Type Classes tab with Table showing which Type Classes are in use for which Typed Classes. (This is a chrutch, needed as long as property-hierarchy is not reflected in Geovistory)

### Improvements
* Improved performance of loading types of classes, since this slowed down the usage noticeably.noticeable `GEOV-386`
* Added colors to the main categories of Geovistory Toolbox

### Fixes
* No fixes, but may be new bugs. Long live biodiversity!


## Sprint 15
### Features
* Access Control: Established production-ready Access Control for all REST API Endpoints: `GEOV-377`
  * Defined needed roles:
    * system_admin (added a static 'system_admin' role for KleioLab team members permitted to configure Geovistory using the Backoffice)
    * project_member (dynamic role, attributed on REST API-request by checking if authenticated user is member of the project he wants to access)
    * $authenticated (built in loopback role for logged in users)
    * $owner (built in loopback role for users owning a model instance)
    * $everyone (built in loopback role for everyone, whether logged in or not)
  * Splitted some endpoints (with double responsability) in order to have single responsability, which permits setting the permissions for each case separatly.
  * Disabled all unused REST API endpoint, leaving a total of 82 endpoints
  * Secured all 82 endpoints by restricting access according to the needs (enabled ACL). (See documentation: https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/13598721/LoopBack+REST+Api)
* Backoffice: Added Access Control in frontend, so that only 'system_admin' can access backoffice (guard and error-page). `GEOV-377`
* Backoffice: Added a page that lists all geovistory accounts with their roles and their projects
* Metadata: ID of logged-in user gets stored, when she/he modifies data in information schema (in table information.entity_version_project_rel, column fk_last_modifier). `GEOV-271`
* DevOps: Production App on Heroku is up and running on a new App Server and a new DB Server, ready for beta release (with backups enabled). `GEOV-383`
* DevOps: Checked security for go live (See notes: https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/925040705/Security) `GEOV-343`
* Project Edit: Added new UI for navigation within the project's data, using a left drawer for search-lists and a right panel for detail-pages with tabs and resizable split screen. (See below for: `GEOV-217 GEOV-361 GEOV-362 GEOV-353`)
* Warehouse: Added new db-schema 'warehouse'
  * The schema holds data aggregated from other schemas (mainly information and data_for_history), updated by asyncronous (!) triggers
  * The table entity_preview provides previews for each entity (PeIt/TeEn) per project and the repository-version. (See documentation: https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/893878275/warehouse.entity+preview+Table)
  * The table emits a notification on update or insert, permitting to establish a stream of entity_previews
* Project Edit: Added subscription to stream of entity_previews using socket-io, so that changes to the entity_previews get streamt to all clients of the same project.

### Fixes
* Fixed registration and login process (email were not sent). `GEOV-99`
* Fixed browser back navigation from DataUnit/Entity List to Project Dashboard. `GEOV-372`
* Fixed display of newly created DataUnit/Entity (did not appear in List). `GEOV-367`
* Fixed search for existing Entity to not affect other search for existing Entity. `GEOV-330`
* Fixed display of Temporal Entity in Persistent Item Editor (showed only 2 of 3 properties). `GEOV-364`
* Fixed removing Entity (When removing an entity from Project, nothing happened). `GEOV-371`
* Fixed add geocoordinates. `GEOV-387`
* Fixed can't create annotation on unsaved Text. GEO-369
* Fixed email verification resend functionality (by deleting the feature, only temporary solution). `GEOV-99` 

### Improvements
* Renamed button to add a Person/Building ect. from "Select a ..." to "Add a...". `GEOV-213` 
* Redesigned button to add a Person/Building ect. (was to big). `GEOV-375` 
* Added cursor pointer to expand panel button. `GEOV-217`
* Redesigned Add or Create PeIt Form (removed disturbing titles). `GEOV-366`
* Redesigned DataUnit/Entity Preview (smaller icon). `GEOV-363`
* Redesigned DataUnit/Entity List (using the new side drawer). `GEOV-362`
* Renamed DataUnit to Entity everywhere in GUI and almost everywhere in Code. `GEOV-360`
* Added a tooltip to close button of tiles. `GEOV-354`
* Removed the link in search hit when Adding/Selecting/Opening an entity. `GEOV-214`
* Resolved: Data Units Button needs Cursor Pointer. `GEOV-216`
* Disabled Drag and Drop of DataUnitPreview in TeEn. `GEOV-370`
* Improved «Add a Section» Page by using the new tab system (still not perfect, but may be better). `GEOV-353` 
* Redesigned Headers `GEOV-361`
* Added possibility to unselect Type of Entity `GEOV-374`
* Improved Timeline: `GEOV-222`
  * Very small dates have a minimal width, so that they stay visible. 
  * Tick-Labels are a bit better, although not perfect
  * Zooming takes the cursor as its center, so that zooming on a specific spot is easier
  * Added tooltip for each timespan, displaying some readable date. 

## Sprint 14
### Features
* New Filter for TeEn / PeIt / All in DataUnit search 
* New Page for Phenomenon (TeEn) Editor 
* New Setup-Process for Heroku Review Apps reducing DB-Copy time from ~45min to ~2.5min

### Fixes
* 