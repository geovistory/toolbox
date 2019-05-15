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
    CREATE TABLE commons.class_has_type_property (
      fk_class    INTEGER UNIQUE,
      fk_property  INTEGER,
      FOREIGN KEY (fk_class) references data_for_history.class(dfh_pk_class),
      FOREIGN KEY (fk_property) references data_for_history.property(dfh_pk_property)      
    )
    INHERITS (commons.entity);
    
    SELECT commons.init_entity_child_table('commons.class_has_type_property');
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    DROP TABLE IF EXISTS commons.class_has_type_property;
    DROP TABLE IF EXISTS commons.class_has_type_property_vt;

    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
