-- 1
Alter View data_for_history.v_class Rename To v_class_deprecated;

-- 2
Create View data_for_history.v_class As
Select
    t1.dfh_pk_class As pk_class,
    t1.dfh_class_identifier_in_namespace As identifier_in_namespace,
    t1.dfh_basic_type As basic_type,
    t1.dfh_basic_type_label As basic_type_label,
    jsonb_agg(Distinct jsonb_build_object('fk_profile', t1.dfh_fk_profile, 'removed_from_api', t1.removed_from_api)) As profiles
From
    data_for_history.api_class t1
Group By
    t1.dfh_pk_class,
    t1.dfh_class_identifier_in_namespace,
    t1.dfh_basic_type,
    t1.dfh_basic_type_label;

