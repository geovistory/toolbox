#! /usr/bin/env node
const Promise = require('bluebird');
var pg = require('pg');
var exec = require('child_process').exec;
var DirectedGraph = require('../common/classes/DirectedGraph')

var path = require('path');
var fs = require('fs-extra');


var database_url = process.argv[2]
var basePath = process.argv[3]

var hrstart = process.hrtime()

const dirPath = path.resolve(basePath) + "/data_dump/";
const pgloaderPath = path.resolve(basePath) + "/pgloader/";

const client = new pg.Client({
  connectionString: database_url,
  // ssl: true,
});

client.connect();

function errorHandler(error) {
  console.error(error)
  process.exit();
}

// get a ordered list of table names needed for populating db in right order (no FK violations)
function getTableOrder() {
  return new Promise((resolve, reject) => {
    const tableNames = client.query(`
			SELECT (table_schema || '.' || table_name ) AS table_name FROM information_schema.tables
			WHERE table_type = 'BASE TABLE'
			AND table_schema !~* 'information_schema|pg_catalog|topology|importer_dbpedia'
			ORDER BY table_schema, table_type, table_name
		`)

    const dependencies = client.query(`
			SELECT DISTINCT (tc.table_schema || '.' || tc.table_name) as depends,
			(ccu.table_schema || '.' || ccu.table_name) AS on
			FROM information_schema.table_constraints tc
			LEFT JOIN information_schema.key_column_usage kcu
				ON tc.constraint_catalog = kcu.constraint_catalog
				AND tc.constraint_schema = kcu.constraint_schema
				AND tc.constraint_name = kcu.constraint_name
			LEFT JOIN information_schema.referential_constraints rc
				ON tc.constraint_catalog = rc.constraint_catalog
				AND tc.constraint_schema = rc.constraint_schema
				AND tc.constraint_name = rc.constraint_name
			LEFT JOIN information_schema.constraint_column_usage ccu
				ON rc.unique_constraint_catalog = ccu.constraint_catalog
				AND rc.unique_constraint_schema = ccu.constraint_schema
				AND rc.unique_constraint_name = ccu.constraint_name
			WHERE tc.constraint_type = 'FOREIGN KEY'
			AND tc.table_schema !~* 'information_schema|pg_catalog|topology|importer_dbpedia'
			AND ccu.table_schema !~* 'information_schema|pg_catalog|topology|importer_dbpedia'
			AND (tc.table_schema || '.' || tc.table_name)  <>  (ccu.table_schema || '.' || ccu.table_name)
			ORDER BY Depends
		`)

    Promise.all([tableNames, dependencies]).then(
      onSuccess => {
        const graph = new DirectedGraph();
        const tableNameRows = onSuccess[0].rows;
        const dependencyRows = onSuccess[1].rows;

        // add all table names as nodes to graph
        tableNameRows.forEach(row => {
          graph.addVertex(row.table_name);
        });

        // add dependencies as edges to graph
        dependencyRows.forEach(row => {
          graph.addDirectedEdge(row.depends, row.on);
        });

        const orderOfPopulation = graph.topologicalSorting();
        resolve(orderOfPopulation);
      }
    )
    .catch(err => {
      console.log(err)
    })

  })
}

function readFirstLine(path) {
  return new Promise(function (resolve, reject) {
    var rs = fs.createReadStream(path, { encoding: 'utf8' });
    var acc = '';
    var pos = 0;
    var index;
    rs
      .on('data', function (chunk) {
        index = chunk.indexOf('\n');
        acc += chunk;
        index !== -1 ? rs.close() : pos += chunk.length;
      })
      .on('close', function () {
        resolve(acc.slice(0, pos + index));
      })
      .on('error', function (err) {
        reject(err);
      })
  });
}

