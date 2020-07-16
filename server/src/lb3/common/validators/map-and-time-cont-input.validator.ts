
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { MapAndTimeContInput } from '../interfaces/map-and-time-cont-input.interface';
  import schema from '../schemas/map-and-time-cont-input.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidMapAndTimeContInput(candidate: any): {
    validObj?: MapAndTimeContInput,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   