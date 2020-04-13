-- 4
Create Table information.statement_of_statement_vt (
    pk_entity integer Not Null,
    schema_name character varying Collate pg_catalog. "default" Not Null,
    table_name character varying Collate pg_catalog. "default" Not Null,
    notes text Collate pg_catalog. "default",
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property_of_property integer,
    fk_subject integer,
    fk_object integer Not Null
);

-- 3
Create Table information.statement_of_statement (
    -- Inherited from table information.entity: pk_entity integer NOT NULL DEFAULT nextval('information.entity_pk_entity_seq'::regclass),
    -- Inherited from table information.entity: schema_name character varying COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table information.entity: table_name character varying COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table information.entity: notes text COLLATE pg_catalog."default",
    -- Inherited from table information.entity: fk_creator integer,
    -- Inherited from table information.entity: fk_last_modifier integer,
    -- Inherited from table information.entity: tmsp_creation timestamp with time zone DEFAULT now(),
    -- Inherited from table information.entity: tmsp_last_modification timestamp with time zone,
    -- Inherited from table information.entity: sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    -- Inherited from table information.entity: metadata jsonb,

    fk_property_of_property integer,
    fk_subject integer,
    fk_object integer Not Null,
    Constraint information_statement_of_statement_pk_entity_unique Unique (pk_entity),
    Constraint statement_of_statement_fk_subject_fkey Foreign Key (fk_subject) References information.role (pk_entity) Match SIMPLE On Update No ACTION On Delete No ACTION
)
Inherits (
    information.entity
)
With (
    Oids = False)
Tablespace pg_default;

Alter Table information.statement_of_statement Owner To postgres;

-- Trigger: creation_tmsp
-- DROP TRIGGER creation_tmsp ON information.statement_of_statement;

Create Trigger creation_tmsp
    Before Insert On information.statement_of_statement For Each Row
    Execute Procedure commons.tmsp_creation ();

-- Trigger: insert_schema_table_name
-- DROP TRIGGER insert_schema_table_name ON information.statement_of_statement;

Create Trigger insert_schema_table_name
    Before Insert On information.statement_of_statement For Each Row
    Execute Procedure commons.insert_schema_table_name ();

-- Trigger: last_modification_tmsp
-- DROP TRIGGER last_modification_tmsp ON information.statement_of_statement;

Create Trigger last_modification_tmsp
    Before Insert Or Update On information.statement_of_statement For Each Row
    Execute Procedure commons.tmsp_last_modification ();

-- Trigger: versioning_trigger
-- DROP TRIGGER versioning_trigger ON information.statement_of_statement;

Create Trigger versioning_trigger
    Before Insert Or Delete Or Update On information.statement_of_statement For Each Row
    Execute Procedure public.versioning ('sys_period', 'information.statement_of_statement_vt', 'true');

-- 2
Create Or Replace View information.v_statement_of_statement As
Select
    statement_of_statement.pk_entity,
    statement_of_statement.schema_name,
    statement_of_statement.table_name,
    statement_of_statement.notes,
    statement_of_statement.fk_creator,
    statement_of_statement.fk_last_modifier,
    statement_of_statement.tmsp_creation,
    statement_of_statement.tmsp_last_modification,
    statement_of_statement.sys_period,
    statement_of_statement.metadata,
    statement_of_statement.fk_property_of_property,
    statement_of_statement.fk_subject,
    statement_of_statement.fk_object
From
    information.statement_of_statement;

-- 1
Create Function information.v_statement_of_statement_find_or_create ()
    Returns Trigger
    Language 'plpgsql'
    Cost 100 Volatile Not Leakproof
    As $BODY$
Declare
    resulting_pk integer;
    resulting_row information.v_statement_of_statement;
Begin
    ------ if existing, store in result -----
    Select
        pk_entity
    From
        Into resulting_pk information.statement_of_statement
    Where
        fk_property_of_property Is Not Distinct From NEW.fk_property_of_property
        And fk_subject Is Not Distinct From NEW.fk_subject
        And fk_object Is Not Distinct From NEW.fk_object;
    -- RAISE INFO 'resulting_pk: %', resulting_pk;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        --RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.statement_of_statement (fk_property_of_property, fk_subject, fk_object)
                Values (NEW.fk_property_of_property, NEW.fk_subject, NEW.fk_object)
                -- return all fields of the new row
            Returning
                *)
            Select
                pk_entity
            From
                Into resulting_pk _insert;
        -- RAISE INFO 'result of insert: %', resulting_row;
    End If;
    Select
        *
    From
        Into resulting_row information.v_statement_of_statement
    Where
        pk_entity = resulting_pk;
    Return resulting_row;
End;
$BODY$;

