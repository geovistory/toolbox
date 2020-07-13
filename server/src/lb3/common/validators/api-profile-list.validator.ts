
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { ApiProfileList } from '../interfaces/api-profile-list.interface';
  import schema from '../schemas/api-profile-list.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidApiProfileList(candidate: any): {
    validObj?: ApiProfileList,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   