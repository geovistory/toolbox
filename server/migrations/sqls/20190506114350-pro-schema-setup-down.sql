-- 15
ALTER FUNCTION projects.v_info_proj_rel_update_or_creat RENAME TO v_entity_version_project_rel_update_or_create;
ALTER FUNCTION projects.v_entity_version_project_rel_update_or_create SET SCHEMA information;
ALTER VIEW projects.v_info_proj_rel RENAME TO v_entity_version_project_rel;
ALTER VIEW projects.v_entity_version_project_rel SET SCHEMA information;

-- 14
ALTER TABLE projects.info_proj_rel RENAME COLUMN _deprectated_pk_entity_version_project_rel TO pk_entity_version_project_rel;
ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN _deprectated_pk_entity_version_project_rel TO pk_entity_version_project_rel;

-- 13
SELECT commons.rename_versioned_table('projects', 'dfh_class_proj_rel', 'proj_rel');
SELECT commons.move_entity_child_with_vt_to_schema('proj_rel', 'projects', 'data_for_history');

-- 12
SELECT commons.rename_versioned_table('projects', 'info_proj_rel', 'entity_version_project_rel');
SELECT commons.move_entity_child_with_vt_to_schema('entity_version_project_rel', 'projects', 'information');

-- 11
ALTER TABLE projects.text_property RENAME COLUMN _deprectated_pk_text_property TO pk_text_property;
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprectated_pk_text_property TO pk_text_property;

-- 10
DELETE FROM projects.text_property WHERE notes = 'added from _deprecated_label table';

-- 9
SELECT commons.rename_versioned_table ('projects', '_deprecated_label', 'label');


-- 8
ALTER TABLE projects.project DROP CONSTRAINT project_fk_language_fkey;
ALTER TABLE projects.project DROP COLUMN fk_language;
ALTER TABLE projects.project RENAME COLUMN _deprectated_fk_language TO fk_language;
ALTER TABLE projects.project_vt RENAME COLUMN _deprectated_fk_language TO fk_language;
ALTER TABLE projects.project ADD FOREIGN KEY (fk_language) REFERENCES projects.language (pk_language);

-- 7
ALTER TABLE projects.text_property DROP CONSTRAINT text_property_fk_system_type_fkey;
ALTER TABLE system.system_type DROP CONSTRAINT unique_note;

-- 6
ALTER TABLE projects.text_property DROP CONSTRAINT text_property_fk_language_fkey;
ALTER TABLE projects.text_property DROP COLUMN fk_language;
ALTER TABLE projects.text_property RENAME COLUMN _deprectated_fk_language TO fk_language;
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprectated_fk_language TO fk_language;
ALTER TABLE projects.text_property ADD FOREIGN KEY (fk_language) REFERENCES projects.language (pk_language);

-- 5
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprectated_text_property TO text_property;
ALTER TABLE projects.text_property RENAME COLUMN _deprectated_text_property TO text_property;
ALTER TABLE projects.text_property RENAME COLUMN _deprectated_text_property_xml TO text_property_xml;
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprectated_text_property_xml TO text_property_xml;

-- 4
SELECT commons.unmake_versioned_table_child_of_text('projects.text_property');
ALTER TABLE projects.text_property_vt DROP COLUMN entity_version;

-- 3
SELECT commons.reinit_versioning_triggers('projects.label', 'commons.label');
SELECT commons.reinit_versioning_triggers('projects.language', 'commons.language');
SELECT commons.reinit_versioning_triggers('projects.namespace_project_rel', 'commons.namespace_project_rel');
SELECT commons.reinit_versioning_triggers('projects.query', 'commons.query');
SELECT commons.reinit_versioning_triggers('projects.visual', 'commons.visual');
SELECT commons.reinit_versioning_triggers('projects.text_property', 'commons.text_property');

-- 2
SELECT commons.rename_versioned_table('projects', 'class_field_config', 'ui_context_config');

-- 1
SELECT commons.rename_versioned_table('projects', 'argument', 'assertion');
