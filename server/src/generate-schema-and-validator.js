/* eslint-disable max-len */
'use strict';
const compileFromFile = require('json-schema-to-typescript').compileFromFile;
const path = require('path');
const fs = require('fs');
const pascalcase = require('pascalcase');
const TJS = require('typescript-json-schema');

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

fromDir(__dirname, /.interface\.ts$/, function(hit) {
  const interfaceName = pascalcase(hit.filenamerest);
  console.log('-- found: ', interfaceName);

  /**
   * generates schema
   */
  const basePath = hit.startPath;
  const compilerOptions = {
    strictNullChecks: true,
  };
  const settings = {
    titles: true,
    topRef: true,
    required: true,
  };
  const program = TJS.getProgramFromFiles(
    [path.resolve(hit.filepath)],
    compilerOptions,
    basePath
  );
  const schema = TJS.generateSchema(program, interfaceName, settings);
  if (!schema) {
    throw new Error(`error when creating schema for ${interfaceName}`);
  }
  fs.writeFileSync(
    path.join(hit.startPath, hit.filenamerest + '.schema.json'),
    JSON.stringify(schema, null, 2)
  );
  console.log('created schema for ', interfaceName);

  /**
   * generates validator
   */
  const validatorScript = `
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { ${interfaceName} } from './${hit.filenamerest}.interface.js';
  import schema from './${hit.filenamerest}.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValid${interfaceName}(candidate: any): {
    validObj?: ${interfaceName},
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else {
      return { error: validate.errors }
    }
  }

   `;
  fs.writeFileSync(
    path.join(hit.startPath, hit.filenamerest + '.validator.ts'),
    validatorScript
  );
  console.log('created validator for ', interfaceName);
});
