
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { MapAndTimeContOutput } from '../interfaces/map-and-time-cont-output.interface';
  import schema from '../schemas/map-and-time-cont-output.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidMapAndTimeContOutput(candidate: any): {
    validObj?: MapAndTimeContOutput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   