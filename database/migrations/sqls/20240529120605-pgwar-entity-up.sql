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
    fk_class_modified timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    CONSTRAINT entity_preview_pkey PRIMARY KEY (pk_entity, fk_project)
);

-- Function to upsert fk_project, pk_entity, fk_class on pgwar.entity_preview
-----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.upsert_entity_preview_fk_class(entity_id int, project_id int, class_id int)
    RETURNS VOID
    AS $$
BEGIN
    INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class, fk_class_modified)
        VALUES(entity_id, project_id, class_id, CURRENT_TIMESTAMP)
    ON CONFLICT(pk_entity, fk_project)
        DO UPDATE SET
            -- ... or update the fk_class
            fk_class = EXCLUDED.fk_class,
            fk_class_modified = CURRENT_TIMESTAMP
        WHERE
            -- ... where it is distinct from previous value
            entity_preview.fk_class IS DISTINCT FROM EXCLUDED.fk_class;
END;
$$
LANGUAGE plpgsql;



-- Function to update pgwar from resource
----------------------------------------------
CREATE FUNCTION pgwar.update_from_resource(NEW_RES information.resource)
    RETURNS void
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
            fk_entity = NEW_RES.pk_entity
            AND is_in_project IS TRUE) THEN
        -- ... insert missing project entities or update existing, in case fk_class differs
        PERFORM
            pgwar.upsert_entity_preview_fk_class(fk_entity, fk_project, NEW_RES.fk_class)
        FROM
            projects.info_proj_rel
        WHERE
            fk_entity = NEW_RES.pk_entity
            AND is_in_project IS TRUE;
        -- ... insert missing community entity or update existing, in case fk_class differs
        PERFORM
            pgwar.upsert_entity_preview_fk_class(NEW_RES.pk_entity, 0, NEW_RES.fk_class);
    END IF;
        -- if hidden for toolbox community ...
        IF(NEW_RES.community_visibility ->> 'toolbox')::bool IS FALSE THEN
            -- ... delete potentially unallowed community entities
            DELETE FROM pgwar.entity_preview
            WHERE fk_project = 0
                AND pk_entity = NEW_RES.pk_entity;
    END IF;
END;
$$;

-- Trigger function after_upsert_resource
----------------------------------------------
CREATE FUNCTION pgwar.after_upsert_resource()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM pgwar.update_from_resource(NEW);

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

