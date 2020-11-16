module.exports = {
  /**
   * executes a shell script file an outputs the stdout/stderr
   *
   * @param {*} scriptPath Path to file, relative (!) to the directory of __execShell.js
   */
  fromFile: scriptPath => {
    const exec = require('child_process').exec;
    const path = require('path');
    const script = path.join(__dirname, scriptPath);
    const myShellScript = exec(
      `sh ${script} ${process.argv.slice(2).join(' ')}`,
    );
    myShellScript.stdout.on('data', data => console.log(data));
    myShellScript.stderr.on('data', data => console.error(data));
  },
  /**
   * executes a shell script file an outputs the stdout/stderr
   *
   * @param {*} script script to execute
   */
  fromScript: script => {
    return new Promise((res, rej) => {
      const exec = require('child_process').exec;
      const myShellScript = exec(
        `${script} ${process.argv.slice(2).join(' ')}`,
      );
      myShellScript.stdout.on('data', data => console.log(data));
      myShellScript.stderr.on('data', data => {
        console.log(data);
      });
      myShellScript.on('close', code => {
        if (code === 0) res();
        else rej()
      });
    });
  },
};
