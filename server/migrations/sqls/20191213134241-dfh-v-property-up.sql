-- 1
Alter View data_for_history.v_property Rename To v_property_deprecated;

-- 2
Create View data_for_history.v_property As
Select
    t1.dfh_pk_property,
    t1.dfh_is_inherited,
    t1.dfh_property_domain,
    t1.dfh_domain_instances_min_quantifier,
    t1.dfh_domain_instances_max_quantifier,
    t1.dfh_property_range,
    t1.dfh_range_instances_min_quantifier,
    t1.dfh_range_instances_max_quantifier,
    t1.dfh_identity_defining,
    t1.dfh_is_has_type_subproperty,
    t1.dfh_property_identifier_in_namespace,
    jsonb_agg(Distinct jsonb_build_object('fk_profile', t1.dfh_fk_profile, 'removed_from_api', t1.removed_from_api)) As profiles
From
    data_for_history.api_property t1
Group By
    t1.dfh_pk_property,
    t1.dfh_is_inherited,
    t1.dfh_property_domain,
    t1.dfh_domain_instances_min_quantifier,
    t1.dfh_domain_instances_max_quantifier,
    t1.dfh_property_range,
    t1.dfh_range_instances_min_quantifier,
    t1.dfh_range_instances_max_quantifier,
    t1.dfh_identity_defining,
    t1.dfh_is_has_type_subproperty,
    t1.dfh_property_identifier_in_namespace;

-- 3
Alter View data_for_history.v_property_profile_view Rename To v_property_profile_view_deprecated;

