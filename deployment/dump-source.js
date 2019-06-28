#! /usr/bin/env node
const Promise = require('bluebird');
var exec = require('child_process').exec;
var pg = require('pg');

var path = require('path');
var fs = require('fs-extra');

var hrstart = process.hrtime()

var database_url = process.argv[2];
var basePath = process.argv[3]

const dirPath = path.resolve(basePath) + "tmp/data_dump/";

// ensure the folder exists
fs.ensureDir(dirPath);

// empty folder
fs.emptyDir(dirPath);

const client = new pg.Client({
  connectionString: database_url,
  ssl: true,
});

client.connect();

function createSqlFile(dirPath, tableName) {
  return new Promise(function (resolve, reject) {

    var outfile = dirPath + tableName;
    var cmd = `psql ${database_url} -c "\\copy ${tableName} to '${outfile}' WITH DELIMITER ',' CSV HEADER;"; `;
    var copy = exec(cmd, function (err, stdout, stderr) {
      if (err) {
        reject(err)
        console.log(err);
      }
      // console.log(stdout);
    });

    copy.on('exit', function (code) {
      resolve(code)
    });

  })
}

// createSqlFile(dirPath, 'information.chunk')


client.query(`
SELECT * FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
AND table_schema !~* 'information_schema|pg_catalog|topology|importer_dbpedia|importer'
ORDER BY table_schema, table_type, table_name
`, function (err, result) {
    if (err) {
      console.log(err);
    } else {


      console.log(`Creating ${result.rows.length} sql files......`);
      const promises = []

      let i = 0;

      loop = () => {

        const schemaTableName = result.rows[i].table_schema + '.' + result.rows[i].table_name;

        var hrFileStart = process.hrtime()

        createSqlFile(dirPath, schemaTableName).then(success => {
          var hrFileEnd = process.hrtime(hrFileStart);
          console.log(`Downloaded #${i + 1} of ${result.rows.length} tables: ${schemaTableName} after %ds %dms`, hrFileEnd[0], parseInt(hrFileEnd[1] / 1000000))

          i++;
          if (i < result.rows.length) {
            loop()
          } else {
            var hrend = process.hrtime(hrstart);
            console.info('Execution time: %ds %dms', hrend[0], parseInt(hrend[1] / 1000000))
            process.exit();
          }

        })

      }

      loop()

    }
  });

