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
  
  -- add view v_entity_association
    CREATE OR REPLACE VIEW information.v_entity_association AS
    SELECT * FROM information.entity_association;

  -- create v_entity_association_find_or_create
    CREATE OR REPLACE FUNCTION information.v_entity_association_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.entity_association;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.entity_association
        WHERE              
            fk_domain_entity = NEW.fk_domain_entity
            AND fk_range_entity = NEW.fk_range_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.entity_association (
                    fk_domain_entity, 
                    fk_range_entity,
                    fk_property
                ) 
                VALUES (
                    NEW.fk_domain_entity, 
                    NEW.fk_range_entity,
                    NEW.fk_property
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


  -- add trigger on insert to execute v_entity_association_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_entity_association
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_entity_association_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_entity_association
    DROP VIEW IF EXISTS information.v_entity_association;
  
  -- remove trigger function v_entity_association_find_or_create
    DROP FUNCTION information.v_entity_association_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
