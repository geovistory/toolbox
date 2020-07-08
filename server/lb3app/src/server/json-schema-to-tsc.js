'use strict';
const compileFromFile = require('json-schema-to-typescript').compileFromFile;
const path = require('path');
const fs = require('fs');
const pascalcase = require('pascalcase');

function fromDir(startPath, filter, callback) {
  // console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var filepath = path.join(startPath, filename);
    var stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      fromDir(filepath, filter, callback); // recurse
    } else if (filter.test(filepath))
      callback({
        filepath,
        startPath,
        filename,
        filenamerest: filename.replace(filter, ''),
        filter,
      });
  }
}

fromDir(__dirname, /.schema\.json$/, function(hit) {
  console.log('-- found: ', hit);

  /**
   * generates interface
   */
  async function generate() {
    const filePromise = compileFromFile(path.join(hit.filepath));
    fs.writeFileSync(
      path.join(hit.startPath, hit.filenamerest + '.interface.ts'),
      await filePromise
    );
    filePromise.catch(err =>
      console.error(`error when compiling ${hit.filenamerest}`, err)
    );
  }
  generate();

  /**
   * generates validator
   */
  const interfaceName = pascalcase(hit.filenamerest);
  const validatorScript = `
   import Ajv = require('ajv');
   import { ${interfaceName} } from './${hit.filenamerest}.interface';
   const ajv = new Ajv();
   declare function require(name: string);

   // Compile the JSON schema into a validation function
   const statusSchema = ajv.compile(require('./${hit.filename}'));
   export function isValid${interfaceName}(candidate: any): candidate is ${interfaceName} {
     return statusSchema(candidate) === true;
   }
   `;
  fs.writeFileSync(
    path.join(hit.startPath, hit.filenamerest + '.validator.ts'),
    validatorScript
  );
});
