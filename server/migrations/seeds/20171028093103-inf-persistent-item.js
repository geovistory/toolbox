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

  const pushInsertStatement = function (name, seedProject){
    sqlArray.push(`
      -- insert a new person

      WITH insert_persistent_item AS (
        INSERT INTO information.persistent_item (fk_class, notes)
        (
          SELECT pk_class, '` + name + `'
          FROM data_for_history.class AS dfh
          WHERE dfh.data_for_history_id = 'E21'
        )
        ON CONFLICT DO NOTHING
        RETURNING pk_entity
      )

      -- add person to Seed Project

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
      );

      `)
    }

    for (var i = 0; i < francescoSeedProject.length; i++) {
      pushInsertStatement(francescoSeedProject[i], 'Francesco Seed Project')
    }

    for (var i = 0; i < jonasSeedProject.length; i++) {
      pushInsertStatement(jonasSeedProject[i], 'Jonas Seed Project')
    }


    for (var i = 0; i < davidSeedProject.length; i++) {
      pushInsertStatement(jonasSeedProject[i], 'Jonas Seed Project')
    }

    const sql = sqlArray.join('')
    console.log('Inserted persistent items: ' + sqlArray.length);

    db.runSql(sql, callback);

  };

  exports.down = function(db, callback) {
    const sql = `
    TRUNCATE information.persistent_item CASCADE;

    TRUNCATE information.entity_project_rel CASCADE;
    `;

    db.runSql(sql, callback);
  };

  exports._meta = {
    "version": 1
  };
