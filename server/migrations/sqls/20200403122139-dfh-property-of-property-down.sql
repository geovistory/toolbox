-- 5
Drop View war.v_property_preview;

Drop View war.v_class_preview;

Drop View data_for_history.v_label;

Create Or Replace View data_for_history.v_label As Select Distinct On (t1.dfh_profile_label, t1.dfh_profile_label_language)
    'label'::text As Type,
    t1.dfh_profile_label As label,
    t1.dfh_profile_label_language As
    Language,
    t1.dfh_pk_profile As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class
From
    data_for_history.api_profile t1
Union
Select Distinct On (t1.dfh_profile_definition, t1.dfh_profile_definition_language)
    'definition'::text As Type,
    t1.dfh_profile_definition As label,
    t1.dfh_profile_definition_language As
    Language,
    t1.dfh_pk_profile As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class
From
    data_for_history.api_profile t1
Union
Select Distinct On (t1.dfh_project_label, t1.dfh_project_label_language)
    'label'::text As Type,
    t1.dfh_project_label As label,
    t1.dfh_project_label_language As
    Language,
    Null::integer As fk_profile,
    t1.dfh_owned_by_project As fk_project,
    Null::integer As fk_property,
    Null::integer As fk_class
From
    data_for_history.api_profile t1
Union
Select Distinct On (t1.dfh_property_label, t1.dfh_property_label_language)
    'label'::text As Type,
    t1.dfh_property_label As label,
    t1.dfh_property_label_language As
    Language,
    Null::integer As fk_profile,
    Null::integer As fk_project,
    t1.dfh_pk_property As fk_property,
    Null::integer As fk_class
From
    data_for_history.api_property t1
Union
Select Distinct On (t1.dfh_property_scope_note, t1.dfh_property_scope_note_language)
    'scope_note'::text As Type,
    t1.dfh_property_scope_note As label,
    t1.dfh_property_scope_note_language As
    Language,
    Null::integer As fk_profile,
    Null::integer As fk_project,
    t1.dfh_pk_property As fk_property,
    Null::integer As fk_class
From
    data_for_history.api_property t1
Union
Select Distinct On (t1.dfh_class_label, t1.dfh_class_label_language)
    'label'::text As Type,
    t1.dfh_class_label As label,
    t1.dfh_class_label_language As
    Language,
    Null::integer As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    t1.dfh_pk_class As fk_class
From
    data_for_history.api_class t1
Union
Select Distinct On (t1.dfh_class_scope_note, t1.dfh_class_scope_note_language)
    'scope_note'::text As Type,
    t1.dfh_class_scope_note As label,
    t1.dfh_class_scope_note_language As
    Language,
    Null::integer As fk_profile,
    Null::integer As fk_project,
    Null::integer As fk_property,
    t1.dfh_pk_class As fk_class
From
    data_for_history.api_class t1;

Create Or Replace View war.v_property_preview As
With tw0 As (
    Select
        project.pk_entity,
        project.fk_language
    From
        projects.project
    Union All
    Select
        Null::integer As int4,
        18889
),
tw1 As (
    Select
        t2.fk_dfh_property As fk_property,
        t1.pk_entity As fk_project,
        t2.string As label,
        1 As rank,
        'project label'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        t1.pk_entity = t2.fk_project
        And t2.fk_dfh_property Is Not Null
        And t2.fk_language = t1.fk_language
    Union All
    Select
        t2.fk_dfh_property As fk_property,
        t1.pk_entity As fk_project,
        t2.string As label,
        2 As rank,
        'default project label in default lang'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        375669 = t2.fk_project
        And t2.fk_dfh_property Is Not Null
        And t2.fk_language = t1.fk_language
    Union All
    Select
        t3.fk_property,
        t1.pk_entity As fk_project,
        t3.label,
        3 As rank,
        'ontome label in default lang'::text As text
    From
        tw0 t1,
        information.language t2,
        data_for_history.v_label t3
    Where
        t3.fk_property Is Not Null
        And t3.language::bpchar = t2.iso6391
        And t3.type = 'label'::text
    Union All
    Select
        t2.fk_dfh_property As fk_property,
        t1.pk_entity As fk_project,
        t2.string As label,
        4 As rank,
        'default project label in en'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        375669 = t2.fk_project
        And t2.fk_dfh_property Is Not Null
        And t2.fk_language = 18889
    Union All
    Select
        t3.fk_property,
        t1.pk_entity As fk_project,
        t3.label,
        3 As rank,
        'ontome label in en'::text As text
    From
        tw0 t1,
        data_for_history.v_label t3
    Where
        t3.fk_property Is Not Null
        And t3.language::text = 'en'::text
        And t3.type = 'label'::text
)
Select Distinct On (tw1.fk_project, tw1.fk_property)
    tw1.fk_property,
    tw1.fk_project,
    tw1.label
