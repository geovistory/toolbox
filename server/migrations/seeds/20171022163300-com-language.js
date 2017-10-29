'use strict';

var dbm;
var type;
var seed;
var iso6393 = require('iso-639-3');


/**
* We receive the dbmigrate dependency from dbmigrate initially.
* This enables us to not have to rely on NODE_PATH.
*/
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


/**
 * Insert all languages from https://www.npmjs.com/package/iso-639-3
 */
exports.up = function(db, callback) {

  var sql = `INSERT into commons.language (pk_language, lang_type, scope, iso6392b, iso6392t, iso6391, notes) VALUES `;

  var rows = [];

  const escapeSingleQuotes = function(val){
    if ((typeof val) === 'string') return "'" + val.split("'").join("''") + "'";
    else return val;
  }

  for (var i = 0; i < iso6393.length; i++) {
    const row = '(' +
    escapeSingleQuotes(iso6393[i].iso6393) + ',' +
    escapeSingleQuotes(iso6393[i].type) + ',' +
    escapeSingleQuotes(iso6393[i].scope) + ',' +
    escapeSingleQuotes(iso6393[i].iso6392B) + ',' +
    escapeSingleQuotes(iso6393[i].iso6392T) + ',' +
    escapeSingleQuotes(iso6393[i].iso6391) + ',' +
    escapeSingleQuotes(iso6393[i].name) +
    ')';
    rows.push(row);
  }

  sql = sql + rows.join(',') + ';';

  console.log('run INSERT INTO commons.language with ' + iso6393.length + ' languages');

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  var sql = 'TRUNCATE commons.language CASCADE'

  db.runSql(sql, callback);

};

exports._meta = {
  "version": 1
};
