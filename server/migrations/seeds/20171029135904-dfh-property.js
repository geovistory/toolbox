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
  INSERT INTO data_for_history.property (
    dfh_pk_property,
    dfh_identifier_in_namespace,
    dfh_has_domain,
    dfh_has_range,
    dfh_standard_label,
    dfh_domain_instances_cardinality_min,
    dfh_domain_instances_cardinality_max,
    dfh_range_instances_cardinality_min,
    dfh_range_instances_cardinality_max
  )
  VALUES
  (1, 'R63', 3, 1, 'Named', 0, NULL, 0, NULL),
  (2, 'R64', 3, 2, 'Used Name', 0, NULL, 0, NULL),
  (3, 'R61', 3, 4, 'Occured in kind of context', 0, NULL, 0, NULL)
  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  TRUNCATE data_for_history.property CASCADE;
  `;

  db.runSql(sql, callback);
};


exports._meta = {
  "version": 1
};
