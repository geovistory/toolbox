
-- 9
SELECT commons.rename_versioned_table ('projects', '_deprecated_label', 'label');


-- 8
ALTER TABLE projects.project DROP CONSTRAINT project_fk_language_fkey;
ALTER TABLE projects.project DROP COLUMN fk_language;
ALTER TABLE projects.project RENAME COLUMN _deprecated_fk_language TO fk_language;
ALTER TABLE projects.project_vt RENAME COLUMN _deprecated_fk_language TO fk_language;
ALTER TABLE projects.project ADD FOREIGN KEY (fk_language) REFERENCES projects.language (pk_language);

-- 7
ALTER TABLE projects.text_property DROP CONSTRAINT text_property_fk_system_type_fkey;
ALTER TABLE system.system_type DROP CONSTRAINT unique_note;

-- 6
ALTER TABLE projects.text_property DROP CONSTRAINT text_property_fk_language_fkey;
ALTER TABLE projects.text_property DROP COLUMN fk_language;
ALTER TABLE projects.text_property RENAME COLUMN _deprecated_fk_language TO fk_language;
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprecated_fk_language TO fk_language;
ALTER TABLE projects.text_property ADD FOREIGN KEY (fk_language) REFERENCES projects.language (pk_language);

-- 5
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprecated_text_property TO text_property;
ALTER TABLE projects.text_property RENAME COLUMN _deprecated_text_property TO text_property;
ALTER TABLE projects.text_property RENAME COLUMN _deprecated_text_property_xml TO text_property_xml;
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprecated_text_property_xml TO text_property_xml;

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
SELECT commons.change_parent_entity_table('projects.assertion', 'projects.entity', 'data.entity');
