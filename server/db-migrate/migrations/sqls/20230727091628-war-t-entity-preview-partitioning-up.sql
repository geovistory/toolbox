-- 1
-- Add partitioning to the table war.entity_preview_template
DROP TABLE IF EXISTS war.entity_preview_template;

CREATE TABLE IF NOT EXISTS war.entity_preview_template(
  pk_entity integer NOT NULL,
  fk_project integer,
  project integer NOT NULL DEFAULT 0,
  entity_type text COLLATE pg_catalog."default",
  fk_class integer,
  class_label character varying COLLATE pg_catalog."default",
  entity_label text COLLATE pg_catalog."default",
  full_text text COLLATE pg_catalog."default",
  ts_vector tsvector,
  type_label text COLLATE pg_catalog."default",
  fk_type integer,
  time_span jsonb,
  first_second bigint,
  last_second bigint,
  tmsp_last_modification timestamp with time zone,
  key character varying COLLATE pg_catalog."default" NOT NULL,
  entity_id character varying COLLATE pg_catalog."default" NOT NULL,
  parent_classes jsonb NOT NULL,
  ancestor_classes jsonb NOT NULL,
  project_id integer NOT NULL,
  type_id character varying COLLATE pg_catalog."default",
  CONSTRAINT entity_preview_template_pkey PRIMARY KEY (entity_id, project_id)
)
PARTITION BY LIST (project_id);

CREATE INDEX IF NOT EXISTS ep__entity_type_idx ON war.entity_preview_template USING btree(entity_type COLLATE pg_catalog."default" ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__fk_class_idx ON war.entity_preview_template USING btree(fk_class ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__fk_project_idx ON war.entity_preview_template USING btree(fk_project ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__project_idx ON war.entity_preview_template USING btree(project ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__entity_label_idx ON war.entity_preview_template USING btree(entity_label COLLATE pg_catalog."default" ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__key_idx ON war.entity_preview_template USING btree(key COLLATE pg_catalog."default" ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__pk_entity_idx ON war.entity_preview_template USING btree(pk_entity ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ep__ts_vector_idx ON war.entity_preview_template USING gin(ts_vector);

