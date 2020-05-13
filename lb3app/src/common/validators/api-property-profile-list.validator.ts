
  import Ajv from 'ajv';
  const ajv = new Ajv();
  import { ApiPropertyProfileList } from '../interfaces/api-property-profile-list.interface';
  import schema from '../schemas/api-property-profile-list.schema.json'

  // Compile the JSON schema into a validation function
  const validate = ajv.compile(schema);
  export function isValidApiPropertyProfileList(candidate: any): {
    validObj?: ApiPropertyProfileList,
    error?: Ajv.ErrorObject[]
  } {
    if (validate(candidate) === true) {
      return { validObj: candidate }
    } else if (validate.errors) {
      return { error: validate.errors }
    }
    return { error: undefined }
  }

   