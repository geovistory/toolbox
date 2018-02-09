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
  CREATE TABLE data_for_history.text_property
(
   pk_text_property       serial      NOT NULL,
   text_property          text,
   fk_text_property_type  integer,
   language_iso_code      varchar,
   dfh_creation_time          timestamp   DEFAULT now() NOT NULL,
   dfh_modification_time      timestamp,
   fk_property            integer,
   fk_namespace           integer,
   fk_class               integer,
   fk_project             integer,
   fk_class_type          integer,
   fk_property_type       integer,
   fk_system_type         integer,
   fk_entity_association  integer,
   fk_profile             integer,
   fk_is_subclass_of      integer,
   tmsp_last_dfh_update     timestamptz
)
INHERITS (data_for_history.entity);



CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON data_for_history.text_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

CREATE TRIGGER last_modification_tmsp
BEFORE INSERT OR UPDATE
    ON data_for_history.text_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON data_for_history.text_property FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();


-- versioning

CREATE TABLE data_for_history.text_property_vt (LIKE data_for_history.text_property);

CREATE TRIGGER versioning_trigger
BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.text_property
FOR EACH ROW EXECUTE PROCEDURE versioning(
 'sys_period', 'data_for_history.text_property_vt', true
);

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE data_for_history.text_property;
  DROP TABLE data_for_history.text_property_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
