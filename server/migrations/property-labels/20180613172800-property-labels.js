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

// (1, 'Entity with this Name', 'label.sg'),
// (1, 'Entities with this Name', 'label.pl'),
// (1, 'Name', 'label_inversed.sg'),
// (1, 'Names', 'label_inversed.pl'),

// (2, 'Detailed Name', 'label.sg'),
// (2, 'Detailed Names', 'label.pl'),
// (2, 'Names with this details', 'label_inversed.sg'),
// (2, 'Name with this details', 'label_inversed.pl'),

// (3, 'Language', 'label.sg'),
// (3, 'Languages', 'label.pl'),
// (3, 'Name with this language', 'label_inversed.sg'),
// (3, 'Names with this language', 'label_inversed.pl'),
exports.up = function (db, callback) {
  const sql = `
  INSERT INTO data_for_history.label (dfh_fk_property, dfh_label, notes)
  VALUES

  (84, 'Mother', 'label.sg'),
  (84, 'Mothers', 'label.pl'),
  (84, 'Bith given as Mother', 'label_inversed.sg'),
  (84, 'Births given as Mother', 'label_inversed.pl'),

  (85, 'Father', 'label.sg'),
  (85, 'Fathers', 'label.pl'),
  (85, 'Birth initiated as biological Father', 'label_inversed.sg'),
  (85, 'Births initiated as biological Father', 'label_inversed.pl'),

  (86, 'Born child', 'label.sg'),
  (86, 'Born children', 'label.pl'),
  (86, 'Birth', 'label_inversed.sg'),
  (86, 'Births', 'label_inversed.pl'),

  (88, 'Person that died', 'label.sg'),
  (88, 'Persons that died', 'label.pl'),
  (88, 'Death', 'label_inversed.sg'),
  (88, 'Deaths', 'label_inversed.pl'),


  

  (71, 'Ongoing throughout' , 'label_inversed.sg'),
  (150,'End of begin'       , 'label_inversed.sg'),
  (151,'Begin of end'       , 'label_inversed.sg'),
  (72, 'At some time within', 'label_inversed.sg'),
  (152,'Begin of begin'     , 'label_inversed.sg'),
  (153,'End of end'         , 'label_inversed.sg')
  
  
  ;  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function (db, callback) {
  const sql = `  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