function readFile(filename, resolve, reject) {

  // Copy data from file to target table
  var filePath = dirPath + filename;

  readFirstLine(filePath)
    .then(firstLine => {
      // console.log(firstLine)
      var tableName = filename;
      var columns = firstLine; //firstLine.split(',').map(col => "'" + col + "'").join(',')

      var disableTriggersCmd = `psql ${database_url} -c "ALTER TABLE ${tableName} DISABLE TRIGGER USER;"`
      var copyDataCmd = `psql ${database_url} -c "\\copy ${tableName} (${columns}) from '${filePath}' WITH DELIMITER ',' CSV HEADER;"`;
      var enableTriggersCmd = `psql ${database_url} -c "ALTER TABLE ${tableName} ENABLE TRIGGER USER;"`

      var disableTriggers = exec(disableTriggersCmd, function (err, stdout, stderr) {
        if (err) {
          return reject(err)
          console.log(err);
        }
      });

      disableTriggers.on('exit', function (code) {

        var copyData = exec(copyDataCmd, function (err, stdout, stderr) {
          if (err) {
            reject(err)
            console.log(err);
          }
        });

        copyData.on('exit', function (code) {

          var enableTriggers = exec(enableTriggersCmd, function (err, stdout, stderr) {
            if (err) {
              reject(err)
              console.log(err);
            }
          });

          enableTriggers.on('exit', function (code) {
            resolve(code)
          });

        });

      });

    })
    .catch(err => reject(err))

  }

  function readFile2(filename, resolve, reject) {

    // Copy data from file to target table
    var filePath = dirPath + filename;
    var pgloaderFilePath = pgloaderPath + filename
    fs.outputFile(pgloaderFilePath, `
      LOAD CSV
        FROM '${filePath}'
        INTO ${database_url}?sslmode=prefer&${filename}

        WITH  truncate,
              csv header,
              drop indexes,
              disable triggers,
              fields optionally enclosed by '"',
              fields escaped by double-quote,
              fields terminated by ','

          SET work_mem to '12MB',
              standard_conforming_strings to 'on'
    ;`)
      .then(() => {
        exec(`pgloader --no-ssl-cert-verification --verbose ${pgloaderFilePath}`, function (err, stdout, stderr) {
          if (err) {
            return reject(err)
            console.log(err);
          }
          console.log(stdout);
          resolve(stdout)

        });
      })
      .catch(err => {
        reject(err)
      })


  }



function readFiles(dirPath) {

  fs.readdir(dirPath, function (err, filenames) {
    if (err) {
      errorHandler(err);
      return;
    }
    // truncate all tables first
    const truncateTables = client.query(filenames.map(filename => `TRUNCATE ${filename} CASCADE;`).join(''))

    // get a ordered list of table names needed for populating db in right order (no FK violations)
    const tableOrder = getTableOrder();


    Promise.all([truncateTables, tableOrder]).then(
      results => {

        // order filenames according to manually created list
        const tableNames = results[1];

        const promises = []

        let i = 0;
        const loopFilesSynchonously = () => {
          var hrFileStart = process.hrtime();
          const filename = tableNames[i];

          // Add all parent tables in this array. They need to be skipped because otherwise we have everything twice.
          if (
            [
              'commons.text', 'commons.text_vt', 'data.entity', 'data_for_history.entity', 'projects.entity', 'system.entity', 'information.entity'
            ].includes(filename)
          ) {
            console.log(`Skipping file #${i + 1} of ${tableNames.length}: ${filename}, because it is a parent table`)
            i++;
            loopFilesSynchonously()
          } else {
            console.log(`-------------------------------------------------------------------------------------`)
            console.log(`Inserting data of file #${i + 1} of ${tableNames.length}: \u{1b}[33m ${filename} \u{1b}[0m`)
            console.log(`-------------------------------------------------------------------------------------`)

            // call readfile
            readFile2(filename,
              onSuccess => {

                var hrFileEnd = process.hrtime(hrFileStart);
                console.log(`     \u{1b}[32m Done after %ds %dms \u{1b}[0m`, hrFileEnd[0], parseInt(hrFileEnd[1] / 1000000))

                // onSuccess increase index for next filename and call readfile
                i++;

                if (i === tableNames.length) {
                  var hrend = process.hrtime(hrstart);
                  console.info('\u{1b}[32m Total execution time: %ds %dms \u{1b}[0m', hrend[0], parseInt(hrend[1] / 1000000))
                  process.exit();
                } else {
                  loopFilesSynchonously();
                }
              },
              error => {
                errorHandler(`\u{1b}[31m Error on inerting of #${i + 1} of ${tableNames.length} files: ${filename}. Error: ${error} \u{1b}[0m`)
              })
          }

        };

        loopFilesSynchonously();
      },
      err => errorHandler(err)
    )


  });

}


readFiles(dirPath)
