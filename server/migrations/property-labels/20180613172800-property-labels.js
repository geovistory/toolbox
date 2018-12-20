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
  
    ------------------- Person ---------------------
  
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
  
    (1180, 'Person located relative to place', 'label.sg'),
    (1180, 'Person located relative to place', 'label.pl'),
    (1180, 'Found himself / herself at place', 'label_inversed.sg'),
    (1180, 'Found himself / herself  at place', 'label_inversed.pl'),
  
    (1188, 'Member (Person)', 'label.sg'),
    (1188, 'Members (Persons)', 'label.pl'),
    (1188, 'Is member of', 'label_inversed.sg'),
    (1188, 'Is member of', 'label_inversed.pl'),
  
    (1192, 'Entity with this Name', 'label.sg'),
    (1192, 'Entities with this Name', 'label.pl'),
    (1192, 'Name', 'label_inversed.sg'),
    (1192, 'Names', 'label_inversed.pl'),
  
  
    ------------------ Group ---------------------
  
    (83, 'Formed Group (Organization)', 'label.sg'),
    (83, 'Formed Groups (Organizations)', 'label.pl'),
    (83, 'Start (Formation / Foundation)', 'label_inversed.sg'),
    (83, 'Start (Formations / Foundations)', 'label_inversed.pl'),
  
    (87, 'Dissolved Group (Organization)', 'label.sg'),
    (87, 'Dissolved Groups (Organizations)', 'label.pl'),
    (87, 'End (Dissolution)', 'label_inversed.sg'),
    (87, 'End (Dissolution)', 'label_inversed.pl'),
  
    -- todo: 132, 134, 139, 1013, 1035
    
    (132, 'Was joined', 'label.sg'),
    (132, 'Was joined', 'label.pl'),
    (132, 'Joining', 'label_inversed.sg'),
    (132, 'Joining', 'label_inversed.pl'),
  
    (134, 'Was left', 'label.sg'),
    (134, 'Was left', 'label.pl'),
    (134, 'Left', 'label_inversed.sg'),
    (134, 'Left', 'label_inversed.pl'),
  
    (139, 'Formed from Group (Organization)', 'label.sg'),
    (139, 'Formed from Groups (Organization)', 'label.pl'),
    (139, 'Participated in Formation', 'label_inversed.sg'),
    (139, 'Participated in Formation', 'label_inversed.pl'),
  
    (1182, 'Is location of', 'label.sg'),
    (1182, 'Is location of', 'label.pl'),
    (1182, 'Localization (time related)', 'label_inversed.sg'),
    (1182, 'Localization (time related)', 'label_inversed.pl'),
  
    (1189, 'Group (Organization)', 'label.sg'),
    (1189, 'Group (Organization)', 'label.pl'),
    (1189, 'Member', 'label_inversed.sg'),
    (1189, 'Members', 'label_inversed.pl'),
  
    (1193, 'Entity with this Name', 'label.sg'),
    (1193, 'Entities with this Name', 'label.pl'),
    (1193, 'Name', 'label_inversed.sg'),
    (1193, 'Names', 'label_inversed.pl'),
  
  
    ------------- Geographical Place -----------------
  
    (1178, 'Was located relative to place', 'label.sg'),
    (1178, 'Was located relative to places', 'label.pl'),
    (1178, 'Was place of', 'label_inversed.sg'),
    (1178, 'Was place of', 'label_inversed.pl'),
  
    (1194, 'Entity with this Name', 'label.sg'),
    (1194, 'Entities with this Name', 'label.pl'),
    (1194, 'Name', 'label_inversed.sg'),
    (1194, 'Names', 'label_inversed.pl'),
    
    (1113, 'Detailed Name', 'label.sg'),
    (1113, 'Detailed Names', 'label.pl'),
    (1113, 'Names with this details', 'label_inversed.sg'),
    (1113, 'Name with this details', 'label_inversed.pl'), 
  
    (1181, 'Place', 'label.sg'),
    (1181, 'Places', 'label.pl'),
    (1181, 'Geolocalization (time related)', 'label_inversed.sg'),
    (1181, 'Geolocalizations (time related)', 'label_inversed.pl'),

    
    ------------- Built Work ------------
    (1195, 'Entity with this Name', 'label.sg'),
    (1195, 'Entities with this Name', 'label.pl'),
    (1195, 'Name', 'label_inversed.sg'),
    (1195, 'Names', 'label_inversed.pl'),
    
    (1184, 'Place', 'label.sg'),
    (1184, 'Places', 'label.pl'),
    (1184, 'Geolocalization (time related)', 'label_inversed.sg'),
    (1184, 'Geolocalizations (time related)', 'label_inversed.pl'),
  
  
    
    -------------  Place -----------------
    
    (148, 'Geocoordinates', 'label.sg'),
    (148, 'Geocoordinates', 'label.pl'),
    (148, 'Are coordinates of precence', 'label_inversed.sg'),
    (148, 'Are coordinates of precences', 'label_inversed.pl'), 
    
  
    ------------- BIRTH -----------------
  
    (1186, 'Born at this place', 'label.sg'),
    (1186, 'Born at this places', 'label.pl'),
    (1186, 'Is place of birth', 'label_inversed.sg'),
    (1186, 'Is place of births', 'label_inversed.pl'),
  
    (1187, 'Born in this building', 'label.sg'),
    (1187, 'Born in this building', 'label.pl'),
    (1187, 'Is place of birth', 'label_inversed.sg'),
    (1187, 'Is place of births', 'label_inversed.pl'),
  
    ------------- DEATH -----------------
  
    (1191, 'Died at this place', 'label.sg'),
    (1191, 'Died at this places', 'label.pl'),
    (1191, 'Is place of death', 'label_inversed.sg'),
    (1191, 'Is place of death', 'label_inversed.pl'),
  
  
    ------------- TIME RELATED LOCALIZATION -----------------
  
    (1185, 'Built work located relative to place', 'label.sg'),
    (1185, 'Built work located relative to places', 'label.pl'),
    (1185, 'Was built at place', 'label_inversed.sg'),
    (1185, 'Was built at places', 'label_inversed.pl'),
  
  
  
    ------------------ Time Span ---------------------
    
    (71, 'Ongoing throughout' , 'label_inversed.sg'),
    (150,'End of begin'       , 'label_inversed.sg'),
    (151,'Begin of end'       , 'label_inversed.sg'),
    (72, 'At some time within', 'label_inversed.sg'),
    (152,'Begin of begin'     , 'label_inversed.sg'),
    (153,'End of end'         , 'label_inversed.sg'),
    (71, 'Ongoing throughout' , 'label.pl'),
    (150,'End of begin'       , 'label.pl'),
    (151,'Begin of end'       , 'label.pl'),
    (72, 'At some time within', 'label.pl'),
    (152,'Begin of begin'     , 'label.pl'),
    (153,'End of end'         , 'label.pl'),


    ------------------ Appellation for language ---------------------

    (1112, 'Language', 'label.sg'),
    (1112, 'Languages', 'label.pl'),
    (1112, 'Name with this language', 'label_inversed.sg'),
    (1112, 'Names with this language', 'label_inversed.pl')
 
  ;`;


  db.runSql(sql, callback);

};

exports.down = function (db, callback) {
  const sql = ` 
    DELETE FROM data_for_history.label
    WHERE 
    notes IN ('label.sg','label.pl','label_inversed.sg','label_inversed.pl'); 
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
