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
  
  -- add view v_place
    CREATE OR REPLACE VIEW information.v_place AS
    select 
      *, 
      ST_X(geo_point::geometry) as long, 
      ST_Y(geo_point::geometry) as lat 
    from information.place;

  -- create v_place_find_or_create
    CREATE OR REPLACE FUNCTION information.v_place_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.v_place;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT 
        *,
        NEW.long, 
        NEW.lat  
      FROM INTO resulting_row information.place
        WHERE geo_point = ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography
          AND fk_class = NEW.fk_class;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.place (
                    geo_point, 
                    fk_class
                ) 
                VALUES (
                    ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography, 
                    NEW.fk_class
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT
              *, 
              ST_X(geo_point::geometry) as long, 
              ST_Y(geo_point::geometry) as lat 
            FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $BODY$;

  -- add trigger on insert to execute v_place_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_place
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_place_find_or_create();

  -- remmove old insert function
  DROP FUNCTION information.v_place_insert();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_place
    DROP VIEW IF EXISTS information.v_place;
  
  -- remove trigger function v_place_find_or_create
    DROP FUNCTION information.v_place_find_or_create();

  -- add old trigger function
      CREATE FUNCTION information.v_place_insert()
      RETURNS trigger
      LANGUAGE 'plpgsql'
      AS $BODY$

          DECLARE
          result text;
          BEGIN

              -- convert long, lat to geography
            
              insert into information.place  (entity_version, geo_point, fk_class)
              values (NEW.entity_version,ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography, NEW.fk_class)
              RETURNING pk_entity INTO result;

          NEW.pk_entity = result;
          RETURN NEW;
          END;
      
      $BODY$;


  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
