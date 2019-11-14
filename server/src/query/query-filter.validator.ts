
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { QueryFilter } from './query-filter.interface.js';
  import schema from './query-filter.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidQueryFilter(candidate: any): {
    validObj?: QueryFilter,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   