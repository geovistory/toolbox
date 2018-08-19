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

--  --CREATE VIEW OF PERSISTENT ITEMS PER PROJECT
--
--  CREATE OR REPLACE VIEW information.v_project_persistent_item AS
--  SELECT piv.*,
--  epr.fk_project,
--  epr.is_in_project,
--  epr.is_standard_in_project,
--  epr.is_in_project_true_tmsp
--  FROM information.entity_project_rel epr
--  JOIN ( SELECT persistent_item.*
--    FROM information.persistent_item
--    UNION
--    SELECT persistent_item_vt.*
--    FROM information.persistent_item_vt
--  ) piv ON piv.pk_entity = epr.fk_entity AND lower(piv.sys_period) = epr.is_in_project_true_tmsp;
--
--
--
--
--  --CREATE INSERT FUNCTION
--  CREATE OR REPLACE FUNCTION information.v_project_persistent_item_insert()
--  RETURNS trigger AS
--  $BODY$
--  BEGIN
--  WITH insert_peit AS (
--    INSERT INTO information.persistent_item (fk_class,notes)
--    VALUES(NEW.fk_class, NEW.notes)
--    RETURNING pk_entity, lower(sys_period) as tmsp
--  )
--  INSERT INTO information.entity_project_rel(fk_entity,fk_project,is_in_project,is_standard_in_project, is_in_project_true_tmsp)
--  VALUES(
--    (
--      SELECT pk_entity
--      FROM insert_peit
--    ),
--    NEW.fk_project,
--    NEW.is_in_project,
--    NEW.is_standard_in_project,
--    (
--      SELECT tmsp
--      FROM insert_peit
--    )
--  );
--
--  RETURN NEW;
--  END;
--  $BODY$
--
--  LANGUAGE plpgsql VOLATILE
--  COST 100;
--
--  --CREATE INSERT TRIGGER
--
--  CREATE TRIGGER on_insert
--  INSTEAD OF INSERT
--  ON information.v_project_persistent_item
--  FOR EACH ROW
--  EXECUTE PROCEDURE information.v_project_persistent_item_insert();
--
--
--  --CREATE UPDATE FUNCTION
--  CREATE OR REPLACE FUNCTION information.v_project_persistent_item_update()
--  RETURNS trigger AS
--  $BODY$
--  BEGIN
--  IF NEW.fk_class <> OLD.fk_class OR NEW.notes <> OLD.notes THEN
--  WITH update_peit AS (
--    UPDATE information.persistent_item
--    SET fk_class = NEW.fk_class,
--    notes = NEW.notes
--    WHERE pk_entity = NEW.pk_entity
--    RETURNING pk_entity,lower(sys_period) as tmsp
--  )
--  UPDATE information.entity_project_rel
--  SET
--  is_in_project = NEW.is_in_project,
--  is_standard_in_project = NEW.is_standard_in_project,
--  is_in_project_true_tmsp = (
--    SELECT tmsp
--    FROM update_peit
--  )
--  WHERE fk_entity = NEW.pk_entity AND fk_project = NEW.fk_project;
--  ELSE
--  UPDATE information.entity_project_rel
--  SET
--  is_in_project = NEW.is_in_project,
--  is_standard_in_project = NEW.is_standard_in_project
--  WHERE fk_entity = NEW.pk_entity AND fk_project = NEW.fk_project;
--  END IF;
--
--  RETURN NEW;
--  END;
--  $BODY$
--
--  LANGUAGE plpgsql VOLATILE
--  COST 100;
--
--  --CREATE UPDATE TRIGGER
--  CREATE TRIGGER on_update
--  INSTEAD OF UPDATE
--  ON information.v_project_persistent_item
--  FOR EACH ROW
--  EXECUTE PROCEDURE information.v_project_persistent_item_update();
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
--  DROP TRIGGER IF EXISTS on_update ON information.v_project_persistent_item;
--  DROP TRIGGER IF EXISTS on_insert ON information.v_project_persistent_item;
--  DROP FUNCTION IF EXISTS information.v_project_persistent_item_update();
--  DROP FUNCTION IF EXISTS information.v_project_persistent_item_insert();
--  DROP VIEW IF EXISTS information.v_project_persistent_item;
  `
  db.runSql(sql, callback)
};
exports._meta = {
  "version": 1
};
