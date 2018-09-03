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
  -- Table: information.controlled_vocabulary

  CREATE TABLE information.controlled_vocabulary
  (
    fk_class integer REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.controlled_vocabulary ADD CONSTRAINT controlled_vocabulary_unique_pk_entity UNIQUE (pk_entity);

  ALTER TABLE information.controlled_vocabulary
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.controlled_vocabulary
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.controlled_vocabulary
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.controlled_vocabulary
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Versioning

  CREATE TABLE information.controlled_vocabulary_vt (LIKE information.controlled_vocabulary);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.controlled_vocabulary
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.controlled_vocabulary_vt', true
  );

  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {


  const sql = `
  DROP TABLE information.controlled_vocabulary;
  DROP TABLE information.controlled_vocabulary_vt;
  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};
