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
  CREATE OR REPLACE FUNCTION commons.appellation_label_to_quill_doc(orig jsonb) RETURNS jsonb AS $f$
      
    BEGIN
      RETURN commons.text_to_quill_doc(information.appellation_label_to_string(orig));
    END;
  $f$ LANGUAGE 'plpgsql' IMMUTABLE;
                                                      
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
    DROP FUNCTION commons.appellation_label_to_quill_doc(jsonb)
  `;

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
