'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

const tableNames = [
  'chunk',
  'digital_object',
  'place',
  'time_primitive'
]

const createVtSql=(tablename)=> `
CREATE TABLE information.${tablename}_vt (LIKE information.${tablename});

-- Trigger: versioning_trigger

CREATE TRIGGER versioning_trigger
BEFORE INSERT OR UPDATE OR DELETE ON information.${tablename}
FOR EACH ROW EXECUTE PROCEDURE versioning(
  'sys_period', 'information.${tablename}_vt', true
);
`

exports.up = function(db, callback) {
  
  const sql = tableNames.map(t=>createVtSql(t)).join('');

  db.runSql(sql, callback)

};


const dropVtSql=(tablename)=> `
DROP TABLE information.${tablename}_vt;
DROP TRIGGER versioning_trigger ON information.${tablename};
`

exports.down = function(db, callback) {

  const sql = tableNames.map(t=>dropVtSql(t)).join('');

  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
