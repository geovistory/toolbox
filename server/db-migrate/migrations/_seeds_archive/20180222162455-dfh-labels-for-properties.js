'use strict';

var dbm;
var type;
var seed;

/**
* We receive the dbmigrate dependency from dbmigrate initially.
* This enables us to not have to rely on NODE_PATH.
*/
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


exports.up = function (db, callback) {
  const sql = `
  INSERT INTO data_for_history.label (dfh_fk_property, dfh_label, notes)
  VALUES
  (1, 'Entity with this Name', 'label.sg'),
  (1, 'Entities with this Name', 'label.pl'),
  (1, 'Name', 'label_inversed.sg'),
  (1, 'Names', 'label_inversed.pl'),

  (2, 'Detailed Name', 'label.sg'),
  (2, 'Detailed Names', 'label.pl'),
  (2, 'Names with this details', 'label_inversed.sg'),
  (2, 'Name with this details', 'label_inversed.pl'),

  (3, 'Language', 'label.sg'),
  (3, 'Languages', 'label.pl'),
  (3, 'Name with this language', 'label_inversed.sg'),
  (3, 'Names with this language', 'label_inversed.pl'),

  (4, 'Mother', 'label.sg'),
  (4, 'Mothers', 'label.pl'),
  (4, 'Bith given as Mother', 'label_inversed.sg'),
  (4, 'Births given as Mother', 'label_inversed.pl'),

  (5, 'Father', 'label.sg'),
  (5, 'Fathers', 'label.pl'),
  (5, 'Birth initiated as biological Father', 'label_inversed.sg'),
  (5, 'Births initiated as biological Father', 'label_inversed.pl'),

  (6, 'Born child', 'label.sg'),
  (6, 'Born children', 'label.pl'),
  (6, 'Birth', 'label_inversed.sg'),
  (6, 'Births', 'label_inversed.pl'),

  (71, 'Ongoing throughout' , 'label_inversed.sg'),
  (150,'End of begin'       , 'label_inversed.sg'),
  (151,'Begin of end'       , 'label_inversed.sg'),
  (72, 'At some time within', 'label_inversed.sg'),
  (152,'Begin of begin'     , 'label_inversed.sg'),
  (153,'End of end'         , 'label_inversed.sg')
  
  
  ;  `;


  db.runSql(sql, callback);

};

exports.down = function (db, callback) {
  const sql = `
  TRUNCATE data_for_history.label CASCADE;
  `;

  db.runSql(sql, callback);
};


exports._meta = {
  "version": 1
};
