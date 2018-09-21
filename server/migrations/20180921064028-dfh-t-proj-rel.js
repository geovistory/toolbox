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
  CREATE TABLE data_for_history.proj_rel
  (
    pk_entity integer primary key,
    fk_project integer references commons.project (pk_project),
    fk_entity integer references data_for_history.entity (pk_entity)
  )
  INHERITS (data_for_history.entity);

  CREATE TRIGGER creation_tmsp
      BEFORE INSERT
      ON data_for_history.proj_rel
      FOR EACH ROW
      EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
      ON data_for_history.proj_rel
      FOR EACH ROW
      EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
    ON data_for_history.proj_rel FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();


  -- versioning

  CREATE TABLE data_for_history.proj_rel_vt (LIKE data_for_history.proj_rel);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.proj_rel
  FOR EACH ROW EXECUTE PROCEDURE versioning(
  'sys_period', 'data_for_history.proj_rel_vt', true
  );

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE data_for_history.proj_rel CASCADE;
  DROP TABLE data_for_history.proj_rel_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
