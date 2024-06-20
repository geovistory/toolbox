/***
* Revert Functions and Triggers
***/

/***
* Triggers
***/

-- Drop trigger on_modify_project_statement
DROP TRIGGER IF EXISTS after_delete_entity_preview_02 ON pgwar.entity_preview;

-- Drop trigger on_modify_project_statement
DROP TRIGGER IF EXISTS after_upsert_entity_preview_entity_label_02 ON pgwar.entity_preview;

/***
* Functions
***/

-- Drop function pgwar.update_community_entity_label_on_project_entity_label_change
DROP FUNCTION IF EXISTS pgwar.update_community_entity_label_on_project_entity_label_change;

-- Drop function pgwar.get_and_update_community_entity_label
DROP FUNCTION IF EXISTS pgwar.get_and_update_community_entity_label;

-- Drop function pgwar.get_most_frequent_entity_label
DROP FUNCTION IF EXISTS pgwar.get_most_frequent_entity_label;

