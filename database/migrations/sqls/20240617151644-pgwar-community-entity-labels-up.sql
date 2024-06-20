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

-- get and update community entity label
CREATE OR REPLACE FUNCTION pgwar.get_and_update_community_entity_label(entity_id int)
RETURNS void AS $$
DECLARE
    label text;
BEGIN
    
    -- check if communty entity exists in pgwar.entity_preview
    IF EXISTS(
        SELECT pk_entity
        FROM pgwar.entity_preview
        WHERE pk_entity = entity_id
        AND fk_project = 0
    ) THEN
        -- get community entity label
        label := pgwar.get_most_frequent_entity_label(entity_id);
    
        -- update entity preview
        PERFORM pgwar.update_entity_label_of_entity_preview(entity_id, 0, label);
    
    END IF;
    
END;
$$ LANGUAGE plpgsql;



-- Update community entity labels on change on projects entity labels
CREATE OR REPLACE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change()
    RETURNS TRIGGER AS $$
DECLARE
    entity_id int;
    label text;
BEGIN
    entity_id := COALESCE(NEW.pk_entity, OLD.pk_entity);

    PERFORM pgwar.get_and_update_community_entity_label(entity_id);
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_upsert_entity_preview_entity_label_02
AFTER INSERT OR UPDATE OF entity_label ON pgwar.entity_preview
FOR EACH ROW
WHEN (NEW.fk_project IS DISTINCT FROM 0)
EXECUTE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change();

CREATE TRIGGER after_delete_entity_preview_02
AFTER DELETE ON pgwar.entity_preview
FOR EACH ROW
WHEN (OLD.fk_project IS DISTINCT FROM 0)
EXECUTE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change();