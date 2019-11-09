
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { TimeChartContInput } from './time-chart-cont-input.interface.js';
  import schema from './time-chart-cont-input.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTimeChartContInput(candidate: any): {
    validObj?: TimeChartContInput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else {
      return { error: validate.errors }
    }
  }

   