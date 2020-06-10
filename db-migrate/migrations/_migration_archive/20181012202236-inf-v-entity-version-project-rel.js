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

  -- add view v_entity_version_project_rel
	CREATE OR REPLACE VIEW information.v_entity_version_project_rel AS
	SELECT * FROM information.entity_version_project_rel;
	


  -- create v_entity_version_project_rel_find_or_create
    CREATE OR REPLACE FUNCTION information.v_entity_version_project_rel_update_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
	  	resulting_pk integer;
    	resulting_row information.v_entity_version_project_rel;
    BEGIN

       RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in resulting_pk ... -----
      SELECT * FROM INTO resulting_row information.v_entity_version_project_rel
        WHERE fk_entity = NEW.fk_entity
		    AND fk_project = NEW.fk_project;

			
	  ------ ... and update the found row -----

    IF FOUND THEN

     -- RAISE INFO 'result of select: %', resulting_row;
     -- RAISE INFO 'v %', COALESCE(NEW.entity_version, resulting_row.entity_version);

			UPDATE information.entity_version_project_rel
      SET	
            fk_entity_version = COALESCE(NEW.fk_entity_version, resulting_row.fk_entity_version),
		  		  fk_entity_version_concat = COALESCE(NEW.fk_entity_version_concat, resulting_row.fk_entity_version_concat),
				    is_in_project = COALESCE(NEW.is_in_project, resulting_row.is_in_project),
		  		  is_standard_in_project = COALESCE(NEW.is_standard_in_project, resulting_row.is_standard_in_project),
		  		  calendar = COALESCE(NEW.calendar, resulting_row.calendar),
            ord_num = COALESCE(NEW.ord_num, resulting_row.ord_num)
      WHERE pk_entity = resulting_row.pk_entity;
		
      ------- if not existing, insert and store in result -----
        ELSE
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.entity_version_project_rel (
                  fk_project,
                  fk_entity, 
                  fk_entity_version,
                  fk_entity_version_concat,
                  is_in_project,
                  is_standard_in_project,
                  calendar,
                  ord_num,
                  entity_version
                  ) 
                  VALUES (
                  NEW.fk_project,
                  NEW.fk_entity, 
                  NEW.fk_entity_version,
                  NEW.fk_entity_version_concat,
                  NEW.is_in_project,
                  NEW.is_standard_in_project,
                  NEW.calendar,
                  NEW.ord_num,
                  1
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
			  
      END IF;

  	SELECT * FROM INTO resulting_row information.v_entity_version_project_rel
  	WHERE pk_entity = resulting_pk OR  pk_entity = resulting_row.pk_entity;
	  
    RETURN resulting_row;
      END;
      $BODY$;

      -- add trigger on insert to execute v_entity_version_project_rel_update_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_entity_version_project_rel
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_entity_version_project_rel_update_or_create();

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove view v_entity_version_project_rel
    DROP VIEW IF EXISTS information.v_entity_version_project_rel;
  
  -- remove trigger function v_entity_version_project_rel_update_or_create
    DROP FUNCTION information.v_entity_version_project_rel_update_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
