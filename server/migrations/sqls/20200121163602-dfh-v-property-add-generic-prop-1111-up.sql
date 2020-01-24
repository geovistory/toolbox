Create Or Replace View data_for_history.v_property As With tw1 As (
    Select
        t1_1.dfh_pk_property As pk_property,
        t1_1.dfh_is_inherited As is_inherited,
        t1_1.dfh_property_domain As has_domain,
        t1_1.dfh_domain_instances_min_quantifier As domain_instances_min_quantifier,
        t1_1.dfh_domain_instances_max_quantifier As domain_instances_max_quantifier,
        t1_1.dfh_property_range As has_range,
        t1_1.dfh_range_instances_min_quantifier As range_instances_min_quantifier,
        t1_1.dfh_range_instances_max_quantifier As range_instances_max_quantifier,
        t1_1.dfh_identity_defining As identity_defining,
        t1_1.dfh_is_has_type_subproperty As is_has_type_subproperty,
        t1_1.dfh_property_identifier_in_namespace As identifier_in_namespace,
        jsonb_agg(Distinct jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) As profiles
    From
        data_for_history.api_property t1_1
    Group By
        t1_1.dfh_pk_property,
        t1_1.dfh_is_inherited,
        t1_1.dfh_property_domain,
        t1_1.dfh_domain_instances_min_quantifier,
        t1_1.dfh_domain_instances_max_quantifier,
        t1_1.dfh_property_range,
        t1_1.dfh_range_instances_min_quantifier,
        t1_1.dfh_range_instances_max_quantifier,
        t1_1.dfh_identity_defining,
        t1_1.dfh_is_has_type_subproperty,
        t1_1.dfh_property_identifier_in_namespace
    Union
    -- Create a property 1111 for each classes except 365
    Select
        1111 As pk_property,
        True As is_inherited,
        365 As has_domain,
        0 As domain_instances_min_quantifier,
        - 1 As domain_instances_max_quantifier,
        t1.dfh_pk_class As has_range,
        1 As range_instances_min_quantifier,
        1 As range_instances_max_quantifier,
        True As identity_defining,
        False As is_has_type_subproperty,
        'histP9' As identifier_in_namespace,
        jsonb_agg(Distinct jsonb_build_object('fk_profile', t1.dfh_fk_profile, 'removed_from_api', t1.removed_from_api)) As profiles
    From
        data_for_history.api_class t1
    Where
        t1.dfh_pk_class != 365
    Group By
        t1.dfh_pk_class,
        t1.dfh_class_identifier_in_namespace,
        t1.dfh_basic_type,
        t1.dfh_basic_type_label
)
Select
    t1.pk_property,
    t1.is_inherited,
    t1.has_domain,
    t1.domain_instances_min_quantifier,
    t1.domain_instances_max_quantifier,
    t1.has_range,
    t1.range_instances_min_quantifier,
    t1.range_instances_max_quantifier,
    t1.identity_defining,
    Case When t2.pk_entity Is Not Null Then
        True
    Else
        t1.is_has_type_subproperty
    End As is_has_type_subproperty,
    t1.identifier_in_namespace,
    t1.profiles
From
    tw1 t1
    Left Join system.class_has_type_property t2 On t1.pk_property = t2.fk_property;

