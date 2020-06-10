
CREATE OR REPLACE VIEW information.v_entity_association AS
 WITH ea_project_count AS (
         SELECT ea_1.pk_entity,
            ea_1.fk_property,
            ea_1.fk_info_domain,
            ea_1.fk_info_range,
            ea_1.fk_data_domain,
            ea_1.fk_data_range,
            ea_1.notes,
            ea_1.tmsp_creation,
            ea_1.tmsp_last_modification,
            ea_1.sys_period,
            COALESCE(count(*) FILTER (WHERE epr.is_in_project = true), 0::bigint) AS is_in_project_count
           FROM information.entity_association ea_1
             LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = ea_1.pk_entity
          GROUP BY ea_1.pk_entity, ea_1.fk_property, ea_1.fk_info_domain, ea_1.fk_info_range, ea_1.fk_data_domain, ea_1.fk_data_range, ea_1.notes, ea_1.tmsp_creation, ea_1.tmsp_last_modification, ea_1.sys_period
        )
 SELECT ea.pk_entity,
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
    row_number() OVER (PARTITION BY (COALESCE(ea.fk_info_domain, ea.fk_data_domain)), ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_domain,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    row_number() OVER (PARTITION BY (COALESCE(ea.fk_info_range, ea.fk_data_range)), ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_range,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM ea_project_count ea
     JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property;
