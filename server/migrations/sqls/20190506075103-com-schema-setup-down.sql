-- 11
DROP FUNCTION commons.rename_versioned_table;

-- 10.
DROP FUNCTION commons.move_entity_child_with_vt_to_schema;

-- 9.
DROP FUNCTION commons.change_parent_entity_table;

-- 8.
DROP FUNCTION commons.reinit_versioning_triggers;

-- 7.
DROP VIEW commons.v_text_version;

-- 6.
DROP TRIGGER sync_quill_doc_and_string ON commons.text;

-- 5. 
DROP FUNCTION commons.text__sync_quill_doc_and_string();

-- 4. DROP text_vt
DROP TABLE commons.text_vt;

-- 3. DROP the generic text table
DROP TABLE commons.text;


-- 1. Move all the function from renamed commons schema to projects schema
ALTER FUNCTION commons.quill_doc_to_string RENAME TO quill_doc_to_text;

ALTER FUNCTION commons.string_to_quill_doc RENAME TO text_to_quill_doc;

ALTER FUNCTION commons.appellation_label_to_quill_doc SET SCHEMA projects;

ALTER FUNCTION commons.create_entity_version_key SET SCHEMA projects;

ALTER FUNCTION commons.evpr_fk_entity_fk_entity_version SET SCHEMA projects;

ALTER FUNCTION commons.init_entity_child_table SET SCHEMA projects;

ALTER FUNCTION commons.insert_schema_table_name SET SCHEMA projects;

ALTER FUNCTION commons.modernize_quill_doc SET SCHEMA projects;

ALTER FUNCTION commons.quill_doc_to_text SET SCHEMA projects;

ALTER FUNCTION commons.text_to_quill_doc SET SCHEMA projects;

ALTER FUNCTION commons.tmsp_creation SET SCHEMA projects;

ALTER FUNCTION commons.tmsp_last_modification SET SCHEMA projects;

ALTER FUNCTION commons.update_entity_version_key SET SCHEMA projects;

ALTER FUNCTION commons.validate_json_schema SET SCHEMA projects;

ALTER FUNCTION commons._validate_json_schema_type SET SCHEMA projects;

ALTER FUNCTION commons.validate_quill_doc SET SCHEMA projects;

