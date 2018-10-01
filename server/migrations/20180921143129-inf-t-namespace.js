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
  CREATE TABLE information.namespace
  (
    pk_entity integer primary key,
    fk_root_namespace integer references information.namespace (pk_entity),
    fk_project integer references commons.project (pk_project),
    standard_label varchar(500),
    CONSTRAINT information_namespace_pk_entity_unique UNIQUE (pk_entity)
  )
  INHERITS (information.entity);

  COMMENT ON TABLE information.namespace IS 'This table stores namespaces of controlled vocabularies.';
  COMMENT ON COLUMN information.namespace.fk_root_namespace IS 'References the root namespace. If null, the namespace is a root namespace';

  CREATE TRIGGER creation_tmsp
      BEFORE INSERT
      ON information.namespace
      FOR EACH ROW
      EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
      ON information.namespace
      FOR EACH ROW
      EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
    ON information.namespace FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();


  -- versioning

  CREATE TABLE information.namespace_vt (LIKE information.namespace);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.namespace
  FOR EACH ROW EXECUTE PROCEDURE versioning(
  'sys_period', 'information.namespace_vt', true
  );

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.namespace CASCADE;
  DROP TABLE information.namespace_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
