/**
* Triggers
**/

DROP TRIGGER after_insert_entity_preview ON pgwar.entity_preview;
DROP TRIGGER after_update_entity_preview ON pgwar.entity_preview;
DROP TRIGGER after_delete_entity_preview_01 ON pgwar.entity_preview;
DROP TRIGGER after_insert_project_statement ON pgwar.project_statements;
DROP TRIGGER after_update_project_statement ON pgwar.project_statements;
DROP TRIGGER after_delete_project_statement ON pgwar.project_statements;
DROP TRIGGER on_upsert_entity_label_config ON projects.entity_label_config;

/***
* Trigger Functions
***/

DROP FUNCTION pgwar.update_entity_label_on_project_statement_upsert;
DROP FUNCTION pgwar.update_entity_label_on_project_statement_delete;
DROP FUNCTION pgwar.update_entity_labels_after_insert;
DROP FUNCTION pgwar.update_entity_labels_after_update;
DROP FUNCTION pgwar.update_entity_labels_after_delete;
DROP FUNCTION pgwar.update_entity_label_on_entity_label_config_change;

/***
* Functions
***/

DROP FUNCTION pgwar.get_entity_label_config(int, int);
DROP FUNCTION pgwar.get_project_entity_label(int, int);
DROP FUNCTION pgwar.get_project_entity_label(int, int, int);
DROP FUNCTION pgwar.get_project_entity_label(int, int, jsonb);
DROP FUNCTION pgwar.update_entity_label_of_entity_preview(int, int, text);
DROP FUNCTION pgwar.get_and_update_project_entity_label(int, int);

/**
* Views
**/

DROP VIEW pgwar.v_community_entity_label;

/**
* Indexes used by get_project_entity_label
**/

DROP INDEX pgwar.project_statements_fk_object_info_fk_project_fk_property_idx;
DROP INDEX pgwar.project_statements_fk_subject_info_fk_project_fk_property_dx;
DROP INDEX pgwar.project_statements_fk_project_fk_property_dx;
DROP INDEX pgwar.project_statements_fk_project_dx;
DROP INDEX information.resource_pk_entity_fk_class_dx;
