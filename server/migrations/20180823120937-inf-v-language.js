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
  
  -- add view v_language
    CREATE OR REPLACE VIEW information.v_language AS
    SELECT * FROM information.language;

  -- create v_language_find_or_create
    CREATE OR REPLACE FUNCTION information.v_language_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.language;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.language
        WHERE      
              fk_class = NEW.fk_class
          AND lang_type = NEW.lang_type
          AND scope = NEW.scope
          AND iso6392b = NEW.iso6392b
          AND iso6392t = NEW.iso6392t
          AND iso6391 = NEW.iso6391;

        -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.language (
                  fk_class,
                  lang_type,
                  scope,
                  iso6392b,
                  iso6392t,
                  iso6391
                ) 
                VALUES (
                  NEW.fk_class,
                  NEW.lang_type,
                  NEW.scope,
                  NEW.iso6392b,
                  NEW.iso6392t,
                  NEW.iso6391
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT * FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $BODY$;


  -- add trigger on insert to execute v_language_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_language
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_language_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_language
    DROP VIEW IF EXISTS information.v_language;
  
  -- remove trigger function v_language_find_or_create
    DROP FUNCTION information.v_language_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
