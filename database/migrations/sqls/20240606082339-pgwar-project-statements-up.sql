------ Table pgwar.project_statements ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pgwar.project_statements(
  pk_entity integer NOT NULL,
  fk_project integer NOT NULL,
  fk_subject_info integer,
  fk_property integer NOT NULL,
  fk_object_info integer,
  fk_object_tables_cell bigint,
  ord_num_of_domain numeric,
  ord_num_of_range numeric,
  object_label varchar(100),
  object_value jsonb,
  tmsp_last_modification timestamp with time zone,
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
        object_label,
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
        ps.object_label,
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
        object_label = EXCLUDED.object_label,
        object_value = EXCLUDED.object_value
    WHERE
        -- ... where it is distinct from previous value
        project_statements.fk_subject_info IS DISTINCT FROM EXCLUDED.fk_subject_info OR
        project_statements.fk_property IS DISTINCT FROM EXCLUDED.fk_property OR
        project_statements.fk_object_info IS DISTINCT FROM EXCLUDED.fk_object_info OR
        project_statements.fk_object_tables_cell IS DISTINCT FROM EXCLUDED.fk_object_tables_cell OR
        project_statements.ord_num_of_domain IS DISTINCT FROM EXCLUDED.ord_num_of_domain OR
        project_statements.ord_num_of_range IS DISTINCT FROM EXCLUDED.ord_num_of_range OR
        project_statements.object_label IS DISTINCT FROM EXCLUDED.object_label OR
        project_statements.object_value IS DISTINCT FROM EXCLUDED.object_value;
END;
$$
LANGUAGE plpgsql;

-- Function update_from_info_proj_rel
----------------------------------------------
CREATE FUNCTION pgwar.update_from_info_proj_rel(NEW_OLD projects.info_proj_rel, is_upsert bool)
    RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    entity information.resource;
    statement pgwar.statement;
BEGIN

    -- get the referenced pgwar.statement
    SELECT *
    INTO statement
    FROM pgwar.statement stmt
    WHERE stmt.pk_entity = NEW_OLD.fk_entity;

    -- if pgwar.statement is referenced by info_proj_rel.fk_entity
    IF statement.pk_entity IS NOT NULL THEN
       
        -- if upsert ...
        IF is_upsert IS TRUE THEN
            -- ... upsert the project statements
            PERFORM
                pgwar.upsert_project_statements((
                        NEW_OLD.fk_entity,
                        NEW_OLD.fk_project,
                        statement.fk_subject_info,
                        statement.fk_property,
                        statement.fk_object_info,
                        statement.fk_object_tables_cell,
                        NEW_OLD.ord_num_of_domain::numeric,
                        NEW_OLD.ord_num_of_range::numeric,
                        statement.object_label,
                        statement.object_value,
                        NULL)::pgwar.project_statements
                );
        ELSE
            -- ... delete the project_statements
            DELETE FROM pgwar.project_statements
            WHERE pk_entity = NEW_OLD.fk_entity
              AND fk_project = NEW_OLD.fk_project;
        END IF;
    ELSE

        -- get the referenced information.resource
        SELECT * 
        INTO entity
        FROM information.resource
        WHERE pk_entity = NEW_OLD.fk_entity;
        -- if the referenced item is an entity
        IF entity.pk_entity IS NOT NULL THEN

            -- if upsert ...
            IF is_upsert IS TRUE THEN
                -- ... upsert the project entity
                PERFORM
                    pgwar.upsert_entity_preview_fk_class(NEW_OLD.fk_entity, NEW_OLD.fk_project, entity.fk_class);
                -- if allowed ...
                IF (entity.community_visibility ->> 'toolbox')::bool IS TRUE THEN
                    -- ... upsert the community entity
                    PERFORM
                        pgwar.upsert_entity_preview_fk_class(NEW_OLD.fk_entity, 0, entity.fk_class);
                END IF;
            ELSE
                -- ... delete the project entity
                DELETE FROM pgwar.entity_preview
                WHERE pk_entity = NEW_OLD.fk_entity
                    AND fk_project = NEW_OLD.fk_project;
                -- ... check if community entity has to be deleted
                IF NOT EXISTS (
                    SELECT
                        pk_entity
                    FROM
                        projects.info_proj_rel
                    WHERE
                        fk_entity = NEW_OLD.fk_entity
                        AND is_in_project IS TRUE) THEN
                    -- ... delete the community entity
                    DELETE FROM pgwar.entity_preview
                    WHERE pk_entity = NEW_OLD.fk_entity
                        AND fk_project = 0;
                END IF;
            END IF;
        END IF;

    END IF;
END;
$$;

-- Trigger function after_modify_info_proj_rel
----------------------------------------------
CREATE FUNCTION pgwar.after_modify_info_proj_rel()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
DECLARE
    info_proj_rel projects.info_proj_rel;
    is_upsert boolean;
    statement pgwar.statement;
BEGIN
    info_proj_rel := COALESCE(NEW,OLD);
    
    SELECT (NEW.is_in_project IS TRUE AND TG_OP != 'DELETE') INTO is_upsert;
    
    PERFORM pgwar.update_from_info_proj_rel(info_proj_rel, is_upsert);

    RETURN NEW;
END;
$$;

CREATE TRIGGER after_modify_info_proj_rel
    AFTER INSERT OR UPDATE OR DELETE ON projects.info_proj_rel
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_modify_info_proj_rel();

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
          AND is_in_project IS TRUE) THEN
        -- ... insert missing project statements or update existing, in case statement differs
        PERFORM
            pgwar.upsert_project_statements((
                NEW.pk_entity,
                fk_project,
                NEW.fk_subject_info,
                NEW.fk_property,
                NEW.fk_object_info,
                NEW.fk_object_tables_cell,
                ord_num_of_domain::numeric,
                ord_num_of_range::numeric,
                NEW.object_label,
                NEW.object_value,
                NULL)::pgwar.project_statements
            )
        FROM
            projects.info_proj_rel
        WHERE
            fk_entity = NEW.pk_entity
          AND is_in_project IS TRUE;
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

