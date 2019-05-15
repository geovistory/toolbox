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

  var sql = `
    -- remove not null contraint of generic entity table
        ALTER TABLE information.entity ALTER COLUMN entity_version DROP NOT NULL;
  `;

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  var sql = `
  -- add not null contraint of generic entity table
        ALTER TABLE information.entity ALTER COLUMN entity_version SET NOT NULL;
  `

  db.runSql(sql, callback);

};

exports._meta = {
  "version": 1
};
