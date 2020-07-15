
-- 10
CREATE TABLE information.chunk
(
    pk_chunk serial PRIMARY KEY,
    js_quill_data jsonb,
    fk_digital_object integer
)
    INHERITS (information.entity);

SELECT commons.init_entity_child_table('information.chunk');

CREATE OR REPLACE VIEW information.v_chunk AS
 SELECT chunk.pk_entity,
    chunk.schema_name,
    chunk.table_name,
    chunk.notes,
    chunk.fk_creator,
    chunk.fk_last_modifier,
    chunk.tmsp_creation,
    chunk.tmsp_last_modification,
    chunk.sys_period,
    chunk.pk_chunk,
    chunk.js_quill_data,
    chunk.fk_digital_object
   FROM information.chunk;


-- 9
CREATE FUNCTION information.v_chunk_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_chunk;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.chunk
        WHERE              
            js_quill_data::jsonb = NEW.js_quill_data::jsonb
            AND fk_digital_object = NEW.fk_digital_object;

            -- RAISE INFO 'result of select: %', resulting_pk;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.chunk (
                  js_quill_data, 
                  fk_digital_object
                ) 
                VALUES (
                    NEW.js_quill_data::jsonb, 
                    NEW.fk_digital_object
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_pk;
      END IF;

    SELECT * FROM INTO resulting_row information.v_chunk
    WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $BODY$;


CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_chunk
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_chunk_find_or_create();


-- 8
-- no way back, data loss


-- 7.
ALTER TABLE data.digital DROP COLUMN fk_system_type;

-- 6.
ALTER TABLE data.digital RENAME COLUMN _deprecated_pk_digital_object TO pk_digital_object;
ALTER TABLE data.digital_vt RENAME COLUMN _deprecated_pk_digital_object TO pk_digital_object;
ALTER TABLE data.digital RENAME COLUMN _deprecated_js_quill_data TO js_quill_data;
ALTER TABLE data.digital_vt RENAME COLUMN _deprecated_js_quill_data TO js_quill_data;

-- 5.
SELECT commons.unmake_versioned_table_child_of_text('data.digital');

-- 4.
SELECT commons.rename_versioned_table('data', 'digital', 'digital_object');

-- 3.
SELECT commons.move_entity_child_with_vt_to_schema('digital_object', 'data', 'information');

ALTER TABLE information.digital_object DROP COLUMN fk_namespace;
ALTER TABLE information.digital_object_vt DROP COLUMN fk_namespace;

-- 2. 
DROP TABLE data.entity;

-- 1.
DROP SCHEMA data CASCADE;
CREATE SCHEMA data;

