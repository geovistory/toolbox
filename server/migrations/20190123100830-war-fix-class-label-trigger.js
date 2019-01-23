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
    ------------------------------------------------------------------------------------------------------------
    -- TRIGGER FUNCTION entity_preview__update_dependent_class_labels                		          		   #7
    ------------------------------------------------------------------------------------------------------------
      CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_class_labels()
          RETURNS trigger
          LANGUAGE 'plpgsql'
      AS $BODY$
      BEGIN
      
        RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; dfh_pk_class: % class_label: %', NEW.dfh_pk_class, NEW.class_label;

        PERFORM warehouse.entity_preview__fill_dependent_class_labels(NEW.dfh_pk_class, NEW.class_label);


        RETURN NEW;
      END;
      $BODY$;

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
    ------------------------------------------------------------------------------------------------------------
    -- TRIGGER FUNCTION entity_preview__update_dependent_class_labels                		          		   #7
    ------------------------------------------------------------------------------------------------------------
      CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_class_labels()
          RETURNS trigger
          LANGUAGE 'plpgsql'
      AS $BODY$
      BEGIN
      
        RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

        PERFORM warehouse.entity_preview__fill_dependent_class_labels(NEW.pk_entity, NEW.fk_project);


        RETURN NEW;
      END;
      $BODY$;
  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};


