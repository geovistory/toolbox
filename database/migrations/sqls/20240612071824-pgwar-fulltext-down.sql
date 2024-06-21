-- Drop triggers
DROP TRIGGER after_delete_project_statements ON pgwar.project_statements;
DROP TRIGGER last_modification_tmsp ON pgwar.entity_full_text;
DROP TRIGGER after_upsert_entity_full_text ON pgwar.entity_full_text;

-- Drop trigger functions
DROP FUNCTION pgwar.handle_project_statements_delete;
DROP FUNCTION pgwar.update_entity_preview_full_text;

-- Drop functions
DROP FUNCTION pgwar.get_label_of_outgoing_field;
DROP FUNCTION pgwar.get_label_of_incoming_field;
DROP FUNCTION pgwar.get_property_label;
DROP FUNCTION pgwar.get_property_inverse_label;
DROP FUNCTION pgwar.get_project_lang_code;
DROP FUNCTION pgwar.get_project_full_text;
DROP FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt;
DROP FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt;
DROP FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt_del;
DROP FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt_del;
DROP FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt_by_dfh_prop;
DROP FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt_by_dfh_prop;
DROP FUNCTION pgwar.get_outdated_full_texts;
DROP FUNCTION pgwar.update_full_texts;

-- Drop tables
DROP TABLE pgwar.project_statements_deleted;
DROP TABLE pgwar.entity_full_text;

-- Drop dblink extension
DROP EXTENSION dblink;
