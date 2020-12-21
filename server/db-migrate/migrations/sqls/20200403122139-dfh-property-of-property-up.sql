-- 1
Alter Table data.property_of_property
    Drop Constraint If Exists property_of_property_fk_property_of_property_fkey;

Alter Table data.property_of_property_mapping
    Drop Constraint If Exists property_of_property_mapping_fk_property_of_property_fkey;

Drop Table data_for_history.property_of_property;

-- 2
Drop Table data_for_history.property_of_property_vt;

-- 3
Create Table data_for_history.property_of_property (
    pk_property_of_property integer Not Null,
    label text,
    label_language character varying,
    scope_note text,
    scope_note_language character varying,
    is_inherited boolean,
    has_domain integer,
    dfh_domain_instances_min_quantifier integer,
    dfh_domain_instances_max_quantifier integer,
    has_range integer,
    dfh_range_instances_min_quantifier integer,
    dfh_range_instances_max_quantifier integer,
    identifier_in_namespace character varying,
    fk_profile integer,
    Unique (pk_entity),
    Unique (has_domain, pk_property_of_property, has_range)
)
Inherits (
    data_for_history.entity
);

-- 4
Select
    commons.init_entity_child_table ('data_for_history.property_of_property');

-- 5
Create Or Replace View data_for_history.v_label As Select Distinct On (t1.dfh_profile_label, t1.dfh_profile_label_language)
    'label'::text As "type",
    t1.dfh_profile_label As "label",
    t1.dfh_profile_label_language As "language",
    t1.dfh_pk_profile As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_profile t1
Union
Select Distinct On (t1.dfh_profile_definition, t1.dfh_profile_definition_language)
    'definition'::text As "type",
    t1.dfh_profile_definition As "label",
    t1.dfh_profile_definition_language As "language",
    t1.dfh_pk_profile As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_profile t1
Union
Select Distinct On (t1.dfh_project_label, t1.dfh_project_label_language)
    'label'::text As "type",
    t1.dfh_project_label As "label",
    t1.dfh_project_label_language As "language",
    Null::integer As fk_profile,
    t1.dfh_owned_by_project As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_profile t1
Union
Select Distinct On (t1.dfh_property_label, t1.dfh_property_label_language)
    'label'::text As "type",
    t1.dfh_property_label As "label",
    t1.dfh_property_label_language As "language",
    Null::integer As fk_profile,
    Null::integer As fk_project,
    t1.dfh_pk_property As fk_property,
    Null::integer As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_property t1
Union
Select Distinct On (t1.dfh_property_scope_note, t1.dfh_property_scope_note_language)
    'scope_note'::text As "type",
    t1.dfh_property_scope_note As "label",
    t1.dfh_property_scope_note_language As "language",
    Null::integer As fk_profile,
    Null::integer As fk_project,
    t1.dfh_pk_property As fk_property,
    Null::integer As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_property t1
Union
Select Distinct On (t1.dfh_class_label, t1.dfh_class_label_language)
    'label'::text As "type",
    t1.dfh_class_label As "label",
    t1.dfh_class_label_language As "language",
    Null::integer As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    t1.dfh_pk_class As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_class t1
Union
Select Distinct On (t1.dfh_class_scope_note, t1.dfh_class_scope_note_language)
    'scope_note'::text As "type",
    t1.dfh_class_scope_note As "label",
    t1.dfh_class_scope_note_language As "language",
    Null::integer As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    t1.dfh_pk_class As fk_class,
    Null::integer As fk_property_of_property
From
    data_for_history.api_class t1
Union
Select Distinct On (t1.label, t1.label_language)
    'label'::text As "type",
    t1.label As "label",
    t1.label_language As "language",
    Null::integer As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class,
    t1.pk_property_of_property As fk_property_of_property
From
    data_for_history.property_of_property t1
Union
Select Distinct On (t1.scope_note, t1.scope_note_language)
    'scope_note'::text As "type",
    t1.scope_note As "label",
    t1.scope_note_language As "language",
    Null::integer As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class,
    t1.pk_property_of_property As fk_property_of_property
From
    data_for_history.property_of_property t1;

-- 6
Insert Into data_for_history.property_of_property (pk_property_of_property, label, label_language, scope_note, scope_note_language, is_inherited, has_domain, dfh_domain_instances_min_quantifier, dfh_domain_instances_max_quantifier, has_range, dfh_range_instances_min_quantifier, dfh_range_instances_max_quantifier, identifier_in_namespace, fk_profile)
    Values (1, 'has reference', 'en', 'Description of a location within an Information Object, like the reference to a page in a book, written in free text.', 'en', False, 1218, -- mentions – geovP2
        1, 1, 657, -- Reference – geovC13
        0, 1, 'geov?', 5 -- Geovistory Basics
)
On Conflict
    Do Nothing;

