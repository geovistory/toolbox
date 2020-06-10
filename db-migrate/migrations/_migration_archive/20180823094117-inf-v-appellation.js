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
  
  -- create a function that converts appellation_label to a
  -- simpler json object without token id, useful for identification 
  -- of unique appellations (find or create)
  CREATE FUNCTION information.appe_tokens_for_comparision (IN appe_label jsonb, OUT tokens_for_comparision jsonb)
    AS $$
        Select array_to_json(array_agg(json_build_object('string',tokens_without_ids.string, 'typeId', tokens_without_ids.typeId)))::jsonb as tokens_for_comparision from 
                (
                    SELECT appe.tokens->>'string' as string,  appe.tokens->>'typeId' as typeId
                    FROM (
                        SELECT jsonb_array_elements(appe_label->'tokens') as tokens
                        ) as appe
                ) as tokens_without_ids
    $$ LANGUAGE SQL;



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

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_appellation
    DROP VIEW IF EXISTS information.v_appellation;
  
  -- remove trigger function v_appellation_find_or_create
    DROP FUNCTION information.v_appellation_find_or_create();

  -- remove comparision function
    DROP FUNCTION information.appe_tokens_for_comparision(IN appe_label jsonb, OUT tokens_for_comparision jsonb);
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
