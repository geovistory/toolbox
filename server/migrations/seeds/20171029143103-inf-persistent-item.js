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

  let sqlArray = [];

  const getInsertStatement = function (firstname, lastname, seedProject){
    return `
    -- insert a new person

    WITH insert_persistent_item AS (
      INSERT INTO information.persistent_item (fk_class, notes)
      VALUES
      (
        'E21', -- Person
        '` + firstname + ' ' + lastname + `'
      )
      ON CONFLICT DO NOTHING
      RETURNING pk_entity, entity_version
    ),

    -- add person to Seed Project
    add_to_project_1 AS (

      INSERT INTO information.entity_version_project_rel (fk_project, fk_entity_version_concat, is_in_project)
      VALUES
      (
        (
          SELECT pk_project
          FROM commons.project AS p
          WHERE p.notes = '` + seedProject + `'
        ),
        (
          SELECT concat(pk_entity || '_' || entity_version)
          FROM insert_persistent_item
        ),
        true
      )
      ON CONFLICT DO NOTHING
    ),

    -- add an Appellation Usage
    insert_appe_usage AS (
      INSERT INTO information.temporal_entity (fk_class, notes)
      SELECT data_for_history_id, notes
      FROM data_for_history.class AS c
      WHERE c.data_for_history_id = 'F52' -- Name Use Activity
      ON CONFLICT DO NOTHING
      RETURNING  pk_temporal_entity
    ),

    -- relate Person with Appellation Usage
    insert_role_1 AS (
      INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
      VALUES
      (
        'R63', -- Named
        (
          SELECT notes
          FROM data_for_history.property
          WHERE data_for_history_id = 'R63' -- Named
        ),
        (
          SELECT pk_entity
          FROM insert_persistent_item
        ),
        (
          SELECT pk_temporal_entity
          FROM insert_appe_usage
        )
      )
      ON CONFLICT DO NOTHING
      RETURNING  pk_entity, entity_version
    ),
    -- add the role to seed project as standard appellation of this person
    add_to_project_as_standard_1 AS (
      INSERT INTO information.entity_version_project_rel (fk_project, fk_entity_version_concat, is_in_project, is_standard_in_project)
      VALUES
      (
        (
          SELECT pk_project
          FROM commons.project AS p
          WHERE p.notes = '` + seedProject + `'
        ),
        (
          SELECT concat(pk_entity || '_' || entity_version)
          FROM insert_role_1
        ),
        true,
        true
      )
      ON CONFLICT DO NOTHING
    ),
    -- add an Appellation
    insert_appe AS (
      INSERT INTO information.appellation (fk_class, appellation_label)
      VALUES
      (
        'E82', -- Actor Appellation
        (
          SELECT '{"latestTokenId":4,"tokens":[{"id":0,"string":"` + firstname + `","typeId":1,"isSeparator":false},{"id":1,"string":" ","isSeparator":true},{"id":2,"string":"` + lastname + `","typeId":3,"isSeparator":false}]}'::jsonb
        )
      )
      ON CONFLICT DO NOTHING
      RETURNING  pk_entity
    ),

    -- relate Appellation with Appellation Usage
    insert_role_2 AS (
      INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
      VALUES
      (
        'R64', -- Used Named
        (
          SELECT notes
          FROM data_for_history.property
          WHERE data_for_history_id = 'R64' -- Used Named
        ),
        (
          SELECT pk_entity
          FROM insert_appe
        ),
        (
          SELECT pk_temporal_entity
          FROM insert_appe_usage
        )
      )
      ON CONFLICT DO NOTHING
    ),

    -- relate Appellation Usage with Language
    insert_role_3 AS (
      INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
      VALUES
      (
        'R61', -- Occured in Kind of context
        (
          SELECT notes
          FROM data_for_history.property
          WHERE data_for_history_id = 'R61'
        ),
        (
          SELECT pk_entity
          FROM information.language
          WHERE pk_language = 'deu' -- German
        ),
        (
          SELECT pk_temporal_entity
          FROM insert_appe_usage
        )
      )
      ON CONFLICT DO NOTHING
    ),

    -- add an Appellation Usage 2
    insert_appe_usage_2 AS (
      INSERT INTO information.temporal_entity (fk_class, notes)
      SELECT data_for_history_id, notes
      FROM data_for_history.class AS c
      WHERE c.data_for_history_id = 'F52' -- Name Use Activity
      ON CONFLICT DO NOTHING
      RETURNING  pk_temporal_entity
    ),

    -- relate Person with Appellation Usage
    insert_role_4 AS (
      INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
      VALUES
      (
        'R63', -- Named
        (
          SELECT notes
          FROM data_for_history.property
          WHERE data_for_history_id = 'R63' -- Named
        ),
        (
          SELECT pk_entity
          FROM insert_persistent_item
        ),
        (
          SELECT pk_temporal_entity
          FROM insert_appe_usage_2
        )
      )
      ON CONFLICT DO NOTHING
      RETURNING  pk_entity, entity_version
    ),
    -- add the role to seed project as standard appellation of this person
    add_to_project_as_standard_2 AS (
      INSERT INTO information.entity_version_project_rel (fk_project, fk_entity_version_concat, is_in_project, is_standard_in_project)
      VALUES
      (
        (
          SELECT pk_project
          FROM commons.project AS p
          WHERE p.notes = '` + seedProject + `'
        ),
        (
          SELECT concat(pk_entity || '_' || entity_version)
          FROM insert_role_4
        ),
        true,
        false
      )
      ON CONFLICT DO NOTHING
    ),
    -- add an Appellation
    insert_appe_2 AS (
      INSERT INTO information.appellation (fk_class, appellation_label)
      VALUES
      (
        'E82', -- Actor Appellation
        (
          SELECT '{"latestTokenId":4,"tokens":[{"id":0,"string":"` + firstname + `s","typeId":1,"isSeparator":false},{"id":1,"string":" ","isSeparator":true},{"id":2,"string":"` + lastname + `s","typeId":3,"isSeparator":false}]}'::jsonb
        )
      )
      ON CONFLICT DO NOTHING
      RETURNING  pk_entity
    ),

    -- relate Appellation with Appellation Usage
    insert_role_5 AS (
      INSERT INTO information."role" (fk_property, notes, fk_entity, fk_temporal_entity)
      VALUES
      (
        'R64', -- Used Named
        (
          SELECT notes
          FROM data_for_history.property
          WHERE data_for_history_id = 'R64' -- Used Named
        ),
        (
          SELECT pk_entity
          FROM insert_appe_2
        ),
        (
          SELECT pk_temporal_entity
          FROM insert_appe_usage_2
        )
      )
      ON CONFLICT DO NOTHING
    )
    Select true as success;
    `
  }

  for (var i = 0; i < 3; i++) {
    faker.locale = "fr";

    sqlArray.push(getInsertStatement(
      faker.name.firstName(),
      faker.name.lastName(),
      'Francesco Seed Project'
    ));
  }

  for (var i = 0; i < 2; i++) {
    faker.locale = "de_CH";

    sqlArray.push(getInsertStatement(
      faker.name.firstName(),
      faker.name.lastName(),
      'Jonas Seed Project'
    ));
  }


  for (var i = 0; i < 2; i++) {
    faker.locale = "de_CH";

    sqlArray.push(getInsertStatement(
      faker.name.firstName(),
      faker.name.lastName(),
      'David Seed Project'
    ));
  }


  const sql = sqlArray.join('')
  console.log(`Sample insert statement
    ` + getInsertStatement(
      faker.name.firstName(),
      faker.name.lastName(),
      'David Seed Project')
    )
    console.log('Try to insert persistent items: ' + sqlArray.length);

    db.runSql(sql, callback);

  };

  exports.down = function(db, callback) {
    const sql = `
    TRUNCATE information.persistent_item CASCADE;
    TRUNCATE information.role CASCADE;
    TRUNCATE information.appellation CASCADE;
    TRUNCATE information.temporal_entity CASCADE;
    TRUNCATE information.entity_version_project_rel CASCADE;


    TRUNCATE information.persistent_item_vt CASCADE;
    TRUNCATE information.role_vt CASCADE;
    TRUNCATE information.appellation_vt CASCADE;
    TRUNCATE information.temporal_entity_vt CASCADE;
    TRUNCATE information.entity_version_project_rel CASCADE;
    `;

    db.runSql(sql, callback);
  };

  exports._meta = {
    "version": 1
  };
