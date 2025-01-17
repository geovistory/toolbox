'use strict';
var faker = require('faker');

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
  var faker = require('faker');

  const firstname = faker.name.firstName();
  const lastname = 'Tobler';
  const seedProject = 'Jonas Seed Project';

  const sql = `
  -- insert a new person

  WITH insert_persistent_item AS (
    INSERT INTO information.persistent_item (fk_class, notes)
    VALUES
    (
      1, -- Person
      '` + firstname + ' ' + lastname + `'
    )
    ON CONFLICT DO NOTHING
    RETURNING pk_entity, entity_version
  ),

  -- add an Birth
  insert_birth AS (
    INSERT INTO information.temporal_entity (fk_class, notes)
    VALUES (
      (

        SELECT dfh_pk_class
        FROM data_for_history.class AS c
        WHERE c.dfh_pk_class = 5 -- Birth
      ),
      'TestBirth'
    )
    ON CONFLICT DO NOTHING
    RETURNING  pk_temporal_entity, pk_entity, entity_version
  ),

  -- relate Person with Birth
  insert_role_4 AS (
    INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
    VALUES
    (
      6, -- Brought into life
      (
        SELECT notes
        FROM data_for_history.property
        WHERE dfh_pk_property = 6 -- Brought into life
      ),
      (
        SELECT pk_entity
        FROM insert_persistent_item
      ),
      (
        SELECT pk_entity
        FROM insert_birth
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING  pk_entity, entity_version
  ),
  -- select an random Person
  select_person AS (
    SELECT pk_entity, entity_version
    FROM information.v_persistent_item_version
    WHERE fk_class = 1 -- Person
    AND pk_entity = 50450
    LIMIT 1
  ),
  -- relate Random Person in the role of the Mother with Birth
  insert_role_5 AS (
    INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
    VALUES
    (
      4, -- By Mother
      (
        SELECT notes
        FROM data_for_history.property
        WHERE dfh_pk_property = 4 -- By Mother
      ),
      (
        SELECT pk_entity
        FROM select_person
      ),
      (
        SELECT pk_entity
        FROM insert_birth
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING pk_entity, entity_version
  ),
  -- add an Appellation Usage
  insert_appe_usage AS (
    INSERT INTO information.temporal_entity (fk_class, notes)
    SELECT dfh_pk_class, notes
    FROM data_for_history.class AS c
    WHERE c.dfh_pk_class = 3 -- Name Use Activity
    ON CONFLICT DO NOTHING
    RETURNING  pk_temporal_entity, pk_entity, entity_version
  ),

  -- relate Person with Appellation Usage
  insert_role_1 AS (
    INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
    VALUES
    (
      1, -- Named
      (
        SELECT notes
        FROM data_for_history.property
        WHERE dfh_pk_property = 1 -- Named
      ),
      (
        SELECT pk_entity
        FROM insert_persistent_item
      ),
      (
        SELECT pk_entity
        FROM insert_appe_usage
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING  pk_entity, entity_version
  ),

  -- add an Appellation
  insert_appe AS (
    INSERT INTO information.appellation (fk_class, appellation_label)
    VALUES
    (
      2, -- Actor Appellation
      (
        SELECT '{"latestTokenId":4,"tokens":[{"id":0,"string":"` + firstname + `","typeId":1,"isSeparator":false},{"id":1,"string":" ","isSeparator":true},{"id":2,"string":"` + lastname + `","typeId":3,"isSeparator":false}]}'::jsonb
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING  pk_entity, entity_version
  ),

  -- relate Appellation with Appellation Usage
  insert_role_2 AS (
    INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
    VALUES
    (
      2, -- Used Named
      (
        SELECT notes
        FROM data_for_history.property
        WHERE dfh_pk_property = 2 -- Used Named
      ),
      (
        SELECT pk_entity
        FROM insert_appe
      ),
      (
        SELECT pk_entity
        FROM insert_appe_usage
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING pk_entity, entity_version
  ),

  -- relate Appellation Usage with Language
  insert_role_3 AS (
    INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
    VALUES
    (
      3, -- Occured in Kind of context
      (
        SELECT notes
        FROM data_for_history.property
        WHERE dfh_pk_property = 3
      ),
      (
        SELECT pk_entity
        FROM information.language
        WHERE pk_language = 'deu' -- German
      ),
      (
        SELECT pk_entity
        FROM insert_appe_usage
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING pk_entity, entity_version
  ),

  -- add all the entities to the seed project
  add_entities_to_seed_project AS (
    INSERT INTO information.entity_version_project_rel (fk_project, fk_entity_version_concat, is_in_project, is_standard_in_project)
    VALUES
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_persistent_item),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_appe_usage),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_role_1),
      true,
      true
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_appe),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_role_2),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_role_3),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_role_4),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_role_5),
      true,
      null
    ),
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (SELECT concat(pk_entity || '_' || entity_version) FROM insert_birth),
      true,
      null
    ),
    -- Also add the language to the project
    (
      (SELECT pk_project FROM commons.project AS p  WHERE p.notes = '` + seedProject + `'),
      (
        SELECT pk_entity_version_concat
        FROM information.v_language_version
        WHERE pk_language = 'deu' -- German
      ),
      true,
      null
    )
    ON CONFLICT DO NOTHING
  )

  Select true as success;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `

  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
