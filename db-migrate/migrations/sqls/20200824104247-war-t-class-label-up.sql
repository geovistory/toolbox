
CREATE TABLE war.class_preview
(
    fk_class integer,
    fk_project integer,
    label text COLLATE pg_catalog."default",
    tmsp_last_modification timestamp with time zone,
    CONSTRAINT war_class_preview_unique UNIQUE (fk_class, fk_project)
);

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE
    ON war.class_preview
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();
