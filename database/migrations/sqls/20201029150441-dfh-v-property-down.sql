
CREATE OR REPLACE VIEW data_for_history.v_property
 AS
 WITH tw1 AS (
         SELECT t1_1.dfh_pk_property AS pk_property,
            t1_1.dfh_is_inherited AS is_inherited,
            t1_1.dfh_property_domain AS has_domain,
            t1_1.dfh_domain_instances_min_quantifier AS domain_instances_min_quantifier,
            t1_1.dfh_domain_instances_max_quantifier AS domain_instances_max_quantifier,
            t1_1.dfh_property_range AS has_range,
            t1_1.dfh_range_instances_min_quantifier AS range_instances_min_quantifier,
            t1_1.dfh_range_instances_max_quantifier AS range_instances_max_quantifier,
            t1_1.dfh_identity_defining AS identity_defining,
            t1_1.dfh_is_has_type_subproperty AS is_has_type_subproperty,
            t1_1.dfh_property_identifier_in_namespace AS identifier_in_namespace,
            jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) AS profiles
           FROM data_for_history.api_property t1_1
          GROUP BY t1_1.dfh_pk_property, t1_1.dfh_is_inherited, t1_1.dfh_property_domain, t1_1.dfh_domain_instances_min_quantifier, t1_1.dfh_domain_instances_max_quantifier, t1_1.dfh_property_range, t1_1.dfh_range_instances_min_quantifier, t1_1.dfh_range_instances_max_quantifier, t1_1.dfh_identity_defining, t1_1.dfh_is_has_type_subproperty, t1_1.dfh_property_identifier_in_namespace
        UNION
         SELECT 1111 AS pk_property,
            true AS is_inherited,
            365 AS has_domain,
            0 AS domain_instances_min_quantifier,
            '-1'::integer AS domain_instances_max_quantifier,
            t1_1.dfh_pk_class AS has_range,
            1 AS range_instances_min_quantifier,
            1 AS range_instances_max_quantifier,
            true AS identity_defining,
            false AS is_has_type_subproperty,
            'histP9'::character varying AS identifier_in_namespace,
            jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) AS profiles
           FROM data_for_history.api_class t1_1
          WHERE t1_1.dfh_pk_class <> 365
          GROUP BY t1_1.dfh_pk_class, t1_1.dfh_class_identifier_in_namespace, t1_1.dfh_basic_type, t1_1.dfh_basic_type_label
        )
 SELECT t1.pk_property,
    t1.is_inherited,
    t1.has_domain,
    t1.domain_instances_min_quantifier,
    t1.domain_instances_max_quantifier,
    t1.has_range,
    t1.range_instances_min_quantifier,
    t1.range_instances_max_quantifier,
    t1.identity_defining,
        CASE
            WHEN t2.pk_entity IS NOT NULL THEN true
            ELSE t1.is_has_type_subproperty
        END AS is_has_type_subproperty,
    t1.identifier_in_namespace,
    t1.profiles
   FROM tw1 t1
     LEFT JOIN system.class_has_type_property t2 ON t1.pk_property = t2.fk_property;
