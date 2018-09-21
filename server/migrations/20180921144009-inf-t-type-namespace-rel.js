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
  CREATE TABLE information.type_namespace_rel
  (
    pk_entity integer primary key,
    fk_persistent_item integer references information.persistent_item (pk_entity),
    fk_namespace integer references information.namespace (pk_entity),
    CONSTRAINT information_type_namespace_rel_pk_entity_unique UNIQUE (pk_entity)
  )
  INHERITS (information.entity);

  COMMENT ON TABLE information.type_namespace_rel IS 'This table stores relation between instances of E55 Type and Namespaces.';
  COMMENT ON COLUMN information.type_namespace_rel.fk_persistent_item IS 'References the pk_entity of the persistent_item table.';

  CREATE TRIGGER creation_tmsp
      BEFORE INSERT
      ON information.type_namespace_rel
      FOR EACH ROW
      EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
      ON information.type_namespace_rel
      FOR EACH ROW
      EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
    ON information.type_namespace_rel FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();


  -- versioning

  CREATE TABLE information.type_namespace_rel_vt (LIKE information.type_namespace_rel);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.type_namespace_rel
  FOR EACH ROW EXECUTE PROCEDURE versioning(
  'sys_period', 'information.type_namespace_rel_vt', true
  );

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.type_namespace_rel CASCADE;
  DROP TABLE information.type_namespace_rel_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
