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

exports.up = function (db, callback) {


  const sql = `

  -- Update the version trigger, so that also fk_entity can be set without versioning

  DROP TRIGGER on_upsert ON information.entity_version_project_rel;

  DROP FUNCTION commons.evpr_fk_entity_fk_entity_version();
  
  CREATE FUNCTION commons.evpr_fk_entity_fk_entity_version()
  RETURNS trigger
        LANGUAGE 'plpgsql'
        AS $BODY$
        DECLARE
        result text;
  
    BEGIN
    
    -- Added if condition:
    -- only if there is a fk_entity_version_concat, generate fk_entity and fk_entity_version

    IF (NEW.fk_entity_version_concat IS NOT NULL) THEN
      NEW.fk_entity = split_part(NEW.fk_entity_version_concat, '_', 1)::integer;
      NEW.fk_entity_version = split_part(NEW.fk_entity_version_concat, '_', 2)::integer;
    END IF;
      
    RETURN NEW;
    END;
    
  $BODY$;
  
  
  
  CREATE TRIGGER on_upsert
      BEFORE INSERT OR UPDATE 
      ON information.entity_version_project_rel
      FOR EACH ROW
      EXECUTE PROCEDURE commons.evpr_fk_entity_fk_entity_version();
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {


  const sql = `
  -- Update the version trigger, so that also fk_entity can be set without versioning

  DROP TRIGGER on_upsert ON information.entity_version_project_rel;

  DROP FUNCTION commons.evpr_fk_entity_fk_entity_version();
  
  CREATE FUNCTION commons.evpr_fk_entity_fk_entity_version()
  RETURNS trigger
        LANGUAGE 'plpgsql'
        AS $BODY$
        DECLARE
        result text;
  
    BEGIN
    
      NEW.fk_entity = split_part(NEW.fk_entity_version_concat, '_', 1)::integer;
      NEW.fk_entity_version = split_part(NEW.fk_entity_version_concat, '_', 2)::integer;
      
    RETURN NEW;
    END;
    
  $BODY$;
  
  
  
  CREATE TRIGGER on_upsert
      BEFORE INSERT OR UPDATE 
      ON information.entity_version_project_rel
      FOR EACH ROW
      EXECUTE PROCEDURE commons.evpr_fk_entity_fk_entity_version();  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};