-- add trigger for last_modification_tmsp
CREATE OR REPLACE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE 
    ON pgwar.project_statements
    FOR EACH ROW
    EXECUTE FUNCTION commons.tmsp_last_modification();

------ Table pgwar.project_statements_deleted ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
-- this table is used by the fulltext cron job to find entities that need an fulltext update
-- because they are the subject or object of a deleted project statement
CREATE TABLE IF NOT EXISTS pgwar.project_statements_deleted(
  pk_entity integer NOT NULL,
  fk_project integer NOT NULL,
  fk_subject_info integer,
  fk_property integer NOT NULL,
  fk_object_info integer,
  object_value jsonb,
  tmsp_deletion timestamp with time zone,
  PRIMARY KEY (pk_entity, fk_project)
);

CREATE OR REPLACE FUNCTION pgwar.handle_project_statements_delete() 
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update the deleted row in pgwar.project_statements_deleted
    INSERT INTO pgwar.project_statements_deleted (pk_entity, fk_project, fk_subject_info, fk_property, fk_object_info, object_value, tmsp_deletion)
    VALUES (OLD.pk_entity, OLD.fk_project, OLD.fk_subject_info, OLD.fk_property, OLD.fk_object_info, OLD.object_value, CURRENT_TIMESTAMP)
    ON CONFLICT (pk_entity, fk_project)
    DO UPDATE SET 
        fk_subject_info = EXCLUDED.fk_subject_info,
        fk_property = EXCLUDED.fk_property,
        fk_object_info = EXCLUDED.fk_object_info,
        object_value = EXCLUDED.object_value,
        tmsp_deletion = EXCLUDED.tmsp_deletion;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_delete_project_statements
AFTER DELETE ON pgwar.project_statements
FOR EACH ROW
EXECUTE FUNCTION pgwar.handle_project_statements_delete();
