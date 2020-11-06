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
  CREATE TABLE data_for_history.class
(
   pk_class                 integer,
   identifier_in_namespace  text,
   data_for_history_id VARCHAR(7) NOT NULL UNIQUE,
   standard_label           varchar(500),
   fk_system_type           integer,
   tmsp_last_dfh_update     timestamptz
)
INHERITS (data_for_history.entity);

CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON data_for_history.class
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

CREATE TRIGGER last_modification_tmsp
BEFORE INSERT OR UPDATE
    ON data_for_history.class
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON data_for_history.class FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();


-- versioning

CREATE TABLE data_for_history.class_vt (LIKE data_for_history.class);

CREATE TRIGGER versioning_trigger
BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.class
FOR EACH ROW EXECUTE PROCEDURE versioning(
 'sys_period', 'data_for_history.class_vt', true
);

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE data_for_history.class;
  DROP TABLE data_for_history.class_vt;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
