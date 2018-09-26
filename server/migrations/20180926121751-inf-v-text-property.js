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
  
  -- add view v_text_property
    CREATE OR REPLACE VIEW information.v_text_property AS
    SELECT * FROM information.text_property;

  -- create v_text_property_find_or_create
    CREATE OR REPLACE FUNCTION information.v_text_property_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_text_property;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.text_property
        WHERE              
            text_property_quill_doc::jsonb = NEW.text_property_quill_doc::jsonb
            AND fk_system_type = NEW.fk_system_type
            AND fk_concerned_entity = NEW.fk_concerned_entity
            AND fk_language = NEW.fk_language;

            -- RAISE INFO 'result of select: %', resulting_pk;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.text_property (
                  text_property_quill_doc, 
                  fk_system_type,
                  fk_concerned_entity,
                  fk_language
                ) 
                VALUES (
                  NEW.text_property_quill_doc::jsonb, 
                  NEW.fk_system_type,
                  NEW.fk_concerned_entity,
                  NEW.fk_language
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_pk;
      END IF;

    SELECT * FROM INTO resulting_row information.v_text_property
    WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $BODY$;


  -- add trigger on insert to execute v_text_property_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_text_property
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_text_property_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_text_property
    DROP VIEW IF EXISTS information.v_text_property;
  
  -- remove trigger function v_text_property_find_or_create
    DROP FUNCTION information.v_text_property_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
