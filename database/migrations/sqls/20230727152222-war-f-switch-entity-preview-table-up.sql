DROP FUNCTION IF EXISTS war.switch_entity_preview_table(character varying);

CREATE OR REPLACE FUNCTION war.switch_entity_preview_table(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  EXECUTE format('
    CREATE OR REPLACE VIEW war.entity_preview AS
	  SELECT
        pk_entity,
        entity_type,
        fk_class,
        class_label,
        entity_label,
        full_text,
        ts_vector,
        type_label,
        fk_type,
        time_span,
        first_second,
        last_second,
        tmsp_last_modification,
        key,
        entity_id,
        parent_classes,
        ancestor_classes,
        project_id,
        type_id
    FROM %1$s;

    DROP TRIGGER IF EXISTS after_insert_on_entity_preview ON %1$s;

    CREATE TRIGGER after_insert_on_entity_preview
    AFTER INSERT
    ON %1$s
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE FUNCTION war.entity_previews__notify_upsert();

    DROP TRIGGER IF EXISTS after_update_on_entity_preview ON %1$s;

    CREATE TRIGGER after_update_on_entity_preview
    AFTER UPDATE
    ON %1$s
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE FUNCTION war.entity_previews__notify_upsert();

				   ', schema_and_table_name);
END
$BODY$;

