-- 15
ALTER FUNCTION projects.v_info_proj_rel_update_or_creat RENAME TO v_entity_version_project_rel_update_or_create;
ALTER FUNCTION projects.v_entity_version_project_rel_update_or_create SET SCHEMA information;
ALTER VIEW projects.v_info_proj_rel RENAME TO v_entity_version_project_rel;
ALTER VIEW projects.v_entity_version_project_rel SET SCHEMA information;

-- 14
ALTER TABLE projects.info_proj_rel RENAME COLUMN _deprecated_pk_entity_version_project_rel TO pk_entity_version_project_rel;
ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN _deprecated_pk_entity_version_project_rel TO pk_entity_version_project_rel;

-- 13
SELECT commons.rename_versioned_table('projects', 'dfh_class_proj_rel', 'proj_rel');
SELECT commons.move_entity_child_with_vt_to_schema('proj_rel', 'projects', 'data_for_history');

-- 12
SELECT commons.rename_versioned_table('projects', 'info_proj_rel', 'entity_version_project_rel');
SELECT commons.move_entity_child_with_vt_to_schema('entity_version_project_rel', 'projects', 'information');

-- 11
ALTER TABLE projects.text_property RENAME COLUMN _deprecated_pk_text_property TO pk_text_property;
ALTER TABLE projects.text_property_vt RENAME COLUMN _deprecated_pk_text_property TO pk_text_property;

-- 10
DELETE FROM projects.text_property WHERE notes = 'added from _deprecated_label table';
