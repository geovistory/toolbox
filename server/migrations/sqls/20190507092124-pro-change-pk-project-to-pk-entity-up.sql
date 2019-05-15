-------------------------------------------------------------------------
-- 16. Mark project (pk_project) as deprecated in favor of pk_entity
-------------------------------------------------------------------------
ALTER TABLE projects.project RENAME COLUMN pk_project TO _deprecated_pk_project;
ALTER TABLE projects.project_vt RENAME COLUMN pk_project TO _deprecated_pk_project;

-------------------------------------------------------------------------
-- 17. query: Change FK's from referencing pk_project to pk_entity
-------------------------------------------------------------------------

SELECT commons.change_fk_reference_of_versioned_table(
    'projects',
    'query',
    'fk_project',
    'projects.project',
    '_deprecated_pk_project',
    'pk_entity'
);
ALTER TABLE projects.query DROP CONSTRAINT unique_name_per_project;
ALTER TABLE projects.query
    ADD CONSTRAINT query__unique_name_per_project UNIQUE (name, fk_project);



-------------------------------------------------------------------------
-- 18. visual: Change FK's from referencing pk_project to pk_entity
-------------------------------------------------------------------------

SELECT commons.change_fk_reference_of_versioned_table(
    'projects',
    'visual',
    'fk_project',
    'projects.project',
    '_deprecated_pk_project',
    'pk_entity'
);
ALTER TABLE projects.visual DROP CONSTRAINT visual__unique_name_per_project;
ALTER TABLE projects.visual
    ADD CONSTRAINT visual__unique_name_per_project UNIQUE (name, fk_project);


-------------------------------------------------------------------------
-- 19. info_proj_rel: Change FK's from referencing pk_project to pk_entity
-------------------------------------------------------------------------
DROP TRIGGER after_epr_upsert ON projects.info_proj_rel;
DROP TRIGGER on_upsert ON projects.info_proj_rel;

SELECT commons.change_fk_reference_of_versioned_table(
    'projects',
    'info_proj_rel',
    'fk_project',
    'projects.project',
    '_deprecated_pk_project',
    'pk_entity'
);

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

ALTER TABLE projects.info_proj_rel DROP CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key;
ALTER TABLE projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key UNIQUE (fk_entity, fk_project);

ALTER TABLE projects.info_proj_rel DROP CONSTRAINT entity_version_project_rel_fk_entity_version_concat_fk_proj_key;
ALTER TABLE projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_entity_version_concat_fk_proj_key UNIQUE (fk_entity_version_concat, fk_project);

ALTER TABLE projects.info_proj_rel DROP CONSTRAINT entity_version_project_rel_fk_project_fkey;


-------------------------------------------------------------------------
-- 20. dfh_class_project_rel: Change FK's from referencing pk_project to pk_entity
-------------------------------------------------------------------------

SELECT commons.change_fk_reference_of_versioned_table(
    'projects',
    'dfh_class_proj_rel',
    'fk_project',
    'projects.project',
    '_deprecated_pk_project',
    'pk_entity'
);
ALTER TABLE projects.dfh_class_proj_rel DROP CONSTRAINT proj_rel_unique;
ALTER TABLE projects.dfh_class_proj_rel
    ADD CONSTRAINT dfh_class_project_rel__entity_and_project_unique UNIQUE (fk_entity, fk_project);
ALTER TABLE projects.dfh_class_proj_rel DROP CONSTRAINT proj_rel_fk_project_fkey;

-------------------------------------------------------------------------
-- 21. account_project_rel: Change FK's from referencing pk_project to pk_entity
-------------------------------------------------------------------------
SELECT commons.init_version_table('public.account_project_rel');

SELECT commons.change_fk_reference_of_versioned_table(
    'public',
    'account_project_rel',
    'fk_project',
    'projects.project',
    '_deprecated_pk_project',
    'pk_entity'
);

-------------------------------------------------------------------------
-- 22. class_field_config: Change FK's from referencing pk_project to pk_entity
-------------------------------------------------------------------------

SELECT commons.change_fk_reference_of_versioned_table(
    'projects',
    'class_field_config',
    'fk_project',
    'projects.project',
    '_deprecated_pk_project',
    'pk_entity',
    false::boolean
);

ALTER TABLE projects.class_field_config DROP CONSTRAINT ui_context_config_fk_project_fkey;