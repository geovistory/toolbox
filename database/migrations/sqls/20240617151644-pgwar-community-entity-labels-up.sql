/***
* Functions
***/
-- get most frequent entity_label among all projects for a specific entity
CREATE OR REPLACE FUNCTION pgwar.get_most_frequent_entity_label(entity_id int)
RETURNS text AS $$
DECLARE
    label text;
BEGIN
    SELECT entity_label
    FROM pgwar.entity_preview
    WHERE pk_entity = entity_id AND fk_project != 0
    GROUP BY pk_entity, entity_label
    ORDER BY  COUNT(entity_label) DESC
    LIMIT 1
    INTO label;

    RETURN label;
END;
$$ LANGUAGE plpgsql;

-- Function to upsert on pgwar.entity_preview
-----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.upsert_community_entity_preview(ep pgwar.entity_preview)
    RETURNS VOID
AS $$
BEGIN
    INSERT INTO pgwar.entity_preview(
        pk_entity,
        fk_project,
        fk_class,
        entity_type,
        class_label,
        entity_label,
        full_text,
        ts_vector,
        type_label,
        fk_type,
        time_span,
        first_second,
        last_second
    )
    VALUES(
        ep.pk_entity,
        0,
        ep.fk_class,
        ep.entity_type,
        ep.class_label,
        ep.entity_label,
        ep.full_text,
        ep.ts_vector,
        ep.type_label,
        ep.fk_type,
        ep.time_span,
        ep.first_second,
        ep.last_second
    )
    ON CONFLICT(pk_entity, fk_project)
        DO UPDATE SET
          -- ... or update the pgwar.entity_preview
          fk_class = EXCLUDED.fk_class,
          entity_type = EXCLUDED.entity_type,
          class_label = EXCLUDED.class_label,
          entity_label = EXCLUDED.entity_label,
          full_text = EXCLUDED.full_text,
          ts_vector = EXCLUDED.ts_vector,
          type_label = EXCLUDED.type_label,
          fk_type = EXCLUDED.fk_type,
          time_span = EXCLUDED.time_span,
          first_second = EXCLUDED.first_second,
          last_second = EXCLUDED.last_second
    WHERE
       -- ... where it is distinct from previous value
        entity_preview.fk_class IS DISTINCT FROM EXCLUDED.fk_class OR
        entity_preview.entity_type IS DISTINCT FROM EXCLUDED.entity_type OR
        entity_preview.class_label IS DISTINCT FROM EXCLUDED.class_label OR
        entity_preview.entity_label IS DISTINCT FROM EXCLUDED.entity_label OR
        entity_preview.full_text IS DISTINCT FROM EXCLUDED.full_text OR
        entity_preview.ts_vector IS DISTINCT FROM EXCLUDED.ts_vector OR
        entity_preview.type_label IS DISTINCT FROM EXCLUDED.type_label OR
        entity_preview.fk_type IS DISTINCT FROM EXCLUDED.fk_type OR
        entity_preview.time_span IS DISTINCT FROM EXCLUDED.time_span OR
        entity_preview.first_second IS DISTINCT FROM EXCLUDED.first_second OR
        entity_preview.last_second IS DISTINCT FROM EXCLUDED.last_second;
END;
$$
LANGUAGE plpgsql;

-- Update community entity labels on change on projects entity labels
CREATE OR REPLACE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change()
    RETURNS TRIGGER AS $$
DECLARE
    label text;
BEGIN
    IF NEW.fk_project != 0 OR OLD.fk_project !=0 THEN

        IF tg_op = 'UPDATE' AND OLD.entity_label != NEW.entity_label THEN
            SELECT pgwar.get_most_frequent_entity_label(NEW.pk_entity) INTO label;
            PERFORM
                pgwar.upsert_community_entity_preview((
                   NEW.pk_entity,
                   0,
                   NEW.fk_class,
                   NEW.entity_type,
                   NEW.class_label,
                   label,
                   NEW.full_text,
                   NEW.ts_vector,
                   NEW.type_label,
                   NEW.fk_type,
                   NEW.time_span,
                   NEW.first_second,
                   NEW.last_second,
                   NEW.tmsp_last_modification)::pgwar.entity_preview
                );
        ELSEIF tg_op = 'INSERT' THEN
            SELECT pgwar.get_most_frequent_entity_label(NEW.pk_entity) INTO label;
            PERFORM
                pgwar.upsert_community_entity_preview((
                   NEW.pk_entity,
                   0,
                   NEW.fk_class,
                   NEW.entity_type,
                   NEW.class_label,
                   label,
                   NEW.full_text,
                   NEW.ts_vector,
                   NEW.type_label,
                   NEW.fk_type,
                   NEW.time_span,
                   NEW.first_second,
                   NEW.last_second,
                   NEW.tmsp_last_modification)::pgwar.entity_preview
                );
        ELSE
            SELECT pgwar.get_most_frequent_entity_label(OLD.pk_entity) INTO label;
            UPDATE pgwar.entity_preview
            SET entity_label = label
            WHERE fk_project = 0 AND pk_entity = OLD.pk_entity;
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_modify_project_entity_preview
    AFTER INSERT OR UPDATE OR DELETE ON pgwar.entity_preview
    FOR EACH ROW
EXECUTE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change();