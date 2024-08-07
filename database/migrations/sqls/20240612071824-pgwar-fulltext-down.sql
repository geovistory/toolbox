-- Drop Index
DROP INDEX IF EXISTS pgwar.entity_full_text_tmsp_last_modification_idx;

-- Drop triggers
DROP TRIGGER after_upsert_entity_full_text ON pgwar.entity_full_text;

-- Drop functions
DROP FUNCTION pgwar.update_entity_preview_full_text();
DROP FUNCTION pgwar.update_full_texts(int);
DROP FUNCTION pgwar.get_outdated_full_texts(int);
DROP FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt_by_dfh_prop(int);
DROP FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt_by_dfh_prop(int);
DROP FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt_del(int);
DROP FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt_del(int);
DROP FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt(int);
DROP FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt(int);
DROP FUNCTION pgwar.get_project_full_text(int, int);
DROP FUNCTION pgwar.get_project_lang_code(int);
DROP FUNCTION pgwar.get_property_inverse_label(int, text);
DROP FUNCTION pgwar.get_property_label(int, text);
DROP FUNCTION pgwar.get_label_of_incoming_field(int, int, int, int);
DROP FUNCTION pgwar.get_label_of_outgoing_field(int, int, int, int);
DROP FUNCTION pgwar.get_target_label_of_field(int, int, jsonb);
DROP FUNCTION pgwar.get_target_labels_of_incoming_field(int, int, int, int);
DROP FUNCTION pgwar.get_target_labels_of_outgoing_field(int, int, int, int);

-- Drop tables
DROP TABLE pgwar.entity_full_text;

-- Drop extension
DROP EXTENSION dblink;
