#! /usr/bin/env node
const Promise = require('bluebird');
var pg = require('pg');
var QueryStream = require('pg-query-stream')

var path = require('path');
var fs = require('fs-extra');

var hrstart = process.hrtime()

var database_url = process.argv[2];
var basePath = process.argv[3]

const dirPath = path.resolve(basePath) + "/data_dump/";

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
		var ws = fs.createWriteStream(outfile);

		var query = new QueryStream(`SELECT * FROM ${tableName}`, [], {batchSize: 10000})
		var queryStream = client.query(query);

		ws.write(`
		BEGIN;
		ALTER TABLE ${tableName} DISABLE TRIGGER USER;`);

		var isFirstRow = true;
		queryStream.on('data', function (row) {

			const values = []
			for (const col in row) {
				if (row.hasOwnProperty(col)) {
					var val = row[col];

					if (val === null) {
						// stringify the value
						val = JSON.stringify(val)
					}
					else if (typeof val === 'string') {
						// escape single quotes
						val = val.split("'").join("''");
						// wrap in single quotes
						val = "'" + val + "'";
					}
					else if (typeof val === 'object') {
						// stringify the value
						val = JSON.stringify(val)

						if (val[0] === '"' && val[val.length - 1] === '"') {
							// remove wrapping double quotes
							val = val.slice(1, -1);
						}

						// escape single quotes
						val = val.split("'").join("''");

						// wrapp in single quotes instead
						val = "'" + val + "'";
					}

					values.push(val);
				}
			}

			if (isFirstRow) {

				ws.write(`			
				INSERT INTO ${tableName} (${Object.keys(row).join(',')})
				VALUES
			(${values.join(',')})`);

				isFirstRow = false;
			} else {
				ws.write(`,
			(${values.join(',')})`);
			}
		});

		queryStream.on('end', function (result) {
			ws.write(`;

			ALTER TABLE ${tableName} ENABLE TRIGGER USER;
			COMMIT;
			`);
			ws.end();

			resolve()
		});
	})
}

// createSqlFile(dirPath, 'information.chunk')


client.query(`
SELECT * FROM information_schema.tables 
WHERE table_type = 'BASE TABLE' 
AND table_schema !~* 'information_schema|pg_catalog|topology|importer_dbpedia' 
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

