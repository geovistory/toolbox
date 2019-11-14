
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { TableInput } from './table-input.interface.js';
  import schema from './table-input.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTableInput(candidate: any): {
    validObj?: TableInput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else {
      return { error: validate.errors }
    }
  }

   