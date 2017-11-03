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

  const francescoSeedProject = [
    'Terrance Vanderveer',
    'Aimee Younan',
    'Serafina Janes',
    'Melody Goss',
    'Jarred Breunig',
    'Doreatha Zollinger',
    'Eartha Steuck',
    'Vella Farber',
    'Ria Wagar',
    'Karry Streich',
    'Ronni Guilbault',
    'Dulcie More',
    'Ozella Hershberger',
    'Patrick Minnix',
    'Yuonne Witte',
    'Sona Findley',
    'Christene Vermillion',
    'Ellis Corl',
    'Josefine Degraffenreid',
    'Alpha Lembo',
    'Marion Walther',
    'Jetta Vercher',
    'Karon Keck',
    'Anja Sciacca',
    'Derrick Cardin',
    'Sunday Boice',
    'Merna Parcell',
    'Donella Vandyke',
    'Kerrie Harshaw',
    'Arielle Jurgensen',
    'Allene Deppen',
    'Gus Mejorado',
    'Ivelisse Leaton',
    'Laverna Spigner',
    'Nadia Manns',
    'Willian Dantin',
    'Joelle Surber',
    'Mui Policastro',
    'Terisa Grajeda',
    'Chrystal Tylor',
    'Joan Mable',
    'Kayla Battiste',
    'Arden Grado',
    'Agnes Gambill',
    'Jess Gilstrap',
    'Dominica Metro',
    'Martina Cybulski',
    'Oliver Kempker',
    'Trent Echavarria',
    'Lacie Simon'
  ]

  const jonasSeedProject = [
    'Kattie Ronquillo',
    'Evita Quinonez',
    'Stacee Manos',
    'Lennie Doyle',
    'Marty Sleeth',
    'Lavonna Ocegueda',
    'Lezlie Heffernan',
    'James Noonkester',
    'Wilton Orlandi',
    'Jerrold Harvison',
    'Ladonna Norgard',
    'Era Hsieh',
    'Dannie Barringer',
    'Cheryl Arn',
    'Almeta Dipaola',
    'Orval Spain',
    'Alfred Skaggs',
    'Stephen Lance',
    'Darby Mcclay',
    'Pinkie Lape',
    'Darci Poarch',
    'Dee Teems',
    'Isabell Fraire',
    'Narcisa Riggs',
    'Sheri Mattews',
    'Kris Youngren',
    'Selina Mazurek',
    'Shirly Leiter',
    'Tamara Pugsley',
    'Yuko Runge',
    'Lucrecia Greenway',
    'Lenny Iser',
    'Mercy Marengo',
    'Dina Vargas',
    'Kathi Parish',
    'Jenise Morning',
    'Jocelyn Quach',
    'Kathie Bashaw',
    'Darrell Dirks',
    'Wilmer Collett',
    'Mai Mayes',
    'Filiberto Ress',
    'Kristopher Caicedo',
    'Sandy Painter',
    'Mose Holyfield',
    'Robert Curd',
    'Eleonor Eger',
    'Arlene Grossi',
    'Delisa Townsel',
    'Cheyenne Mends'
  ]

  const davidSeedProject = [
    'Terrance Vanderveer',
    'Aimee Younan',
    'Serafina Janes',
    'Melody Goss',
    'Jarred Breunig',
    'Doreatha Zollinger',
    'Eartha Steuck',
    'Vella Farber',
    'Ria Wagar',
    'Karry Streich',
    'Ronni Guilbault',
    'Dulcie More',
    'Ozella Hershberger',
    'Patrick Minnix',
    'Yuonne Witte',
    'Sona Findley',
    'Christene Vermillion',
    'Ellis Corl',
    'Josefine Degraffenreid',
    'Alpha Lembo',
    'Marion Walther',
    'Jetta Vercher',
    'Karon Keck',
    'Anja Sciacca',
    'Derrick Cardin',
    'Sunday Boice',
    'Merna Parcell',
    'Donella Vandyke',
    'Kerrie Harshaw',
    'Arielle Jurgensen',
    'Allene Deppen',
    'Gus Mejorado',
    'Ivelisse Leaton',
    'Laverna Spigner',
    'Nadia Manns',
    'Willian Dantin',
    'Joelle Surber',
    'Mui Policastro',
    'Terisa Grajeda',
    'Chrystal Tylor',
    'Joan Mable',
    'Kayla Battiste',
    'Arden Grado',
    'Agnes Gambill',
    'Jess Gilstrap',
    'Dominica Metro',
    'Martina Cybulski',
    'Oliver Kempker',
    'Trent Echavarria',
    'Lacie Simon'
  ]


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
      RETURNING pk_entity
    ),

    -- add person to Seed Project
    add_to_project_1 AS (

      INSERT INTO information.entity_project_rel (fk_project, fk_entity, is_in_project)
      VALUES
      (
        (
          SELECT pk_project
          FROM commons.project AS p
          WHERE p.notes = '` + seedProject + `'
        ),
        (
          SELECT pk_entity
          FROM insert_persistent_item
        ),
        true
      )
      ON CONFLICT DO NOTHING
    ),

    -- add an Appellation Usage
    insert_appe_usage AS (
      INSERT INTO information.temporal_entity (fk_class, notes)
      SELECT pk_class, notes
      FROM data_for_history.class AS c
      WHERE c.pk_class = 'F52' -- Name Use Activity
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
          WHERE pk_property = 'R63' -- Named
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
          WHERE pk_property = 'R64' -- Used Named
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
          WHERE pk_property = 'R61'
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
      SELECT pk_class, notes
      FROM data_for_history.class AS c
      WHERE c.pk_class = 'F52' -- Name Use Activity
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
          WHERE pk_property = 'R63' -- Named
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
          WHERE pk_property = 'R64' -- Used Named
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

  for (var i = 0; i < francescoSeedProject.length; i++) {
    const names = francescoSeedProject[i].split(' ');
    const firstname = names[0];
    const lastname = names[1];
    sqlArray.push(getInsertStatement(firstname, lastname, 'Francesco Seed Project'));
  }

  for (var i = 0; i < jonasSeedProject.length; i++) {
    const names = jonasSeedProject[i].split(' ');
    const firstname = names[0];
    const lastname = names[1];
    sqlArray.push(getInsertStatement(firstname, lastname, 'Jonas Seed Project'));
  }


  for (var i = 0; i < davidSeedProject.length; i++) {
    const names = davidSeedProject[i].split(' ');
    const firstname = names[0];
    const lastname = names[1];
    sqlArray.push(getInsertStatement(firstname, lastname, 'David Seed Project'));
  }

  const sql = sqlArray.join('')
  console.log(`Sample insert statement
    ` + getInsertStatement(
      davidSeedProject[0].split(' ')[0],
      davidSeedProject[0].split(' ')[1],
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
    TRUNCATE information.entity_project_rel CASCADE;
    `;

    db.runSql(sql, callback);
  };

  exports._meta = {
    "version": 1
  };
