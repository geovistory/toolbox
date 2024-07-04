/***
* Drop Triggers
***/

-- Drop trigger on pgwar.project_statements
DROP TRIGGER on_modify_project_statement ON pgwar.project_statements;

-- Drop triggers on pgwar.entity_preview
DROP TRIGGER on_upsert_entity_preview_fk_class ON pgwar.entity_preview;
DROP TRIGGER after_upsert_entity_preview_entity_label_01 ON pgwar.entity_preview;
DROP TRIGGER after_delete_entity_preview_01 ON pgwar.entity_preview;

-- Drop trigger on projects.entity_label_config
DROP TRIGGER on_upsert_entity_label_config ON projects.entity_label_config;

/***
* Drop Functions
***/

-- Drop functions for label retrieval and update
DROP FUNCTION pgwar.get_project_entity_label(entity_id int, project_id int);
DROP FUNCTION pgwar.update_entity_label_of_entity_preview;
DROP FUNCTION pgwar.get_and_update_project_entity_label;

-- Drop functions for label calculation
DROP FUNCTION pgwar.get_target_labels_of_incoming_field;
DROP FUNCTION pgwar.get_target_labels_of_outgoing_field;
DROP FUNCTION pgwar.get_target_label_of_field;

-- Drop trigger functions for label update on changes
DROP FUNCTION pgwar.update_entity_label_on_project_statement_change;
DROP FUNCTION pgwar.update_entity_label_on_fk_class_change;
DROP FUNCTION pgwar.update_entity_label_on_entity_label_change;
DROP FUNCTION pgwar.update_entity_label_on_entity_label_config_change;

/***
* Drop Indexes
***/
DROP INDEX pgwar.entity_label_config_fk_class_idx;
DROP INDEX pgwar.entity_label_config_fk_project_idx;
DROP INDEX pgwar.project_statements_fk_project_fk_object_info_fk_project_idx;
DROP INDEX pgwar.project_statements_fk_project_fk_subject_info_fk_project_idx;