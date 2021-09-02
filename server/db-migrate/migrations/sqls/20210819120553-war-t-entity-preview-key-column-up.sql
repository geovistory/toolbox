-- 1
ALTER TABLE war.entity_preview
    ADD COLUMN key VARCHAR;

-- 2
UPDATE
    war.entity_preview t0
SET
    key = concat(t1.project, '_', t1.pk_entity)
FROM
    war.entity_preview t1
WHERE
    t0.project = t1.project
    AND t0.pk_entity = t1.pk_entity;

-- 3
CREATE FUNCTION war.entity_preview_generate_key ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS $BODY$
BEGIN
    NEW.key = concat(NEW.project, '_', NEW.pk_entity);
    RETURN NEW;
END;
$BODY$;

-- 4
CREATE TRIGGER generate_key
    BEFORE INSERT OR UPDATE ON war.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE war.entity_preview_generate_key ();

-- 5
CREATE INDEX entity_preview_key_idx ON war.entity_preview USING btree (key);

