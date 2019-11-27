
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { MapAndTimeContQueryRes } from '../interfaces/map-and-time-cont-query-res.interface';
  import schema from '../schemas/map-and-time-cont-query-res.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidMapAndTimeContQueryRes(candidate: any): {
    validObj?: MapAndTimeContQueryRes,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   