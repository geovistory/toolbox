#! /usr/bin/env node
const Promise = require('bluebird');
var pg = require('pg');
var QueryStream = require('pg-query-stream')
var DirectedGraph = require('../common/classes/DirectedGraph')

var path = require('path');
var fs = require('fs-extra');


var database_url = process.argv[2]
var basePath = process.argv[3]

var hrstart = process.hrtime()

const dirPath = path.resolve(basePath) + "/data_dump/";

const client = new pg.Client({
	connectionString: database_url,
	ssl: true,
});

client.connect();

function errorHandler(error) {
	console.error(error)
	process.exit();
}

var fs = require('fs');

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

	})
}

function readFile(filename, onSuccess, onError) {

	// Do the query
	fs.readFile(dirPath + filename, 'utf-8', function (err, content) {
		if (err) {
			onError(err);
			return;
		}

		client.query(content, (err, res) => {
			if (err) {

				// onError call error cb
				onError(err)

			} else {

				// onSuccess call success cb
				onSuccess(res)
			}
		});

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
					// call readfile
					readFile(filename,
						onSuccess => {

							var hrFileEnd = process.hrtime(hrFileStart);
							console.log(`Inserted data of #${i + 1} of ${tableNames.length} files: ${filename} after %ds %dms`, hrFileEnd[0], parseInt(hrFileEnd[1] / 1000000))

							// onSuccess increase index for next filename and call readfile
							i++;

							if (i === tableNames.length) {
								var hrend = process.hrtime(hrstart);
								console.info('Execution time: %ds %dms', hrend[0], parseInt(hrend[1] / 1000000))
								process.exit();
							} else {
								loopFilesSynchonously();
							}
						},
						error => {
							errorHandler(`Error on execution of ${filename}: ${error}`)
						}
					)
				};

				loopFilesSynchonously();
			},
			err => errorHandler(err)
		)


	});

}


readFiles(dirPath)
