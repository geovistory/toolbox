CREATE OR REPLACE FUNCTION pgwar.entity_previews_notify_upsert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    notification text;
BEGIN


    SELECT DISTINCT tmsp_last_modification::text into notification
    FROM new_table
    WHERE tmsp_last_modification is not null
    LIMIT 1;

      if notification is not null then
                    PERFORM pg_notify('entity_previews_updated'::text, notification);
     end if;

RETURN NEW;
END;
$BODY$;

CREATE OR REPLACE FUNCTION pgwar.entity_previews_notify_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    notification text;
BEGIN


SELECT DISTINCT new_table.tmsp_last_modification::text into notification
FROM new_table,
       old_table
WHERE  new_table.pk_entity = old_table.pk_entity
AND    new_table.fk_project = old_table.fk_project
AND    new_table.tmsp_last_modification is not null
AND (
  new_table.fk_class IS DISTINCT FROM old_table.fk_class OR
  new_table.class_label IS DISTINCT FROM old_table.class_label OR
  new_table.entity_label IS DISTINCT FROM old_table.entity_label OR
  new_table.entity_type IS DISTINCT FROM old_table.entity_type OR
  new_table.type_label IS DISTINCT FROM old_table.type_label OR
  new_table.fk_type IS DISTINCT FROM old_table.fk_type
)
LIMIT 1;

  if notification is not null then
                PERFORM pg_notify('entity_previews_updated'::text, notification);
  end if;

RETURN NEW;
END;
$BODY$;

CREATE TRIGGER after_insert_on_entity_preview
    AFTER INSERT
    ON pgwar.entity_preview
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE FUNCTION pgwar.entity_previews_notify_upsert();

CREATE TRIGGER after_update_on_entity_preview
    AFTER UPDATE
    ON pgwar.entity_preview
    REFERENCING NEW TABLE AS new_table OLD TABLE AS old_table
    FOR EACH STATEMENT
    EXECUTE FUNCTION pgwar.entity_previews_notify_update();

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE
    ON pgwar.entity_preview
    FOR EACH ROW
    EXECUTE FUNCTION commons.tmsp_last_modification();
