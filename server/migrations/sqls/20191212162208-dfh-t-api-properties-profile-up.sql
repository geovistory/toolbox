-- 1
Create Table data_for_history.api_property (
    requested_language varchar,
    dfh_pk_property integer,
    dfh_property_label_language varchar,
    dfh_property_label text,
    dfh_property_scope_note_language varchar,
    dfh_property_scope_note text,
    dfh_is_inherited boolean,
    dfh_property_domain integer,
    dfh_domain_instances_min_quantifier integer,
    dfh_domain_instances_max_quantifier integer,
    dfh_property_range integer,
    dfh_range_instances_min_quantifier integer,
    dfh_range_instances_max_quantifier integer,
    dfh_identity_defining boolean,
    dfh_is_has_type_subproperty boolean,
    dfh_property_identifier_in_namespace varchar,
    dfh_namespace_uri text,
    dfh_fk_namespace integer,
    dfh_namespace_label_language varchar,
    dfh_namespace_label text,
    dfh_profile_association_type varchar,
    dfh_fk_profile integer,
    dfh_profile_label_language varchar,
    dfh_profile_label text)
Inherits (
    data_for_history.entity
);

Select
    commons.init_entity_child_table ('data_for_history.api_property');

Alter Table data_for_history.api_property
    Add Constraint unique_requested_language_dfh_pk_property_dfh_fk_profile Unique (requested_language, dfh_pk_property, dfh_property_domain, dfh_property_range, dfh_fk_profile);

