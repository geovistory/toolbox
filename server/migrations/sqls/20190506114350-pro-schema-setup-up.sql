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
UPDATE projects.text_property SET string = text_property;


-------------------------------------------------------------------------
-- 5. Mark unused text columns as deprecated
-------------------------------------------------------------------------
ALTER TABLE projects.text_property RENAME COLUMN text_property TO _deprectated_text_property;
ALTER TABLE projects.text_property_vt RENAME COLUMN text_property TO _deprectated_text_property;
ALTER TABLE projects.text_property RENAME COLUMN text_property_xml TO _deprectated_text_property_xml;
ALTER TABLE projects.text_property_vt RENAME COLUMN text_property_xml TO _deprectated_text_property_xml;

-------------------------------------------------------------------------
-- 6. Rework text_property.fk_language 
-------------------------------------------------------------------------
ALTER TABLE projects.text_property DROP CONSTRAINT text_property_fk_language_fkey;
ALTER TABLE projects.text_property RENAME COLUMN fk_language TO _deprectated_fk_language;
ALTER TABLE projects.text_property_vt RENAME COLUMN fk_language TO _deprectated_fk_language;
ALTER TABLE projects.text_property ADD COLUMN fk_language integer;
UPDATE projects.text_property 
SET fk_language = subq.pk_entity
FROM (
    SELECT pk_language, pk_entity
    FROM information.language
) as subq
WHERE subq.pk_language = _deprectated_fk_language;
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
ALTER TABLE projects.project RENAME COLUMN fk_language TO _deprectated_fk_language;
ALTER TABLE projects.project_vt RENAME COLUMN fk_language TO _deprectated_fk_language;
ALTER TABLE projects.project ADD COLUMN fk_language integer;
UPDATE projects.project 
SET fk_language = subq.pk_entity
FROM (
    SELECT pk_language, pk_entity
    FROM information.language
) as subq
WHERE subq.pk_language = _deprectated_fk_language;
ALTER TABLE projects.project ADD FOREIGN KEY (fk_language) REFERENCES information.language (pk_entity);

-------------------------------------------------------------------------
-- 9. Mark table label as deprecated
-------------------------------------------------------------------------

SELECT
    commons.rename_versioned_table ('projects',
        'label',
        '_deprecated_label');

-------------------------------------------------------------------------
-- 10. Transfer labels to table text_property
-------------------------------------------------------------------------
INSERT INTO system.system_type (notes) 
VALUES ('Label of an entity.')
ON CONFLICT DO NOTHING;

INSERT INTO projects.text_property (string, fk_system_type, notes)
SELECT 
    label,
    (
        SELECT pk_entity 
        from system.system_type 
        where notes = 'Label of an entity.'
    ),
    'added from _deprecated_label table'
FROM projects._deprecated_label;

-------------------------------------------------------------------------
-- 11. Mark pk_text_property as deprecated on table text_property
-------------------------------------------------------------------------
ALTER TABLE projects.text_property RENAME COLUMN pk_text_property TO _deprectated_pk_text_property;
ALTER TABLE projects.text_property_vt RENAME COLUMN pk_text_property TO _deprectated_pk_text_property;


-------------------------------------------------------------------------
-- 12. information.entity_version_project_rel --> projects.info_proj_rel
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('entity_version_project_rel', 'information', 'projects');
SELECT commons.rename_versioned_table('projects', 'entity_version_project_rel', 'info_proj_rel');

-------------------------------------------------------------------------
-- 13. data_for_history.proj_rel --> projects.dfh_class_proj_rel
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('proj_rel', 'data_for_history', 'projects');
SELECT commons.rename_versioned_table('projects', 'proj_rel', 'dfh_class_proj_rel');

-------------------------------------------------------------------------
-- 14. Mark pk_entity_version_project_rel as deprecated
-------------------------------------------------------------------------
ALTER TABLE projects.info_proj_rel RENAME COLUMN pk_entity_version_project_rel TO _deprectated_pk_entity_version_project_rel;
ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN pk_entity_version_project_rel TO _deprectated_pk_entity_version_project_rel;

-------------------------------------------------------------------------
-- 15. information.v_entity_version_project_rel --> projects.v_info_proj_rel
-------------------------------------------------------------------------
ALTER VIEW information.v_entity_version_project_rel SET SCHEMA projects;
ALTER VIEW projects.v_entity_version_project_rel RENAME TO v_info_proj_rel;
ALTER FUNCTION information.v_entity_version_project_rel_update_or_create SET SCHEMA projects;
ALTER FUNCTION projects.v_entity_version_project_rel_update_or_create RENAME TO v_info_proj_rel_update_or_creat;