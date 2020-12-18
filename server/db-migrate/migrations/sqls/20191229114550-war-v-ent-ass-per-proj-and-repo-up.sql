Create Or Replace View war.v_entity_association_per_project_and_repo As Select Distinct
    ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    epr.fk_project,
    coalesce(epr.fk_project, 0) As project,
    ea.is_in_project_count
From
    information.v_entity_association ea,
    projects.info_proj_rel epr
Where
    epr.fk_entity = ea.pk_entity
    And epr.is_in_project = True
Union
Select Distinct
    ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    NULL::integer As fk_project,
    0 As project,
    ea.is_in_project_count
From
    information.v_entity_association ea
Where
    ea.is_in_project_count > 0;

