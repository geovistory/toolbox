// 'use strict';
// const { spawn } = require('child_process');

// module.exports = function (app, cb) {

//   // activates the python shell (according to Pipfile)
//   const pipenv = spawn('pipenv', ['shell'])

//   // Prints some python info to console
//   const pipenvVersion = spawn('python', ['-V'])
//   pipenvVersion.stdout.on('data', (data) => {
//     console.log('*********** Python Info **************')
//     console.log('');
//     console.log('Using Python ' + data.toString());
//     console.log('Installed Python packages:')
//   });
//   const pipenvGraph = spawn('pipenv', ['graph'])
//   pipenvGraph.stdout.on('data', (data) => {
//     console.log(data.toString());
//   });

//   process.nextTick(cb);

// };

// Testing
