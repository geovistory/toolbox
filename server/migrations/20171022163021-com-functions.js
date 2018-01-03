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
  CREATE FUNCTION commons.tmsp_creation ()
  RETURNS TRIGGER LANGUAGE 'plpgsql'
  AS
  $BODY$
  BEGIN
  NEW.tmsp_creation = NOW();
  RETURN NEW;
  END;
  $BODY$;


  CREATE FUNCTION commons.tmsp_last_modification()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  AS $BODY$
  BEGIN NEW.tmsp_last_modification = NOW();
  RETURN NEW;
  END;
  $BODY$;


  CREATE FUNCTION commons.insert_schema_table_name()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  AS $BODY$
  -- source https://www.postgresql.org/docs/current/static/plpgsql-trigger.html
  BEGIN
  NEW.schema_name = TG_TABLE_SCHEMA;
  NEW.table_name = TG_TABLE_NAME;
  RETURN NEW;
  END;
  $BODY$;


  CREATE OR REPLACE FUNCTION commons.create_entity_version_key()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
  AS $BODY$
  BEGIN
  NEW.entity_version = 1;
  RETURN NEW;
  END;
  $BODY$;


  CREATE OR REPLACE FUNCTION commons.update_entity_version_key()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
  AS $BODY$
  BEGIN
  NEW.entity_version :=  NEW.entity_version + 1;
  RETURN NEW;
  END;
  $BODY$;



  -- Function: split fk_entity_version_concat in fk_entity_version and fk_entity

  CREATE FUNCTION commons.evpr_fk_entity_fk_entity_version()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  AS $BODY$
  BEGIN
  NEW.fk_entity = split_part(NEW.fk_entity_version_concat, '_', 1)::integer;
  NEW.fk_entity_version = split_part(NEW.fk_entity_version_concat, '_', 2)::integer;

  RETURN NEW;
  END;
  $BODY$;
  `;

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  DROP FUNCTION commons.tmsp_creation();
  DROP FUNCTION commons.tmsp_last_modification();
  DROP FUNCTION commons.insert_schema_table_name();
  DROP FUNCTION commons.create_entity_version_key();
  DROP FUNCTION commons.update_entity_version_key();
  DROP FUNCTION commons.evpr_fk_entity_fk_entity_version();

  `;

  db.runSql(sql, callback);

};

exports._meta = {
  "version": 1
};
