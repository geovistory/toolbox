

CREATE TABLE war.node
(
    pk_entity integer,
    fk_project integer,
    project integer,
    fk_class integer,
    entity_type text COLLATE pg_catalog."default",
    own_entity_label text COLLATE pg_catalog."default",
    own_full_text text COLLATE pg_catalog."default",
    time_span jsonb,
    first_second bigint,
    last_second bigint,
    own_entity_label_field_order integer,
    CONSTRAINT entity_preview_unique UNIQUE (pk_entity, project)
)
