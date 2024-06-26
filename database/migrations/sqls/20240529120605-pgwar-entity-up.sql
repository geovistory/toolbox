-- SCHEMA pgwar
------------------------------
CREATE SCHEMA pgwar;

-- Table pgwar.entity_preview
------------------------------
CREATE TABLE IF NOT EXISTS pgwar.entity_preview(
    pk_entity integer NOT NULL,
    fk_project integer NOT NULL DEFAULT 0,
    fk_class integer NOT NULL,
    entity_type text,
    class_label character varying,
    entity_label text,
    full_text text,
    ts_vector tsvector,
    type_label text,
    fk_type integer,
    time_span jsonb,
    first_second bigint,
    last_second bigint,
    parent_classes jsonb,
    ancestor_classes jsonb,
    tmsp_last_modification timestamp with time zone,
    CONSTRAINT entity_preview_pkey PRIMARY KEY (pk_entity, fk_project)
)
PARTITION BY LIST (fk_project);

-- Create partition for community (fk_project = 0)
--------------------------------------------------
CREATE TABLE pgwar.entity_preview_0 PARTITION OF pgwar.entity_preview
FOR VALUES IN (0);

-- Function to create partition on pgwar.entity_preview
-------------------------------------------------------
CREATE FUNCTION pgwar.add_entity_preview_partition()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $_$
BEGIN
    -- create the partition
    EXECUTE format('CREATE TABLE pgwar.entity_preview_%1$s PARTITION OF pgwar.entity_preview FOR VALUES IN (%1$s);', NEW.pk_entity);
    RETURN NEW;
END;
$_$;

-- Trigger on projects.project to create new partition on pgwar.entity_preview
------------------------------------------------------------------------------
CREATE TRIGGER add_pgwar_entity_preview_partition
    BEFORE INSERT ON projects.project
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.add_entity_preview_partition();

-- Function to upsert fk_project, pk_entity, fk_class on pgwar.entity_preview
-----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.upsert_entity_preview_fk_class(entity_id int, project_id int, class_id int)
    RETURNS VOID
    AS $$
BEGIN
    INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class)
        VALUES(entity_id, project_id, class_id)
    ON CONFLICT(pk_entity, fk_project)
        DO UPDATE SET
            -- ... or update the fk_class
            fk_class = EXCLUDED.fk_class
        WHERE
            -- ... where it is distinct from previous value
            entity_preview.fk_class IS DISTINCT FROM EXCLUDED.fk_class;
END;
$$
LANGUAGE plpgsql;

-- Trigger function after_modify_info_proj_rel
----------------------------------------------
CREATE FUNCTION pgwar.after_modify_info_proj_rel()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    is_upsert boolean;
    entity information.resource;
BEGIN
    -- get the referenced information.resource
    SELECT
        * INTO entity
    FROM
        information.resource
    WHERE
        pk_entity = COALESCE(NEW.fk_entity, OLD.fk_entity);
    -- if the referenced item is an entity
    IF entity.pk_entity IS NOT NULL THEN
        -- determine if this is an upsert action
        SELECT
            (NEW.is_in_project = TRUE
                AND TG_OP != 'DELETE') INTO is_upsert;
        -- if upsert ...
        IF is_upsert = TRUE THEN
            -- ... upsert the project entity
            PERFORM
                pgwar.upsert_entity_preview_fk_class(NEW.fk_entity, NEW.fk_project, entity.fk_class);
            -- if allowed ...
            IF (entity.community_visibility ->> 'toolbox')::bool = TRUE THEN
                -- ... upsert the community entity
                PERFORM
                    pgwar.upsert_entity_preview_fk_class(NEW.fk_entity, 0, entity.fk_class);
            END IF;
        ELSE
            -- ... delete the project entity
            DELETE FROM pgwar.entity_preview
            WHERE pk_entity = COALESCE(NEW.fk_entity, OLD.fk_entity)
                AND fk_project = COALESCE(NEW.fk_project, OLD.fk_project);
            -- ... check if community entity has to be deleted
            IF NOT EXISTS (
                SELECT
                    pk_entity
                FROM
                    projects.info_proj_rel
                WHERE
                    fk_entity = COALESCE(NEW.fk_entity, OLD.fk_entity)
                    AND is_in_project = TRUE) THEN
            -- ... delete the community entity
            DELETE FROM pgwar.entity_preview
            WHERE pk_entity = COALESCE(NEW.fk_entity, OLD.fk_entity)
                AND fk_project = 0;
        END IF;
    END IF;
END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_modify_info_proj_rel
    AFTER INSERT OR UPDATE OR DELETE ON projects.info_proj_rel
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_modify_info_proj_rel();

-- Trigger function after_upsert_resource
----------------------------------------------
CREATE FUNCTION pgwar.after_upsert_resource()
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
            fk_entity = COALESCE(NEW.pk_entity)
            AND is_in_project = TRUE) THEN
    -- ... insert missing project entities or update existing, in case fk_class differs
    PERFORM
        pgwar.upsert_entity_preview_fk_class(fk_entity, fk_project, NEW.fk_class)
    FROM
        projects.info_proj_rel
    WHERE
        fk_entity = NEW.pk_entity
        AND is_in_project = TRUE;
    -- ... insert missing community entity or update existing, in case fk_class differs
    PERFORM
        pgwar.upsert_entity_preview_fk_class(NEW.pk_entity, 0, NEW.fk_class);
END IF;
    -- if hidden for toolbox community ...
    IF(NEW.community_visibility ->> 'toolbox')::bool = FALSE THEN
        -- ... delete potentially unallowed community entities
        DELETE FROM pgwar.entity_preview
        WHERE fk_project = 0
            AND pk_entity = NEW.pk_entity;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_upsert_resource
    AFTER INSERT OR UPDATE ON information.resource
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_resource();

-- Trigger function after_delete_resource
----------------------------------------------
CREATE FUNCTION pgwar.after_delete_resource()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM pgwar.entity_preview
    WHERE pk_entity = OLD.pk_entity;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_delete_resource
    AFTER DELETE ON information.resource
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_resource();

