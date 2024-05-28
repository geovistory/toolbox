
-- 4
ALTER TABLE projects.class_field_config_vt
    ADD CONSTRAINT class_field_config_vt_fk_project_fkey FOREIGN KEY (fk_project)
    REFERENCES projects.project (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


-- 3
ALTER TABLE public.account_project_rel_vt
    ADD CONSTRAINT account_project_rel_vt_fk_project_fkey FOREIGN KEY (fk_project)
    REFERENCES projects.project (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

-- 2
ALTER TABLE projects.info_proj_rel_vt
    ADD CONSTRAINT info_proj_rel_vt_fk_project_fkey FOREIGN KEY (fk_project)
    REFERENCES projects.project (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


-- 1
ALTER TABLE projects.dfh_class_proj_rel_vt
    ADD CONSTRAINT dfh_class_proj_rel_vt_fk_project_fkey FOREIGN KEY (fk_project)
    REFERENCES projects.project (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
