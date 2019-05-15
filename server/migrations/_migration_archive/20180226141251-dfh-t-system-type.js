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
  CREATE TABLE data_for_history.system_type
(
   dfh_pk_system_type                 integer,
   dfh_used_in_table                  varchar(250),
   dfh_standard_label                 varchar(500),
   dfh_creation_time                  timestamp,
   dfh_modification_time              timestamp

)
INHERITS (data_for_history.entity);



CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON data_for_history.system_type
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

CREATE TRIGGER last_modification_tmsp
BEFORE INSERT OR UPDATE
    ON data_for_history.system_type
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON data_for_history.system_type FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.system_type
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

-- versioning

CREATE TABLE data_for_history.system_type_vt (LIKE data_for_history.system_type);

CREATE TRIGGER versioning_trigger
BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.system_type
FOR EACH ROW EXECUTE PROCEDURE versioning(
 'sys_period', 'data_for_history.system_type_vt', true
);

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE data_for_history.system_type CASCADE;
  DROP TABLE data_for_history.system_type_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
