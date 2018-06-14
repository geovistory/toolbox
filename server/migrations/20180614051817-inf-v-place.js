'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


exports.up = function(db, callback) {


  const sql = `
  -- create view with long, lat columns

  CREATE OR REPLACE VIEW information.v_place AS
  select *, ST_X(geo_point::geometry) as long, ST_Y(geo_point::geometry) as lat from information.place;


  -- create trigger function for insert

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


   -- create trigger on insert

    CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_place
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_place_insert();


  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  var sql = `
  DROP TRIGGER IF EXISTS on_insert ON information.v_place;
  DROP FUNCTION IF EXISTS information.v_place_insert();
  DROP VIEW IF EXISTS information.v_place;
  `


  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
