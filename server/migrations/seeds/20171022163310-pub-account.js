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
  INSERT INTO public.account (username, password, email, emailverified, verificationtoken)
  VALUES
  ('pinco',	'$2a$10$MZgoIDMLkZs10meRmJKAQ..bavivZrmm86Zxh2zcrhB31vBY9iSEe	','fb_listes@bluewin.ch', true, null),
  ('Dave',	'$2a$10$DBOdr6/484vPqAApPsWiSunDl43einZd.BNjw1itbPRQ.99KYdBxm','davek1@gmx.ch', true, null),
  ('Jonas',	'$2a$10$wvuGayDgMEWO0hkIO1qu4OjL5XadXVEzYrVzZ8gVagRbxMTJhGyoG',	'jonas.schneider@kleiolab.ch', true, null)
  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
    TRUNCATE public.account CASCADE;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
