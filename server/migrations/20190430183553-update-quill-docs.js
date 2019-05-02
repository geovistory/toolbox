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
  
  UPDATE information.digital_object 
  SET js_quill_data = commons.modernize_quill_doc(js_quill_data::jsonb);

  UPDATE information.digital_object_vt
  SET js_quill_data = commons.modernize_quill_doc(js_quill_data::jsonb);

  UPDATE information.chunk
  SET js_quill_data = commons.modernize_quill_doc(js_quill_data::jsonb);

  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
      -- NO WAY BACK !
    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
