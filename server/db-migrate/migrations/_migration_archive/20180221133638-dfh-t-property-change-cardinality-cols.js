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
  ALTER TABLE data_for_history.property
  ADD COlUMN dfh_domain_instances_min_quantifier smallint,
  ADD COlUMN dfh_domain_instances_max_quantifier smallint,
  ADD COlUMN dfh_range_instances_min_quantifier smallint,
  ADD COlUMN dfh_range_instances_max_quantifier smallint,
  DROP COLUMN dfh_domain_instances_cardinality,
  DROP COLUMN dfh_range_instances_cardinality;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.property
  DROP COlUMN dfh_domain_instances_min_quantifier,
  DROP COlUMN dfh_domain_instances_max_quantifier,
  DROP COlUMN dfh_range_instances_min_quantifier,
  DROP COlUMN dfh_range_instances_max_quantifier,
  ADD COLUMN dfh_domain_instances_cardinality smallint,
  ADD COLUMN dfh_range_instances_cardinality smallint;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
