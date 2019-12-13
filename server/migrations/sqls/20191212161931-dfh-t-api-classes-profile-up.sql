-- 1
Create Table data_for_history.api_class (
    requested_language varchar,
    dfh_pk_class INTEGER,
    dfh_class_identifier_in_namespace varchar,
    dfh_class_label_language varchar,
    dfh_class_label text,
    dfh_class_scope_note_language varchar,
    dfh_class_scope_note text,
    dfh_basic_type integer,
    dfh_basic_type_label text,
    dfh_fk_namespace integer,
    dfh_namespace_label_language varchar,
    dfh_namespace_label text,
    dfh_namespace_uri text,
    dfh_profile_association_type text,
    dfh_fk_profile integer,
    dfh_profile_label_language varchar,
    dfh_profile_label text)
Inherits (
    data_for_history.entity
);

Select
    commons.init_entity_child_table ('data_for_history.api_class');

Alter Table data_for_history.api_class
    Add Constraint unique_requested_language_dfh_pk_class_dfh_fk_profile Unique (requested_language, dfh_pk_class, dfh_fk_profile);