From
    tw1
Order By
    tw1.fk_project,
    tw1.fk_property,
    tw1.rank;

Create Or Replace View war.v_class_preview As
With tw0 As (
    Select
        project.pk_entity,
        project.fk_language
    From
        projects.project
    Union All
    Select
        Null::integer As int4,
        18889
),
tw1 As (
    Select
        t2.fk_dfh_class As fk_class,
        t1.pk_entity As fk_project,
        t2.string As label,
        1 As rank,
        'project label'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        t1.pk_entity = t2.fk_project
        And t2.fk_dfh_class Is Not Null
        And t2.fk_language = t1.fk_language
    Union All
    Select
        t2.fk_dfh_class As fk_class,
        t1.pk_entity As fk_project,
        t2.string As label,
        2 As rank,
        'default project label in default lang'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        375669 = t2.fk_project
        And t2.fk_dfh_class Is Not Null
        And t2.fk_language = t1.fk_language
    Union All
    Select
        t3.fk_class,
        t1.pk_entity As fk_project,
        t3.label,
        3 As rank,
        'ontome label in default lang'::text As text
    From
        tw0 t1,
        information.language t2,
        data_for_history.v_label t3
    Where
        t3.fk_class Is Not Null
        And t1.fk_language = t2.pk_entity
        And t3.language::bpchar = t2.iso6391
        And t3.type = 'label'::text
    Union All
    Select
        t2.fk_dfh_class As fk_class,
        t1.pk_entity As fk_project,
        t2.string As label,
        4 As rank,
        'default project label in en'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        375669 = t2.fk_project
        And t2.fk_dfh_class Is Not Null
        And t2.fk_language = 18889
    Union All
    Select
        t3.fk_class,
        t1.pk_entity As fk_project,
        t3.label,
        5 As rank,
        'ontome label in en'::text As text
    From
        tw0 t1,
        data_for_history.v_label t3
    Where
        t3.fk_class Is Not Null
        And t3.language::text = 'en'::text
        And t3.type = 'label'::text
)
Select Distinct On (tw1.fk_project, tw1.fk_class)
    tw1.fk_class,
    tw1.fk_project,
    tw1.label
From
    tw1
Order By
    tw1.fk_project,
    tw1.fk_class,
    tw1.rank;

-- 4
Drop Table data_for_history.property_of_property_vt;

-- 3
Drop Table data_for_history.property_of_property;

-- 2
Create Table data_for_history.property_of_property_vt (
    pk_entity integer Not Null,
    schema_name character varying Collate pg_catalog. "default",
    table_name character varying Collate pg_catalog. "default",
    entity_version integer,
    notes text Collate pg_catalog. "default",
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    is_enabled_in_profile boolean,
    removed_from_api boolean,
    dfh_pk_property_of_property integer Not Null,
    dfh_identifier_in_namespace text Collate pg_catalog. "default",
    dfh_has_property_domain integer,
    dfh_has_class_range integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_standard_label character varying(500) Collate pg_catalog. "default",
    dfh_domain_instances_min_quantifier smallint,
    dfh_domain_instances_max_quantifier smallint,
    dfh_range_instances_min_quantifier smallint,
    dfh_range_instances_max_quantifier smallint
)
With (
    Oids = False)
