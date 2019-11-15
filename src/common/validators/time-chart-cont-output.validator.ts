
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { TimeChartContOutput } from '../interfaces/time-chart-cont-output.interface.js';
  import schema from '../schemas/time-chart-cont-output.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTimeChartContOutput(candidate: any): {
    validObj?: TimeChartContOutput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   