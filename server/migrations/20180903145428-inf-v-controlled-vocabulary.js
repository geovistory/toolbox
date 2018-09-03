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
  
  -- add view v_controlled_vocabulary
    CREATE OR REPLACE VIEW information.v_controlled_vocabulary AS
    SELECT * FROM information.controlled_vocabulary;

  -- create v_controlled_vocabulary_find_or_create
    CREATE OR REPLACE FUNCTION information.v_controlled_vocabulary_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.controlled_vocabulary;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.controlled_vocabulary
        WHERE pk_entity = NEW.pk_entity;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.controlled_vocabulary (
                    fk_class
                ) 
                VALUES (
                    NEW.fk_class
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


  -- add trigger on insert to execute v_controlled_vocabulary_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_controlled_vocabulary
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_controlled_vocabulary_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_controlled_vocabulary
    DROP VIEW IF EXISTS information.v_controlled_vocabulary;
  
  -- remove trigger function v_controlled_vocabulary_find_or_create
    DROP FUNCTION information.v_controlled_vocabulary_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
