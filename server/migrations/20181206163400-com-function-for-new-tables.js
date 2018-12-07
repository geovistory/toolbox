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

  -- This Function helps to initialize tables that inherit from an entity table:
  -- # it adds a unique constraint to pk_entity
  -- # it adds a version history table
  -- # it adds all triggers for timestamps
  
  CREATE OR REPLACE FUNCTION commons.init_entity_child_table(schema_and_table_name varchar)
    RETURNS void
      LANGUAGE 'plpgsql'
      COST 100	
      VOLATILE 
    AS $BODY$
    DECLARE
      unique_constraint_name varchar;
    BEGIN

      -- Create the name of the unique constraint that will be applied to the new table's pk_entity  

      SELECT INTO unique_constraint_name replace( schema_and_table_name , '.' , '_' )_pk_entity_unique;
        
      -- Do the Magic:

      EXECUTE format('	
            
        -- Add unique constraint to pk_entity of the new table, so that it can be referenced by foreign keys

        ALTER TABLE %1$s ADD CONSTRAINT  %2$s_pk_entity_unique UNIQUE (pk_entity);
            
        -- Trigger: creation_tmsp

        CREATE TRIGGER creation_tmsp
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_creation();

        -- Trigger: insert_schema_table_name

        CREATE TRIGGER insert_schema_table_name
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.insert_schema_table_name();

        -- Trigger: last_modification_tmsp

        CREATE TRIGGER last_modification_tmsp
        BEFORE INSERT OR UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_last_modification();

        -- Table: <schema_and_table_name>_vt

        CREATE TABLE %1$s_vt (LIKE %1$s);

        -- Trigger: versioning_trigger

        CREATE TRIGGER versioning_trigger
        BEFORE INSERT OR UPDATE OR DELETE ON %1$s
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        "sys_period", ''%1$s_vt'', true
        );

        -- Trigger: create_entity_version_key

        CREATE TRIGGER create_entity_version_key
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.create_entity_version_key();

        -- Trigger: update_entity_version_key

        CREATE TRIGGER update_entity_version_key
        BEFORE UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.update_entity_version_key();',          
        schema_and_table_name, 
        unique_constraint_name

      );
        
    END 
    $BODY$;


  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
     DROP FUNCTION commons.init_entity_child_table(character varying);
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



