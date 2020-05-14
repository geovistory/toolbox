
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { TimeChartContQueryRes } from '../interfaces/time-chart-cont-query-res.interface';
  import schema from '../schemas/time-chart-cont-query-res.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidTimeChartContQueryRes(candidate: any): {
    validObj?: TimeChartContQueryRes,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   