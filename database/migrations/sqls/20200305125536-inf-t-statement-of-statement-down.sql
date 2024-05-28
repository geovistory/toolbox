-- 8
Drop Function information.v_statement_of_statement_find_or_create ();

-- 7
Drop View information.v_statement_of_statement;

-- 5
Drop Table information.statement_of_statement_vt;

-- 4
Create Or Replace Function commons.init_entity_child_table (
    schema_and_table_name character varying
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    unique_constraint_name varchar;
Begin
    -- Create the name of the unique constraint that will be applied to the new table's pk_entity
    Select
        Into unique_constraint_name replace(schema_and_table_name, '.', '_') _pk_entity_unique;
    -- Do the Magic:
    Execute format( '

                  -- Add unique constraint to pk_entity of the new table, so that it can be referenced by foreign keys

                  ALTER TABLE %1$s ADD CONSTRAINT  %2$s_pk_entity_unique UNIQUE (pk_entity);

                  -- Trigger: creation_tmsp

                  CREATE TRIGGER creation_tmsp
                  BEFORE INSERT
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.tmsp_creation();

                  -- Trigger: insert_schema_table_name

                  CREATE TRIGGER insert_schema_table_name
                  BEFORE INSERT
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.insert_schema_table_name();

                  -- Trigger: last_modification_tmsp

                  CREATE TRIGGER last_modification_tmsp
                  BEFORE INSERT OR UPDATE
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.tmsp_last_modification();

                  -- Table: <schema_and_table_name>_vt

                  CREATE TABLE %1$s_vt (LIKE %1$s);

                  -- Trigger: versioning_trigger

                  CREATE TRIGGER versioning_trigger
                  BEFORE INSERT OR UPDATE OR DELETE ON %1$s
                  FOR EACH ROW EXECUTE PROCEDURE versioning(
                  "sys_period", ''%1$s_vt'', true
                  );

                  -- Trigger: create_entity_version_key

                  CREATE TRIGGER create_entity_version_key
                  BEFORE INSERT
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.create_entity_version_key();

                  -- Trigger: update_entity_version_key

                  CREATE TRIGGER update_entity_version_key
                  BEFORE UPDATE
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.update_entity_version_key();', schema_and_table_name, unique_constraint_name);
End
$BODY$;

-- 3
Drop Table information.statement_of_statement;

-- 2
Create Table information.property_of_property_vt (
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
    fk_property integer,
    provisional_property character varying Collate pg_catalog. "default",
    fk_role integer,
    fk_entity_association integer,
    fk_range_entity integer Not Null,
    entity_version integer
)
With (
    Oids = False)
Tablespace pg_default;

-- 1
Create Table information.property_of_property (
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

    fk_property integer,
    provisional_property character varying Collate pg_catalog. "default",
    fk_role integer,
    fk_entity_association integer,
    fk_range_entity integer Not Null,
    entity_version integer,
    Constraint information_property_of_property_pk_entity_unique Unique (pk_entity),
    Constraint property_of_property_fk_entity_association_fkey Foreign Key (fk_entity_association) References information.entity_association (pk_entity) Match SIMPLE On Update No ACTION On Delete No ACTION,
    Constraint property_of_property_fk_role_fkey Foreign Key (fk_role) References information.role (pk_entity) Match SIMPLE On Update No ACTION On Delete No ACTION
)
Inherits (
    information.entity
)
With (
    Oids = False)
Tablespace pg_default;

-- Index: property_of_property_pk_entity_idx
-- DROP INDEX information.property_of_property_pk_entity_idx;

Create Index property_of_property_pk_entity_idx On information.property_of_property Using btree (pk_entity Asc NULLS Last) Tablespace pg_default;

-- Trigger: create_entity_version_key
-- DROP TRIGGER create_entity_version_key ON information.property_of_property;

Create Trigger create_entity_version_key
    Before Insert On information.property_of_property For Each Row
    Execute Procedure commons.create_entity_version_key ();

-- Trigger: creation_tmsp
-- DROP TRIGGER creation_tmsp ON information.property_of_property;

Create Trigger creation_tmsp
    Before Insert On information.property_of_property For Each Row
    Execute Procedure commons.tmsp_creation ();

-- Trigger: insert_schema_table_name
-- DROP TRIGGER insert_schema_table_name ON information.property_of_property;

Create Trigger insert_schema_table_name
    Before Insert On information.property_of_property For Each Row
    Execute Procedure commons.insert_schema_table_name ();

-- Trigger: last_modification_tmsp
-- DROP TRIGGER last_modification_tmsp ON information.property_of_property;

Create Trigger last_modification_tmsp
    Before Insert Or Update On information.property_of_property For Each Row
    Execute Procedure commons.tmsp_last_modification ();

-- Trigger: update_entity_version_key
-- DROP TRIGGER update_entity_version_key ON information.property_of_property;

Create Trigger update_entity_version_key
    Before Update On information.property_of_property For Each Row
    Execute Procedure commons.update_entity_version_key ();

-- Trigger: versioning_trigger
-- DROP TRIGGER versioning_trigger ON information.property_of_property;

Create Trigger versioning_trigger
    Before Insert Or Delete Or Update On information.property_of_property For Each Row
    Execute Procedure public.versioning ('sys_period', 'information.property_of_property_vt', 'true');

-- 0.1
Create Or Replace View information.v_property_of_property As
Select
    property_of_property.pk_entity,
    property_of_property.schema_name,
    property_of_property.table_name,
    property_of_property.notes,
    property_of_property.fk_creator,
    property_of_property.fk_last_modifier,
    property_of_property.tmsp_creation,
    property_of_property.tmsp_last_modification,
    property_of_property.sys_period,
    property_of_property.metadata,
    property_of_property.fk_property,
    property_of_property.provisional_property,
    property_of_property.fk_role,
    property_of_property.fk_entity_association,
    property_of_property.fk_range_entity,
    property_of_property.entity_version
From
    information.property_of_property;

-- 6
Create Function information.v_property_of_property_find_or_create ()
    Returns Trigger
    Language 'plpgsql'
    Cost 100 Volatile Not Leakproof
    As $BODY$
Declare
    resulting_pk integer;
    resulting_row information.v_property_of_property;
Begin
    Raise INFO ' input values
              NEW.fk_property: %,
              NEW.provisional_property: %
              NEW.fk_role: %
              NEW.fk_entity_association: %
              NEW.fk_range_entity: %
              ', NEW.fk_property, NEW.provisional_property, NEW.fk_role, NEW.fk_entity_association, NEW.fk_range_entity;
    ------ if existing, store in result -----
    Select
        pk_entity
    From
        Into resulting_pk information.property_of_property
    Where
        fk_property Is Not Distinct From NEW.fk_property
        And provisional_property Is Not Distinct From NEW.provisional_property
        And fk_role Is Not Distinct From NEW.fk_role
        And fk_entity_association Is Not Distinct From NEW.fk_entity_association
        And fk_range_entity Is Not Distinct From NEW.fk_range_entity;
    Raise INFO 'resulting_pk: %', resulting_pk;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        Raise INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.property_of_property (fk_property, provisional_property, fk_role, fk_entity_association, fk_range_entity)
                Values (NEW.fk_property, NEW.provisional_property, NEW.fk_role, NEW.fk_entity_association, NEW.fk_range_entity)
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
        Into resulting_row information.v_property_of_property
    Where
        pk_entity = resulting_pk;
    Return resulting_row;
End;
$BODY$;

-- 0.2
Create Trigger on_insert
    Instead Of INSERT On information.v_property_of_property For Each Row
    Execute Procedure information.v_property_of_property_find_or_create ();

