-------------------------------------------------------------------------
-- 1. RENAME assertion --> argument
-------------------------------------------------------------------------

SELECT
    commons.rename_versioned_table ('projects',
        'assertion',
        'argument');

-------------------------------------------------------------------------
-- 2. RENAME ui_context_config --> class_field_config
-------------------------------------------------------------------------

SELECT
    commons.rename_versioned_table ('projects',
        'ui_context_config',
        'class_field_config');

-------------------------------------------------------------------------
-- 3. REINIT VERSIONING Triggers
-------------------------------------------------------------------------
SELECT
    commons.reinit_versioning_triggers ('projects.project');

SELECT
    commons.reinit_versioning_triggers ('projects.label');

SELECT
    commons.reinit_versioning_triggers ('projects.language');

SELECT
    commons.reinit_versioning_triggers ('projects.namespace_project_rel');

SELECT
    commons.reinit_versioning_triggers ('projects.query');

SELECT
    commons.reinit_versioning_triggers ('projects.visual');

SELECT
    commons.reinit_versioning_triggers ('projects.text_property');

-------------------------------------------------------------------------
-- 4. Make text_property child of text
-------------------------------------------------------------------------
DELETE FROM projects.text_property_vt; -- no way back
ALTER TABLE projects.text_property_vt ADD COLUMN entity_version integer;
SELECT commons.make_versioned_table_child_of_text('projects.text_property');
UPDATE projects.text_property SET string = COALESCE(text_property, '');


-------------------------------------------------------------------------
-- 5. Mark unused text columns as deprecated
-------------------------------------------------------------------------
ALTER TABLE projects.text_property RENAME COLUMN text_property TO _deprecated_text_property;
ALTER TABLE projects.text_property_vt RENAME COLUMN text_property TO _deprecated_text_property;
ALTER TABLE projects.text_property RENAME COLUMN text_property_xml TO _deprecated_text_property_xml;
ALTER TABLE projects.text_property_vt RENAME COLUMN text_property_xml TO _deprecated_text_property_xml;

-------------------------------------------------------------------------
-- 6. Rework text_property.fk_language 
-------------------------------------------------------------------------
ALTER TABLE projects.text_property DROP CONSTRAINT text_property_fk_language_fkey;
ALTER TABLE projects.text_property RENAME COLUMN fk_language TO _deprecated_fk_language;
ALTER TABLE projects.text_property_vt RENAME COLUMN fk_language TO _deprecated_fk_language;
ALTER TABLE projects.text_property ADD COLUMN fk_language integer;
UPDATE projects.text_property 
SET fk_language = subq.pk_entity
FROM (
    SELECT pk_language, pk_entity
    FROM information.language
) as subq
WHERE subq.pk_language = _deprecated_fk_language;
ALTER TABLE projects.text_property ADD FOREIGN KEY (fk_language) REFERENCES information.language (pk_entity);

-------------------------------------------------------------------------
-- 7. Rework text_property.system_type 
-------------------------------------------------------------------------
ALTER TABLE system.system_type ADD CONSTRAINT unique_note UNIQUE (notes);
INSERT INTO system.system_type (notes) 
VALUES ('Description of an entity.')
ON CONFLICT DO NOTHING;
UPDATE projects.text_property
SET fk_system_type = subq.pk_entity
FROM (
    SELECT notes, pk_entity
    FROM system.system_type 
) as subq
WHERE subq.notes = 'Description of an entity.';
ALTER TABLE projects.text_property ADD FOREIGN KEY (fk_system_type) REFERENCES system.system_type (pk_entity);


-------------------------------------------------------------------------
-- 8. Rework project.fk_language 
-------------------------------------------------------------------------
ALTER TABLE projects.project DROP CONSTRAINT project_fk_language_fkey;
ALTER TABLE projects.project RENAME COLUMN fk_language TO _deprecated_fk_language;
ALTER TABLE projects.project_vt RENAME COLUMN fk_language TO _deprecated_fk_language;
ALTER TABLE projects.project ADD COLUMN fk_language integer;
UPDATE projects.project 
SET fk_language = subq.pk_entity
FROM (
    SELECT pk_language, pk_entity
    FROM information.language
) as subq
WHERE subq.pk_language = _deprecated_fk_language;
ALTER TABLE projects.project ADD FOREIGN KEY (fk_language) REFERENCES information.language (pk_entity);

-------------------------------------------------------------------------
-- 9. Mark table label as deprecated
-------------------------------------------------------------------------

SELECT
    commons.rename_versioned_table ('projects',
        'label',
        '_deprecated_label');
