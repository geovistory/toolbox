
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { ApiClassProfileList } from '../interfaces/api-class-profile-list.interface';
  import schema from '../schemas/api-class-profile-list.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidApiClassProfileList(candidate: any): {
    validObj?: ApiClassProfileList,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   