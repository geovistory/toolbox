-- 0 prepare workaround for missing is_has_type_subproperty in ontome api
Create Or Replace View data_for_history.v_property As With tw1 As (
    Select
        t1.dfh_pk_property As pk_property,
        t1.dfh_is_inherited As is_inherited,
        t1.dfh_property_domain As has_domain,
        t1.dfh_domain_instances_min_quantifier As domain_instances_min_quantifier,
        t1.dfh_domain_instances_max_quantifier As domain_instances_max_quantifier,
        t1.dfh_property_range As has_range,
        t1.dfh_range_instances_min_quantifier As range_instances_min_quantifier,
        t1.dfh_range_instances_max_quantifier As range_instances_max_quantifier,
        t1.dfh_identity_defining As identity_defining,
        t1.dfh_is_has_type_subproperty As is_has_type_subproperty,
        t1.dfh_property_identifier_in_namespace As identifier_in_namespace,
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
        t1.dfh_property_identifier_in_namespace
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
    Case When (t2.pk_entity Is Not Null) Then
        True
    Else
        t1.is_has_type_subproperty
    End As is_has_type_subproperty,
    t1.identifier_in_namespace,
    t1.profiles
From
    tw1 t1
    Left Join system.class_has_type_property t2 On t1.pk_property = t2.fk_property;

-- 1
-- Paste the war schema here
-- 2

Drop Trigger after_epr_upsert On projects.info_proj_rel;

Create Trigger after_epr_upsert
    After Insert
    Or Update On projects.info_proj_rel For Each STATEMENT
    Execute Procedure war.after_info_proj_rel_upsert ();

-- 3 Triggers for notifying need for updating class labels
Create Trigger after_api_class_upsert
    After Insert
    Or Update On data_for_history.api_class For Each STATEMENT
    Execute Procedure war.notify__need_to_check_class_labels ();

Create Trigger after_update_or_insert_of_class_label
    After Insert
    Or Update On projects.text_property For Each Row
    When (new.fk_dfh_class Is Not Null)
    Execute Procedure war.notify__need_to_check_class_labels ();

