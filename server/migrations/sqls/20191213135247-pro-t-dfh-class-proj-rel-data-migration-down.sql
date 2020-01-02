/* Replace with your SQL commands */
-- 4

Alter Table projects.dfh_class_proj_rel
    Drop Constraint dfh_class_project_rel__class_and_project_unique;

Alter Table projects.dfh_class_proj_rel
    Add Constraint dfh_class_project_rel__entity_and_project_unique Unique (fk_entity_deprecated, fk_project);

-- 3
Alter Table projects.dfh_class_proj_rel Rename Column fk_entity_deprecated To fk_entity;

-- 2
-- no need, since 1 does job
-- 1

Alter Table projects.dfh_class_proj_rel
    Drop Column fk_class;

Alter Table projects.dfh_class_proj_rel_vt
    Drop Column fk_class;

