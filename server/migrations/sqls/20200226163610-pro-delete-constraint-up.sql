
-- 1
ALTER TABLE projects.dfh_class_proj_rel_vt DROP CONSTRAINT dfh_class_proj_rel_vt_fk_project_fkey;

-- 2
ALTER TABLE projects.info_proj_rel_vt DROP CONSTRAINT info_proj_rel_vt_fk_project_fkey;

-- 3
ALTER TABLE public.account_project_rel_vt DROP CONSTRAINT account_project_rel_vt_fk_project_fkey;

-- 4
ALTER TABLE projects.class_field_config_vt DROP CONSTRAINT class_field_config_vt_fk_project_fkey;
