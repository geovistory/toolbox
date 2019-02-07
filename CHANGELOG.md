# Changelog of Geovistory Developments

## Sprint 15
### Features
* Access Control: Established production-ready Access Control for all REST API Endpoints exposed to the internet: `GEOV-377`
  * Defined needed roles:
    * system_admin (added a static 'system_admin' role for KleioLab team members permitted to configure Geovistory using the Backoffice)
    * project_member (dynamic role, attributed on REST API-request by checking if authenticated user is member of the project he wants to access)
    * $authenticated (built in loopback role for logged in users)
    * $owner (built in loopback role for users owning a model instance)
    * $everyone (built in loopback role for everyone, whether logged in or not)
  * Disabled all unused REST API endpoint, leaving a total of 82 endpoints
  * Splitted some endpoints (with double responsability) in order to have single responsability, which permits setting the permissions for each case separatly.
  * Secured all 82 endpoints by restricting access according to the needs (enabled ACL). (See documentation: https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/13598721/LoopBack+REST+Api)
* Backoffice: Added Access Control in frontend, so that only 'system_admin' can access backoffice (guard and error-page). `GEOV-377`
* Backoffice: Added a page that lists all geovistory accounts with their roles and their projects
* ID of logged-in user gets stored (in table information.entity_version_project_rel, column fk_last_modifier), when she/he modifies data in information schema. `GEOV-271`
* DevOps: Production App on Heroku is up and running on a new App Server and a new DB Server (with backups enabled). `GEOV-383`
* DevOps: Checked security for go live (See notes: https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/925040705/Security) `GEOV-343`
* Project Editor: Added new system for navigation with a left drawer for search-lists and a right panel for detail-pages with tabs and split screen. (See below for: `GEOV-217 GEOV-361 GEOV-362 GEOV-353`)
  
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

## Sprint 14
### Features
* New Filter for TeEn / PeIt / All in DataUnit search 
* New Page for Phenomenon (TeEn) Editor 
* New Setup-Process for Heroku Review Apps reducing DB-Copy time from ~45min to ~2.5min

### Fixes
* 