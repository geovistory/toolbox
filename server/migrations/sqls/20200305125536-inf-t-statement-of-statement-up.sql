-- 0
Drop View information.v_property_of_property;

-- 1
Drop Table information.property_of_property;

-- 2
Drop Table information.property_of_property_vt;

-- 3
Create Table information.statement_of_statement (
    fk_property_of_property integer,
    fk_subject integer,
    fk_object integer Not Null,
    Foreign Key (fk_subject) References information.role (pk_entity)
)
Inherits (
    information.entity
);

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
                  );', schema_and_table_name, unique_constraint_name);
End
$BODY$;

-- 5
Select
    commons.init_entity_child_table ('information.statement_of_statement');

-- 6
Drop Function information.v_property_of_property_find_or_create ();

-- 7
Create View information.v_statement_of_statement As
Select
    *
From
    information.statement_of_statement;

-- 8
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

