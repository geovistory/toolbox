-- 3
Create Or Replace View information.v_role As
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
    t1.sys_period,
    p.dfh_range_instances_max_quantifier As range_max_quantifier,
    p.dfh_domain_instances_max_quantifier As domain_max_quantifier
From
    information.role t1
    Join data_for_history.property p On t1.fk_property = p.dfh_pk_property
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

Create Trigger on_insert Instead Of Insert On information.v_role For Each Row
Execute Procedure information.v_role_find_or_create ();

-- 2
Drop Materialized View warehouse.vm_statement;

Create Materialized View warehouse.vm_statement As
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
    information.v_role t1,
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
    information.v_role t1
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

-- 1
Create Or Replace View warehouse.v_roles_per_project_and_repo As
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
    information.v_role t1,
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
    information.v_role t1
Where
    t1.is_in_project_count > 0;

