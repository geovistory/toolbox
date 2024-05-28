-- 1
DROP TABLE war.field_change;

-- 2
CREATE TABLE IF NOT EXISTS war.field_change_template (
  fk_project integer NOT NULL,
  fk_source_info integer NOT NULL,
  fk_source_tables_cell bigint NOT NULL,
  fk_property integer NOT NULL,
  fk_property_of_property integer NOT NULL,
  is_outgoing boolean NOT NULL,
  tmsp_last_modification timestamp with time zone NOT NULL,
  CONSTRAINT field_change_pkey PRIMARY KEY (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing),
  CONSTRAINT field_change_uniq UNIQUE (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing)
);

-- 3
CREATE OR REPLACE FUNCTION war.create_sink_table_field_change (schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  EXECUTE format('CREATE TABLE %1$s (LIKE war.field_change_template INCLUDING ALL);', schema_and_table_name);
END
$BODY$;

-- 4
CREATE OR REPLACE FUNCTION war.switch_field_change_table (schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  EXECUTE format('
		CREATE OR REPLACE VIEW war.field_change AS
		SELECT * FROM %1$s;

		DROP TRIGGER IF EXISTS after_insert_field_change ON %1$s;

		CREATE TRIGGER after_insert_field_change
		AFTER INSERT
		ON %1$s
		REFERENCING NEW TABLE AS new_table
		FOR EACH STATEMENT
		EXECUTE FUNCTION war.field_change__notify_upsert();

		DROP TRIGGER IF EXISTS after_update_field_change ON %1$s;

		CREATE TRIGGER after_update_field_change
		AFTER UPDATE
		ON %1$s
		REFERENCING NEW TABLE AS new_table
		FOR EACH STATEMENT
		EXECUTE FUNCTION war.field_change__notify_upsert();', schema_and_table_name);
END
$BODY$;