Tablespace pg_default;

-- 1
Create Table data_for_history.property_of_property (
    -- Inherited from table data_for_history.entity: pk_entity integer NOT NULL DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass),
    -- Inherited from table data_for_history.entity: schema_name character varying COLLATE pg_catalog."default",
    -- Inherited from table data_for_history.entity: table_name character varying COLLATE pg_catalog."default",
    -- Inherited from table data_for_history.entity: entity_version integer,
    -- Inherited from table data_for_history.entity: notes text COLLATE pg_catalog."default",
    -- Inherited from table data_for_history.entity: fk_creator integer,
    -- Inherited from table data_for_history.entity: fk_last_modifier integer,
    -- Inherited from table data_for_history.entity: tmsp_creation timestamp with time zone DEFAULT now(),
    -- Inherited from table data_for_history.entity: tmsp_last_modification timestamp with time zone,
    -- Inherited from table data_for_history.entity: sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    -- Inherited from table data_for_history.entity: tmsp_last_dfh_update timestamp with time zone,
    -- Inherited from table data_for_history.entity: is_enabled_in_profile boolean,
    -- Inherited from table data_for_history.entity: removed_from_api boolean DEFAULT false,

    dfh_pk_property_of_property integer Not Null,
    dfh_identifier_in_namespace text Collate pg_catalog. "default",
    dfh_has_property_domain integer,
    dfh_has_class_range integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_standard_label character varying(500) Collate pg_catalog. "default",
    dfh_domain_instances_min_quantifier smallint,
    dfh_domain_instances_max_quantifier smallint,
    dfh_range_instances_min_quantifier smallint,
    dfh_range_instances_max_quantifier smallint,
    Constraint data_for_history_property_of_property_pk_entity_unique Unique (pk_entity),
    Constraint unique_dfh_pk_property_of_property Unique (dfh_pk_property_of_property)
)
Inherits (
    data_for_history.entity
)
With (
    Oids = False)
Tablespace pg_default;

-- Index: property_of_property_pk_entity_idx
-- DROP INDEX data_for_history.property_of_property_pk_entity_idx;

Create Index property_of_property_pk_entity_idx On data_for_history.property_of_property Using btree (pk_entity Asc NULLS Last) Tablespace pg_default;

-- Trigger: create_entity_version_key
-- DROP TRIGGER create_entity_version_key ON data_for_history.property_of_property;

Create Trigger create_entity_version_key
    Before Insert On data_for_history.property_of_property For Each Row
    Execute Procedure commons.create_entity_version_key ();

-- Trigger: creation_tmsp
-- DROP TRIGGER creation_tmsp ON data_for_history.property_of_property;

Create Trigger creation_tmsp
    Before Insert On data_for_history.property_of_property For Each Row
    Execute Procedure commons.tmsp_creation ();

-- Trigger: insert_schema_table_name
-- DROP TRIGGER insert_schema_table_name ON data_for_history.property_of_property;

Create Trigger insert_schema_table_name
    Before Insert On data_for_history.property_of_property For Each Row
    Execute Procedure commons.insert_schema_table_name ();

-- Trigger: last_modification_tmsp
-- DROP TRIGGER last_modification_tmsp ON data_for_history.property_of_property;

Create Trigger last_modification_tmsp
    Before Insert Or Update On data_for_history.property_of_property For Each Row
    Execute Procedure commons.tmsp_last_modification ();

-- Trigger: update_entity_version_key
-- DROP TRIGGER update_entity_version_key ON data_for_history.property_of_property;

Create Trigger update_entity_version_key
    Before Update On data_for_history.property_of_property For Each Row
    Execute Procedure commons.update_entity_version_key ();

-- Trigger: versioning_trigger
-- DROP TRIGGER versioning_trigger ON data_for_history.property_of_property;

Create Trigger versioning_trigger
    Before Insert Or Delete Or Update On data_for_history.property_of_property For Each Row
    Execute Procedure public.versioning ('sys_period', 'data_for_history.property_of_property_vt', 'true');

