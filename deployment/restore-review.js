#! /usr/bin/env node
const Promise = require('bluebird');
var pg = require('pg');
var QueryStream = require('pg-query-stream')

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
	console.log(error)
	process.exit();
}

var fs = require('fs');

function readFiles(dirPath, onFileContent, onError) {
	fs.readdir(dirPath, function (err, filenames) {
		if (err) {
			onError(err);
			return;
		}
		//empty all tables first
		client.query(filenames.map(filename => `TRUNCATE ${filename} CASCADE;`).join(''), (err, res) => {
			if (err) {
				errorHandler(err.stack);
			} else {


				const promises = []

				filenames.forEach(function (filename, index) {
					const promise = new Promise(function (resolve, reject) {
						fs.readFile(dirPath + filename, 'utf-8', function (err, content) {
							if (err) {
								onError(err);
								return;
							}

							var hrFileStart = process.hrtime()

							onFileContent(filename, content).then(success => {
								var hrFileEnd = process.hrtime(hrFileStart);
								console.log(`Inserted data of #${index + 1} of ${filenames.length} files: ${filename} after %ds %dms`, hrFileEnd[0], hrFileEnd[1] / 1000000)
								resolve();
							},
								err => {
									console.error(`Error on execution of ${filename}: ${err}`)

									reject(err)
								});

						})
					});
					promises.push(promise)
				});

				Promise.all(promises).then(success => {
					var hrend = process.hrtime(hrstart);
					console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000)
					process.exit();
				},
					error => console.log(error)
				)

			}
		});

	});

}


readFiles(
	dirPath,
	(filename, content) => {
		return new Promise(function (resolve, reject) {
			client.query(content, (err, res) => {
				if (err) {
					console.log(err.stack)
					reject(err)
				} else {
					resolve(res)
				}
			});
		})
	},
	error => console.error(error)
)
