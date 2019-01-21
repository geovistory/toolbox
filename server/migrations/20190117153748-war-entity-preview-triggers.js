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

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_epr_upsert                                                                             #1
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_epr_upsert
  After INSERT OR UPDATE 
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__upsert_entity_preview();

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_update_on_entity_preview__fk_entity_label                                              #2
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_update_on_entity_preview__fk_entity_label
  AFTER UPDATE OF fk_entity_label
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__get_entity_label();
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_update_on_entity_preview__fk_type                                                     #3
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_update_on_entity_preview__fk_type
  AFTER UPDATE OF fk_type
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__get_type_label();
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER before_update_on_entity_preview__related_full_texts                                           #4
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER before_update_on_entity_preview__related_full_texts
  BEFORE UPDATE OF related_full_texts
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER before_update_on_entity_preview__own_full_text                                               #5
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER before_update_on_entity_preview__own_full_text
  BEFORE UPDATE OF own_full_text
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_update_on_entity_preview__own_full_text                                               #6
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_update_on_entity_preview__own_full_text
  AFTER UPDATE OF own_full_text
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_related_full_texts();
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_update_on_entity_preview__entity_label                                                 #7
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_update_on_entity_preview__entity_label
  AFTER UPDATE OF entity_label
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_entity_labels();
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_update_on_class_preview__class_label                                                   #8
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_update_on_class_preview__class_label
  AFTER UPDATE OF class_label
  ON warehouse.class_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_class_labels();
  

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_upsert_on_entity_preview                                                               #9
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER after_upsert_on_entity_preview
  AFTER INSERT OR UPDATE
  ON warehouse.entity_preview
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.entity_preview__notify_upsert();

  `  
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  -- 9
  DROP TRIGGER after_upsert_on_entity_preview ON warehouse.entity_preview;

  -- 8
  DROP TRIGGER after_update_on_class_preview__class_label ON warehouse.class_preview;

  -- 7
  DROP TRIGGER after_update_on_entity_preview__entity_label ON warehouse.entity_preview;

  -- 6
  DROP TRIGGER after_update_on_entity_preview__own_full_text ON warehouse.entity_preview;

  -- 5
  DROP TRIGGER before_update_on_entity_preview__own_full_text ON warehouse.entity_preview;

  -- 4
  DROP TRIGGER before_update_on_entity_preview__related_full_texts ON warehouse.entity_preview;

  -- 3
  DROP TRIGGER after_update_on_entity_preview__fk_type ON warehouse.entity_preview;

  -- 2
  DROP TRIGGER after_update_on_entity_preview__fk_entity_label ON warehouse.entity_preview;

  -- 1
  DROP TRIGGER after_epr_upsert ON information.entity_version_project_rel;
  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
