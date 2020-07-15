Drop View data_for_history.v_class;

Create View data_for_history.v_class As With tw1 As (
    Select
        dfh_fk_class,
        dfh_fk_profile,
        removed_from_api,
        dfh_fk_system_type
    From
        data_for_history.class_profile_view
)
Select
    t1.pk_entity,
    t1.entity_version,
    t1.is_enabled_in_profile,
    jsonb_agg(json_build_object('fk_profile', t2.dfh_fk_profile, 'removed_from_api', t2.removed_from_api)) As removed_from_api,
    t1.dfh_pk_class,
    t1.dfh_identifier_in_namespace,
    t1.dfh_standard_label,
    t1.dfh_creation_time,
    t1.dfh_modification_time,
    (
        Select
            (array_agg(t2.dfh_fk_system_type) Filter (Where t2.dfh_fk_system_type Is Not Null))[1]) As dfh_fk_system_type
From
    data_for_history.class t1,
    tw1 t2
Where
    t1.dfh_pk_class = t2.dfh_fk_class
Group By
    t1.pk_entity,
    t1.entity_version,
    t1.is_enabled_in_profile,
    t1.dfh_pk_class,
    t1.dfh_identifier_in_namespace,
    t1.dfh_standard_label,
    t1.dfh_creation_time,
    t1.dfh_modification_time;

