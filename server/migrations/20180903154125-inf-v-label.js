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
  -- add view v_label
    CREATE OR REPLACE VIEW information.v_label AS
    SELECT * FROM information.label;

  -- create v_label_find_or_create
    CREATE OR REPLACE FUNCTION information.v_label_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.label;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.label
        WHERE fk_labeled_entity = NEW.fk_labeled_entity
        AND fk_language_entity = NEW.fk_language_entity
        AND fk_system_type = NEW.fk_system_type
        AND label = NEW.label  ;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
            -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.label (
                  fk_labeled_entity,
                  fk_language_entity,
                  fk_system_type,
                  label
                ) 
                VALUES (
                  NEW.fk_labeled_entity,
                  NEW.fk_language_entity,
                  NEW.fk_system_type,
                  NEW.label
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
                  
            
            SELECT * FROM information.v_label into resulting_row 
            WHERE pk_entity = resulting_pk;
            
            -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $BODY$;


  -- add trigger on insert to execute v_label_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_label
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_label_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_label
    DROP VIEW IF EXISTS information.v_label;
  
  -- remove trigger function v_label_find_or_create
    DROP FUNCTION information.v_label_find_or_create();

  `
  db.runSql(sql, callback)
};



exports._meta = {
  "version": 1
};
