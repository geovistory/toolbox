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
------------------------------------------------------------------------------------------------------------
-- TABLE commons.assertion (including *_vt)                                                              #1
------------------------------------------------------------------------------------------------------------

  CREATE TABLE commons.assertion
  (
    fk_is_about_role INTEGER NOT NULL REFERENCES information.role (pk_entity),
    fk_is_about_entity_association INTEGER NOT NULL REFERENCES information.entity_association (pk_entity),

    fk_is_based_on_role INTEGER NOT NULL REFERENCES information.role (pk_entity),
    fk_is_based_on_entity_association INTEGER NOT NULL REFERENCES information.entity_association (pk_entity),
    fk_is_based_on_persistent_item INTEGER NOT NULL REFERENCES information.persistent_item (pk_entity),

    fk_is_based_on_factoid_role INTEGER NOT NULL REFERENCES sources.factoid_role (pk_entity),
    fk_is_based_on_cell INTEGER NOT NULL REFERENCES sources.cell (pk_entity),

    fk_assertion_method_type INTEGER NOT NULL REFERENCES information.persistent_item (pk_entity),

    source_reliability INTEGER,
    value INTEGER
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('commons.assertion');

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

  -- #1
  DROP TABLE IF EXISTS commons.assertion;
  DROP TABLE IF EXISTS commons.assertion_vt;

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
