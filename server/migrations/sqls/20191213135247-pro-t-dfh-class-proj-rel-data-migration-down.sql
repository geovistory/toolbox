/* Replace with your SQL commands */
-- 3

Alter Table projects.dfh_class_proj_rel Rename Column fk_entity_deprecated To fk_entity;

-- 2
-- no need, since 1 does job
-- 1

Alter Table projects.dfh_class_proj_rel
    Drop Column fk_class;

Alter Table projects.dfh_class_proj_rel_vt
    Drop Column fk_class;

