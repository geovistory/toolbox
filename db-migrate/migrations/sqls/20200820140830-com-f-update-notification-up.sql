-- 1
CREATE OR REPLACE FUNCTION commons.notify_modification_trigger() RETURNS trigger AS $trigger$
BEGIN
  -- Notify the channel, e.g.: "modified_projects_text_property"
  PERFORM pg_notify('modified_' || TG_TABLE_SCHEMA || '_' || TG_TABLE_NAME, now()::text);
  RETURN NEW;
END;
$trigger$ LANGUAGE plpgsql;

-- 2
CREATE TRIGGER notify_modification
    AFTER INSERT OR UPDATE 
    ON projects.project
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();

-- 3
CREATE TRIGGER notify_modification
    AFTER INSERT OR UPDATE OR DELETE
    ON projects.text_property
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();

-- 4
CREATE TRIGGER notify_modification
    AFTER INSERT OR UPDATE OR DELETE
    ON information.statement
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();

-- 5
CREATE TRIGGER notify_modification
    AFTER INSERT OR UPDATE OR DELETE
    ON information.persistent_item
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();

-- 6
CREATE TRIGGER notify_modification
    AFTER INSERT OR UPDATE OR DELETE
    ON information.temporal_entity
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();

-- 7
CREATE TRIGGER notify_modification
    AFTER INSERT OR UPDATE OR DELETE
    ON projects.info_proj_rel
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();