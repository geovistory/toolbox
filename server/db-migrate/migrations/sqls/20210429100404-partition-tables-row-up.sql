-- [1] Rename tables.row > tables.row_old
ALTER TABLE tables.row RENAME TO row_old;
ALTER TABLE tables.row_vt RENAME TO row_old_vt;
ALTER TABLE tables.row_old RENAME CONSTRAINT row_pkey TO row_pkey_old;
ALTER TABLE tables.row_old RENAME CONSTRAINT row_fk_digital_fkey TO row_fk_digital_fkey_old;


-- [2] Create parent table
CREATE TABLE tables."row"
(
    pk_row bigint NOT NULL DEFAULT nextval('tables.row_pk_row_seq'::regclass),
    fk_digital integer NOT NULL,
    position decimal NOT NULL,
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
) TABLESPACE pg_default;
-- change owner
ALTER TABLE tables."row" OWNER to postgres;


-- [3] Create parent vt table
CREATE TABLE tables.row_vt
(
    pk_row bigint NOT NULL,
    fk_digital integer NOT NULL,
    position decimal NOT NULL,
    entity_version integer NOT NULL,
    fk_publication_status integer,
    fk_license integer,
    fk_namespace integer,
    notes text COLLATE pg_catalog."default",
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    id_for_import integer,
    id_for_import_txt text COLLATE pg_catalog."default"
) TABLESPACE pg_default;
-- change owner
ALTER TABLE tables.row_vt OWNER to postgres;


-- [4] Create the function to create partition
CREATE OR REPLACE FUNCTION tables.create_row_table_for_digital(
	pk_digital integer)
    RETURNS text
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    test_query_result boolean;
    create_query text;
    result_text text;
