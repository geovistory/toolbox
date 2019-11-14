
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { TableOutput } from './table-output.interface.js';
  import schema from './table-output.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTableOutput(candidate: any): {
    validObj?: TableOutput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else {
      return { error: validate.errors }
    }
  }

   