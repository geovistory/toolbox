CREATE OR REPLACE FUNCTION war.create_sink_table_entity_preview (schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  AS $BODY$
BEGIN
  EXECUTE format('
  CREATE TABLE %1$s (LIKE war.entity_preview_template INCLUDING ALL);

	CREATE TRIGGER generate_key
		BEFORE INSERT OR UPDATE
		ON %1$s
		FOR EACH ROW
		EXECUTE FUNCTION war.entity_preview_generate_key();

	CREATE TRIGGER last_modification_tmsp
		BEFORE INSERT OR UPDATE
		ON %1$s
		FOR EACH ROW
		EXECUTE FUNCTION commons.tmsp_last_modification();

	CREATE TRIGGER ts_vector
		BEFORE INSERT OR UPDATE
		ON %1$s
		FOR EACH ROW
		EXECUTE FUNCTION war.entity_preview_ts_vector();
				   ', schema_and_table_name);
END
$BODY$;