BEGIN
        EXECUTE 'SELECT COUNT(*) > 0 FROM information_schema.tables WHERE table_schema = ''tables''
                    AND  table_name = ''row_' || pk_digital::text || ''';' INTO test_query_result  ;

        IF test_query_result
        THEN
            result_text := 'tables.row_' || pk_digital::text || ' already exists' ;
        ELSE
                create_query := 'CREATE TABLE IF NOT EXISTS  tables.row_' || pk_digital::text || '
                    (
                    CHECK (fk_digital = ' || pk_digital::text || '),
                    CONSTRAINT data_row_' || pk_digital::text || '_pk_entity_primary_key PRIMARY KEY (pk_row),
                    CONSTRAINT row_' || pk_digital::text || '_fk_digital_fkey FOREIGN KEY (fk_digital)
                        REFERENCES data.digital (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                    )
                        INHERITS (tables.row);

                        CREATE INDEX row_' || pk_digital::text || '_fk_digital_idx
                            ON tables.row_' || pk_digital::text || ' USING btree
                            (fk_digital);

                        CREATE TRIGGER creation_tmsp BEFORE INSERT ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_creation ();

                        CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification ();

                        CREATE INDEX row_' || pk_digital::text || '_id_for_import_txt_idx
                            ON tables.row_' || pk_digital::text || ' USING hash(id_for_import_txt);

                        CREATE INDEX row_' || pk_digital::text || '_pk_row_idx
                            ON tables.row_' || pk_digital::text || '  USING btree(pk_row);

                        CREATE TRIGGER create_entity_version_key BEFORE INSERT ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key ();

                        CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key ();

                        CREATE TABLE IF NOT EXISTS  tables.row_' || pk_digital::text || '_vt ( ) INHERITS (tables.row_vt);

                        CREATE TRIGGER versioning_trigger
                            BEFORE INSERT OR DELETE OR UPDATE
                            ON tables.row_' || pk_digital::text || '
                            FOR EACH ROW
                            EXECUTE PROCEDURE public.versioning(''sys_period'', ''tables.row_' || pk_digital::text || '_vt'', ''true'');  '
                        ;

                    RAISE NOTICE '%', create_query;
                    EXECUTE create_query;
                    result_text := 'tables.row_' || pk_digital::text;

        END IF;

RETURN result_text;
END;
$BODY$;

ALTER FUNCTION tables.create_row_table_for_digital(integer)
    OWNER TO postgres;


-- [5] Create all the partitions
DO $$DECLARE 
    fkdigitals integer ARRAY;
    fkdigital integer;
BEGIN
    SELECT array_agg(DISTINCT fk_digital) INTO fkdigitals FROM tables.row_old;
	
    IF fkdigitals IS NOT NULL THEN
        FOREACH fkdigital IN ARRAY (SELECT array_agg(DISTINCT fk_digital) FROM tables.row_old)
        LOOP
            -- create table and vt table
            EXECUTE 'SELECT tables.create_row_table_for_digital(' || fkdigital || ');';

            -- disable trigger
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER create_entity_version_key;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER creation_tmsp;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER last_modification_tmsp;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER update_entity_version_key;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER versioning_trigger;';

            -- insert data into table
            EXECUTE '
                INSERT INTO tables.row_' || fkdigital::text || ' (pk_row, fk_digital, entity_version, fk_publication_status, fk_license, fk_namespace, notes, fk_creator, fk_last_modifier, tmsp_creation, tmsp_last_modification, sys_period, metadata, id_for_import, id_for_import_txt, position)
                SELECT pk_row, fk_digital, entity_version, fk_publication_status, fk_license, fk_namespace, notes, fk_creator, fk_last_modifier, tmsp_creation, tmsp_last_modification, sys_period, metadata, id_for_import, id_for_import_txt, pk_row as position
                FROM tables.row_old
                WHERE fk_digital=' || fkdigital ||';
            ';

            -- insert data into vt table
            EXECUTE '
                INSERT INTO tables.row_' || fkdigital::text || '_vt (pk_row, fk_digital, entity_version, fk_publication_status, fk_license, fk_namespace, notes, fk_creator, fk_last_modifier, tmsp_creation, tmsp_last_modification, sys_period, metadata, id_for_import, id_for_import_txt, position)
                SELECT pk_row, fk_digital, entity_version, fk_publication_status, fk_license, fk_namespace, notes, fk_creator, fk_last_modifier, tmsp_creation, tmsp_last_modification, sys_period, metadata, id_for_import, id_for_import_txt, pk_row as position
                FROM tables.row_old_vt
                WHERE fk_digital=' || fkdigital ||';
            ';

            -- enable trigger
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' ENABLE TRIGGER versioning_trigger;';

            -- change the constraint on the tables.cell_xxx
            EXECUTE 'ALTER TABLE tables.cell_' || fkdigital::text || ' DROP CONSTRAINT cell_' || fkdigital::text || '_fk_row_fkey;';
            EXECUTE '
                ALTER TABLE tables.cell_' || fkdigital::text || '
                    ADD CONSTRAINT cell_' || fkdigital::text || '_fk_row_fkey FOREIGN KEY (fk_row)
                        REFERENCES tables.row_' || fkdigital::text || ' (pk_row) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION;
            ';
        END LOOP;
    END IF;
END$$;

-- [6] Change all tables.quill_doc_cell constraint
ALTER TABLE tables.quill_doc_cell DROP CONSTRAINT quill_doc_cell_fk_row_fkey;
ALTER TABLE tables.quill_doc_cell
    ADD CONSTRAINT quill_doc_cell_fk_row_fkey FOREIGN KEY (fk_row)
        REFERENCES tables.row (pk_row) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

-- [7] delete old tables
DROP TABLE tables.row_old, tables.row_old_vt;


-- [8] change the cell table creation function
CREATE OR REPLACE FUNCTION tables.create_cell_table_for_digital(
	pk_digital integer)
    RETURNS text
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    test_query_result boolean;
    create_query text;
    result_text text;

BEGIN

        EXECUTE 'SELECT COUNT(*) > 0 FROM information_schema.tables WHERE table_schema = ''tables''
                    AND  table_name = ''cell_' || pk_digital::text || ''';' INTO test_query_result  ;

        IF test_query_result
        THEN
            result_text := 'tables.cell_' || pk_digital::text || ' already exists' ;
        ELSE
                create_query := 'CREATE TABLE IF NOT EXISTS  tables.cell_' || pk_digital::text || '
                    (
                    CHECK (fk_digital = ' || pk_digital::text || '),
                    CONSTRAINT data_cell_' || pk_digital::text || '_pk_entity_primary_key PRIMARY KEY (pk_cell),
                    CONSTRAINT cell_' || pk_digital::text || '_fk_column_fkey FOREIGN KEY (fk_column)
                        REFERENCES data."column" (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT cell_' || pk_digital::text || '_fk_digital_fkey FOREIGN KEY (fk_digital)
                        REFERENCES data.digital (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT cell_' || pk_digital::text || '_fk_row_fkey FOREIGN KEY (fk_row)
                        REFERENCES tables."row_' || pk_digital::text || '" (pk_row) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                    )
                        INHERITS (tables.cell);

                        CREATE INDEX cell_' || pk_digital::text || '_fk_digital_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_digital);

                        CREATE TRIGGER creation_tmsp BEFORE INSERT ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_creation ();

                        CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification ();

                        CREATE INDEX cell_' || pk_digital::text || '_fk_column_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_column);

                        CREATE INDEX cell_' || pk_digital::text || '_fk_row_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_row);

                        CREATE INDEX cell_' || pk_digital::text || '_id_for_import_txt_idx
                            ON tables.cell_' || pk_digital::text || ' USING hash(id_for_import_txt);

                    CREATE INDEX cell_' || pk_digital::text || '_pk_cell_idx
                          ON tables.cell_' || pk_digital::text || '  USING btree(pk_cell);

                        CREATE INDEX cell_' || pk_digital::text || '_string_value_idx
                          ON tables.cell_' || pk_digital::text || '  USING hash(string_value);

                        CREATE TRIGGER create_entity_version_key BEFORE INSERT ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key ();

                        CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key ();

                        CREATE TABLE IF NOT EXISTS  tables.cell_' || pk_digital::text || '_vt ( ) INHERITS (tables.cell_vt);

                        CREATE TRIGGER versioning_trigger
                            BEFORE INSERT OR DELETE OR UPDATE
                            ON tables.cell_' || pk_digital::text || '
                            FOR EACH ROW
                            EXECUTE PROCEDURE public.versioning(''sys_period'', ''tables.cell_' || pk_digital::text || '_vt'', ''true'');  '

                        ;

                    RAISE NOTICE '%', create_query;
                    EXECUTE create_query;
                    result_text := 'tables.cell_' || pk_digital::text;

        END IF;

RETURN result_text;
END;
$BODY$;

ALTER FUNCTION tables.create_cell_table_for_digital(integer)
    OWNER TO postgres;
