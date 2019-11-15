
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { TimeChartContInput } from '../interfaces/time-chart-cont-input.interface.js';
  import schema from '../schemas/time-chart-cont-input.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTimeChartContInput(candidate: any): {
    validObj?: TimeChartContInput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   