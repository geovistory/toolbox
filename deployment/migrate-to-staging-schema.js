#! /usr/bin/env node
var pg = require('pg');
const exec = require('child_process').exec;

var db_source_url = process.argv[2]

const client = new pg.Client({
	connectionString: db_source_url,
	ssl: true,
});

client.connect();

function errorHandler(error) {
	console.log(error)
	process.exit();
}

const sql = `
SELECT name from  public.migrations
ORDER BY id DESC
LIMIT 1;`

client.query(sql, (err, res) => {
	if (err) {
		// console.log(err.stack)
		reject(err)
	} else {
		const latestMigration = res.rows[0].name;
		console.log(latestMigration);
		// const path = process.cwd()
		// const command = `${path}/node_modules/db-migrate/bin/db-migrate --config ${path}/server/migrate-db-config.json --migrations-dir ${path}/server/migrations up ` + latestMigration;
		// const testscript = exec(command);

		// testscript.stdout.on('data', function (data) {
		// 	// sendBackInfo();
		// });

		// testscript.stderr.on('data', function (data) {
		// 	// console.log(data);
		// 	// triggerErrorStuff(); 
		// });
		// console.log(res)
	}
});