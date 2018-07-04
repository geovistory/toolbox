'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const sql = `

  ALTER TABLE commons.entity 
  ADD COLUMN entity_version integer;

  ALTER TABLE commons.entity 
  ADD COLUMN notes text;

  ALTER TABLE commons.entity 
  ADD COLUMN fk_creator integer;

  ALTER TABLE commons.entity 
  ADD COLUMN fk_last_modifier integer;

  ALTER TABLE commons.entity 
  ADD COLUMN tmsp_creation timestamp with time zone DEFAULT now();

  ALTER TABLE commons.entity 
  ADD COLUMN tmsp_last_modification timestamp with time zone;

  ALTER TABLE commons.entity 
  ADD COLUMN sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone);
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

  ALTER TABLE commons.entity 
  DROP COLUMN entity_version ;

  ALTER TABLE commons.entity 
  DROP COLUMN notes ;

  ALTER TABLE commons.entity 
  DROP COLUMN fk_creator ;

  ALTER TABLE commons.entity 
  DROP COLUMN fk_last_modifier ;

  ALTER TABLE commons.entity 
  DROP COLUMN tmsp_creation;

  ALTER TABLE commons.entity 
  DROP COLUMN tmsp_last_modification;

  ALTER TABLE commons.entity 
  DROP COLUMN sys_period;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
