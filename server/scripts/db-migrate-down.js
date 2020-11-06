const exec = require('child_process').exec;
const path = require('path');
const script = path.join(__dirname, '../db-migrate/down.sh');
const myShellScript = exec(`sh ${script} ${process.argv.slice(2).join(' ')}`);
myShellScript.stdout.on('data', data => console.log(data));
myShellScript.stderr.on('data', data => console.error(data));
