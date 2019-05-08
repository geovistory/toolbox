
-------------------------------------------------------------------------
-- 10. Transfer labels to table text_property
-------------------------------------------------------------------------
INSERT INTO system.system_type (notes) 
VALUES ('Label of an entity.')
ON CONFLICT DO NOTHING;

INSERT INTO projects.text_property (string, fk_system_type, notes)
SELECT 
    COALESCE(label, ''),
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
ALTER TABLE projects.text_property RENAME COLUMN pk_text_property TO _deprecated_pk_text_property;
ALTER TABLE projects.text_property_vt RENAME COLUMN pk_text_property TO _deprecated_pk_text_property;


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
ALTER TABLE projects.info_proj_rel RENAME COLUMN pk_entity_version_project_rel TO _deprecated_pk_entity_version_project_rel;
ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN pk_entity_version_project_rel TO _deprecated_pk_entity_version_project_rel;

-------------------------------------------------------------------------
-- 15. information.v_entity_version_project_rel --> projects.v_info_proj_rel
-------------------------------------------------------------------------
ALTER VIEW information.v_entity_version_project_rel SET SCHEMA projects;
ALTER VIEW projects.v_entity_version_project_rel RENAME TO v_info_proj_rel;
ALTER FUNCTION information.v_entity_version_project_rel_update_or_create SET SCHEMA projects;
ALTER FUNCTION projects.v_entity_version_project_rel_update_or_create RENAME TO v_info_proj_rel_update_or_creat;

