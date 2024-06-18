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


-- Update community entity labels on change on projects entity labels
-- CREATE OR REPLACE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change()
--     RETURNS TRIGGER AS $$
-- BEGIN
--
--
--     RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;
--
-- CREATE TRIGGER on_modify_project_entity_preview
--     AFTER INSERT OR UPDATE ON pgwar.entity_preview
--     FOR EACH ROW
-- EXECUTE FUNCTION pgwar.update_community_entity_label_on_project_entity_label_change();