-- 1
Create Or Replace View information.v_entity_association As With ea_project_count As (
    Select
        ea_1.pk_entity,
        ea_1.fk_property,
        ea_1.fk_info_domain,
        ea_1.fk_info_range,
        ea_1.fk_data_domain,
        ea_1.fk_data_range,
        ea_1.notes,
        ea_1.tmsp_creation,
        ea_1.tmsp_last_modification,
        ea_1.sys_period,
        coalesce(count(*) Filter (Where epr.is_in_project = True), 0::bigint)::integer As is_in_project_count
    From
        information.entity_association ea_1
    Left Join projects.info_proj_rel epr On epr.fk_entity = ea_1.pk_entity
Group By
    ea_1.pk_entity,
    ea_1.fk_property,
    ea_1.fk_info_domain,
    ea_1.fk_info_range,
    ea_1.fk_data_domain,
    ea_1.fk_data_range,
    ea_1.notes,
    ea_1.tmsp_creation,
    ea_1.tmsp_last_modification,
    ea_1.sys_period
)
Select
    ea.pk_entity,
    ea.fk_property,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.notes,
    ea.tmsp_creation,
    ea.tmsp_last_modification,
    ea.sys_period,
    ea.is_in_project_count,
    p.range_instances_max_quantifier::smallint As range_max_quantifier,
    p.domain_instances_max_quantifier::smallint As domain_max_quantifier
From
    ea_project_count ea
    Left Join data_for_history.v_property p On ea.fk_property = p.pk_property;

-- 2
Drop Function information.get_ingoing_entity_associations_to_add;

Drop Function information.get_outgoing_entity_associations_to_add;

Drop Function information.get_ingoing_roles_to_add (integer, integer);

Drop Function information.get_ingoing_roles_to_add (integer);

Drop Function information.add_te_en_to_project;

-- 3
Drop Table If Exists data_for_history.property Cascade;

Drop Table If Exists data_for_history.property_vt;

