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

  const seedProject = 'Jonas Seed Project';

  const sql = `
    WITH insert_time_primitive AS (
      INSERT INTO information.time_primitive (begin, duration, fk_class)
      VALUES
        ('J1971231'::timestamp, '1 day', 335)
        ON CONFLICT DO NOTHING
        RETURNING pk_entity, entity_version
    ),
    -- relate with a birth (temporal entity)
    insert_role AS (
      INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
      VALUES
      (
        72, -- At some time within
        'At some time within',
        (
          SELECT pk_entity
          FROM insert_time_primitive
        ),
        (
          SELECT pk_entity
          FROM information.temporal_entity
          WHERE notes = 'TestBirth'
        )
      )
      ON CONFLICT DO NOTHING
      RETURNING  pk_entity, entity_version
    ),
    -- add the role and the time primitive to the seed project
    add_entities_to_seed_project AS (
      INSERT INTO information.entity_version_project_rel (fk_project, fk_entity_version_concat, is_in_project, is_standard_in_project)
      VALUES
      (
        (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
        (SELECT concat(pk_entity || '_' || entity_version) FROM insert_role),
        true,
        null
      ),
      (
        (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
        (SELECT concat(pk_entity || '_' || entity_version) FROM insert_time_primitive),
        true,
        null
      )
      ON CONFLICT DO NOTHING
    )
    Select true as success;
  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  TRUNCATE information.time_primitive CASCADE;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
