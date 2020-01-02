-- 1
Create Table projects.dfh_profile_proj_rel (
    fk_project INTEGER Not Null References projects.project (pk_entity),
    fk_profile INTEGER Not Null,
    enabled boolean Not Null)
Inherits (
    projects.entity
);

Select
    commons.init_entity_child_table ('projects.dfh_profile_proj_rel');

Alter Table projects.dfh_profile_proj_rel
    Add Constraint unique_fk_project_fk_profile Unique (fk_project, fk_profile);

-- 2 add relations according to the needs
/*

-- This query shows that all projects need all 4 existing profiles according to the
-- enabled classes

WITH tw1 AS (
 SELECT t1.fk_project, t3.dfh_fk_profile
 FROM
 projects.dfh_class_proj_rel t1,
 data_for_history.class t2,
 data_for_history.class_profile_view t3

 WHERE t1.enabled_in_entities
 AND t1.fk_entity = t2.pk_entity
 AND t2.dfh_pk_class = t3.dfh_fk_class
 GROUP BY
 t1.fk_project, t3.dfh_fk_profile
)
SELECT
 t1.fk_project, count( t1.dfh_fk_profile)
FROM tw1 t1
GROUP BY
 t1.fk_project
ORDER BY count asc
 */
Insert Into projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
Select Distinct
    t2.pk_entity,
    t1.dfh_fk_profile,
    True
From
    data_for_history.class_profile_view t1,
    projects.project t2
Where
    t1.dfh_fk_profile != 5 -- exclude the geovistory basics
Order By
    t2.pk_entity;

