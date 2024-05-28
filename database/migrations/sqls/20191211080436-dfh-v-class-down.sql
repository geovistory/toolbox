Drop View data_for_history.v_class;

Create Or Replace View data_for_history.v_class As Select Distinct On (t1.pk_entity, t1.entity_version, t1.is_enabled_in_profile, t1.removed_from_api, t1.dfh_pk_class, t1.dfh_identifier_in_namespace, t1.dfh_standard_label, t1.dfh_creation_time, t1.dfh_modification_time)
    t1.pk_entity,
    t1.entity_version,
    t1.is_enabled_in_profile,
    t1.removed_from_api,
    t1.dfh_pk_class,
    t1.dfh_identifier_in_namespace,
    t1.dfh_standard_label,
    t1.dfh_creation_time,
    t1.dfh_modification_time,
    t2.dfh_fk_system_type
From
    data_for_history.class t1,
    data_for_history.class_profile_view t2
Where
    t1.dfh_pk_class = t2.dfh_fk_class
Order By
    t1.pk_entity,
    t1.entity_version,
    t1.is_enabled_in_profile,
    t1.removed_from_api,
    t1.dfh_pk_class,
    t1.dfh_identifier_in_namespace,
    t1.dfh_standard_label,
    t1.dfh_creation_time,
    t1.dfh_modification_time;

