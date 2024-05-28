CREATE OR REPLACE FUNCTION war.create_sink_table_entity_preview(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
DECLARE
  project_id int;
BEGIN
  -- Create table and triggers
  EXECUTE format('
  CREATE TABLE %1$s (LIKE war.entity_preview_template INCLUDING ALL)
  PARTITION BY LIST (project_id);

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
  -- Create partitions for each project
  FOR project_id IN
  SELECT
    pk_entity
  FROM
    projects.project LOOP
      -- Construct and execute the dynamic SQL statement
      -- e.g CREATE TABLE war.entity_preview_xyz_33 PARTITION OF war.entity_preview_xyz FOR VALUES IN (33);
      EXECUTE format('CREATE TABLE %1$s_%2$s PARTITION OF %1$s FOR VALUES IN (%2$s);', schema_and_table_name, project_id);
    END LOOP;
  -- Create partition for community data
  EXECUTE format('CREATE TABLE %1$s_0 PARTITION OF %1$s FOR VALUES IN (0);', schema_and_table_name);
END
$BODY$;

