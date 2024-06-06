------ Table pgwar.project_statements ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pgwar.project_statements(
  pk_entity integer NOT NULL,
  fk_project integer NOT NULL,
  fk_subject_info integer,
  fk_property integer NOT NULL,
  fk_object_info integer,
  fk_object_tables_cell bigint,
  ord_num_of_domain integer,
  ord_num_of_range integer,
  object_value jsonb,
  PRIMARY KEY (pk_entity, fk_project)
);

-- Function to upsert on pgwar.project_statements
-----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.upsert_project_statements(ps pgwar.project_statements)
    RETURNS VOID
AS $$
BEGIN
    INSERT INTO pgwar.project_statements(
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        fk_object_tables_cell,
        ord_num_of_domain,
        ord_num_of_range,
        object_value
    )
    VALUES(
        ps.pk_entity,
        ps.fk_project,
        ps.fk_subject_info,
        ps.fk_property,
        ps.fk_object_info,
        ps.fk_object_tables_cell,
        ps.ord_num_of_domain,
        ps.ord_num_of_range,
        ps.object_value
    )
    ON CONFLICT(pk_entity, fk_project)
        DO UPDATE SET
        -- ... or update the pgwar.statement
        fk_subject_info = EXCLUDED.fk_subject_info,
        fk_property = EXCLUDED.fk_property,
        fk_object_info = EXCLUDED.fk_object_info,
        fk_object_tables_cell = EXCLUDED.fk_object_tables_cell,
        ord_num_of_domain = EXCLUDED.ord_num_of_domain,
        ord_num_of_range = EXCLUDED.ord_num_of_range,
        object_value = EXCLUDED.object_value
    WHERE
        -- ... where it is distinct from previous value
        ps.fk_subject_info IS DISTINCT FROM EXCLUDED.fk_subject_info OR
        ps.fk_property IS DISTINCT FROM EXCLUDED.fk_property OR
        ps.fk_object_info IS DISTINCT FROM EXCLUDED.fk_object_info OR
        ps.fk_object_tables_cell IS DISTINCT FROM EXCLUDED.fk_object_tables_cell OR
        ps.ord_num_of_domain IS DISTINCT FROM EXCLUDED.ord_num_of_domain OR
        ps.ord_num_of_range IS DISTINCT FROM EXCLUDED.ord_num_of_range OR
        ps.object_value IS DISTINCT FROM EXCLUDED.object_value;
END;
$$
    LANGUAGE plpgsql;

-- Trigger function after_modify_info_proj_rel
----------------------------------------------
CREATE FUNCTION pgwar.after_modify_info_proj_rel_proj_stmt()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
DECLARE
    is_upsert boolean;
    statement pgwar.statement;
BEGIN
    -- get the referenced pgwar.statement
    SELECT *
    INTO statement
    FROM pgwar.statement stmt
    WHERE stmt.pk_entity = COALESCE(NEW.fk_entity, OLD.fk_entity);

    -- if pgwar.statement is referenced by info_proj_rel.fk_entity
    IF statement.pk_entity IS NOT NULL THEN
        -- determine if this is an upsert action
        SELECT (NEW.is_in_project = TRUE AND TG_OP != 'DELETE') INTO is_upsert;
        -- if upsert ...
        IF is_upsert = TRUE THEN
            -- ... upsert the project statements
            PERFORM
                pgwar.upsert_project_statements((
                        NEW.pk_entity,
                        NEW.fk_project,
                        NEW.fk_subject_info,
                        NEW.fk_property,
                        NEW.fk_object_info,
                        NEW.fk_object_tables_cell,
                        NEW.ord_num_of_domain,
                        NEW.ord_num_of_range,
                        NEW.object_value)::pgwar.project_statements
                );
        ELSE
            -- ... delete the project_statements
            DELETE FROM pgwar.project_statements
            WHERE pk_entity = COALESCE(NEW.pk_entity, OLD.pk_entity)
              AND fk_project = COALESCE(NEW.fk_project, OLD.fk_project);
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_modify_info_proj_rel_proj_stmt
    AFTER INSERT OR UPDATE OR DELETE ON projects.info_proj_rel
    FOR EACH ROW
EXECUTE FUNCTION pgwar.after_modify_info_proj_rel_proj_stmt();

-- Trigger function after_upsert_pgw_statement
----------------------------------------------
CREATE FUNCTION pgwar.after_upsert_pgw_statement()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
BEGIN
    -- if it is in at least one project ...
    IF EXISTS(
        SELECT
            pk_entity
        FROM
            projects.info_proj_rel
        WHERE
            fk_entity = NEW.pk_entity
          AND is_in_project = TRUE) THEN
        -- ... insert missing project statements or update existing, in case statement differs
        PERFORM
            pgwar.upsert_project_statements((
                NEW.pk_entity,
                fk_project,
                NEW.fk_subject_info,
                NEW.fk_property,
                NEW.fk_object_info,
                NEW.fk_object_tables_cell,
                NEW.ord_num_of_domain,
                NEW.ord_num_of_range,
                NEW.object_value)::pgwar.project_statements
            )
        FROM
            projects.info_proj_rel
        WHERE
            fk_entity = NEW.pk_entity
          AND is_in_project = TRUE;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_upsert_pgw_statement
    AFTER INSERT OR UPDATE ON pgwar.statement
    FOR EACH ROW
EXECUTE FUNCTION pgwar.after_upsert_pgw_statement();

-- Trigger function after_delete_pgw_statement
----------------------------------------------
CREATE FUNCTION pgwar.after_delete_pgw_statement()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM pgwar.project_statements
    WHERE pk_entity = OLD.pk_entity;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_delete_pgw_statement
    AFTER DELETE ON pgwar.statement
    FOR EACH ROW
EXECUTE FUNCTION pgwar.after_delete_pgw_statement();