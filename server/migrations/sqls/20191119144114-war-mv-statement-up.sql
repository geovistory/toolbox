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

Create Unique Index On warehouse.vm_statement (pk_entity, project);

Create Index On warehouse.vm_statement (pk_entity);

Create Index On warehouse.vm_statement (fk_temporal_entity);

Create Index On warehouse.vm_statement (fk_property);

Create Index On warehouse.vm_statement (fk_entity);

Create Index On warehouse.vm_statement (fk_project);

