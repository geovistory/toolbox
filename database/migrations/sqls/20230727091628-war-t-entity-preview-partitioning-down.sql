-- 1
-- Remove partitioning of the table war.entity_preview_template
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
TABLESPACE pg_default;

ALTER TABLE IF EXISTS war.entity_preview_template OWNER TO postgres;

-- Index: entity_preview_template_entity_type_idx
-- DROP INDEX IF EXISTS war.entity_preview_template_entity_type_idx;
CREATE INDEX IF NOT EXISTS entity_preview_template_entity_type_idx ON war.entity_preview_template USING btree(entity_type COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;

-- Index: entity_preview_template_fk_class_idx
-- DROP INDEX IF EXISTS war.entity_preview_template_fk_class_idx;
CREATE INDEX IF NOT EXISTS entity_preview_template_fk_class_idx ON war.entity_preview_template USING btree(fk_class ASC NULLS LAST) TABLESPACE pg_default;

-- Index: entity_preview_template_fk_project_idx
-- DROP INDEX IF EXISTS war.entity_preview_template_fk_project_idx;
CREATE INDEX IF NOT EXISTS entity_preview_template_fk_project_idx ON war.entity_preview_template USING btree(fk_project ASC NULLS LAST) TABLESPACE pg_default;

-- Index: entity_preview_template_project_idx
-- DROP INDEX IF EXISTS war.entity_preview_template_project_idx;
CREATE INDEX IF NOT EXISTS entity_preview_template_project_idx ON war.entity_preview_template USING btree(project ASC NULLS LAST) TABLESPACE pg_default;

-- Index: ts_v1_dev_0_1_0_pr_46_3_entity_label_idx
-- DROP INDEX IF EXISTS war.ts_v1_dev_0_1_0_pr_46_3_entity_label_idx;
CREATE INDEX IF NOT EXISTS ts_v1_dev_0_1_0_pr_46_3_entity_label_idx ON war.entity_preview_template USING btree(entity_label COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;

-- Index: ts_v1_dev_0_1_0_pr_46_3_key_idx
-- DROP INDEX IF EXISTS war.ts_v1_dev_0_1_0_pr_46_3_key_idx;
CREATE INDEX IF NOT EXISTS ts_v1_dev_0_1_0_pr_46_3_key_idx ON war.entity_preview_template USING btree(key COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;

-- Index: ts_v1_dev_0_1_0_pr_46_3_pk_entity_idx
-- DROP INDEX IF EXISTS war.ts_v1_dev_0_1_0_pr_46_3_pk_entity_idx;
CREATE INDEX IF NOT EXISTS ts_v1_dev_0_1_0_pr_46_3_pk_entity_idx ON war.entity_preview_template USING btree(pk_entity ASC NULLS LAST) TABLESPACE pg_default;

-- Index: ts_v1_dev_0_1_0_pr_46_3_ts_vector_idx
-- DROP INDEX IF EXISTS war.ts_v1_dev_0_1_0_pr_46_3_ts_vector_idx;
CREATE INDEX IF NOT EXISTS ts_v1_dev_0_1_0_pr_46_3_ts_vector_idx ON war.entity_preview_template USING gin(ts_vector) TABLESPACE pg_default;

