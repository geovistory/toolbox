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
    dfh_domain_instances_min_quantifier,
    dfh_domain_instances_max_quantifier,
    dfh_range_instances_min_quantifier,
    dfh_range_instances_max_quantifier
  )
  VALUES
  (1, 'R63', 3, 1, 'Named', 0, -1, 0, -1),
  (2, 'R64', 3, 2, 'Used Name', 0, -1, 1, 1),
  (3, 'R61', 3, 4, 'Occured in kind of context', 0, -1, 1, 1),
  (4, 'P96', 5, 1, 'By Mother', 1, -1, 1, 1),
  (5, 'P97', 5, 1, 'From Father', 1, -1, 1, 1),
  (6, 'P98', 5, 1, 'Brought into life', 1, 1, 1, 9),
  
  -- histC8 is identfied by E82 appellation
  (7, 'R63', 3, 363, 'Named', 0, -1, 0, -1),

  -- properties to time_primitives
  (71, 'P81', 22, 335, 'Ongoing throughout', 0, 1, 0, 1),
  (150, 'P81a', 22, 335, 'End of begin', 0, 1, 0, 1),
  (151, 'P81b', 22, 335, 'Begin of end', 0, 1, 0, 1),
  (72, 'P82', 22, 335, 'At some time within', 0, 1, 0, 1),
  (152, 'P82a', 22, 335, 'Begin of begin', 0, 1, 0, 1),
  (153, 'P82b', 22, 335, 'End of end', 0, 1, 0, 1),


  -- properties of E93 Precence
  (147, 'P166', 84, 363, 'Was a precence of', 1, 1, 1, 1),
  (148, 'P167', 84, 51, 'Was at', 1, 1, 1, 1)

  `;


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
