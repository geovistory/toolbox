var path = require('path');
var exec = require('child_process').exec;
var database_url = process.argv[2];
var basePath = process.argv[3]

const dirPath = path.resolve(basePath) + "/droppingConstraints.sql";


var cmd = `psql ${database_url} -c "\\copy (SELECT 'ALTER TABLE '||nspname||'.\\"'||relname||'\\" DROP CONSTRAINT \\"'||conname||'\\";' \
          FROM pg_constraint \
          INNER JOIN pg_class ON conrelid=pg_class.oid \
          INNER JOIN pg_namespace ON pg_namespace.oid=pg_class.relnamespace \
          ORDER BY CASE WHEN contype='f' THEN 0 ELSE 1 END,contype,nspname,relname,conname) to '${dirPath}';" `;
// cmd = `psql ${database_url} -c "\\copy data.digital to '${dirPath}'
// WITH DELIMITER ',' CSV HEADER;"; `;

var dropConstraintsSqls = exec(cmd, function (err, stdout, stderr) {
  if (err) {
    console.log(err);
    process.exit();
  }
  console.log(stdout);
});

dropConstraintsSqls.on('exit', function (code) {
  console.log('Succes: ',code);

  process.exit();
});
