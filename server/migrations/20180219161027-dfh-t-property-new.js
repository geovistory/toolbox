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

  CREATE TABLE data_for_history.property (
    dfh_pk_property                   integer,
    dfh_identifier_in_namespace       text,
    dfh_has_domain                    integer,
    dfh_has_range                     integer,
    dfh_creation_time                 timestamp,
    dfh_modification_time             timestamp,
    dfh_domain_instances_cardinality  smallint,
    dfh_range_instances_cardinality   smallint,
    dfh_standard_label                varchar(500)
  )
  INHERITS (data_for_history.entity);

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON data_for_history.property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON data_for_history.property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON data_for_history.property FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();


  -- versioning

  CREATE TABLE data_for_history.property_vt (LIKE data_for_history.property);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.property
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'data_for_history.property_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE IF EXISTS data_for_history.property CASCADE;
  DROP TABLE IF EXISTS data_for_history.property_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
