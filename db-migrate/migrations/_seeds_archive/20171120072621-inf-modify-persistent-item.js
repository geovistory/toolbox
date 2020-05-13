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
  -- Add a Persistent Item to another Project
  WITH insert_epr_1 AS (
    INSERT INTO information.entity_version_project_rel (fk_project, fk_entity_version_concat, is_in_project)
    VALUES
    (
      (
        SELECT pk_project
        FROM commons.project AS p
        WHERE p.notes = 'Jonas Seed Project'
      ),
      (
        SELECT pk_entity_version_concat
        FROM information.v_persistent_item_version pv
        INNER JOIN information.entity_version_project_rel AS epr ON
        epr.fk_entity_version_concat = concat(pv.pk_entity || '_' || pv.entity_version)
        WHERE epr.fk_project <> (
          SELECT pk_project
          FROM commons.project AS p
          WHERE p.notes = 'Jonas Seed Project'
        )
        AND pv.is_community_favorite = true
        LIMIT 1
      ),
      true
    )
    RETURNING fk_project, fk_entity_version_concat, pk_entity_version_project_rel
  ),

  -- Update the Persistent Item
  update_pi_1 AS (
    UPDATE information.persistent_item
    SET notes = 'updated' WHERE concat(pk_entity || '_' || entity_version) = (
      SELECT fk_entity_version_concat
      FROM insert_epr_1
    )
    RETURNING pk_entity, entity_version
  ),

  -- Update the new Entity Version Project Relation to have the new value
  add_new_version_to_project AS (
  	UPDATE information.entity_version_project_rel
      SET fk_entity_version_concat = (
          SELECT concat(pk_entity || '_' || entity_version)
          FROM update_pi_1
      )
      WHERE pk_entity_version_project_rel = (
          SELECT pk_entity_version_project_rel
          FROM insert_epr_1
      )
  )
  select pk_entity
  FROM update_pi_1

  `;



  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  TRUNCATE information.persistent_item CASCADE;
  TRUNCATE information.entity_version_project_rel CASCADE;

  TRUNCATE information.persistent_item_vt CASCADE;
  TRUNCATE information.entity_version_project_rel_vt CASCADE;
  `;

  db.runSql(sql, callback);
};


exports._meta = {
  "version": 1
};
