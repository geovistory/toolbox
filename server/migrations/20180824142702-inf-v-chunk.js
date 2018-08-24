'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const sql = `
  
  -- add view v_chunk
    CREATE OR REPLACE VIEW information.v_chunk AS
    SELECT * FROM information.chunk;

  -- create v_chunk_find_or_create
    CREATE OR REPLACE FUNCTION information.v_chunk_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
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


  -- add trigger on insert to execute v_chunk_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_chunk
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_chunk_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_chunk
    DROP VIEW IF EXISTS information.v_chunk;
  
  -- remove trigger function v_chunk_find_or_create
    DROP FUNCTION information.v_chunk_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
