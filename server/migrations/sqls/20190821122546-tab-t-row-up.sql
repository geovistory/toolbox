/* Replace with your SQL commands */


-- 1
CREATE TABLE tables."row"
(
    pk_row bigint,
    fk_digital integer NOT NULL,
    entity_version integer NOT NULL,
    fk_publication_status integer,
    fk_license integer,
    fk_namespace integer,
    notes text COLLATE pg_catalog."default",
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    metadata jsonb,
    id_for_import integer,
    id_for_import_txt text COLLATE pg_catalog."default",

    CONSTRAINT row_pkey PRIMARY KEY (pk_row),
    CONSTRAINT row_fk_digital_fkey FOREIGN KEY (fk_digital)
        REFERENCES data.digital (pk_entity) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


-- 3

CREATE INDEX row_fk_digital_idx
    ON tables."row" USING btree
    (fk_digital);


-- 4
/*
    Migrate data from data."row" table
*/

INSERT INTO tables."row" (
            entity_version,
            fk_creator,
            fk_digital,
            fk_last_modifier,
            fk_license,
            fk_namespace,
            fk_publication_status,
            id_for_import,
            id_for_import_txt,
            metadata,
            notes,
            pk_row,
            sys_period,
            tmsp_creation,
            tmsp_last_modification
            )
SELECT entity_version,
       fk_creator,
       fk_digital,
       fk_last_modifier,
       fk_license,
       fk_namespace,
       fk_publication_status,
       id_for_import,
       id_for_import_txt,
       metadata,
       notes,
       pk_entity,
       sys_period,
       tmsp_creation,
       tmsp_last_modification
FROM data."row";



-- 5
CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON tables."row"
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();


-- 6
CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE
    ON tables."row"
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();



-- 7
CREATE TRIGGER create_entity_version_key   -- why do not simply replace by DEFAULT 1 in the field definition ?
    BEFORE INSERT
    ON tables."row"
    FOR EACH ROW
    EXECUTE PROCEDURE commons.create_entity_version_key();


-- 8
CREATE TRIGGER update_entity_version_key
    BEFORE UPDATE
    ON tables."row"
    FOR EACH ROW
    EXECUTE PROCEDURE commons.update_entity_version_key();


-- 9
/*
    This is the bigserial pk sequence created after the import of existing data
    using the max(pk_row) value  :  24615815 + 1
*/

CREATE SEQUENCE tables.row_pk_row_seq AS BIGINT INCREMENT 1;
SELECT SETVAL('tables.row_pk_row_seq', COALESCE(MAX(pk_row) + 1, 1))
FROM tables.row;


-- 10
/*
    Sets the new sequence as pk_row default value
*/

ALTER TABLE tables."row"
    ALTER COLUMN pk_row SET DEFAULT nextval('tables.row_pk_row_seq');



-- -- 11

CREATE TABLE tables.row_vt (
    LIKE tables.row
);



-- 12
/*
    Import existing data from the data.row_vt
*/

INSERT INTO tables.row_vt (
       entity_version,
       fk_creator,
       fk_digital,
       fk_last_modifier,
       fk_license,
       fk_namespace,
       fk_publication_status,
       id_for_import,
       id_for_import_txt,
       metadata,
       notes,
       pk_row,
       sys_period,
       tmsp_creation,
       tmsp_last_modification
)
SELECT entity_version,
       fk_creator,
       fk_digital,
       fk_last_modifier,
       fk_license,
       fk_namespace,
       fk_publication_status,
       id_for_import,
       id_for_import_txt,
       metadata,
       notes,
       pk_entity,
       sys_period,
       tmsp_creation,
       tmsp_last_modification
FROM data.row_vt;




-- 13
-- CREATE TRIGGER versioning_trigger ON tables."row";

CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR DELETE OR UPDATE
    ON tables."row"
    FOR EACH ROW
    EXECUTE PROCEDURE public.versioning('sys_period', 'tables.row_vt', 'true');
