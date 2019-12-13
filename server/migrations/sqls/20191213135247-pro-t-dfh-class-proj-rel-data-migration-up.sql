/* Replace with your SQL commands */
-- 1

Alter Table projects.dfh_class_proj_rel
    Add Column fk_class INTEGER;

Alter Table projects.dfh_class_proj_rel_vt
    Add Column fk_class INTEGER;

-- 2
With tw1 As (
    Select Distinct
        t1.fk_entity,
        t2.dfh_pk_class
    From
        projects.dfh_class_proj_rel t1,
        data_for_history. "class" t2
    Where
        t1.fk_entity = t2.pk_entity)
Update
    projects.dfh_class_proj_rel t1
Set
    fk_class = t2.dfh_pk_class
From
    tw1 t2
Where
    t1.fk_entity = t2.fk_entity;

-- 3
Alter Table projects.dfh_class_proj_rel Rename Column fk_entity To fk_entity_deprecated;

