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
  
  -- add view v_role
  CREATE OR REPLACE VIEW information.v_role AS
  SELECT 
    r.pk_entity,
    r.fk_property,
    r.fk_entity,
    r.fk_temporal_entity,     
    COALESCE(count(*) FILTER (where epr.is_in_project = true),0) AS is_in_project_count,
    COALESCE(count(*) FILTER (where epr.ord_num = 0), 0) AS is_standard_in_project_count,
    mode() WITHIN GROUP (ORDER BY epr.calendar) AS community_favorite_calendar,
    r.notes,
    r.tmsp_creation,
    r.tmsp_last_modification,
    r.sys_period
  FROM information.role as r
  LEFT JOIN information.entity_version_project_rel as epr on epr.fk_entity = r.pk_entity
  GROUP BY 
    r.pk_entity,
    r.fk_property,
    r.fk_entity,
    r.fk_temporal_entity,
    r.notes,
    r.tmsp_creation,
    r.tmsp_last_modification,
    r.sys_period;

  -- create v_role_find_or_create
    CREATE OR REPLACE FUNCTION information.v_role_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_role;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.role
        WHERE              
            fk_entity = NEW.fk_entity
            AND fk_temporal_entity = NEW.fk_temporal_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.role (
                    fk_entity, 
                    fk_temporal_entity,
                    fk_property
                ) 
                VALUES (
                    NEW.fk_entity, 
                    NEW.fk_temporal_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

      SELECT * FROM INTO resulting_row information.v_role
      WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $BODY$;


  -- add trigger on insert to execute v_role_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_role
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_role_find_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_role
    DROP VIEW IF EXISTS information.v_role;
  
  -- remove trigger function v_role_find_or_create
    DROP FUNCTION information.v_role_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
