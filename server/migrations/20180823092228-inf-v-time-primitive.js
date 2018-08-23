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
  
  -- add view v_time_primitive
    CREATE OR REPLACE VIEW information.v_time_primitive AS
    SELECT * FROM information.time_primitive;

  -- create v_time_primitive_find_or_create
    CREATE OR REPLACE FUNCTION information.v_time_primitive_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.time_primitive;
    BEGIN

          -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.time_primitive
        WHERE              
            julian_day = NEW.julian_day
            AND duration = NEW.duration
            AND fk_class = NEW.fk_class;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.time_primitive (
                    julian_day, 
                    duration,
                    fk_class
                ) 
                VALUES (
                    NEW.julian_day, 
                    NEW.duration,
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


  -- add trigger on insert to execute v_time_primitive_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_time_primitive
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_time_primitive_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_time_primitive
    DROP VIEW IF EXISTS information.v_time_primitive;
  
  -- remove trigger function v_time_primitive_find_or_create
    DROP FUNCTION information.v_time_primitive_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
