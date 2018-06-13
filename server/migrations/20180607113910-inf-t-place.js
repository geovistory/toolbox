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

  -- Table: information.place

  CREATE TABLE information.place
  (
    geo_point GEOGRAPHY(POINT,4326),
    fk_class integer REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.place
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.place
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.place
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.place
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {


  const sql = `
  DROP TABLE information.place;
  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};
