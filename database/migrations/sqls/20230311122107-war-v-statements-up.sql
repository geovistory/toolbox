-- 1
ALTER TABLE IF EXISTS war.statement RENAME TO statement_backup;

-- 2
CREATE TABLE IF NOT EXISTS war.statement_template (
  pk_entity integer NOT NULL,
  project integer NOT NULL DEFAULT 0,
  fk_project integer,
  fk_property integer,
  fk_object_info integer,
  fk_subject_info integer,
  ord_num_of_domain integer,
  ord_num_of_range integer,
  is_in_project_count integer,
  object_info_value jsonb,
  CONSTRAINT statement_template_pkey PRIMARY KEY (pk_entity, project),
  CONSTRAINT statement_template_pk_entity_project_key UNIQUE (pk_entity, project)
);

CREATE INDEX IF NOT EXISTS statement_template_fk_object_info_idx ON war.statement_template USING btree (fk_object_info ASC NULLS LAST) TABLESPACE pg_default;

-- Index: statement_template_fk_project_idx
-- DROP INDEX IF EXISTS war.statement_template_fk_project_idx;
CREATE INDEX IF NOT EXISTS statement_template_fk_project_idx ON war.statement_template USING btree (fk_project ASC NULLS LAST) TABLESPACE pg_default;

-- Index: statement_template_fk_property_idx
-- DROP INDEX IF EXISTS war.statement_template_fk_property_idx;
CREATE INDEX IF NOT EXISTS statement_template_fk_property_idx ON war.statement_template USING btree (fk_property ASC NULLS LAST) TABLESPACE pg_default;

-- Index: statement_template_fk_subject_info_idx
-- DROP INDEX IF EXISTS war.statement_template_fk_subject_info_idx;
CREATE INDEX IF NOT EXISTS statement_template_fk_subject_info_idx ON war.statement_template USING btree (fk_subject_info ASC NULLS LAST) TABLESPACE pg_default;

-- Index: statement_template_pk_entity_idx
-- DROP INDEX IF EXISTS war.statement_template_pk_entity_idx;
CREATE INDEX IF NOT EXISTS statement_template_pk_entity_idx ON war.statement_template USING btree (pk_entity ASC NULLS LAST) TABLESPACE pg_default;

-- Index: statement_template_pk_entity_project_idx
-- DROP INDEX IF EXISTS war.statement_template_pk_entity_project_idx;
CREATE UNIQUE INDEX IF NOT EXISTS statement_template_pk_entity_project_idx ON war.statement_template USING btree (pk_entity ASC NULLS LAST, project ASC NULLS LAST) TABLESPACE pg_default;

-- 3
CREATE OR REPLACE FUNCTION war.create_sink_table_statement (schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  EXECUTE format('CREATE TABLE %1$s (LIKE war.statement_template INCLUDING ALL);', schema_and_table_name);
END
$BODY$;

-- 4
CREATE OR REPLACE FUNCTION war.switch_statement_table (schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  EXECUTE format('
		CREATE OR REPLACE VIEW war.statement AS
		SELECT * FROM %1$s;
		', schema_and_table_name);
END
$BODY$;

