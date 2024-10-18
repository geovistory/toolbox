CREATE OR REPLACE FUNCTION pgwar.update_entity_label_of_entity_preview(
    entity_id integer,
    project_id integer,
    new_label text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    UPDATE pgwar.entity_preview
    SET entity_label = new_label,
        tmsp_entity_label_modification = CURRENT_TIMESTAMP
    WHERE pk_entity = entity_id
      AND fk_project = project_id
      AND entity_label IS DISTINCT FROM new_label;
END;
$BODY$;