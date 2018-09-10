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
  -- Table: information.label

  CREATE TABLE information.label
  (
    fk_labeled_entity integer, -- no reference possible beacause of limitation of pg inheritance
    fk_language_entity integer REFERENCES information.language (pk_entity),
    fk_system_type integer REFERENCES commons.system_type (pk_entity),
    label text,
    UNIQUE (fk_labeled_entity, fk_language_entity, fk_system_type, label)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.label ADD CONSTRAINT label_unique_pk_entity UNIQUE (pk_entity);

  ALTER TABLE information.label
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Versioning

  CREATE TABLE information.label_vt (LIKE information.label);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.label
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.label_vt', true
  );

  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {


  const sql = `
  DROP TABLE information.label;
  DROP TABLE information.label_vt;
  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};
