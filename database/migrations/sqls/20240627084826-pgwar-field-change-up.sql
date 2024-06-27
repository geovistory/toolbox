------ View pgwar.v_statements_combined -----------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE pgwar.field_change
(
    fk_project integer NOT NULL,
    fk_source_info integer NOT NULL,
    fk_source_tables_cell bigint NOT NULL,
    fk_property integer NOT NULL,
    is_outgoing boolean NOT NULL,
    tmsp_last_modification timestamp with time zone,
    UNIQUE (fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing)
);

-- Function to upsert on pgwar.field_change
-----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.upsert_field_change(fc pgwar.field_change)
    RETURNS VOID
AS $$
BEGIN
    INSERT INTO pgwar.field_change(
        fk_project,
        fk_source_info,
        fk_source_tables_cell,
        fk_property,
        is_outgoing,
        tmsp_last_modification
    )
    VALUES(

        fc.fk_project,
        fc.fk_source_info,
        fc.fk_source_tables_cell,
        fc.fk_property,
        fc.is_outgoing,
        fc.tmsp_last_modification
    )
    ON CONFLICT(fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing)
    DO UPDATE SET
        -- ... or update the pgwar.statement
        fk_project = EXCLUDED.fk_project,
        fk_source_info = EXCLUDED.fk_source_info,
        fk_source_tables_cell = EXCLUDED.fk_source_tables_cell,
        fk_property = EXCLUDED.fk_property,
        is_outgoing = EXCLUDED.is_outgoing,
        tmsp_last_modification = EXCLUDED.tmsp_last_modification
    WHERE
        -- ... where it is distinct from previous value
        field_change.fk_project IS DISTINCT FROM EXCLUDED.fk_project OR
        field_change.fk_source_info IS DISTINCT FROM EXCLUDED.fk_source_info OR
        field_change.fk_source_tables_cell IS DISTINCT FROM EXCLUDED.fk_source_tables_cell OR
        field_change.fk_property IS DISTINCT FROM EXCLUDED.fk_property OR
        field_change.is_outgoing IS DISTINCT FROM EXCLUDED.is_outgoing OR
        field_change.tmsp_last_modification IS DISTINCT FROM EXCLUDED.tmsp_last_modification;
END;
$$
LANGUAGE plpgsql;

-- Function upsert_field_change
----------------------------------------------
CREATE FUNCTION pgwar.upsert_field_change()
    RETURNS void
    LANGUAGE plpgsql
AS $$
DECLARE
    proj_stmt pgwar.project_statements;
BEGIN

    proj_stmt := COALESCE(NEW, OLD);
    --if project statement is a statement with literal
    IF proj_stmt.object_value IS NOT NULL THEN
        PERFORM
            pgwar.upsert_field_change((
                proj_stmt.fk_project,
                proj_stmt.fk_subject_info,
                0,
                proj_stmt.fk_property,
                true,
                proj_stmt.tmsp_last_modification
            )::pgwar.field_change);
        --else if project statement is a statement with entity
    ELSE
        PERFORM
            pgwar.upsert_field_change((
                proj_stmt.fk_project,
                proj_stmt.fk_subject_info,
                0,
                proj_stmt.fk_property,
                true,
                proj_stmt.tmsp_last_modification
            )::pgwar.field_change);

        PERFORM
            pgwar.upsert_field_change((
                proj_stmt.fk_project,
                proj_stmt.fk_object_info,
                proj_stmt.fk_object_tables_cell,
                proj_stmt.fk_property,
                false,
                proj_stmt.tmsp_last_modification
            )::pgwar.field_change);
    END IF;
END;
$$;


CREATE CONSTRAINT TRIGGER after_modify_project_statements
    AFTER INSERT OR UPDATE OR DELETE ON pgwar.project_statements
    DEFERRABLE
    FOR EACH ROW EXECUTE PROCEDURE pgwar.upsert_field_change();

-- Function pgwar.field_change_notify_upsert
----------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.field_change_notify_upsert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    item json;
BEGIN
    FOR item in SELECT row_to_json(new_table) FROM new_table
        LOOP
            PERFORM pg_notify('field_change'::text, item::text);
        end LOOP;
    RETURN NEW;
END;
$BODY$;

CREATE TRIGGER after_insert_field_change
    AFTER INSERT OR UPDATE
    ON pgwar.field_change
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
EXECUTE FUNCTION pgwar.field_change_notify_upsert();