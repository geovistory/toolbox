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


exports.up = function (db, callback) {

  const sql = `
    CREATE TABLE commons.namespace_project_rel (
      fk_project    INTEGER,
      fk_class    INTEGER,
      fk_namespace    INTEGER,
      FOREIGN KEY (fk_project) references commons.project(pk_project),
      FOREIGN KEY (fk_class) references data_for_history.class(dfh_pk_class),
      FOREIGN KEY (fk_namespace) references information.namespace(pk_entity),
      UNIQUE (fk_project, fk_class)    
    )
    INHERITS (commons.entity);
    
    SELECT commons.init_entity_child_table('commons.namespace_project_rel');
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    DROP TABLE IF EXISTS commons.namespace_project_rel;
    DROP TABLE IF EXISTS commons.namespace_project_rel_vt;

    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
