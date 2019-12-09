-- 1 make v_roles_per_project_and_repo independent from v_role
Create Or Replace View warehouse.v_roles_per_project_and_repo As With tw1 As (
    Select
        t1.pk_entity,
        t1.fk_property,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t2.is_in_project_count,
        t1.notes,
        t1.tmsp_creation,
        t1.tmsp_last_modification,
        t1.sys_period
    From
        information.role t1
    Left Join Lateral (
        Select
            count(info_proj_rel.pk_entity)::integer As is_in_project_count
        From
            projects.info_proj_rel
        Where
            info_proj_rel.fk_entity = t1.pk_entity
            And info_proj_rel.is_in_project = True
        Group By
            info_proj_rel.fk_entity) t2 On True
)
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    t2.fk_project,
    coalesce(t2.fk_project, 0) As project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
From
    tw1 t1,
    projects.info_proj_rel t2
Where
    t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    NULL::integer As ord_num_of_domain,
    NULL::integer As ord_num_of_range,
    t1.is_in_project_count
From
    tw1 t1
Where
    t1.is_in_project_count > 0;

-- 2 make warehouse.vm_statement independent from v_role
Drop Materialized View warehouse.vm_statement;

Create Materialized View warehouse.vm_statement As With tw1 As (
    Select
        t1.pk_entity,
        t1.fk_property,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t2.is_in_project_count,
        t1.notes,
        t1.tmsp_creation,
        t1.tmsp_last_modification,
        t1.sys_period
    From
        information.role t1
    Left Join Lateral (
        Select
            count(info_proj_rel.pk_entity)::integer As is_in_project_count
        From
            projects.info_proj_rel
        Where
            info_proj_rel.fk_entity = t1.pk_entity
            And info_proj_rel.is_in_project = True
        Group By
            info_proj_rel.fk_entity) t2 On True
)
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    t2.fk_project,
    coalesce(t2.fk_project, 0) As project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
From
    tw1 t1,
    projects.info_proj_rel t2
Where
    t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    NULL::integer As ord_num_of_domain,
    NULL::integer As ord_num_of_range,
    t1.is_in_project_count
From
    tw1 t1
Where
    t1.is_in_project_count > 0;

Create Index vm_statement_fk_entity_idx On warehouse.vm_statement
Using btree (fk_entity);

Create Index vm_statement_fk_project_idx On warehouse.vm_statement
Using btree (fk_project);

Create Index vm_statement_fk_property_idx On warehouse.vm_statement
Using btree (fk_property);

Create Index vm_statement_fk_temporal_entity_idx On warehouse.vm_statement
Using btree (fk_temporal_entity);

Create Index vm_statement_pk_entity_idx On warehouse.vm_statement
Using btree (pk_entity);

Create Unique Index vm_statement_pk_entity_project_idx On warehouse.vm_statement
Using btree (pk_entity, project);

-- 3 make v_role independent of dfh.property table
Drop View information.v_role;

Create View information.v_role As
Select
    t1.pk_entity,
    t1.fk_property,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t2.is_in_project_count,
    t2.is_standard_in_project_count,
    t2.community_favorite_calendar,
    t1.notes,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period
From
    information.role t1
    Left Join Lateral (
        Select
            count(info_proj_rel.pk_entity)::integer As is_in_project_count,
            coalesce(count(*) Filter (Where info_proj_rel.ord_num_of_domain = 0), 0::bigint)::integer As is_standard_in_project_count,
            mode() Within Group (Order By info_proj_rel.calendar) As community_favorite_calendar
        From
            projects.info_proj_rel
        Where
            info_proj_rel.fk_entity = t1.pk_entity
            And info_proj_rel.is_in_project = True Group By
                info_proj_rel.fk_entity) t2 On True;

Create Trigger on_insert Instead Of Insert On information.v_role
For Each Row
Execute Procedure information.v_role_find_or_create ();


/* Joins property via domain and range class - quite slow !

WITH tw1 AS (
 select pk_entity, fk_class
 FROM information.persistent_item
 UNION ALL
 select pk_entity, fk_class
 FROM information.temporal_entity
 UNION ALL
 select pk_entity, fk_class
 FROM information.appellation
 UNION ALL
 select pk_entity, fk_class
 FROM information.time_primitive
 UNION ALL
 select pk_entity, fk_class
 FROM information.place
 UNION ALL
 select pk_entity, fk_class
 FROM information.language
)
SELECT t1.pk_entity,
 t1.fk_property,
 t1.fk_entity,
 t1.fk_temporal_entity,
 t5.is_in_project_count,
 t5.is_standard_in_project_count,
 t5.community_favorite_calendar,
 t1.notes,
 t1.tmsp_creation,
 t1.tmsp_last_modification,
 t1.sys_period,
 t4.dfh_range_instances_max_quantifier AS range_max_quantifier,
 t4.dfh_domain_instances_max_quantifier AS domain_max_quantifier
 FROM
 information.role t1
 JOIN tw1 t2 ON t2.pk_entity = t1.fk_entity
 JOIN tw1 t3 ON t3.pk_entity = t1.fk_temporal_entity
 JOIN data_for_history.v_property t4
 ON t1.fk_property = t4.fk_property
 AND t2.fk_class = t4.dfh_has_range
 AND t3.fk_class = t4.dfh_has_domain
 LEFT JOIN LATERAL ( SELECT count(info_proj_rel.pk_entity)::integer AS is_in_project_count,
 COALESCE(count(*) FILTER (WHERE info_proj_rel.ord_num_of_domain = 0), 0::bigint)::integer AS is_standard_in_project_count,
 mode() WITHIN GROUP (ORDER BY info_proj_rel.calendar) AS community_favorite_calendar
 FROM projects.info_proj_rel
 WHERE info_proj_rel.fk_entity = t1.pk_entity AND info_proj_rel.is_in_project = true
 GROUP BY info_proj_rel.fk_entity) t5 ON true;
 */
