## Sprint 15
### Features
* Access Control: Added a 'system_admin' role to grant administrator permissions to specific users only. GEOV-377
* Backoffice: Add Access Control in frontend (guard and error-page). GEOV-377
* Backoffice: Added a page that lists all geovistory accounts with their roles and their projects
* Access Control: Restricted Access to specific REST API Endpoints:
* * 

### Fixes
* Fix registration and login process (email were not sent). GEOV-99
* Fix browser back navigation from DataUnit/Entity List to Project Dashboard. GEOV-372
* Fix display of newly created DataUnit/Entity (did not appear in List). GEOV-367
* Fix search for existing Entity to not affect other search for existing Entity. GEOV-330
* Fix display of Temporal Entity in Persistent Item Editor (showed only 2 of 3 properties). GEOV-364
* Fix removing Entity (When removing an entity from Project, nothing happened). GEOV-371

### Improvements
* Renamed button to add a Person/Building ect. from "Select a ..." to "Add a...". GEOV-213 
* Redesigned the same button (was to big). GEOV-375 
* Added cursor pointer to expand panel button. GEOV-217


## Sprint 14
### Features
* New Filter for TeEn / PeIt / All in DataUnit search 
* New Page for Phenomenon (TeEn) Editor 
* New Setup-Process for Heroku Review Apps reducing DB-Copy time from ~45min to ~2.5min

### Fixes
* 