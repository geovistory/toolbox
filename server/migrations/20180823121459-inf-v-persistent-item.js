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
  
  -- add view v_persistent_item
    CREATE OR REPLACE VIEW information.v_persistent_item AS
    SELECT * FROM information.persistent_item;

  -- create v_persistent_item_find_or_create
    CREATE OR REPLACE FUNCTION information.v_persistent_item_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.persistent_item;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.persistent_item
        WHERE pk_entity = NEW.pk_entity;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.persistent_item (
                    pk_entity, 
                    fk_class
                ) 
                VALUES (
                    NEW.pk_entity, 
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


  -- add trigger on insert to execute v_persistent_item_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_persistent_item
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_persistent_item_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_persistent_item
    DROP VIEW IF EXISTS information.v_persistent_item;
  
  -- remove trigger function v_persistent_item_find_or_create
    DROP FUNCTION information.v_persistent_item_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
