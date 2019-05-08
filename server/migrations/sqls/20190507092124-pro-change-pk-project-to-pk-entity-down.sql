-- 22
ALTER TABLE projects.class_field_config
    ADD CONSTRAINT ui_context_config_fk_project_fkey FOREIGN KEY (_deprecated_fk_project)
    REFERENCES projects.project (_deprecated_pk_project);

SELECT commons.unmake_change_fk_reference_of_versioned_table('projects', 'class_field_config', 'fk_project');

-- 21
SELECT commons.unmake_change_fk_reference_of_versioned_table('public', 'account_project_rel', 'fk_project');
DROP TABLE public.account_project_rel_vt;
DROP TRIGGER create_entity_version_key ON public.account_project_rel;
DROP TRIGGER creation_tmsp ON public.account_project_rel;
DROP TRIGGER insert_schema_table_name ON public.account_project_rel;
DROP TRIGGER last_modification_tmsp ON public.account_project_rel;
DROP TRIGGER update_entity_version_key ON public.account_project_rel;
DROP TRIGGER versioning_trigger ON public.account_project_rel;


-- 20
ALTER TABLE projects.dfh_class_proj_rel
    ADD CONSTRAINT proj_rel_fk_project_fkey FOREIGN KEY (_deprecated_fk_project)
    REFERENCES projects.project (_deprecated_pk_project);
ALTER TABLE projects.dfh_class_proj_rel DROP CONSTRAINT dfh_class_project_rel__entity_and_project_unique;
SELECT commons.unmake_change_fk_reference_of_versioned_table('projects', 'dfh_class_proj_rel', 'fk_project');
ALTER TABLE projects.dfh_class_proj_rel
    ADD CONSTRAINT proj_rel_unique UNIQUE (fk_entity, fk_project);

-- 19
ALTER TABLE projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_project_fkey FOREIGN KEY (_deprecated_fk_project)
    REFERENCES projects.project (_deprecated_pk_project);
    
ALTER TABLE projects.info_proj_rel DROP CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key;
ALTER TABLE projects.info_proj_rel DROP CONSTRAINT entity_version_project_rel_fk_entity_version_concat_fk_proj_key;

DROP TRIGGER after_epr_upsert ON projects.info_proj_rel;
DROP TRIGGER on_upsert ON projects.info_proj_rel;
SELECT commons.unmake_change_fk_reference_of_versioned_table('projects', 'info_proj_rel', 'fk_project');
CREATE TRIGGER after_epr_upsert
    AFTER INSERT OR UPDATE 
    ON projects.info_proj_rel
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__upsert_entity_preview();

CREATE TRIGGER on_upsert
    BEFORE INSERT OR UPDATE 
    ON projects.info_proj_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.evpr_fk_entity_fk_entity_version();

ALTER TABLE projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key UNIQUE (fk_entity, fk_project);
ALTER TABLE projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_entity_version_concat_fk_proj_key UNIQUE (fk_entity_version_concat, fk_project);

-- 18
ALTER TABLE projects.visual DROP CONSTRAINT visual__unique_name_per_project;
SELECT commons.unmake_change_fk_reference_of_versioned_table('projects', 'visual', 'fk_project');
ALTER TABLE projects.visual
    ADD CONSTRAINT visual__unique_name_per_project UNIQUE (name, fk_project);

-- 17
ALTER TABLE projects.query DROP CONSTRAINT query__unique_name_per_project;
SELECT commons.unmake_change_fk_reference_of_versioned_table('projects', 'query', 'fk_project');
ALTER TABLE projects.query
    ADD CONSTRAINT unique_name_per_project UNIQUE (name, fk_project);

-- 16
ALTER TABLE projects.project RENAME COLUMN _deprecated_pk_project TO pk_project;
ALTER TABLE projects.project_vt RENAME COLUMN _deprecated_pk_project TO pk_project;
