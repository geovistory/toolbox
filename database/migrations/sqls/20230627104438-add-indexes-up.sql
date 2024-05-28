CREATE INDEX IF NOT EXISTS resource_pk_entity_idx ON information.resource USING btree(pk_entity ASC NULLS LAST) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS resource_fk_class_idx ON information.resource USING btree(fk_class ASC NULLS LAST) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS ancestor_classes_idx ON war.entity_preview_template USING GIN(ancestor_classes);

CREATE INDEX IF NOT EXISTS parent_classes_idx ON war.entity_preview_template USING GIN(parent_classes);

