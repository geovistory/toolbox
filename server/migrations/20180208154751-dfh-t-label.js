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
  CREATE TABLE data_for_history.label
(
   dfh_pk_label                        integer,
   dfh_label                           text,
   dfh_language_iso_code               varchar,
   dfh_is_standard_label_for_language  boolean,
   dfh_fk_property                     integer,
   dfh_fk_namespace                    integer,
   dfh_fk_class                        integer,
   dfh_fk_project                      integer,
   dfh_fk_class_type                   integer,
   dfh_fk_property_type                integer,
   dfh_fk_system_type                  integer,
   dfh_fk_profile                      integer,
   dfh_creation_time                   timestamp,
   dfh_modification_time               timestamp

)
INHERITS (data_for_history.entity);



CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON data_for_history.label
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

CREATE TRIGGER last_modification_tmsp
BEFORE INSERT OR UPDATE
    ON data_for_history.label
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON data_for_history.label FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();


-- versioning

CREATE TABLE data_for_history.label_vt (LIKE data_for_history.label);

CREATE TRIGGER versioning_trigger
BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.label
FOR EACH ROW EXECUTE PROCEDURE versioning(
 'sys_period', 'data_for_history.label_vt', true
);

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE data_for_history.label CASCADE;
  DROP TABLE data_for_history.label_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
