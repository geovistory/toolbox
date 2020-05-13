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
    --- Function to extract plain string from appellation_label 

    CREATE OR REPLACE FUNCTION information.appellation_label_to_string(
      appellation_label jsonb,
      OUT string text)
        RETURNS text
        LANGUAGE 'sql'
    
        COST 100
        VOLATILE 
    AS $BODY$
    
      SELECT STRING_AGG(l.tokens->>'string', '')
      FROM (SELECT jsonb_array_elements(appellation_label->'tokens') as tokens) as l
        
    $BODY$;


    -- remove view v_appellation
    DROP VIEW IF EXISTS information.v_appellation;

    --- add string col to appellation view

    CREATE OR REPLACE VIEW information.v_appellation AS
    SELECT 
      appellation.pk_entity,
      appellation.schema_name,
      appellation.table_name,
      appellation.notes,
      appellation.fk_creator,
      appellation.fk_last_modifier,
      appellation.tmsp_creation,
      appellation.tmsp_last_modification,
      appellation.sys_period,
      appellation.pk_appellation,
      appellation.appellation_label,
      appellation.fk_class,
      information.appellation_label_to_string(appellation.appellation_label) as string
    FROM information.appellation;
  

    -- create v_appellation_find_or_create
  CREATE OR REPLACE FUNCTION information.v_appellation_find_or_create()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  AS $BODY$
  DECLARE
    resulting_row information.v_appellation;
  BEGIN

    -- RAISE INFO 'input values: %', NEW;
      
    ------ if existing, store in result -----
    SELECT * FROM INTO resulting_row information.appellation
      WHERE 
        information.appe_tokens_for_comparision(appellation_label) =
        information.appe_tokens_for_comparision(NEW.appellation_label)
      AND fk_class = NEW.fk_class;
        
          -- RAISE INFO 'result of select: %', resulting_row;

    ------- if not existing, insert and store in result -----
      IF NOT FOUND THEN
        
            -- RAISE INFO 'Not found, creating new...';
      
          WITH _insert AS (
              INSERT INTO information.appellation (
                appellation_label, 
                fk_class
              ) 
              VALUES (
                NEW.appellation_label, 
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


-- add trigger on insert to execute v_appellation_find_or_create

  CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_appellation
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_appellation_find_or_create();


  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_appellation
  DROP VIEW IF EXISTS information.v_appellation;

  -- remove the new function
  DROP FUNCTION information.appellation_label_to_string(jsonb);

  -- remove trigger function v_appellation_find_or_create
  DROP FUNCTION information.v_appellation_find_or_create();

  -- add view v_appellation
  CREATE OR REPLACE VIEW information.v_appellation AS
  SELECT * FROM information.appellation;

-- create v_appellation_find_or_create
  CREATE OR REPLACE FUNCTION information.v_appellation_find_or_create()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  AS $BODY$
  DECLARE
    resulting_row information.appellation;
  BEGIN

    -- RAISE INFO 'input values: %', NEW;
      
    ------ if existing, store in result -----
    SELECT * FROM INTO resulting_row information.appellation
      WHERE 
        information.appe_tokens_for_comparision(appellation_label) =
        information.appe_tokens_for_comparision(NEW.appellation_label)
      AND fk_class = NEW.fk_class;
        
          -- RAISE INFO 'result of select: %', resulting_row;

    ------- if not existing, insert and store in result -----
      IF NOT FOUND THEN
        
            -- RAISE INFO 'Not found, creating new...';
      
          WITH _insert AS (
              INSERT INTO information.appellation (
                appellation_label, 
                fk_class
              ) 
              VALUES (
                NEW.appellation_label, 
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


-- add trigger on insert to execute v_appellation_find_or_create

  CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_appellation
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_appellation_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



