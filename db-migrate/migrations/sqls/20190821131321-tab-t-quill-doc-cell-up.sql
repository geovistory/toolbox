-- 1
CREATE TABLE tables.quill_doc_cell
(   CONSTRAINT quill_doc_cell_pk_cell_primary_key PRIMARY KEY (pk_cell),
    CONSTRAINT quill_doc_cell_fk_column_fkey FOREIGN KEY (fk_column)
        REFERENCES data."column" (pk_entity) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
      CONSTRAINT quill_doc_cell_fk_digital_fkey FOREIGN KEY (fk_digital)
          REFERENCES data.digital (pk_entity) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT quill_doc_cell_fk_row_fkey FOREIGN KEY (fk_row)
          REFERENCES tables."row" (pk_row) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
/*
This constraint cannot be added because the correspondent row of a child table is not 'seen' in the constraint
,
        CONSTRAINT quill_doc_cell_fk_cell_fkey FOREIGN KEY (fk_original_cell)
            REFERENCES tables.cell (pk_cell) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
*/
)
INHERITS (tables.cell, commons.text);


-- 2
CREATE TABLE tables.quill_doc_cell_vt ( ) INHERITS (tables.cell_vt, commons.text_vt);


-- 3

CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR DELETE OR UPDATE
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE public.versioning('sys_period', 'tables.quill_doc_cell_vt', 'true');



-- 4

-- DROP INDEX tables.quill_doc_cell_fk_column_idx;

CREATE INDEX quill_doc_cell_fk_column_idx
    ON tables.quill_doc_cell USING btree
    (fk_column)
    TABLESPACE pg_default;

-- 5

-- DROP INDEX tables.quill_doc_cell_fk_digital_idx;

CREATE INDEX quill_doc_cell_fk_digital_idx
    ON tables.quill_doc_cell USING btree
    (fk_digital)
    TABLESPACE pg_default;

-- 6

-- DROP INDEX tables.quill_doc_cell_fk_row_idx;

CREATE INDEX quill_doc_cell_fk_row_idx
    ON tables.quill_doc_cell USING btree
    (fk_row)
    TABLESPACE pg_default;

-- 7

-- DROP INDEX tables.quill_doc_cell_id_for_import_txt_idx;

CREATE INDEX quill_doc_cell_id_for_import_txt_idx
    ON tables.quill_doc_cell USING btree
    (id_for_import_txt COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- 8

-- DROP INDEX tables.quill_doc_cell_pk_cell_idx;

CREATE INDEX quill_doc_cell_pk_cell_idx
    ON tables.quill_doc_cell USING btree
    (pk_cell)
    TABLESPACE pg_default;

-- 9

-- DROP INDEX tables.quill_doc_cell_string_value_idx;

CREATE INDEX quill_doc_cell_string_value_idx
    ON tables.quill_doc_cell USING btree
    (string_value COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- 10

-- DROP TRIGGER create_entity_version_key ON tables.quill_doc_cell;

CREATE TRIGGER create_entity_version_key
    BEFORE INSERT
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE commons.create_entity_version_key();

-- 11

-- DROP TRIGGER creation_tmsp ON tables.quill_doc_cell;

CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

-- 12

-- DROP TRIGGER last_modification_tmsp ON tables.quill_doc_cell;

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

-- 13

-- DROP TRIGGER update_entity_version_key ON tables.quill_doc_cell;

CREATE TRIGGER update_entity_version_key
    BEFORE UPDATE
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE commons.update_entity_version_key();

-- 14

-- DROP TRIGGER insert_schema_table_name ON data.cell;

CREATE TRIGGER insert_schema_table_name
    BEFORE INSERT
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();


-- 15

-- DROP INDEX commons.text_string_idx;

CREATE INDEX text_string_idx
    ON tables.quill_doc_cell USING btree
    (string COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- 16

-- DROP TRIGGER sync_quill_doc_and_string ON commons.text;

CREATE TRIGGER sync_quill_doc_and_string
    BEFORE INSERT OR UPDATE
    ON tables.quill_doc_cell
    FOR EACH ROW
    EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();
