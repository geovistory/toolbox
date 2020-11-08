/**
 * executes a shell script an outputs the stdout/stderr
 *
 * @param {*} scriptPath Path to file, relative (!) to the directory of __execShell.js
 */
function execShell(scriptPath) {
  const exec = require('child_process').exec;
  const path = require('path');
  const script = path.join(__dirname, scriptPath);
  const myShellScript = exec(`sh ${script} ${process.argv.slice(2).join(' ')}`);
  myShellScript.stdout.on('data', data => console.log(data));
  myShellScript.stderr.on('data', data => console.error(data));
}

module.exports = execShell;
