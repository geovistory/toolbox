
  import Ajv = require('ajv');
  const ajv = new Ajv();
  import { TimeChartContQueryRes } from './time-chart-cont-query-res.interface.js';
  import schema from './time-chart-cont-query-res.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTimeChartContQueryRes(candidate: any): {
    validObj?: TimeChartContQueryRes,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else {
      return { error: validate.errors }
    }
  }

   